---
sidebar_position: 1
---

import Admonition from '@theme-original/Admonition';

# Getting Started
This section will guide you through the necessary steps to set up and get started with the Devnet environment. By following these instructions, you'll be able to quickly configure your Devnet and start building data applications on Powerloom.

## Minting the Devnet Slot
To get started with Devnet, you'll need to mint a no-cost NFT slot on the Sepolia network. 

<Admonition type="tip" icon="📢" title="Ethereum Sepolia Faucet">
You require ETH Sepolia to mint the NFT slot. If you don't have sufficient balance, you can get ETH Sepolia from this link: https://faucet.quicknode.com/drip
</Admonition>

Follow these steps:

1. Visit https://devnet-mint.powerloom.dev to begin the minting process.
2. Once the NFT slot is minted, navigate to the [dashboard](https://devnet-mint.powerloom.dev/dashboard).
3. In the dashboard, assign the burner wallet to your node slot.

After completing these steps, you'll be ready to start using Devnet. The next step is to configure and run our snapshotter node. 

## Setting up the Snapshotter Node
A snapshotter peer, as part of the Powerloom Protocol, does exactly what the name suggests: It synchronizes with other snapshotter peers over a smart contract running on the Powerloom Prost chain. 

Whether you are developing your own application or extending our existing use cases, setting up your Snapshotter node is a crucial step.


:::tip
Here are some important topics you may want to check out: 
- [Understanding Epoch](../../Protocol/Specifications/Epoch.md)
- [What are Data markets](../../Protocol/data-sources.md)
- [Snapshotter Node Architecture](../snapshotter-node/architecture.md)
- [Data Composition](../../Protocol/data-composition.md)
:::

### System Requirements

- **RAM**: At least 4 GB.
- **CPU Core**: Minimum of 2 Cores
- **Disk Space**: A minimum of 40 GB.
- **Python**: Ensure Python 3.11 is installed.
- **Docker**: Latest version of `docker` (`>= 20.10.21`) and `docker-compose` (`>= v2.13.0`). If your system doesn't have docker installed, please follow the guide [here](https://www.baeldung.com/ops/docker-install-windows-linux-mac). 
- **RPC URL** URL for `Ethereum mainnet` or the chain you're working on.

:::tip
Your RPC usage depends on your specific use case. If your application requires a high volume of RPC calls, we recommend running your own RPC node to avoid potentially expensive third-party service costs.

If you want to monitor your RPC usage, we recommend signing up with a provider like Alchemy, Infura or Quicknode.
:::

### Running the Snapshotter Node
Follow the process outlined below to ensure a smooth setup

#### Step 1: Clone the Snapshotter Deploy Repository

Clone the repository against the respective branch (main by default). Open the terminal and run the below command to clone the deploy repo in a directory named `powerloom-deploy`.

```bash
git clone https://github.com/PowerLoom/deploy.git --single-branch powerloom_deploy --branch devnet && cd powerloom_deploy
```

#### Step 2: Fork the Snapshotter Computes and Snapshotter Config Repositories

Our system leverages the Git submodule architecture to seamlessly manage these components. To dive deeper into how these elements integrate and function within our larger system, check out the [architecture documentation](https://docs.powerloom.io/docs/build-with-powerloom/snapshotter-node/architecture).

To optimize the development process, we recommend forking the templates for:

- Snapshotter Configs: https://github.com/PowerLoom/snapshotter-configs
- Snapshotter Computes: https://github.com/PowerLoom/snapshotter-computes

:::info
When forking the repository, ensure that the *"Copy the main branch only" * option is left unchecked. This will allow you to clone all the branches associated with the repository, not just the main branch.
:::

Once you have forked the above repositories, next step is to clone them on your local system. 

```bash
git clone https://github.com/<your_github_username>/snapshotter-computes
```
```bash
git clone https://github.com/<your_github_username>/snapshotter-configs
```

#### Step 3: Configure the environment variables

1. In the deploy repo's directory, create a new file named `.env`.

2. Copy the contents of [`env.example`](https://github.com/PowerLoom/deploy/blob/devnet/env.example) to `.env`.

3. Fill in the required variables in the `.env` file:

- `SOURCE_RPC_URL`: The URL for Source RPC (Local node/Infura/Alchemy) service.

- `SIGNER_ACCOUNT_ADDRESS`: The address of the signer account. This should be your burner wallet address added on the [Devnet dashboard](https://devnet-mint.powerloom.dev/dashboard). You can create a new burner wallet from https://vanity-eth.tk/ 

- `SIGNER_ACCOUNT_PRIVATE_KEY`: The private key corresponding to the burner wallet address.
- `SNAPSHOT_CONFIG_REPO`: https://github.com/your-username/snapshotter-configs [Change the username to your GitHub profile to point to your forked snapshotter-configs repository.]
- `SNAPSHOT_CONFIG_REPO_BRANCH`: Change to your own branch or use the `devnet` branch if you are getting started.
- `SNAPSHOTTER_COMPUTE_REPO`:  https://github.com/your-username/snapshotter-computes [Change the username to your GitHub profile to point to your forked snapshotter-computes repository.]
- `SNAPSHOTTER_COMPUTE_REPO_BRANCH`: Change to your own branch or use the `devnet` branch if you are getting started.
- `PROST_RPC_URL`: The URL for the Powerloom Protocol Chain RPC service.
- `PROTOCOL_STATE_CONTRACT`: The contract address for the protocol state.

:::note
Currently, there are two variations of Protocol State Contracts available. One where [Epoch](../../Protocol/Specifications/Epoch.md) size is set to 1 and other where epoch size is set to 10 blocks. 

You can find the latest Epoch Contracts in the [example.env](https://github.com/PowerLoom/deploy/blob/devnet/env.example) file. 

This should allow developers to build and experiment with a variety of use cases. If you have any custom needs, reach out to the [team](https://discord.com/invite/powerloom)
:::

- `RELAYER_HOST`: The relayer URL for the Powerloom Protocol Chain.
- `NAMESPACE`: The unique key used to identify your project namespace.
- `POWERLOOM_REPORTING_URL`: The URL for reporting to PowerLoom.
- `PROST_CHAIN_ID`: Enter the Devnet chain ID
- `SLOT_ID`: Enter your Devnet Slot ID. [You can find the slotID on the [Devnet dashboard](https://devnet-mint.powerloom.dev/dashboard)]

Optional variables:

- `IPFS_URL`: The URL for the IPFS (InterPlanetary File System) service in HTTP(s) (e.g., `https://ipfs.infura.io:5001`) or multiaddr format (e.g., `/dns4/ipfs.infura.io/tcp/5001/https`).
- `IPFS_API_KEY`: The API key for the IPFS service (if required).
- `IPFS_API_SECRET`: The API secret for the IPFS service (if required).
- `SLACK_REPORTING_URL`: The URL for reporting to Slack.

#### Step 4: Set Up the Codebase

Set up the codebase by running the `bootstrap.sh` command in the terminal:

```bash
bash bootstrap.sh
```

:::info
This is a one-time step that resets the codebase to the latest version of the branch. 
After completing this one-time setup, you'll be ready to dive into the codebase and start building amazing data applications!
:::

#### Step 5: Run the Snapshotter Node

Run the command

```bash
bash build.sh
```
Once you start the node, you can check your status from the [devnet dashboard](https://mint-devnet.powerloom.network) or you can check your node logs.

### Troubleshooting Errors

If the `.env` file is filled up correctly, all services will execute one by one.

 If you see the following error:

 ```bash
    powerloom_depoy-pooler-1           | Snapshotter identity check failed on protocol smart contract
    powerloom_depoy-pooler-1 exited with code 1
```
    
Make sure your snapshotter address is registered. Ensure that you have minted the Devnet Slot from the [devnet dashboard](https://mint-devnet.powerloom.network) and your burner wallet has been added.

Refer to our [troubleshooting section](../../build-with-powerloom/snapshotter-node/full-node/troubleshooting.md) if you encounter any other issues with your node.

### Stopping the Node

1. To shutdown services, press `Ctrl+C` (and again to force).

2. If you encounter issues with data, you can do a clean **reset** by running the following command before restarting from [Step 5](#step-5-run-the-snapshotter-node):

```bash
docker-compose --profile ipfs down --volumes
```

---

## Quick Links
- [Protocol Overview](../../Protocol/)
- [Use Cases](../use-cases/)
- [Discord Support](https://discord.com/invite/powerloom)