---
sidebar_position: 0
title: Getting Started with Lite Node
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Setting Up and Running the Snapshotter Lite Node

:::tip Important Note!

📢 Please note that this setup is a simulation designed to let you experience and test the functionality of the snapshotter Node. It's important to note that the simulation setup will not yield any rewards.

However, once the testnet becomes operational on 12th February, 2024, you will have the opportunity to run the node and earn rewards.

:::

This section provides a comprehensive guide to setting up and running the Snapshotter Lite Node, including prerequisites and operational instructions.

## Requirements

### Hardware Requirements

The Snapshotter Lite Node is designed for minimal hardware demands, allowing it to operate effectively on various setups, including both local systems and cloud-based Virtual Machines.

The node can be run either on personal systems, or on a dedicated VPS using a cloud provider (AWS, GCP, DigitalOcean, etc.):

- **RAM:** At least 4 GB.
- **CPU Core**: Minimum of 4 Cores.
- **Disk Space:** A minimum of 40 GB.
- **Operating System:** Windows, macOS, or Linux (Ubuntu 22.04 recommended for Linux users).

Snapshotter Lite is optimized for low resource usage, so these minimum requirements are quite manageable. Whether you're using a basic local computer or a modest VPS instance, setting up should be straightforward.

### Software Requirements

#### For The Docker Setup
- git
- docker
- docker-compose

#### For The Non-Docker Setup
- git
- python 3.10 or higher


---

## Instructions

### Docker Setup
#### Prerequisites

<Tabs groupId="platform">
  <TabItem value="linux-ubuntu" label="Linux (Ubuntu 22.04)" default>

**Git:**
1. Open a terminal.
2. Update your package lists: `sudo apt-get update`
3. Install Git: `sudo apt-get install git`

**Docker and Docker Compose:**
1. Remove any old version of docker: 
```shell
for pkg in docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc; do sudo apt-get remove $pkg; done
```
2. Update your package lists: 
```shell
sudo apt-get update
```
3. Install prerequisite packages: 
```shell
sudo apt-get install apt-transport-https ca-certificates curl software-properties-common
```
4. Setup up Docker's `apt` repository:
```shell
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
7. Install Docker CE and Docker Compose: 
```shell
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

You are now ready to run the node.

  </TabItem>
  <TabItem value="windows" label="Windows">

