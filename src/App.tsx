import { useState } from "react";

import { AlertCircle, Wallet } from "lucide-react";
import {
  useWallet,
  WalletProvider,
} from "./features/wallet/context/WalletContext";
import {
  CreateWalletButton,
  RecoveryForm,
  WalletInfo,
} from "./features/wallet/components/WalletComponents";

function WalletApp() {
  const { wallet, error } = useWallet();
  const [recoveryMode, setRecoveryMode] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 sm:p-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="inline-block p-3 rounded-full bg-crypto-primary/10 mb-4">
            <Wallet className="w-12 h-12 text-crypto-primary" />
          </div>
          <h1 className="text-4xl font-bold bg-crypto-gradient bg-clip-text text-transparent">
            Crypto Wallet
          </h1>
          <p className="text-gray-400 mt-2">
            Secure, Non-Custodial Wallet Solution
          </p>
        </div>

        <div className="crypto-card p-6 sm:p-8">
          {error && (
            <div className="mb-6 bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-xl flex items-center gap-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {!wallet && !recoveryMode && (
            <div className="space-y-4">
              <CreateWalletButton />
              <button
                onClick={() => setRecoveryMode(true)}
                className="crypto-button-secondary w-full"
              >
                Recover Existing Wallet
              </button>
            </div>
          )}

          {recoveryMode && (
            <RecoveryForm onCancel={() => setRecoveryMode(false)} />
          )}

          <WalletInfo />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <WalletProvider>
      <WalletApp />
    </WalletProvider>
  );
}
