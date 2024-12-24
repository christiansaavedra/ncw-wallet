import { ethers } from "ethers";

export interface WalletState {
  address: string;
  privateKey: string;
}

export interface TransactionData {
  hash: string;
  from: string;
  to: string;
  value: string;
  timestamp: number;
}

export interface WalletContextType {
  wallet: ethers.Wallet | null;
  mnemonic: string;
  isLoading: boolean;
  error: string | null;
  createWallet: () => Promise<void>;
  recoverWallet: (phrase: string) => Promise<void>;

  logout: () => void;
}
