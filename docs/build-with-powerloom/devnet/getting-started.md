---
sidebar_position: 0
---

# Getting Started

:::info
#### Our Devnet is live!
Get access to the Devnet and build exciting data applications, you can mint a no-cost NFT slot on the Sepolia network. Devnet mint page: https://devnet-mint.powerloom.dev
:::

Kickstart your journey to build data application with Powerloom by setting up your own Snapshotter Lite node on our devnet.

Our Devnet environment is designed to facilitate developers in:
- expanding upon [our pre-existing use cases](../use-cases/existing-implementations/)
- innovating [entirely new applications](../use-cases/building-new-usecase/)

## System Requirements

1. Latest version of `docker` (`>= 20.10.21`) and `docker-compose` (`>= v2.13.0`)

2. At least 4 core CPU, 8GB RAM, and 50GB SSD

3. IPFS node
    - While we have __included__ a node in our autobuild docker setup, the IPFS daemon can consume __*a lot*__ of resources - it is not recommended to run this on a personal computer unless you have a strong internet connection and dedicated CPU+RAM.
  
    - 3rd party IPFS services that provide default IPFS interface like Infura are now supported.

4. RPC URL for `Ethereum mainnet` or the chain you're working on.

:::note

Your RPC usage depends on your specific use case. If your application requires a high volume of RPC calls, we recommend running your own RPC node to avoid potentially expensive third-party service costs.

If you want to monitor your RPC usage, we recommend signing up with a provider like Alchemy, Infura or Quicknode.
If none of these options work for you, please reach out to our team for assistance.
:::

## Running the Snapshotter Node
Whether you are developing your own application or extending our existing use cases, setting up your Snapshotter node is a crucial step. Follow the process outlined below to ensure a smooth setup:

### Step 1: Clone the Snapshotter Deploy Repository

Clone the repository against the respective branch (main by default). Open the terminal and run the below command to clone the deploy repo in a directory named `powerloom-deploy`.

```bash
git clone https://github.com/PowerLoom/deploy.git --single-branch powerloom_deploy --branch devnet && cd powerloom_deploy
```

### Step 2: Fork the Snapshotter Computes and Snapshotter Config Repositories

Our system leverages the Git submodule architecture to seamlessly manage these components. To dive deeper into how these elements integrate and function within our larger system, check out our [architecture documentation](../../Protocol/Specifications/Snapshotter/).
To optimize your development process, we recommend forking the templates for:

- Snapshotter Configs: https://github.com/PowerLoom/snapshotter-computes
- Snapshotter Computes: https://github.com/PowerLoom/snapshotter-configs 

Once you have forked the above repositories, next step is to clone them on your local system as well. 

```bash
git clone https://github.com/<your_github_username>/snapshotter-computes
```
```bash
git clone https://github.com/<your_github_username>/snapshotter-configs
```

### Step 3: Configure the environment variables

1. In the deploy repo's directory, create a new file named `.env`.

2. Copy the contents of `env.example` to `.env`.

3. Fill in the following required variables in the `.env` file:

   - `SOURCE_RPC_URL`: The URL for Source RPC (Local node/Infura/Alchemy) service.

   - `SIGNER_ACCOUNT_ADDRESS`: The address of the signer account. This is your burner wallet address added on the Devnet dashboard. **Using a burner account is highly recommended**. 

   - `SIGNER_ACCOUNT_PRIVATE_KEY`: The private key corresponding to the burner wallet address.
   - `SNAPSHOT_CONFIG_REPO`: https://github.com/your-username/snapshotter-configs [Change the username to your GitHub profile to point to your forked snapshotter-configs repository.]
   - `SNAPSHOT_CONFIG_REPO_BRANCH`: Change to your own branch or use the `devnet` branch if you are just getting started.
   - `SNAPSHOTTER_COMPUTE_REPO`:  https://github.com/your-username/snapshotter-computes [Change the username to your GitHub profile to point to your forked snapshotter-computes repository.]
   - `SNAPSHOTTER_COMPUTE_REPO_BRANCH`: Change to your own branch or use the `devnet` branch if you are just getting started.
   - `PROST_RPC_URL`: `https://rpc-prost1d.powerloom.io` The URL for the Powerloom Protocol Chain RPC service.
   - `PROTOCOL_STATE_CONTRACT`: The contract address for the protocol state.

   :::note
   We offer two types of Protocol State Contracts, each tailored to different Epoch Sizes, to cater to the unique complexities of your application:
   - Epoch Size 1 Contract: `0x750129050859a00bCe706B9Bb43f7117EE0c344b`
   - Epoch Size 10 Contract: `0x5B1f374C7680B310CD68351B8e9e6BeD34d8884f`
  
  Consider the complexity and requirements of your application when selecting the appropriate Protocol State Contract. This will ensure optimal performance and efficiency for your specific use case.
   :::
  
   - `RELAYER_HOST`: `https://relayer-devnet-1d.powerloom.dev` The host address for the relayer.
   - `NAMESPACE`: The unique key used to identify your project namespace.
   - `POWERLOOM_REPORTING_URL`: `https://devnet-reporting.powerloom.dev` The URL for reporting to PowerLoom.
   - `PROST_CHAIN_ID`: For Devnet, it's `104`.
   - `SLOT_ID`: Enter your Devnet Slot ID. [You can find the slotID on the dashboard]

1. Optional variables:

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

:::info
This is a one-time step that resets the codebase to the latest version of the branch. 
After completing this one-time setup, you'll be ready to dive into the codebase and start building amazing data applications!
:::

### Step 5: Run the Snapshotter Node

Run the command

```bash
./build.sh
```
(ideally in a `screen`) to start the Snapshotter Node. 
Once you start the node, you can check your status from the Devnet dashboard or you can check your node logs.

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