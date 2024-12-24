import { createContext, useContext, useState, ReactNode } from "react";
import { ethers } from "ethers";
import { generateMnemonic, validateMnemonic } from "bip39";
import { WalletContextType } from "../types";

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [wallet, setWallet] = useState<ethers.Wallet | null>(null);
  const [mnemonic, setMnemonic] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createWallet = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const newMnemonic = generateMnemonic();

      const hdNode = ethers.utils.HDNode.fromMnemonic(newMnemonic);
      const newWallet = new ethers.Wallet(hdNode.privateKey);

      setMnemonic(newMnemonic);
      setWallet(newWallet);
      localStorage.setItem("walletAddress", newWallet.address);
    } catch (err) {
      console.error("Wallet creation error:", err);
      setError("Failed to create wallet");
    } finally {
      setIsLoading(false);
    }
  };

  const recoverWallet = async (recoveryPhrase: string) => {
    try {
      setIsLoading(true);
      setError(null);

      if (!validateMnemonic(recoveryPhrase)) {
        throw new Error("Invalid recovery phrase");
      }

      const hdNode = ethers.utils.HDNode.fromMnemonic(recoveryPhrase);
      const recoveredWallet = new ethers.Wallet(hdNode.privateKey);

      setWallet(recoveredWallet);
      setMnemonic(recoveryPhrase);
      localStorage.setItem("walletAddress", recoveredWallet.address);
    } catch (err) {
      console.error("Wallet recovery error:", err);
      setError("Invalid recovery phrase");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setWallet(null);
    setMnemonic("");
    localStorage.removeItem("walletAddress");
    setError(null);
  };

  return (
    <WalletContext.Provider
      value={{
        wallet,
        mnemonic,
        isLoading,
        error,
        createWallet,
        recoverWallet,
        logout,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
