---
sidebar_position: 1
---

# Getting Started



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
:::

## Running the Snapshotter Node
Whether you are developing your own application or extending our existing use cases, setting up your Snapshotter node is a crucial step. Follow the process outlined below to ensure a smooth setup:

### Step 1: Clone the Snapshotter Deploy Repository

Clone the repository against the respective branch (main by default). Open the terminal and run the below command to clone the deploy repo in a directory named `powerloom-deploy`.

```bash
git clone https://github.com/PowerLoom/deploy.git --single-branch powerloom_deploy --branch devnet && cd powerloom_deploy
```

### Step 2: Fork the Snapshotter Computes and Snapshotter Config Repositories

Our system leverages the Git submodule architecture to seamlessly manage these components. To dive deeper into how these elements integrate and function within our larger system, check out the [architecture documentation](https://docs.powerloom.io/docs/build-with-powerloom/snapshotter-node/architecture).

To optimize the development process, we recommend forking the templates for:

- Snapshotter Configs: https://github.com/PowerLoom/snapshotter-configs
- Snapshotter Computes: https://github.com/PowerLoom/snapshotter-computes

Once you have forked the above repositories, next step is to clone them on your local system. 

```bash
git clone https://github.com/<your_github_username>/snapshotter-computes
```
```bash
git clone https://github.com/<your_github_username>/snapshotter-configs
```

### Step 3: Configure the environment variables

1. In the deploy repo's directory, create a new file named `.env`.

2. Copy the contents of [`env.example`](https://github.com/PowerLoom/deploy/blob/devnet/env.example) to `.env`.

3. Fill in the required variables in the `.env` file:

   - `SOURCE_RPC_URL`: The URL for Source RPC (Local node/Infura/Alchemy) service.

   - `SIGNER_ACCOUNT_ADDRESS`: The address of the signer account. This is your burner wallet address added on the Devnet dashboard. **Using a burner account is recommended**. 

   - `SIGNER_ACCOUNT_PRIVATE_KEY`: The private key corresponding to the burner wallet address.
   - `SNAPSHOT_CONFIG_REPO`: https://github.com/your-username/snapshotter-configs [Change the username to your GitHub profile to point to your forked snapshotter-configs repository.]
   - `SNAPSHOT_CONFIG_REPO_BRANCH`: Change to your own branch or use the `devnet` branch if you are getting started.
   - `SNAPSHOTTER_COMPUTE_REPO`:  https://github.com/your-username/snapshotter-computes [Change the username to your GitHub profile to point to your forked snapshotter-computes repository.]
   - `SNAPSHOTTER_COMPUTE_REPO_BRANCH`: Change to your own branch or use the `devnet` branch if you are getting started.
   - `PROST_RPC_URL`: The URL for the Powerloom Protocol Chain RPC service.
   - `PROTOCOL_STATE_CONTRACT`: The contract address for the protocol state.

:::note
Currently, there are two variations of Protocol State Contracts available. One where [Epoch](../../Protocol/Specifications/Epoch.md) size is set to 1 and other where epoch size is set to 10 blocks. 

This should allow developers to build and experiment with a variety of use cases. If you have any custom needs, reach out to the [team](https://discord.com/invite/powerloom)

:::

   - `RELAYER_HOST`: The relayer URL for the Powerloom Protocol Chain.
   - `NAMESPACE`: The unique key used to identify your project namespace.
   - `POWERLOOM_REPORTING_URL`: The URL for reporting to PowerLoom.
   - `PROST_CHAIN_ID`: Enter the Devnet chain ID
   - `SLOT_ID`: Enter your Devnet Slot ID. [You can find the slotID on the dashboard]

   Optional variables:

   - `IPFS_URL`: The URL for the IPFS (InterPlanetary File System) service in HTTP(s) (e.g., `https://ipfs.infura.io:5001`) or multiaddr format (e.g., `/dns4/ipfs.infura.io/tcp/5001/https`).
   - `IPFS_API_KEY`: The API key for the IPFS service (if required).
   - `IPFS_API_SECRET`: The API secret for the IPFS service (if required).
   - `SLACK_REPORTING_URL`: The URL for reporting to Slack.

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
Once you start the node, you can check your status from the [devnet dashboard](https://mint-devnet.powerloom.network) or you can check your node logs.

## Troubleshooting Errors

If the `.env` file is filled up correctly, all services will execute one by one. The logs can fill up quickly, so remember to [safely detach](https://linuxize.com/post/how-to-use-linux-screen/) from the screen when not using it. If you see the following error:
    
    powerloom_depoy-pooler-1           | Snapshotter identity check failed on protocol smart contract
    powerloom_depoy-pooler-1 exited with code 1
    
Make sure your snapshotter address is registered. Ensure that you have minted the Devnet Slot from the [devnet dashboard](https://mint-devnet.powerloom.network) and your burner wallet has been added.

Refer to our [troubleshooting section](../../build-with-powerloom/snapshotter-node/full-node/troubleshooting.md) if you encounter any other issues with your node.

## Stopping the Node

1. To shutdown services, press `Ctrl+C` (and again to force).

2. If you encounter issues with data, you can do a clean **reset** by running the following command before restarting from [Step 5](#step-5-run-the-snapshotter-node):

```bash
docker-compose --profile ipfs down --volumes
```
