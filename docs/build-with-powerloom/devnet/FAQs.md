### What is Devnet?
Devnet is a network environment for developers to test and develop blockchain applications. Devnet provides a sandbox environment to test ideas like data dashboards. As an individual, you can develop your own snapshotting logic, write the data application & use these snapshots without requiring any consensus on said snapshots from other snapshotter nodes.
    
### Why do I need to mint a Devnet Slot?
Minting a no-cost NFT slot on the Sepolia network is necessary to reserve your space on the Devnet and obtain a Slot ID, which is required for setting up your Snapshotter Node.
    
### Are any costs associated with minting the no-cost NFT on the Sepolia Network?
While Sepolia ETH is free on the Sepolia Network (which is a test environment for smart contracts & dApps) and can be obtained from faucets like https://faucet.quicknode.com/drip, transaction costs (gas fees) may apply when conducting transactions on the network, albeit these fees are usually nominal.
    
### Where can I mint the no-cost NFT?
To mint a no-cost NFT slot on the Sepolia network, visit the dedicated minting page provided by Powerloom ([https://devnet-mint.powerloom.dev](https://devnet-mint.powerloom.dev/)), connect your wallet that has Sepolia ETH, and follow the instructions to mint your slot.
    
### What is a Snapshotter Node?
Snapshotter peers are participants in the Powerloom network who capture and verify data snapshots. Snapshotter nodes, run by Snapshotter peers, generate these snapshots at predetermined intervals or epochs.
    
### How to check the slotID of your minted NFT minted slot
You can locate your Slot ID by visiting the Devnet Dashboard or searching for the transaction hash of your NFT mint on the Sepolia block explorer. The Token ID will be listed under "ERC-1155 Tokens Transferred."
    
### What are the system requirements for running the Snapshotter Node?
The node requires at least 4 GB of RAM, a minimum of 2 CPU cores, 40 GB of disk space, and Python 3.11 or higher. Docker is also recommended with specific version requirements.
    
### What versions of Docker and docker-compose are required for the node setup?
The latest version of `docker` (`>= 20.10.21`) and `docker-compose` (`>= v2.13.0`). If your system hasn't installed docker, please follow the guide [here](https://www.baeldung.com/ops/docker-install-windows-linux-mac).
    
### How do I configure the .env file for my snapshotter node?
To configure the environment variables, follow these steps:
  1. Copy env.example to .env. = `cp env.example .env`
  2. Fill in the required variables in .env `SOURCE_RPC_URL`, `SIGNER_ACCOUNT_ADDRESS`, `SIGNER_ACCOUNT_PRIVATE_KEY`, `SLOT_ID`, `PROTOCOL_STATE_CONTRACT`.

### Where can I find documentation on Snapshotter Configs and Computes?
You can find the documentation for Snapshotter Configs & Computes here. The pooler computes & config files are found in [snapshotter-computes](https://github.com/PowerLoom/snapshotter-computes/tree/eth_uniswapv2) and [snapshotter-configs](https://github.com/PowerLoom/snapshotter-configs/tree/eth_uniswapv2).
    
### What is RPC? What RPC services are recommended for use?
In blockchain, RPC (Remote Procedure Calls) nodes allow users and apps to interact with the blockchain without network details. The RPC Helper simplifies the data extraction process from the blockchain state and generates snapshots. It contains helper functions that handle retry and caching logic, making it easier for developers to build their use cases efficiently.
You can use any Ethereum Mainnet RPC provider, such as Infura, Alchemy, or Quicknode. Remember that your choice may depend on your specific use case and RPC usage requirements.
    
### What types of OS can I use to run the Snapshotter Node?
You can use the macOS/Linux or Windows to run the Snapshotter Node. For more details on setting up & running the node, visit [here](https://docs.powerloom.io/docs/build-with-powerloom/devnet/getting-started).
    
### What is a burner wallet & how do I generate one for myself & what security measures should I consider?
A burner wallet is a single-use wallet account designed for temporary transactions. Burner wallets are often used for small transactions or events where security and long-term storage are not priorities.

**Note:** Please do not use your NFT minting wallet to run the snapshotter lite node. The safest approach is to generate and assign a burner wallet using tools like [Vanity-ETH](https://vanity-eth.tk/) & [Powerloom Burner Wallet Generator](https://snapshotter-dashboard.powerloom.network/burner)
    
Once generated, make sure you assign your burner wallet to your snapshotter dashboard.
When creating a burner wallet, prioritize security by managing private keys securely, limiting funds stored, performing offline transactions, regularly backing up data, ensuring a secure environment, using trusted sources, considering multi-signature wallets, and staying informed about security practices.
    
### How do I deploy my snapshotter node once the environment is configured?
After configuring the environment variables, setup the powerloom_deploy codebase by running the `bootstrap.sh` command in the terminal. Developers may use different shells, such as bash or zsh.

**Note**: This is a one-time step that resets the `powerloom_deploy` codebase to the latest version of the `devnet` branch. After completing this one-time setup, you'll be ready to dive into the codebase and start building amazing data applications!
    
### What chains are supported?
We support Ethereum Mainnet & Sepolia Testnet.
    
### What steps should I follow to perform a clean reset of my node?
You can do a clean **reset** by running the following command before restarting
```markdown
    docker-compose --profile ipfs down --volumes
```
or
```markdown
    docker compose --profile ipfs down --volumes
```
    
### How can I stop the node?
To shut down services, use the keyboard shortcut **`Ctrl + C`** on macOS/Linux or **`Ctrl + Break`** on Windows. For a clean reset, run the provided Docker command before restarting the node setup.
    
### Can we run the setup on different languages?
Yes, you can run the setup in different languages. The snapshotter node is a complex system with multiple components written in different languages.
Pooler is a Python program that listens to blockchain events and generates snapshot data, while Audit Protocol, coded in Go, submits snapshots to the Powerloom network, maintains the local cache, and performs heavy tasks like IPFS pruning. Since Pooler and Audit Protocol communicate via RabbitMQ, either component can be ported to different languages, making the snapshotter node accessible to developers unfamiliar with Python or Go.
    
### What is the purpose of the PROTOCOL_STATE_CONTRACT variable?
This variable specifies the protocol state's contract address, which depends on the Epoch size. Currently, there are options for Epoch sizes of 1 and 10 blocks, allowing developers to experiment with different use cases.

### What is the Relayer Host?
The Relayer Host is the relayer URL for the Powerloom Protocol Chain. The relayer is a node within a decentralized network responsible for relaying or forwarding messages, transactions, or data between different participants. Relayers play a crucial role in facilitating communication and interoperability within distributed systems. 
    
### How do I check if my node is running?
To check if your node is running actively, navigate to the [Devnet Dashboard](https://devnet-mint.powerloom.dev/dashboard), where you can check its status. Click the "Check Node Status" button to refresh the status.
    
### Where can I seek help if I encounter issues not covered in the troubleshooting section?
Ensure that your snapshotter address is registered correctly and that you have minted the Devnet Slot. If issues persist, refer to the troubleshooting section of the documentation for common solutions or reach out to the PowerLoom team on Discord () for further assistance.
    
### Is there a community forum or Discord channel for Powerloom developers?
Yes, we have a Discord channel for Powerloom developers. Here’s the link to it: [Powerloom Discord](https://discord.com/invite/powerloom) 
  
### How can I stay updated on new features or changes in the Powerloom Devnet environment?
You can follow us on X(Twitter) & join the community on Discord to stay updated on new feature releases. 
    
### Do I need KYC to mint a slot?
No. There’s no KYC required to Mint a slot. KYC is required to claim rewards.
    
### Do I need gas for minting transactions?
You will need ETH as gas to complete the minting transaction.
    
### What token is required for minting, and how do I get it?
Minting requires ETH on the Base network. You can convert USDC to ETH on Base using decentralized exchanges if you don't have ETH.
    
### Are there any additional steps for setting up the node on Windows?
Yes, setting up the node on Windows requires Docker and the Windows Subsystem for Linux (WSL). Follow the provided guide for detailed instructions on setting up WSL and Docker on your Windows system.
