---
sidebar_position: 1
---

import Admonition from '@theme-original/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Getting Started
This section will guide you through the necessary steps to set up and get started with the Devnet environment. By following these instructions, you'll be able to quickly configure your Devnet and start building data applications on Powerloom.

Watch this tutorial below to get a detailed walk-through of Powerloom Devnet node setup.

<iframe width="560" height="315" src="https://www.youtube.com/embed/L1OOjhVpAEY?si=GXpBua9QxUuXccSa" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Minting the Devnet Slot
To get started with Devnet, you'll need to mint a no-cost NFT slot on the Sepolia network. 

<Admonition type="tip" icon="📢" title="Ethereum Sepolia Faucet">
To mint the NFT slot, ETH on the Sepolia network is required. If your balance is insufficient, you can obtain Sepolia ETH through the following link: https://faucet.quicknode.com/drip
</Admonition>

Follow these steps:

1. Visit https://devnet-mint.powerloom.dev to begin the minting process. You will be prompted to connect your wallet that contains Sepolia ETH.

2. Click mint to being the minting process after connecting your wallet.

![Mint Dashboard](/images/devnet_mint_dashboard.png)

3. Once the NFT slot is minted, use one of the following options to locate your minted Slot ID for later use in the node setup.
    - Navigate to the [Devnet Dashboard](https://devnet-mint.powerloom.dev/dashboard) to see a list of your minted slots.

    ![Devnet Dashboard](/images/devnet_slots_dashboard.png)

    - Search for the transaction hash of your NFT mint on the [Sepolia block explorer](https://sepolia.etherscan.io/).
        - For Metamask: The transaction will be under the `Activity` section.
        - For other wallets: Search for your wallet address in the Sepolia block explorer; the mint will be the latest transaction.
        - Locate the minted Token ID under the `ERC-1155 Tokens Transferred` section.

    ![Block Explorer](/images/sepolia_blockexplorer_example.png)

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

:::info 
Setting up the snapshotter node on Windows requires a few additional steps. We suggest using Docker because of its ease of setup and speed. To begin with Docker, you must have the Windows Subsystem for Linux (WSL) installed. Please follow the guide provided below for detailed instructions.
:::

<Tabs groupId="operating-systems" className="unique-tabs" queryString="current-os">
  <TabItem value="macOS-setup" label="macOS/Linux">
  <h2>Deploying a Snapshotter Node on macOS/Linux</h2>

### Running the Snapshotter Node
Follow the process outlined below to ensure a smooth setup

#### Step 1: Clone the Snapshotter Deploy Repository

Clone the repository against the respective branch (main by default). Open the terminal and run the below command to clone the deploy repo in a directory named `powerloom_deploy`.

```bash
git clone https://github.com/PowerLoom/deploy.git --single-branch powerloom_deploy --branch devnet && cd powerloom_deploy
```

The above command itself navigates you to the Repository Directory `powerloom_deploy`

#### Step 2: Configure the environment variables

1. `cp env.example .env` Copies the contents of the file named `env.example` to a new file named `.env`. 

2. Fill in the required variables in the `.env` file:

#### During the creation of the .env file, add the following details: 
- `SOURCE_RPC_URL`: The URL for Source RPC (Local node/Infura/Alchemy) service.
- `SIGNER_ACCOUNT_ADDRESS`: The address of the signer account. This should be an unused "burner" address that does not need to have any token balance. You can create a new burner wallet from [our tool](https://devnet-mint.powerloom.dev/burner). During later steps, this address will be registered against the `SLOT_ID` on the `PROTOCOL_STATE_CONTRACT` that is set in this `.env`.
- `SIGNER_ACCOUNT_PRIVATE_KEY`: The private key corresponding to the burner wallet address
- `SLOT_ID`: Enter your Devnet Slot ID. [You can find the slotID by visiting the [Devnet Dashboard](https://devnet-mint.powerloom.dev/dashboard), or on the [Sepolia block explorer](https://sepolia.etherscan.io/) by searching for the transaction hash of your node mint]
- `PROTOCOL_STATE_CONTRACT`: Choose the contract address for the protocol state with respect to the Epoch size.

:::note
The following protocol state contract addresses are currently operational with active epoch releases 
* Data source contracts on ETH Mainnet -- [Epoch Size 1](/docs/Protocol/Specifications/Epoch.md) -- `0x573906E80C30dA608E3a24A0938BCB3f0C68Ed2f`

If you have any custom requirements to track data sources on other chains, reach out to the [team.](https://discord.com/invite/powerloom)
:::

**Pre-supplied:**

:::info 
Unless it is a customized need or instructed by us, the below need not be changed or modified.

:::

- `SNAPSHOT_CONFIG_REPO`: https://github.com/powerloom/snapshotter-configs
- `SNAPSHOT_CONFIG_REPO_BRANCH`: devnet
- `SNAPSHOTTER_COMPUTE_REPO`: https://github.com/powerloom/snapshotter-computes
- `SNAPSHOTTER_COMPUTE_REPO_BRANCH`: devnet
- `PROST_RPC_URL`: The Powerloom Protocol Chain RPC service URL.
- `RELAYER_HOST`: The relayer URL for the Powerloom Protocol Chain.
- `NAMESPACE`: The unique key to identify your project namespace.
- `POWERLOOM_REPORTING_URL`: The URL for reporting to PowerLoom.
- `PROST_CHAIN_ID`: The Devnet chain ID

**Optional variables:**

- `IPFS_URL`: The URL for the IPFS (InterPlanetary File System) service in HTTP(s) (e.g., `https://ipfs.infura.io:5001`) or multiaddr format (e.g., `/dns4/ipfs.infura.io/tcp/5001/https`).
- `IPFS_API_KEY`: The API key for the IPFS service (if required).
- `IPFS_API_SECRET`: The API secret for the IPFS service (if required).
- `SLACK_REPORTING_URL`: The URL for reporting to Slack.

#### Step 3: Set Up the Codebase
Set up the codebase by running the `bootstrap.sh` command in the terminal. Developers may use different shells, such as bash or zsh. Adjust the command accordingly:

For bash:

```bash
bash bootstrap.sh
```
or
```zsh
zsh bootstrap.sh
```

:::info
This one-time step resets the `powerloom_deploy` codebase to the latest version of the `devnet` branch. 
After completing this one-time setup, you'll be ready to dive into the codebase and start building amazing data applications!
:::

#### Step 4: 

Install the required dependencies using pip:

```bash
pip3 install -r requirements.txt
```

#### Step 5: Run the Snapshotter Node

Run the command

```bash
bash build.sh
```
or
```zsh
zsh build.sh
```

#### Step 6: Assign your Wallet

```bash
Do you want to assign a wallet to a slot? (yes/no):
```

Enter yes.

Next, you will be prompted to enter a private key:

```bash
To assign a wallet to a slot, you need to sign a message with the private key of the Account holding the slot.
Private Key:
```

- Please note that this is asking for the private key to your wallet.
- Enter the private key of the wallet [**used to mint** the devnet slot](#minting-the-devnet-slot).


</TabItem>

<TabItem value="windows" label="Windows">
<h2>Deploying a Snapshotter Node on Windows</h2>

### Initial Setup | Docker

- **Open PowerShell:**
    - Start by opening PowerShell on your Windows machine. Search for `"PowerShell"` in the start menu and launch it.
- **Install Windows Subsystem for Linux (WSL):**
    - In the PowerShell window, enter the following command:
        
        ```bash
        wsl --install
        
        ```
        
    - This command installs the Windows Subsystem for Linux, necessary for running Docker.
- **Download and Install Docker:**
    - Download Docker from the [official website](https://docs.docker.com/get-docker/).
    - Follow the installation instructions provided on the website.
- **Restart Your Computer:**
    - After installing Docker, restart your computer to apply all changes.
- **Open Docker:**
    - Post-restart, open Docker. This should automatically launch a Powershell console which will have WSL installed.
- **Set Up Linux User Account:**
    - In the newly opened powershell console, set up a new user account by entering a username and password.

### Granting Docker Permissions


- **Modify Docker Group Permissions:**
    - To grant Docker the necessary permissions, add your user to the Docker group with this command:
        
        ```bash
        sudo usermod -aG docker $USER
        
        ```
        
    - Logout and login again or restart the Docker service for the changes to take effect.
- **Verify Docker Installation:**
    - To confirm Docker is set up correctly, run:
        
        ```bash
        docker run hello-world
        
        ```
        
    - This command should display a message confirming Docker is functioning.

### Running the Snapshotter Node
Follow the process outlined below to ensure a smooth setup

#### Step 1: Clone the Snapshotter Deploy Repository

Clone the repository against the respective branch (main by default). Open the terminal and run the below command to clone the deploy repo in a directory named `powerloom-deploy`.

```bash
git clone https://github.com/PowerLoom/deploy.git --single-branch powerloom_deploy --branch devnet && cd powerloom_deploy
```

The above command itself navigates you to the Repository Directory `powerloom-deploy`

#### Step 2: Configure the environment variables

1. In the deploy repo's directory, create a new file named `.env`.

2. Copy the contents of [`env.example`](https://github.com/PowerLoom/deploy/blob/devnet/env.example) to `.env`.

3. Fill in the required variables in the `.env` file:
    - use `dir` to check all existing files under the created directory “powerloom_deploy”
    - use `start env.example` to open env.example file
    - to create a new .env file use syntax `echo. > .env`
    - to copy contents from `env.example` to `.env` use code `type env.example > .env`
    - to open & check contents of `.env` use code `type .env`
   
#### During the creation of the .env file, add the following details: 
- `SOURCE_RPC_URL`: The URL for Source RPC (Local node/Infura/Alchemy) service.
- `SIGNER_ACCOUNT_ADDRESS`: The address of the signer account. This should be an unused "burner" address that does not need to have any token balance. You can create a new burner wallet from [our tool](https://devnet-mint.powerloom.dev/burner). During later steps, this address will be registered against the `SLOT_ID` on the `PROTOCOL_STATE_CONTRACT` that is set in this `.env`.
- `SIGNER_ACCOUNT_PRIVATE_KEY`: The private key corresponding to the burner wallet address
- `SLOT_ID`: Enter your Devnet Slot ID. [You can find the slotID by visiting the [Devnet Dashboard](https://devnet-mint.powerloom.dev/dashboard), or on the [Sepolia block explorer](https://sepolia.etherscan.io/) by searching for the transaction hash of your node mint]
- `PROTOCOL_STATE_CONTRACT`: Choose the contract address for the protocol state with respect to the Epoch size.

:::note
Currently, there are two variations of Protocol State Contracts available. One where [Epoch](../../Protocol/Specifications/Epoch.md) size is set to 1 and other where epoch size is set to 10 blocks. 

You can find the latest Epoch Contracts in the [example.env](https://github.com/PowerLoom/deploy/blob/devnet/env.example) file. 

This should allow developers to build and experiment with a variety of use cases. If you have any custom needs, reach out to the [team](https://discord.com/invite/powerloom)
:::

**Pre-supplied:**

:::info 
Unless it is a customized need or instructed by us, the below need not be changed or modified.

:::

- `SNAPSHOT_CONFIG_REPO`: https://github.com/powerloom/snapshotter-configs
- `SNAPSHOT_CONFIG_REPO_BRANCH`: devnet
- `SNAPSHOTTER_COMPUTE_REPO`: https://github.com/powerloom/snapshotter-computes
- `SNAPSHOTTER_COMPUTE_REPO_BRANCH`: devnet
- `PROST_RPC_URL`: The Powerloom Protocol Chain RPC service URL.
- `RELAYER_HOST`: The relayer URL for the Powerloom Protocol Chain.
- `NAMESPACE`: The unique key to identify your project namespace.
- `POWERLOOM_REPORTING_URL`: The URL for reporting to PowerLoom.
- `PROST_CHAIN_ID`: The Devnet chain ID

**Optional variables:**

- `IPFS_URL`: The URL for the IPFS (InterPlanetary File System) service in HTTP(s) (e.g., `https://ipfs.infura.io:5001`) or multiaddr format (e.g., `/dns4/ipfs.infura.io/tcp/5001/https`).
- `IPFS_API_KEY`: The API key for the IPFS service (if required).
- `IPFS_API_SECRET`: The API secret for the IPFS service (if required).
- `SLACK_REPORTING_URL`: The URL for reporting to Slack.

#### Step 3: Set Up the Codebase

Set up the codebase by running the `bootstrap.sh` command in the terminal. Developers may use different shells, such as bash or zsh. Adjust the command accordingly:

For bash:

```bash
bash bootstrap.sh
```
or
```zsh
zsh bootstrap.sh
```

:::info
This is a one-time step that resets the `powerloom_deploy` codebase to the latest version of the `devnet` branch. 
After completing this one-time setup, you'll be ready to dive into the codebase and start building amazing data applications!
:::

#### Step 4: 

Install the required dependencies using pip:

```bash
pip3 install -r requirements.txt
```

#### Step 5: Run the Snapshotter Node

Run the command

```bash
bash build.sh
```
or
```zsh
zsh build.sh
```

#### Step 6: Assign your Burner Wallet

```bash
Do you want to assign a burner wallet to a slot? (yes/no):
```

Enter yes and then enter your burner wallet address when prompted.
- This is the `SIGNER_ACCOUNT_ADDRESS` that was set during [Step 3](#step-3-configure-the-environment-variables).

Next, you will be prompted to enter a private key:

```bash
To assign a burner wallet to a slot, you need to sign a message with the private key of the Account holding the slot.
Private Key:
```

- Please note that this is *not* asking for the private key to your burner wallet.
- Enter the private key of the wallet [**used to mint** the devnet slot](#minting-the-devnet-slot).

</TabItem>
</Tabs>

<h3>Troubleshooting Errors</h3>

If the `.env` file is filled up correctly, all services will execute one by one.

 If you see the following error:

 ```bash
    powerloom_depoy-pooler-1           | Snapshotter identity check failed on protocol smart contract
    powerloom_depoy-pooler-1 exited with code 1
```
    
Make sure your snapshotter address is registered. Ensure you have minted the Devnet Slot from the [devnet dashboard](https://devnet-mint.powerloom.dev/dashboard) and your burner wallet has been added correctly during Step 6.

Refer to our [troubleshooting section](../../build-with-powerloom/snapshotter-node/full-node/troubleshooting.md) if you encounter any other issues with your node.

<h3>Stopping the Node</h3>

1. To shut down services, press `Ctrl+C` for macOS/Linux & `Ctrl + Break` for Windows (and again to force).

2. If you encounter issues with data, you can do a clean **reset** by running the following command before restarting from [Step 5](#step-5-run-the-snapshotter-node):

```bash
docker-compose --profile ipfs down --volumes
```
or 
```bash
docker compose --profile ipfs down --volumes
```

---

## Quick Links
- [Protocol Overview](../../category/protocol-overview)
- [Use Cases](../../category/use-cases)
- [Discord Support](https://discord.com/invite/powerloom)
