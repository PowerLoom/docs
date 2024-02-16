---
sidebar_position: 0
title: Getting Started with Lite Node
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Setting Up and Running the Snapshotter Lite Node

This guide provides instructions for installing and running the Snapshotter Lite Node, covering prerequisites and operational procedures.

The Snapshotter Lite Node can be set up using either the Docker image or by running natively on the local machine. However, using the Docker image is the recommended approach, as it provides the simplest and most reliable method for deployment.

:::tip Node Mint
Node Mint is now live at: https://mint.powerloom.network. For detailed information on our rewards structure, frequently asked questions, and other aspects related to node minting, please visit: https://powerloom.network/mint-docs/.

:::

Follow the step-by-step instructions in the relevant guide to set up your Snapshotter Lite Node. If you need further assistance, refer to our troubleshooting documentation or reach out to us on [discord](https://discord.com/invite/powerloom) for support. 

:::info Important note

1. It is recommended that the node operates continuously, 24/7.
2. If you possess multiple slots, you must set up separate nodes for each. You have to use the same burner wallet, you must alter the `SLOT_ID` in your configuration for each node.

:::

We have streamlined the setup process based on your operating system. To begin, please choose your operating system from the tabs provided below.

- For those looking to set up the node on a local Windows or Mac machine, please select the "Windows / MacOS" tab.
- If you are configuring your node on a Linux VPS, select the "Linux" tab and follow the provided instructions to get started.

---

<!-- Grouping by OS and Setup type -->

<Tabs groupId="operating-systems" className="unique-tabs" queryString="current-os">
  <TabItem value="VPS-setup" label="VPS Setup (Linux)">
  <Tabs groupId="setup-type" queryString="setup-type">
  <TabItem value="docker-setup-linux" label="Docker Setup">
  <h2>Deploying a Snapshotter Lite Node on a Virtual Private Server (VPS) </h2>

Deploying a Snapshotter Lite Node on a Virtual Private Server (VPS) ensures seamless 24/7 operation without utilizing your local resources.

This section provides instructions for setting up your Snapshotter Lite Node on an Ubuntu VPS.

While you're free to choose any provider, this guide specifically utilizes DigitalOcean for demonstration purposes.

<h3>Recommended VPS Providers: </h3>

- DigitalOcean
- Hostinger 


<h3> Hardware Requirements </h3>

The Snapshotter Lite Node is designed for minimal hardware demands, allowing it to operate effectively on various setups, including both local systems and cloud-based Virtual Machines.

For users running the node on Virtual Private Servers (VPS), the minimum specifications are:

- **RAM:** At least 4 GB.
- **CPU Core**:  Minimum of 2 Cores
- **Disk Space:** A minimum of 40 GB.
- **Python:** Ensure Python 3.11 is installed.

<h3>Step 1: Creating Your VPS </h3>

1. **Sign Up/Login**: Start creating an account on your VPS provider or log in if you already have one.

2. **Choose an Image**: Select Ubuntu as your operating system. We recommend using the latest stable version of Ubuntu for optimal performance.

3. **Select a Plan**: Choose a plan that meets the minimum hardware requirements for the Snapshotter Lite Node. A plan with at least 4 GB RAM and 40 GB of disk space is advisable. 

4. **Authentication**: Set up SSH keys for secure access to your VPS.

5. **Finalize and Create**: Choose any additional options, like backups if required. Your VPS will be set up within a few minutes.

<h3>Step 2: Accessing Your VPS </h3>

- **SSH into Your VPS**: Use the following command from your terminal/command prompt, replacing `your_vps_ip` with the IP address of your VPS.  

```bash
    ssh root@your_vps_ip
```

- If you set up SSH keys, you should be logged in without needing a password. Otherwise, you can also set your password for the VPS.

<h3>Step 3: Setting Up the Environment </h3>

1. **Update and Upgrade Your VPS**:

```bash
    sudo apt-get update && sudo apt-get upgrade -y
```

2. **Install Python**:  
Ensure Python 3.11 is installed on your VPS. You can install Python by executing:

```bash 
    sudo apt-get install python3-pip -y
```

1. **Install Git**:  
Git is necessary for cloning the Snapshotter Lite repository. Install it using:

```bash
    sudo apt-get install git -y
```

4. **Install Docker and Docker Compose:**   
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
    
Once the Docker repository is added successfully, let’s install Docker and necessary components by using the below command:

```bash
    sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

<h3>Step 4: Cloning the Repository and Setting Up the Node</h3>

1. **Clone the Snapshotter Lite Repository**:  
Navigate to the directory where you want to install the node and clone the repository:

```bash
    git clone https://github.com/PowerLoom/snapshotter-lite powerloom-testnet
```

2. **Navigate to the Directory**:  
Change to the directory of the cloned repository:

```bash
    cd powerloom-testnet
```

<h3>Step 5: Running the Node </h3>

1. Setting up Screen:   
The Screen utility allows you to run processes in the background, enabling you to maintain long-running tasks without keeping a terminal window open. To initiate a new Screen session for managing the Snapshotter Lite Node, follow these steps:

Enter the following command to create a new Screen session named "powerloom":

```bash
    screen -S powerloom
```
    
- This command opens a new Screen session, where you can start the Snapshotter Lite Node.
- Once inside the new Screen session, initiate the Snapshotter Lite Node as required.
    
This approach ensures your node can continue running in the background, even if you disconnect from the terminal session.

2. **Initialize the Node**:  
Initiate the snapshotter lite node setup by typing the command in the terminal:

```bash
    ./build.sh
```
    
Follow the prompts to enter the required information.

:::tip
 Please do not use your main wallet to run the snapshotter lite node. It is advised to create a burner wallet by using any of these tools:

  - [Vanity-ETH](https://vanity-eth.tk/)
  - [Powerloom Burner Wallet Generator](https://snapshotter-dashboard.powerloom.network/burner)

Once you generate your wallet address, make sure you assign your burner wallet on your [snapshotter dashboard](#).
:::
    
**Environment Setup**:  
After initiating the process, the terminal will prompt you to enter the following information:

- During the setup, you'll be prompted to enter the following values:
  - `$SOURCE_RPC_URL`: Use any Ethereum Mainnet RPC, such as Ankr, Infura, or Alchemy.

  - `$SIGNER_ACCOUNT_ADDRESS`: Utilize a burner wallet for the signer account address. Please DO NOT use your main/primary wallet. 

  - `$SIGNER_ACCOUNT_PRIVATE_KEY`: Use the private key from your burner wallet.

  - `$SLOT_ID`: To assign your node to a specific slot, please provide the corresponding Slot ID or NFT ID. You can locate your NFT ID within your transaction details on PolygonScan.

After entering these details, the node will start running the background processes.

If you want to exit your screen, type the command in the terminal:


```bash  
CTRL+A+D
```

Ensure your node is running correctly, and check the logs for any errors or confirmations of successful operations. 


If you have configured the node for the first time, you should have a log message similar to the one shown below.
![Start node logs](/images/node-start-status.png)

To confirm if your node is running correctly, you should have similar logs in your terminal:
![Sample node logs](/images/node-status-new.png)

<h3>Step 6: Maintaining Your Node </h3>

- **Regular Updates**: Keep your system and Snapshotter Lite Node updated by regularly pulling the latest changes from the repository and applying system updates.

- **Monitoring**: Regularly check the status of your node and the VPS to ensure everything is running smoothly.


</TabItem>
</Tabs>

</TabItem>

<TabItem value="mac/linux" label="macOS/Linux">
<Tabs groupId="setup-type" queryString="setup-type">
   <TabItem value="docker-setup-macos" label="Docker Setup">

<h2> Docker Setup for MacOS </h2>

<h3> Hardware Requirements </h3>

The Snapshotter Lite Node is designed for minimal hardware demands, allowing it to operate effectively on various setups, including both local systems and cloud-based Virtual Machines.

<h3> MacOS System Requirements </h3>

For users running the node on personal hardware, the minimum specifications are:

- **RAM:** At least 4 GB.
- **CPU Core**:  Minimum of 2 Cores
- **Disk Space:** A minimum of 40 GB.
- **Python:** Ensure Python 3.11 is installed.


<h3> Pre-requisitie tools </h3>

- Install Docker on your machine. You can find the installation instructions for your operating system on the [official Docker website.](https://docs.docker.com/get-docker/)

- Install git if your system doesn't have git installed. To install git in MacOS, please follow this guide: https://www.atlassian.com/git/tutorials/install-git 


<h3> Installation </h3>

- Clone the snapshotter lite repository using the following command in the terminal:

```bash 
git clone https://github.com/PowerLoom/snapshotter-lite powerloom-testnet
```

This will clone the repository into a directory named `powerloom-testnet`.

- Change your working directory to the powerloom directory:

```bash
cd powerloom-testnet
```

- Run `build.sh` in the terminal to start the snapshotter lite node:

```bash
./build.sh
```

<details><summary>Optional: Only for Developers</summary>
<p>

If you're a developer and want to play around with the code, instead of running build.sh, you can run the following command to start the snapshotter lite node:

```bash
./build-dev.sh
```

</p>
</details>

:::tip
 Please do not use your main wallet to run the snapshotter lite node. It is advised to create a burner wallet by using any of these tools:

  - [Vanity-ETH](https://vanity-eth.tk/)
  - [Powerloom Burner Wallet Generator](https://snapshotter-dashboard.powerloom.network/burner)

Once you generate your wallet address, make sure you assign your burner wallet on your [snapshotter dashboard](#).
:::

- During the setup, you'll be prompted to enter the following values:
  - `$SOURCE_RPC_URL`: Use any Ethereum Mainnet RPC, such as Ankr, Infura, or Alchemy.

  - `$SIGNER_ACCOUNT_ADDRESS`: Utilize a burner wallet for the signer account address. Please DO NOT use your main/primary wallet. 

  - `$SIGNER_ACCOUNT_PRIVATE_KEY`: Use the private key from your burner wallet.

  - `$SLOT_ID`: To assign your node to a specific slot, please provide the corresponding Slot ID or NFT ID. You can locate your NFT ID within your transaction details on PolygonScan.


This is a one-time configuration process that generates a .env file in the project's root directory.

If you have configured the node for the first time, you should have a log message similar to the one shown below.
![Start node logs](/images/node-start-status.png)

To confirm if your node is running correctly, you should have similar logs in your terminal:
![Sample node logs](/images/node-status-new.png)

- To stop the node, you can press` Ctrl+C` in the terminal where the node is running or `docker-compose down` in a new terminal window from the project directory.

This will halt the running node and all associated processes. 

By following these steps, you can successfully configure the Snapshotter Lite Node on your Mac system.

If you encounter any issues while operating the node, please refer our [troubleshooting section](./monitoring.md) for guidance on common debugging techniques.

---

</TabItem>
<TabItem value="non-docker-macos" label="Non-Docker Setup">
<h2>Non-Docker Setup for MacOS </h2>

<h3> Hardware Requirements </h3>

The Snapshotter Lite Node is designed for minimal hardware demands, allowing it to operate effectively on various setups, including both local systems and cloud-based Virtual Machines.

For users running the node on personal hardware, the minimum specifications are:

- **RAM:** At least 4 GB.
- **CPU Core**:  Minimum of 2 Cores
- **Disk Space:** A minimum of 40 GB.
- **Python:** Ensure Python 3.11 is installed.

If you want to run the Snapshotter Lite Node without Docker, you need to make sure that you have Git, and Python version 3.10 or higher installed on your machine and we recommend to use **python version 3.11.7**. You can find the installation instructions for your operating system on the [official Python website](https://www.python.org/downloads/).


<details><summary> Optional: Installing Virtual Environment </summary>
For simplicity, we recommend using miniconda and setting up an environment with the needed python version as shown below
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
</details>

Once python3 is installed, we can go ahead and run the lite node:-

1. Clone this repository using the following command in the terminal:
```bash
   git clone https://github.com/PowerLoom/snapshotter-lite powerloom-testnet
```
This will clone the repository into a directory named `powerloom-testnet`.
  
2. Change your working directory to the `powerloom-testnet` directory, open the terminal and type:

```bash
   cd powerloom-testnet
```

3. Run `init.sh` command in the terminal to start the snapshotter lite node:
```bash
   ./init.sh
```
:::tip
 Please do not use your main wallet to run the snapshotter lite node. It is advised to create a burner wallet by using any of these tools:

  - [Vanity-ETH](https://vanity-eth.tk/)
  - [Powerloom Burner Wallet Generator](https://snapshotter-dashboard.powerloom.network/burner)

Once you generate your wallet address, make sure you assign your burner wallet on your [snapshotter dashboard](#).
:::


4. During the setup, you'll be prompted to enter the following values:

  - `$SOURCE_RPC_URL`: Use any Ethereum Mainnet RPC, such as Ankr, Infura, or Alchemy.

  - `$SIGNER_ACCOUNT_ADDRESS`: Utilize a burner wallet for the signer account address. Please DO NOT use your main/primary wallet. 

  - `$SIGNER_ACCOUNT_PRIVATE_KEY`: Use the private key from your burner wallet.

  - `$SLOT_ID`: To assign your node to a specific slot, please provide the corresponding Slot ID or NFT ID. You can locate your NFT ID within your transaction details on PolygonScan.


This is a one-time configuration process that generates a .env file in the project's root directory.

1. The node setup will complete in approximately 2-3 minutes, after which the snapshotting process begins automatically.

2. If you have configured the node for the first time, you should have a log message similar to the one shown below.
![Start node logs](/images/node-start-status.png)

 To confirm the health of your node you can check your terminal logs as illustrated in the provided screenshot.:
![Sample node logs](/images/node-status-new.png)

<h3> Stopping the Snapshotter Lite Node </h3>

To stop the node, use the command in the terminal:
```bash
pkill -f snapshotter
```

This will halt the running node and all associated processes.

By following these steps, you can successfully configure the Snapshotter Lite Node on your Mac system.

If you encounter any issues while operating the node, please refer our [troubleshooting section](./monitoring.md) for guidance on common debugging techniques.

---

</TabItem>
</Tabs>

</TabItem>

<TabItem value="win" label="Windows">
  The Snapshotter Lite node can operate on Windows systems when running in a Docker container. To set up the Snapshotter Lite node on Windows, follow the Docker installation and configuration instructions provided in this section.
<Tabs groupId="setup-type" queryString="setup-type">
<TabItem value="docker-setup-windows" label="Docker Setup">

<h2 id="windows-setup"> Windows Docker Setup </h2>

<h3> Hardware Requirements </h3>

The Snapshotter Lite Node is designed for minimal hardware demands, allowing it to operate effectively on various setups, including both local systems and cloud-based Virtual Machines.

For users running the node on personal windows system, the minimum specifications are:

- **RAM:** At least 4 GB.
- **CPU Core**:  Minimum of 2 Cores
- **Disk Space:** A minimum of 40 GB.
- **Python:** Ensure Python 3.11 is installed.

Setting up the snapshotter node on Windows requires a few additional steps. We suggest using Docker for its ease and speed of setup. To begin with Docker, you must have the Windows Subsystem for Linux (WSL) installed. Please follow the guide provided below for detailed instructions.

<h3> Initial Setup </h3>

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

<h4> Cloning the Repository and Running the Build Script </h4>

- **Clone the Repository:**
   - Use the following command in WSL terminal to clone the Snapshotter lite node repository:

   ```bash
     git clone https://github.com/PowerLoom/snapshotter-lite powerloom-testnet
   ```

- **Navigate to the Repository Directory:**
    - Change to the cloned repository's directory:

      ```bash
      cd powerloom-testnet
      ```

- **Run the Build Script:**

:::tip
  Please do not use your main wallet to run the snapshotter lite node. It is advised to create a burner wallet by using any of these tools: 
  - [Vanity-ETH](https://vanity-eth.tk/)
  - [Powerloom Burner Wallet Generator](https://snapshotter-dashboard.powerloom.network/burner)

Once you generate your wallet address, make sure you assign your burner wallet on your [snapshotter dashboard](#).

:::

 - Execute the build script with:
   ```bash
      ./build.sh
   ```
    - During the setup, you'll be prompted to enter the following values:
        - `$SOURCE_RPC_URL`: Use any Ethereum Mainnet RPC, such as Ankr, Infura, or Alchemy.

        - `$SIGNER_ACCOUNT_ADDRESS`: Utilize a burner wallet for the signer account address. Please DO NOT use your main/primary wallet. 

        - `$SIGNER_ACCOUNT_PRIVATE_KEY`: Use the private key from your burner wallet.

        - `$SLOT_ID`: To assign your node to a specific slot, please provide the corresponding Slot ID or NFT ID. You can locate your NFT ID within your transaction details on PolygonScan.


This is a one-time configuration process that generates a .env file in the project's root directory.

After entering the required information, the setup will begin to construct the Docker container, which should be ready within a few minutes. 

If you have configured the node for the first time, you should have a log message similar to the one shown below.
![Start node logs](/images/node-start-status.png)

To confirm if your node is running correctly, you should have similar logs in your terminal:
![Sample node logs](/images/node-status-new.png)

By adhering to these instructions, you can successfully configure the Snapshotter Lite Node on your Windows system.

If you encounter any issues while operating the node, please refer our [troubleshooting section](./monitoring.md) for guidance on common debugging techniques.

---

</TabItem>
    <TabItem value="non-docker-win" label="Non-Docker Setup">
   Currently, there are no specific instructions for running the Snapshotter Lite Node without Docker on Windows. Users are encouraged to use the Docker setup for Windows as detailed in the Docker Setup section above.
    </TabItem>
    </Tabs>
  </TabItem>
</Tabs>

## Troubleshooting

If you encounter any issues, please refer to our [Troubleshooting section](./monitoring.md) for more information. 

