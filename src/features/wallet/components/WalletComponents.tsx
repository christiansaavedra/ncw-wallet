import { useState } from "react";

import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  Wallet,
  Copy,
  AlertTriangle,
  CheckCircle2,
  LogOut,
} from "lucide-react";
import { useWallet } from "../context/WalletContext";

export const CreateWalletButton = () => {
  const { createWallet, isLoading } = useWallet();

  return (
    <button
      onClick={createWallet}
      disabled={isLoading}
      className="crypto-button w-full flex items-center justify-center space-x-2 disabled:opacity-50"
    >
      <Wallet className="w-5 h-5" />
      <span>{isLoading ? "Creating Wallet..." : "Create New Wallet"}</span>
    </button>
  );
};

export const RecoveryForm = ({ onCancel }: { onCancel: () => void }) => {
  const { recoverWallet, isLoading } = useWallet();
  const [recoveryPhrase, setRecoveryPhrase] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await recoverWallet(recoveryPhrase);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        value={recoveryPhrase}
        onChange={(e) => setRecoveryPhrase(e.target.value)}
        placeholder="Enter your 12-word recovery phrase"
        className="input-field h-32"
        rows={3}
        required
      />
      <div className="flex space-x-4">
        <button
          type="submit"
          disabled={isLoading}
          className="crypto-button flex-1 flex items-center justify-center space-x-2"
        >
          <CheckCircle2 className="w-5 h-5" />
          <span>{isLoading ? "Recovering..." : "Recover Wallet"}</span>
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="crypto-button-secondary flex-1"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export const WalletInfo = () => {
  const { wallet, mnemonic, logout } = useWallet();
  const [copied, setCopied] = useState(false);

  if (!wallet) return null;

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="crypto-card p-6 space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-300">Wallet Address</h2>
          <CopyToClipboard text={wallet.address} onCopy={handleCopy}>
            <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
              {copied ? (
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              ) : (
                <Copy className="w-5 h-5 text-gray-400" />
              )}
            </button>
          </CopyToClipboard>
        </div>
        <p className="font-mono text-sm break-all bg-gray-900/50 p-3 rounded-lg border border-gray-700">
          {wallet.address}
        </p>
      </div>

      <div className="crypto-card p-6 space-y-3">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-yellow-500" />
          <h2 className="text-lg font-medium text-gray-300">Recovery Phrase</h2>
        </div>
        <p className="font-mono text-sm break-all bg-gray-900/50 p-3 rounded-lg border border-gray-700">
          {mnemonic}
        </p>
        <p className="text-sm text-yellow-500">
          Store this phrase safely! You'll need it to recover your wallet.
        </p>
      </div>

      <button
        onClick={logout}
        className="crypto-button-secondary w-full flex items-center justify-center space-x-2"
      >
        <LogOut className="w-5 h-5" />
        <span>Logout</span>
      </button>
    </div>
  );
};