**Git:**
1. Download the Git installer from [Git for Windows](https://gitforwindows.org/).
2. Run the downloaded installer and follow the installation wizard.

**Docker and Docker Compose:**
Docker Desktop for Windows includes Docker Compose, so you only need to install Docker Desktop.
1. Download Docker Desktop for Windows from the [official Docker website](https://docs.docker.com/desktop/install/windows-install/).
2. Run the installer and follow the installation instructions.
3. Docker Desktop might require enabling the WSL 2 feature and installing a Linux kernel update. Follow the prompts provided by the Docker Desktop installer.

You are now ready to run the node.

  </TabItem>
</Tabs>


#### Installation

<Tabs groupId="platform">
  <TabItem value="linux-ubuntu" label="Linux (Ubuntu 22.04)" default>


- Clone this repository using the following command in the terminal:

```bash
git clone -b simulation_mode https://github.com/PowerLoom/snapshotter-lite powerloom
```

- Change your working directory to the powerloom directory:

```bash
cd powerloom
```

- Run `build.sh` in the terminal to start the snapshotter lite node:

```bash
./build.sh
```

- During the setup, you'll be prompted to enter the following values:
  - `$SOURCE_RPC_URL`: Use any Ethereum Mainnet RPC, such as Ankr, Infura, or Alchemy.
  - `SIGNER_ACCOUNT_ADDRESS`: Utilize a burner wallet for the signer account address. Please DO NOT use your main/primary wallet. 
  - `SIGNER_ACCOUNT_PRIVATE_KEY`: Use the private key from your burner wallet.

:::tip
You can create a burner wallet by simply creating a new wallet on Metamask.
:::

- This should start your snapshotter node and you should see something like this in your terminal logs

```bash
snapshotter-lite_1  | 1|snapshotter-lite  | February 5, 2024 > 15:10:17 | INFO | Current block: 2208370| {'module': 'EventDetector'}
snapshotter-lite_1  | 1|snapshotter-lite  | February 5, 2024 > 15:10:18 | DEBUG | Set source chain block time to 12.0| {'module': 'ProcessDistributor'}
snapshotter-lite_1  | 1|snapshotter-lite  | February 5, 2024 > 15:10:20 | INFO | Snapshotter enabled: True| {'module': 'ProcessDistributor'}
snapshotter-lite_1  | 1|snapshotter-lite  | February 5, 2024 > 15:10:20 | INFO | Snapshotter slot is set to 1| {'module': 'ProcessDistributor'}
snapshotter-lite_1  | 1|snapshotter-lite  | February 5, 2024 > 15:10:20 | INFO | Snapshotter enabled: True| {'module': 'ProcessDistributor'}
snapshotter-lite_1  | 1|snapshotter-lite  | February 5, 2024 > 15:10:21 | INFO | Snapshotter active: True| {'module': 'ProcessDistributor'}
snapshotter-lite_1  | 0|core-api          | February 5, 2024 > 15:10:22 | INFO | 127.0.0.1:59776 - "GET /health HTTP/1.1" 200 | {} 
```

- To stop the node, you can press `Ctrl+C` in the terminal where the node is running or `docker-compose down` in a new terminal window from the project directory.

:::note
It is recommended to run build.sh in a screen or tmux session so that the process continues running even after you close the terminal.
:::

  </TabItem>
  <TabItem value="windows" label="Windows">
  

Setting up the snapshotter node on Windows requires a few additional steps. We suggest using Docker for its ease and speed of setup. To begin with Docker, you must have the Windows Subsystem for Linux (WSL) installed. Please follow the guide provided below for detailed instructions.

##### Initial Setup

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
   - Post-restart, open Docker. This should automatically launch a Linux console.

- **Set Up Linux User Account:**
   - In the newly opened Linux console, set up a new user account by entering a username and password.

##### Granting Docker Permissions

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

##### Cloning the Repository and Running the Build Script

- **Clone the Repository:**
   - Use the following command in WSL terminal to clone the repository:
     ```bash
     git clone -b simulation_mode https://github.com/PowerLoom/snapshotter-lite powerloom
     ```

- **Navigate to the Repository Directory:**
    - Change to the cloned repository's directory:
      ```bash
      cd powerloom
      ```

- **Run the Build Script:**
    - Execute the build script with:
      ```bash
      ./build.sh
      ```
    - During the setup, you'll be prompted to enter the following values:
        - `$SOURCE_RPC_URL`: Use any Ethereum Mainnet RPC, such as Ankr, Infura, or Alchemy.
        - `SIGNER_ACCOUNT_ADDRESS`: Utilize a burner wallet for the signer account address. Please DO NOT use your main/primary wallet. 
        - `SIGNER_ACCOUNT_PRIVATE_KEY`: Use the private key from your burner wallet.

         :::tip
         You can create a burner wallet by simply creating a new wallet on Metamask.
         :::

:::info
This is a one-time configuration process that generates a .env file in the project's root directory.
By following these steps, you can successfully set up snapshotter lite node on your Windows system. 
:::

  </TabItem>
</Tabs>

### Non-Docker Setup

<Tabs groupId="platform">
  <TabItem value="linux-ubuntu" label="Linux (Ubuntu 22.04)" default>
  
If you want to run the Snapshotter Lite Node without Docker, you need to make sure that you have Git, and Python version 3.10 or higher installed on your machine. We recommend using <b>python version 3.11.7</b>. You can find the installation instructions for your operating system on the <a href="https://www.python.org/downloads/" target="_blank">official Python website</a>.

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

Once python3 is installed, follow these steps:
1. Clone this repository using the following command in the terminal:
   ```bash
   git clone -b simulation_mode https://github.com/PowerLoom/snapshotter-lite powerloom
   ```
    This will clone the repository into a directory named `powerloom`.
2. Change your working directory to the `powerloom` directory, open the terminal and type:

   ```bash
   cd powerloom
   ```
3. Run `init.sh` command in the terminal to start the snapshotter lite node:
   ```bash
   ./init.sh
   ```
4. During the setup, you'll be prompted to enter the following values:
  - `$SOURCE_RPC_URL`: Use any Ethereum Mainnet RPC, such as Ankr, Infura, or Alchemy.
  - `SIGNER_ACCOUNT_ADDRESS`: Utilize a burner wallet for the signer account address.
  - `SIGNER_ACCOUNT_PRIVATE_KEY`: Use the private key from your burner wallet.

This is a one-time configuration process that generates a .env file in the project's root directory.

The node setup will complete in approximately 2-3 minutes, after which the snapshotting process begins automatically.
  </TabItem>
  <TabItem value="windows" label="Windows">

Currently, there are no specific instructions for running the Snapshotter Lite Node without Docker on Windows. Users are encouraged to use the Docker setup for Windows as detailed in the Docker Setup section above.
  </TabItem>
</Tabs>

---

## Troubleshooting

If you encounter any issues, please refer to our [Troubleshooting section](./monitoring.md) for more information. 