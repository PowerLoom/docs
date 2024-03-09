---
sidebar_position: 0
---

# Getting Started

:::info
#### Our DevNet network is live!
To access the DevNet and build exciting data applications, you need to mint a no-cost NFT on the Sepolia network. This minted NFT will act as access to the network.
:::

Kickstart your journey into building data-driven decentralized applications (DApps) with Powerloom by setting up your own development network (Devnet) version of the Snapshotter Lite node. This initial step empowers you with the capabilities for data extraction and composition, essential for applications that require data aggregation and complex calculations. Our Devnet environment is designed to facilitate developers in either expanding upon [our pre-existing use cases](../use-cases/existing-implementations/) or innovating [entirely new applications](../use-cases/building-new-usecase/) using Powerloom's robust framework.

## System Requirements

1. Latest version of `docker` (`>= 20.10.21`) and `docker-compose` (`>= v2.13.0`)

2. At least 4 core CPU, 8GB RAM, and 50GB SSD - make sure to choose the correct spec when deploying to Github Codespaces.

3. IPFS node
    - While we have __included__ a node in our autobuild docker setup, the IPFS daemon can consume __*a lot*__ of resources - it is not recommended to run this on a personal computer unless you have a strong internet connection and dedicated CPU+RAM.
  
    - 3rd party IPFS services that provide default IPFS interface like Infura are now supported.

4. RPC URL for `Ethereum mainnet` or the chain you're working on.

:::note
RPC usage can depend on your use case. If your use case is complicated and needs to make a lot of RPC calls, it is recommended to run your own RPC node instead of using third-party RPC services as it can be expensive.

In any case, it is highly recommended to sign up with one of these providers to at least track usage even if you aren't on a paid plan: [Alchemy](https://alchemy.com/?r=15ce6db6d0a109d5), [Infura](https://infura.io), [Quicknode](https://www.quicknode.com?tap_a=67226-09396e&tap_s=3491854-f4a458), etc. Please reach out to us if none of the options are viable.
:::

## Running the Node
Whether you are developing your own application or extending our existing use cases, setting up your Snapshotter node is a crucial step. Follow the process outlined below to ensure a smooth setup:

### Step 1: Clone the Deploy Repo

Clone the repository against the respective branch (main by default). Open the terminal and run the below command to clone the deploy repo in a directory named `powerloom-devnet`.

```bash
git clone https://github.com/PowerLoom/deploy.git --single-branch devnet_deploy && cd powerloom-devnet
```

### Step 2: Fork the Computes and Config Templates

For an optimized development process, it's recommended to fork the templates for [snapshotter-computes](https://github.com/PowerLoom/snapshotter-computes) and [snapshotter-configs](https://github.com/PowerLoom/snapshotter-configs/). Our system utilizes the Git submodule architecture to manage these components efficiently. For a deeper understanding of how these elements integrate and function within our larger system, please refer to our [architecture documentation](../../index.md). This approach ensures a streamlined and cohesive development workflow.

   - Snapshotter Configs: https://github.com/PowerLoom/snapshotter-computes
   - Snapshotter Computes: https://github.com/PowerLoom/snapshotter-configs 

Once you have forked the above repositories, clone them locally as well.

### Step 3: Configure the ENV

1. In the deploy repo's directory, create a new file named `.env`.

2. Copy the contents of `env.example` to `.env`.

