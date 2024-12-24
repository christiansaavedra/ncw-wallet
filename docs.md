sequenceDiagram
actor User
participant UI
participant WalletContext
participant LocalStorage
participant Ethers

    rect rgb(200, 220, 240)
        User->>UI: Clicks "Create Wallet"
        UI->>WalletContext: createWallet()
        WalletContext->>Ethers: generateMnemonic()
        Ethers-->>WalletContext: returns mnemonic
        WalletContext->>Ethers: Create HDNode from mnemonic
        Ethers-->>WalletContext: returns HDNode
        WalletContext->>Ethers: Create Wallet from HDNode
        Ethers-->>WalletContext: returns wallet
        WalletContext->>LocalStorage: Store wallet address
        WalletContext-->>UI: Update state with wallet & mnemonic
        UI-->>User: Display wallet info
    end

    rect rgb(200, 240, 220)
        User->>UI: Enters recovery phrase
        UI->>WalletContext: recoverWallet(phrase)
        WalletContext->>Ethers: validateMnemonic(phrase)
        alt valid mnemonic
            Ethers->>WalletContext: Create HDNode from mnemonic
            WalletContext->>Ethers: Create Wallet from HDNode
            Ethers-->>WalletContext: returns wallet
            WalletContext->>LocalStorage: Store wallet address
            WalletContext-->>UI: Update state with wallet
            UI-->>User: Display recovered wallet
        else invalid mnemonic
            WalletContext-->>UI: Show error
            UI-->>User: Display error message
        end
    end

    rect rgb(240, 220, 200)
        User->>UI: Clicks "Logout"
        UI->>WalletContext: logout()
        WalletContext->>LocalStorage: Remove wallet address
        WalletContext-->>UI: Clear wallet state
        UI-->>User: Show initial screen
    end
