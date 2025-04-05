module.exports = {
    // Midnight Network Configuration
    network: {
        name: 'midnight',
        chainId: process.env.MIDNIGHT_CHAIN_ID || '0x1',
        rpcUrl: process.env.MIDNIGHT_RPC_URL || 'https://rpc.midnight.network',
    },
    
    // Wallet Configuration
    wallet: {
        name: process.env.MIDNIGHT_WALLET_NAME || 'Midnight Wallet',
        icon: '/images/midnight-wallet-icon.png',
        description: 'Connect with Midnight Wallet for secure transactions',
    },
    
    // Contract Addresses
    contracts: {
        productRegistry: process.env.MIDNIGHT_PRODUCT_REGISTRY || '0x...',
        carbonFootprint: process.env.MIDNIGHT_CARBON_FOOTPRINT || '0x...',
    },
    
    // API Configuration
    api: {
        baseUrl: process.env.MIDNIGHT_API_URL || 'https://api.midnight.network',
        endpoints: {
            verify: '/verify',
            store: '/store',
            retrieve: '/retrieve',
        },
    },
    
    // Default Gas Settings
    gas: {
        defaultGasLimit: 300000,
        defaultGasPrice: 20000000000, // 20 Gwei
    },
    
    // Error Messages
    errors: {
        network: 'Please connect to the Midnight network',
        wallet: 'Please install Midnight Wallet',
        transaction: 'Transaction failed',
    },
}; 