---
sidebar_position: 1
title: Setting Up
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Setting Up and Running the Snapshotter Node on Devnet

This guide provides instructions for installing and running the Snapshotter Node for the Powerloom Devnet, covering prerequisites and operational procedures.

The Snapshotter Node can be set up using either the Docker image or by running natively on the local machine. However, using the Docker image is the recommended approach, as it provides the simplest and most reliable method for deployment.

:::tip Node Mint
Node Mint for devnet is available at: https://devnet-mint.powerloom.dev/. This dashboard also serves as the snapshotter dashboard for monitoring your devnet nodes.
:::

Follow the step-by-step instructions in the relevant guide to set up your Snapshotter Node. If you need further assistance, refer to our troubleshooting documentation or reach out to us on [discord](https://discord.com/invite/powerloom) for support.

:::info Important note

1. It is recommended that the node operates continuously, 24/7.
2. The devnet uses the dedicated Powerloom devnet chain - no Sepolia ETH required!
3. Get devnet tokens from the faucet at https://devnet-faucet.powerloom.dev

:::

We have streamlined the setup process based on your operating system. To begin, please choose your operating system from the tabs provided below.

- For those looking to set up the node on a local Windows or Mac machine, please select the appropriate tab.
- If you are configuring your node on a Linux VPS, select the "VPS Setup (Linux)" tab and follow the provided instructions to get started.

---

<!-- Grouping by OS and Setup type -->

## Setting up the Snapshotter Node on Devnet

<Tabs groupId="operating-systems" className="unique-tabs" queryString="current-os">
  <TabItem value="VPS-setup" label="VPS Setup (Linux)">
  <Tabs groupId="setup-type" queryString="setup-type">
  <TabItem value="docker-setup-linux" label="Docker Setup">
  ## Deploying a Snapshotter Node on a Virtual Private Server (VPS)

Deploying a Snapshotter Node on a Virtual Private Server (VPS) ensures seamless 24/7 operation without utilizing your local resources.

This section provides instructions for setting up your Snapshotter Node on an Ubuntu VPS.

While you're free to choose any provider, this guide specifically utilizes DigitalOcean for demonstration purposes.

### Recommended VPS Providers:

- DigitalOcean
- Hostinger


### Hardware Requirements

The Snapshotter Node is designed for minimal hardware demands, allowing it to operate effectively on various setups, including both local systems and cloud-based Virtual Machines.

For users running the node on Virtual Private Servers (VPS), the minimum specifications are:

- **RAM:** At least 4 GB.
- **CPU Core**:  Minimum of 2 Cores
- **Disk Space:** A minimum of 40 GB.


### Step 1: Creating Your VPS

1. **Sign Up/Login**: Start creating an account on your VPS provider or log in if you already have one.

2. **Choose an Image**: Select Ubuntu as your operating system. We recommend using the latest stable version of Ubuntu for optimal performance.

3. **Select a Plan**: Choose a plan that meets the minimum hardware requirements for the Snapshotter Node. A plan with at least 4 GB RAM and 40 GB of disk space is advisable.

4. **Authentication**: Set up SSH keys for secure access to your VPS.

5. **Finalize and Create**: Choose any additional options, like backups if required. Your VPS will be set up within a few minutes.

### Step 2: Accessing Your VPS

- **SSH into Your VPS**: Use the following command from your terminal/command prompt, replacing `your_vps_ip` with the IP address of your VPS. 

```bash
ssh root@your_vps_ip
```

- If you set up SSH keys, you should be logged in without needing a password. Otherwise, you can also set your password for the VPS.

### Step 3: Setting Up the Environment

1. **Update and Upgrade Your VPS**:

```bash
sudo apt-get update && sudo apt-get upgrade -y
```

2. **Install Git**: 
Git is necessary for cloning the Snapshotter repository. Install it using:

```bash
sudo apt-get install git -y
```

3. **Install Docker and Docker Compose:**  
Ensure Docker and Docker Compose are installed. You can install docker on Ubuntu using the following commands:

```bash
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
"deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
$(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```
   
Once the Docker repository is added successfully, let's install Docker and necessary components by using the below command:

```bash
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

### Step 4: Cloning the Repository and Setting Up the Node

1. **Clone the Snapshotter Repository**: 
Navigate to the directory where you want to install the node and clone the repository:

   ```bash
   git clone https://github.com/PowerLoom/snapshotter-lite-v2.git powerloom-devnet
   ```

2. **Navigate to the Directory**: 
Change to the directory of the cloned repository:

   ```bash
   cd powerloom-devnet
   ```

4. **Cleanup the Environment**:
Run the diagnose and cleanup script to check for any previous instances of the lite node, local collector, stale images and networks.

   ```bash
   ./diagnose.sh
   ```

:::tip
It is recommended to run the node in a standalone environment without any other major processes running on the same machine. Running other processes on the same machine may lead to conflicts and errors that can interfere with the node's operation. The diagnose and cleanup script will stop and remove only Powerloom related processes running on the machine, if any.
:::


### Step 5: Running the Node

1. **Setting up Screen**:  
The Screen utility allows you to run processes in the background, enabling you to maintain long-running tasks without keeping a terminal window open. To initiate a new Screen session for managing the Snapshotter Node, follow these steps:

Enter the following command to create a new Screen session named "snapshotter-devnet-node":

   ```bash
   screen -R snapshotter-devnet-node
   ```
   
- This command opens a new Screen session, where you can start the Snapshotter Node.
- Once inside the new Screen session, initiate the Snapshotter Node as required.

:::note
If you have an existing screen session named `snapshotter-devnet-node`, the above command will attach to the existing session.
Otherwise, it will create a new session with that name.
:::
   
This approach ensures your node can continue running in the background, even if you disconnect from the terminal session.

1. **Initialize the Node**: 
Initiate the snapshotter node setup by typing the command in the terminal:

   ```bash
   ./build.sh --devnet
   ```
  
   :::warning Important
   The `--devnet` flag is required for devnet deployment. This tells the node to connect to the Powerloom devnet chain instead of mainnet.
   :::
   
Follow the prompts to enter the required information.

:::tip
Please do not use your NFT minting wallet to run the snapshotter node. The safest approach is to generate and assign a burner wallet. You can generate a burner wallet through any of the tools listed below:
- [Vanity-ETH](https://vanity-eth.tk/)
- [Powerloom Burner Wallet Generator](https://snapshotter-dashboard.powerloom.network/burner)

Once generated, make sure you assign your burner wallet to your slot at [devnet-mint.powerloom.dev](https://devnet-mint.powerloom.dev/).
:::
   
### Step 6: Configuring the Node

After initiating the process, the setup steps will differ depending on whether this is the first time the node has been setup or not:

**First Time Setup:**

1. Select the Data Market that you would like to participate in:
   - The node allows you to choose between different data markets available on devnet.

2. Next, you'll be prompted to enter the following values:
   - `$SOURCE_RPC_URL`: Use any Ethereum Mainnet RPC, such as Ankr, Infura, or Alchemy.

   - `$SIGNER_ACCOUNT_ADDRESS`: Utilize a burner wallet for the signer account address. Please DO NOT use your main/primary wallet.

   - `$SIGNER_ACCOUNT_PRIVATE_KEY`: Use the private key from your burner wallet.

   - `$SLOT_ID`: To assign your node to a specific slot, please provide the corresponding Slot ID. You can locate your Slot ID on the devnet dashboard at https://devnet-mint.powerloom.dev.

3. Optionally, you can provide to following values:

   - `$TELEGRAM_CHAT_ID`: Can be provided if you would like to enable Telegram reporting for node issues. See our [Telegram Bot Setup](/build-with-powerloom/snapshotter-node/lite-node-v2/telegram-bot-setup) page for instructions on how to get your Telegram Chat ID.

After entering these details, the node will start running the background processes.

If you want to exit your screen, type the command in the terminal:
   ```bash 
   CTRL + A + D
   ```

**Subsequent Setup:**

1. Select the Data Market that you would like to participate in.

2. You will be prompted to choose whether you wish to change the previously configured values for the above: `SOURCE_RPC_URL`, `SIGNER_ACCOUNT_ADDRESS`, `SIGNER_ACCOUNT_PRIVATE_KEY` and `SLOT_ID`. Choose `y` or `n` depending on whether you wish to change them.

3. If you choose `y` to change the previously configured values, you will be prompted to enter the new values individually for each of the above values.


### Step 6: Maintaining Your Node

- **Regular Updates**: Keep your system and Snapshotter Node updated by regularly pulling the latest changes from the repository and applying system updates.

- **Monitoring**: Regularly check the status of your node and the VPS to ensure everything is running smoothly.


</TabItem>
</Tabs>

</TabItem>

<TabItem value="mac/linux" label="macOS/Linux">
<Tabs groupId="setup-type" queryString="setup-type">
   <TabItem value="docker-setup-macos" label="Docker Setup">

## Docker Setup for MacOS

### Hardware Requirements

The Snapshotter Node is designed for minimal hardware demands, allowing it to operate effectively on various setups, including both local systems and cloud-based Virtual Machines.

### MacOS System Requirements

For users running the node on personal hardware, the minimum specifications are:

- **RAM:** At least 4 GB.
- **CPU Core**:  Minimum of 2 Cores
- **Disk Space:** A minimum of 40 GB.

### Pre-requisitie tools

- Install Docker on your machine. You can find the installation instructions for your operating system on the [official Docker website.](https://docs.docker.com/get-docker/)

- Install git if your system doesn't have git installed. To install git on MacOS, please follow this guide: https://www.atlassian.com/git/tutorials/install-git

### Cloning the Repository and Setting Up the Node

1. **Clone the Snapshotter Repository**: 
Navigate to the directory where you want to install the node and clone the repository:

   ```bash
   git clone https://github.com/PowerLoom/snapshotter-lite-v2.git powerloom-devnet
   ```

2. **Navigate to the Directory**: 
Change to the directory of the cloned repository:

   ```bash
   cd powerloom-devnet
   ```

4. **Cleanup the Environment**:
Run the diagnose and cleanup script to check for any previous instances of the lite node, local collector, stale images and networks.

   ```bash
   ./diagnose.sh
   ```

:::tip
It is recommended to run the node in a standalone environment without any other major processes running on the same machine. Running other processes on the same machine may lead to conflicts and errors that can interfere with the node's operation. The diagnose and cleanup script will stop and remove only Powerloom related processes running on the machine, if any.
:::

### Running the Node

1. **Setting up Screen**:  
The Screen utility allows you to run processes in the background, enabling you to maintain long-running tasks without keeping a terminal window open. To initiate a new Screen session for managing the Snapshotter Node, follow these steps:

Enter the following command to create a new Screen session named "snapshotter-devnet-node":

   ```bash
   screen -R snapshotter-devnet-node
   ```
   
- This command opens a new Screen session, where you can start the Snapshotter Node.
- Once inside the new Screen session, initiate the Snapshotter Node as required.
   
This approach ensures your node can continue running in the background, even if you disconnect from the terminal session.

:::note
If you have an existing screen session named `snapshotter-devnet-node`, the above command will attach to the existing session.
Otherwise, it will create a new session with that name.
:::

2. **Initialize the Node**: 
Initiate the snapshotter node setup by typing the command in the terminal:

   ```bash
   ./build.sh --devnet
   ```

   :::warning Important
   The `--devnet` flag is required for devnet deployment. This tells the node to connect to the Powerloom devnet chain instead of mainnet.
   :::
   
Follow the prompts to enter the required information.

:::tip
Please do not use your NFT minting wallet to run the snapshotter node. The safest approach is to generate and assign a burner wallet. You can generate a burner wallet through any of the tools listed below:
- [Vanity-ETH](https://vanity-eth.tk/)
- [Powerloom Burner Wallet Generator](https://snapshotter-dashboard.powerloom.network/burner)

Once generated, make sure you assign your burner wallet to your slot at [devnet-mint.powerloom.dev](https://devnet-mint.powerloom.dev/).
:::
   
### Configuring the Node

After initiating the process, the setup steps will differ depending on whether this is the first time the node has been setup or not:

**First Time Setup:**

1. Select the Data Market that you would like to participate in:
   - The node allows you to choose between different data markets available on devnet.

2. Next, you'll be prompted to enter the following values:
   - `$SOURCE_RPC_URL`: Use any Ethereum Mainnet RPC, such as Ankr, Infura, or Alchemy.

   - `$SIGNER_ACCOUNT_ADDRESS`: Utilize a burner wallet for the signer account address. Please DO NOT use your main/primary wallet.

   - `$SIGNER_ACCOUNT_PRIVATE_KEY`: Use the private key from your burner wallet.

   - `$SLOT_ID`: To assign your node to a specific slot, please provide the corresponding Slot ID. You can locate your Slot ID on the devnet dashboard at https://devnet-mint.powerloom.dev.

3. Optionally, you can provide to following values:

   - `$TELEGRAM_CHAT_ID`: Can be provided if you would like to enable Telegram reporting for node issues. See our [Telegram Bot Setup](/build-with-powerloom/snapshotter-node/lite-node-v2/telegram-bot-setup) page for instructions on how to get your Telegram Chat ID.

After entering these details, the node will start running the background processes.

If you want to exit your screen, type the command in the terminal:
   ```bash 
   CTRL + A + D
   ```

**Subsequent Setup:**

1. Select the Data Market that you would like to participate in.

2. You will be prompted to choose whether you wish to change the previously configured values for the above: `SOURCE_RPC_URL`, `SIGNER_ACCOUNT_ADDRESS`, `SIGNER_ACCOUNT_PRIVATE_KEY` and `SLOT_ID`. Choose `y` or `n` depending on whether you wish to change them.

3. If you choose `y` to change the previously configured values, you will be prompted to enter the new values individually for each of the above values.

### Stopping the Node

- To stop the node, you can press `Ctrl+C` in the terminal where the node is running or `docker-compose down` in a new terminal window from the project directory.

This will halt the running node and all associated processes.

By following these steps, you can successfully configure the Snapshotter Node on your Mac system.

If you encounter any issues while operating the node, please refer our [troubleshooting section](./troubleshooting-monitoring.md) for guidance on common debugging techniques.

---

</TabItem>
<TabItem value="non-docker-macos" label="Non-Docker Setup">
## Non-Docker Setup for MacOS

### Hardware Requirements

The Snapshotter Node is designed for minimal hardware demands, allowing it to operate effectively on various setups, including both local systems and cloud-based Virtual Machines.

For users running the node on personal hardware, the minimum specifications are:

- **RAM:** At least 4 GB.
- **CPU Core**:  Minimum of 2 Cores
- **Disk Space:** A minimum of 40 GB.
- **Python:** Ensure Python 3.11 is installed.

If you want to run the Snapshotter Node without Docker, you need to make sure that you have Git, and Python version 3.10 or higher installed on your machine and we recommend to use **python version 3.11.7**. You can find the installation instructions for your operating system on the [official Python website](https://www.python.org/downloads/).


<details>
<summary> Optional: Installing Virtual Environment </summary>
</details>
For simplicity, we recommend using miniconda and setting up an environment with the needed Python version as shown below

<p>

#### Install miniconda for your system:
   ```bash
   https://docs.conda.io/projects/miniconda/en/latest/
   ```
 
#### Verify the installation using the following command in your terminal
   ```bash
   conda --version
   ```

   Add miniconda to your path if the terminal does not identify conda as a valid command:
   ```bash
   export PATH="/Users/yourusername/miniconda3/bin:$PATH"
   ```

   Replace yourusername with your actual username

##### Create and activate a python environment:
   ```bash
   conda create -n myenv python=3.11
   conda activate myenv
   ```
</p>

Once python3 is installed, we can go ahead and run the node:-

1. Clone this repository using the following command in the terminal:
   ```bash
   git clone https://github.com/PowerLoom/snapshotter-lite-v2.git powerloom-devnet
   ```
This will clone the repository into a directory named `powerloom-devnet`.
 
2. Change your working directory to the `powerloom-devnet` directory, open the terminal, and type:

   ```bash
   cd powerloom-devnet
   ```

3. Run `init.sh` command in the terminal to start the snapshotter node:
   ```bash
   ./init.sh --devnet
   ```

   :::warning Important
   The `--devnet` flag is required for devnet deployment. This tells the node to connect to the Powerloom devnet chain instead of mainnet.
   :::

:::tip
Please do not use your NFT minting wallet to run the snapshotter node. The safest approach is to generate and assign a burner wallet. You can generate a burner wallet through any of the tools listed below:
- [Vanity-ETH](https://vanity-eth.tk/)
- [Powerloom Burner Wallet Generator](https://snapshotter-dashboard.powerloom.network/burner)

Once generated, make sure you assign your burner wallet to your slot at [devnet-mint.powerloom.dev](https://devnet-mint.powerloom.dev/).
:::


During the setup, you'll be prompted to enter the following values:

- `$SOURCE_RPC_URL`: Use any Ethereum Mainnet RPC, such as Ankr, Infura, or Alchemy.

- `$SIGNER_ACCOUNT_ADDRESS`: Utilize a burner wallet for the signer account address. Please DO NOT use your main/primary wallet.

- `$SIGNER_ACCOUNT_PRIVATE_KEY`: Use the private key from your burner wallet.

- `$SLOT_ID`: To assign your node to a specific slot, please provide the corresponding Slot ID. You can locate your Slot ID on the devnet dashboard at https://devnet-mint.powerloom.dev.


This is a one-time configuration process that generates a .env file in the project's root directory.

### Stopping the Snapshotter Node

To stop the node, use the command in the terminal:
```bash
pkill -f snapshotter
```

This will halt the running node and all associated processes.

By following these steps, you can successfully configure the Snapshotter Node on your Mac system.

If you encounter any issues while operating the node, please refer to our [troubleshooting section](./troubleshooting-monitoring.md) for guidance on common debugging techniques.

---

</TabItem>
</Tabs>

</TabItem>

<TabItem value="win" label="Windows">
  The Snapshotter Node can operate on Windows systems when running in a Docker container. To set up the Snapshotter Node on Windows, follow the Docker installation and configuration instructions provided in this section.
<Tabs groupId="setup-type" queryString="setup-type">
<TabItem value="docker-setup-windows" label="Docker Setup">

## Windows Docker Setup {#windows-setup}

### Hardware Requirements

The Snapshotter Node is designed for minimal hardware demands, allowing it to operate effectively on various setups, including both local systems and cloud-based Virtual Machines.

For users running the node on a personal Windows system, the minimum specifications are:

- **RAM:** At least 4 GB.
- **CPU Core**:  Minimum of 2 Cores
- **Disk Space:** A minimum of 40 GB.

Setting up the snapshotter node on Windows requires a few additional steps. We suggest using Docker for its ease and speed of setup. To begin with Docker, you must have the Windows Subsystem for Linux (WSL) installed. Please follow the guide provided below for detailed instructions.

### Initial Setup

- **Open PowerShell:**
   - Start by opening PowerShell on your Windows machine. Search for `"PowerShell"` in the start menu and launch it.

- **Install Windows Subsystem for Linux (WSL):**
   - In the PowerShell window, enter the following command:
     ```bash
     wsl --install
     ```
   - This command installs the Windows Subsystem for Linux, necessary for running Docker.

- **Download and Install Docker:**
   - Download Docker from the [official website](https://docs.docker.com/get-docker/).
   - Follow the installation instructions provided on the website.

- **Restart Your Computer:**
   - After installing Docker, restart your computer to apply all changes.

- **Open Docker:**
   - Post-restart, open Docker. This should automatically launch a Powershell console which will have WSL installed.

- **Set Up Linux User Account:**
   - In the newly opened powershell console, set up a new user account by entering a username and password.

#### Granting Docker Permissions

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

#### Cloning the Repository and Setting Up the Node

1. **Clone the Repository:**
   - Use the following command in WSL terminal to clone the Snapshotter repository:

      ```bash
      git clone https://github.com/PowerLoom/snapshotter-lite-v2.git powerloom-devnet
      ```

2. **Navigate to the Repository Directory:**
    - Change to the cloned repository's directory:

      ```bash
      cd powerloom-devnet
      ```

3. **Cleanup the Environment**:
   - Run the diagnose and cleanup script to check for any previous instances of the lite node, local collector, stale images and networks.

      ```bash
      ./diagnose.sh
      ```

:::tip
It is recommended to run the node in a standalone environment without any other major processes running on the same machine. Running other processes on the same machine may lead to conflicts and errors that can interfere with the node's operation. The diagnose and cleanup script will stop and remove only Powerloom related processes running on the machine, if any.
:::

### Running the Node

1. **Setting up Screen**:  
The Screen utility allows you to run processes in the background, enabling you to maintain long-running tasks without keeping a WSL terminal window open. To initiate a new Screen session for managing the Snapshotter Node, follow these steps:

Enter the following command to create a new Screen session named "snapshotter-devnet-node":

   ```bash
   screen -R snapshotter-devnet-node
   ```
   
- This command opens a new Screen session, where you can start the Snapshotter Node.
- Once inside the new Screen session, initiate the Snapshotter Node as required.
   
This approach ensures your node can continue running in the background, even if you disconnect from the terminal session.

:::note
If you have an existing screen session named `snapshotter-devnet-node`, the above command will attach to the existing session.
Otherwise, it will create a new session with that name.
:::

2. **Initialize the Node**: 
Initiate the snapshotter node setup by typing the command in the terminal:

   ```bash
   ./build.sh --devnet
   ```

   :::warning Important
   The `--devnet` flag is required for devnet deployment. This tells the node to connect to the Powerloom devnet chain instead of mainnet.
   :::
   
Follow the prompts to enter the required information.

:::tip
Please do not use your NFT minting wallet to run the snapshotter node. The safest approach is to generate and assign a burner wallet. You can generate a burner wallet through any of the tools listed below:
- [Vanity-ETH](https://vanity-eth.tk/)
- [Powerloom Burner Wallet Generator](https://snapshotter-dashboard.powerloom.network/burner)

Once generated, make sure you assign your burner wallet to your slot at [devnet-mint.powerloom.dev](https://devnet-mint.powerloom.dev/).
:::
   
### Configuring the Node

After initiating the process, the setup steps will differ depending on whether this is the first time the node has been setup or not:

**First Time Setup:**

1. Select the Data Market that you would like to participate in:
   - The node allows you to choose between different data markets available on devnet.

2. Next, you'll be prompted to enter the following values:
   - `$SOURCE_RPC_URL`: Use any Ethereum Mainnet RPC, such as Ankr, Infura, or Alchemy.

   - `$SIGNER_ACCOUNT_ADDRESS`: Utilize a burner wallet for the signer account address. Please DO NOT use your main/primary wallet.

   - `$SIGNER_ACCOUNT_PRIVATE_KEY`: Use the private key from your burner wallet.

   - `$SLOT_ID`: To assign your node to a specific slot, please provide the corresponding Slot ID. You can locate your Slot ID on the devnet dashboard at https://devnet-mint.powerloom.dev.

3. Optionally, you can provide to following values:

   - `$TELEGRAM_CHAT_ID`: Can be provided if you would like to enable Telegram reporting for node issues. See our [Telegram Bot Setup](/build-with-powerloom/snapshotter-node/lite-node-v2/telegram-bot-setup) page for instructions on how to get your Telegram Chat ID.

After entering these details, the node will start running the background processes.

If you want to exit your screen, type the command in the terminal:
   ```bash 
   CTRL + A + D
   ```

**Subsequent Setup:**

1. Select the Data Market that you would like to participate in.

2. You will be prompted to choose whether you wish to change the previously configured values for the above: `SOURCE_RPC_URL`, `SIGNER_ACCOUNT_ADDRESS`, `SIGNER_ACCOUNT_PRIVATE_KEY` and `SLOT_ID`. Choose `y` or `n` depending on whether you wish to change them.

3. If you choose `y` to change the previously configured values, you will be prompted to enter the new values individually for each of the above values.

### Stopping the Node

- To stop the node, you can press `Ctrl+C` in the terminal where the node is running or `docker-compose down` in a new terminal window from the project directory.

This will halt the running node and all associated processes.

By following these steps, you can successfully configure the Snapshotter Node on your Windows system.

If you encounter any issues while operating the node, please refer our [troubleshooting section](./troubleshooting-monitoring.md) for guidance on common debugging techniques.

---

</TabItem>
    <TabItem value="non-docker-win" label="Non-Docker Setup">
   Currently, there are no specific instructions for running the Snapshotter Node without Docker on Windows. Users are encouraged to use the Docker setup for Windows as detailed in the Docker Setup section above.
    </TabItem>
    </Tabs>
  </TabItem>
</Tabs>

Everytime you start or restart the node, it goes through two stages

### Simulation mode submissions

This does not count towards your snapshot quota. This is to test whether your node can establish connections to the sequencer over libp2p protocol streams that ultimately enforce the Powerloom Protocol for data markets.

You will see log messages similar to the one shown below that will ensure that your node has the capability of submitting snapshots to the sequencer.

![Simulation mode submissions](/images/SimulationSubmission.png)

:::note
Learn more:
* [Sequencer component](/Protocol/Protocol_v2/sequencer.md)
:::

:::info
Read more about monitoring and verifying the simulation mode submissions on the [`Monitoring and Troubleshooting`](./troubleshooting-monitoring.md) page.
:::

### Regular snapshot submissions

Once you can verify the simulation mode submissions, you will have log messagse similar to the one shown below that will ensure that your node is capturing epoch releases and submitting snapshots to the sequencer.

:::note
It usually takes 2 - 5 minutes between the simulation mode submissions and a subsequence epoch release to be caught to trigger the regular snapshot submissions.
:::

![Sample node logs](/images/RegularSubmission.png)

:::info
For further details on using the snapshotter dashboard to monitor the running status of your node, check the [`Monitoring Node Activity with the Snapshotter Dashboard`](./troubleshooting-monitoring.md#11-monitoring-node-activity-with-the-snapshotter-dashboard) section.
:::


---

## Alternative Setup: Snapshotter CLI

For operators who prefer a streamlined setup process or need to manage multiple nodes, we offer the **Powerloom Snapshotter CLI**. This tool provides:

- **Interactive configuration** with guided prompts
- **Simplified deployment** process
- **Unified management** of multiple instances
- **Built-in diagnostics** and troubleshooting

:::tip When to Use the CLI
The CLI is particularly useful if you:
- Plan to run multiple snapshotter nodes
- Want a simpler configuration process
- Need to manage nodes across different environments (devnet/mainnet)
:::

Learn more: [Snapshotter CLI Documentation](/build-with-powerloom/snapshotter-node/lite-node-v2/cli)

---

## Troubleshooting

If you encounter any issues, please refer to our [Troubleshooting section](./troubleshooting-monitoring.md) for more information.