3. Fill in the following required variables in the `.env` file:

   - `SOURCE_RPC_URL`: The URL for Ethereum RPC (Local node/Infura/Alchemy) service.

   :::note
   As of now, we only support Ethereum. Support for other chains is coming soon.
   :::

   - `SIGNER_ACCOUNT_ADDRESS`: The address of the signer account. This is your burner wallet address added on the Devnet dashboard. **Using a burner account is highly recommended**. 

   - `SIGNER_ACCOUNT_PRIVATE_KEY`: The private key corresponding to the burner wallet address.
   - `SNAPSHOT_CONFIG_REPO`: https://github.com/your-username/snapshotter-configs [Change the username to your GitHub profile to point to your forked snapshotter-configs repository.]
   - `SNAPSHOT_CONFIG_REPO_BRANCH`: Change to your own branch or use the `devnet` branch if you are just getting started.
   - `SNAPSHOTTER_COMPUTE_REPO`:  https://github.com/your-username/snapshotter-computes [Change the username to your GitHub profile to point to your forked snapshotter-computes repository.]
   - `SNAPSHOTTER_COMPUTE_REPO_BRANCH`: Change to your own branch or use the `devnet` branch if you are just getting started.
   - `PROST_RPC_URL`: `https://rpc-prost1d.powerloom.io` The URL for the Powerloom Protocol Chain RPC service.
   - `PROTOCOL_STATE_CONTRACT`: The contract address for the protocol state.

   :::note
   We have two types of Protocol State Contracts tailored to different Epoch Sizes, catering to the varying complexities of applications you might be developing:

   - For straightforward applications that monitor activities at each block height or number, our Epoch Size 1 contract is the perfect fit.
   - For more advanced projects, like complex data marketplaces or applications requiring intricate computations, our Epoch Size 10 contract is designed to meet these needs.
   :::
  
   - `RELAYER_HOST`: `https://relayer-devnet-1d.powerloom.dev` The host address for the relayer.
   - `NAMESPACE`: The unique key used to identify your project namespace.
   - `POWERLOOM_REPORTING_URL`: `https://devnet-reporting.powerloom.dev` The URL for reporting to PowerLoom.
   - `PROST_CHAIN_ID`: For Devnet, it's `104`.
   - `SLOT_ID`: Enter your DevNet Slot ID. [You can find the slotID on the dashboard]

4. Optional variables:

   - `IPFS_URL`: The URL for the IPFS (InterPlanetary File System) service in HTTP(s) (e.g., `https://ipfs.infura.io:5001`) or multiaddr format (e.g., `/dns4/ipfs.infura.io/tcp/5001/https`).
   - `IPFS_API_KEY`: The API key for the IPFS service (if required).
   - `IPFS_API_SECRET`: The API secret for the IPFS service (if required).
   - `SLACK_REPORTING_URL`: The URL for reporting to Slack.
   - `WEB3_STORAGE_TOKEN`: The token for Web3.Storage. You can generate or retrieve this token from your [API tokens page](https://web3.storage/tokens/?create=true) after signing up for a free plan at web3.storage.

### Step 4: Set Up the Codebase

Set up the codebase by running the `bootstrap.sh` command in the terminal:

```bash
./bootstrap.sh
```

:::note
This is a one-time step and resets the codebase to the latest version of the branch. If you have made any changes to the codebase, make sure to commit them before running this command. You only need to run this command once after cloning the repository.
:::

### Step 5: Run the Node

Run the command

```bash
./build-dev.sh
```
(ideally in a `screen`) to start the Snapshotter Node. 
Once you start the node, you can check your status from the DevNet dashboard or you can check your node logs.

## Troubleshooting Errors

If the `.env` file is filled up correctly, all services will execute one by one. The logs can fill up quickly, so remember to [safely detach](https://linuxize.com/post/how-to-use-linux-screen/) from the screen when not using it. If you see the following error:
    
    powerloom_depoy-pooler-1           | Snapshotter identity check failed on protocol smart contract
    powerloom_depoy-pooler-1 exited with code 1
    
Make sure your snapshotter address is registered. Ensure that you have minted the Devnet Slot from the [devnet dashboard](https://mint-devnet.powerloom.network) and your burner wallet has been added.

Refer to our [troubleshooting guide](./troubleshooting.md) if you encounter any other issues with your node.

## Stopping the Node
1. To shutdown services, press `Ctrl+C` (and again to force).

2. If you encounter issues with data, you can do a clean **reset** by running the following command before restarting from Step 5:

```bash
docker-compose --profile ipfs down --volumes
```