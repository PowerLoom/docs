---
sidebar_position: 0
title: Setting Up
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Setting Up and Running the Snapshotter Lite Node V2

This guide provides instructions for installing and running the Snapshotter Lite Node V2, covering prerequisites and operational procedures.

The Snapshotter Lite Node V2 can be set up using either the Docker image or by running natively on the local machine. However, using the Docker image is the recommended approach, as it provides the simplest and most reliable method for deployment.

:::tip Node Mint
Node Mint is now live at: https://mint.powerloom.network/. For detailed information on our rewards structure, frequently asked questions, and other aspects related to node minting, please visit: https://powerloom.network/mint-docs/.

:::

Follow the step-by-step instructions in the relevant guide to set up your Snapshotter Lite Node V2. If you need further assistance, refer to our troubleshooting documentation or reach out to us on [discord](https://discord.com/invite/powerloom) for support. 

:::info Important note

1. It is recommended that the node operates continuously, 24/7.
2. If you possess multiple slots, refer to the section on [setting up multiple nodes](#setting-up-multiple-nodes-on-a-vps) for further details. 

:::

We have streamlined the setup process based on your operating system. To begin, please choose your operating system from the tabs provided below.

- For those looking to set up the node on a local Windows or Mac machine, please select the "Windows / MacOS" tab.
- If you are configuring your node on a Linux VPS, select the "Linux" tab and follow the provided instructions to get started.

---

<!-- Grouping by OS and Setup type -->

## Setting up the Snapshotter Lite Node V2

<Tabs groupId="operating-systems" className="unique-tabs" queryString="current-os">
  <TabItem value="VPS-setup" label="VPS Setup (Linux)">
  <Tabs groupId="setup-type" queryString="setup-type">
  <TabItem value="docker-setup-linux" label="Docker Setup">
  <h2>Deploying a Snapshotter Lite Node V2 on a Virtual Private Server (VPS) </h2>

Deploying a Snapshotter Lite Node V2 on a Virtual Private Server (VPS) ensures seamless 24/7 operation without utilizing your local resources.

This section provides instructions for setting up your Snapshotter Lite Node V2 on an Ubuntu VPS.

While you're free to choose any provider, this guide specifically utilizes DigitalOcean for demonstration purposes.

<h3>Recommended VPS Providers: </h3>

- DigitalOcean
- Hostinger 


<h3> Hardware Requirements </h3>

The Snapshotter Lite Node V2 is designed for minimal hardware demands, allowing it to operate effectively on various setups, including both local systems and cloud-based Virtual Machines.

For users running the node on Virtual Private Servers (VPS), the minimum specifications are:

- **RAM:** At least 4 GB.
- **CPU Core**:  Minimum of 2 Cores
- **Disk Space:** A minimum of 40 GB.


<h3>Step 1: Creating Your VPS </h3>

1. **Sign Up/Login**: Start creating an account on your VPS provider or log in if you already have one.

2. **Choose an Image**: Select Ubuntu as your operating system. We recommend using the latest stable version of Ubuntu for optimal performance.

3. **Select a Plan**: Choose a plan that meets the minimum hardware requirements for the Snapshotter Lite Node V2. A plan with at least 4 GB RAM and 40 GB of disk space is advisable. 

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

2. **Install Git**:  
Git is necessary for cloning the Snapshotter Lite repository. Install it using:

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
    
Once the Docker repository is added successfully, let’s install Docker and necessary components by using the below command:

```bash
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

<h3>Step 4: Cloning the Repository and Setting Up the Node</h3>

1. **Clone the Snapshotter Lite Repository**:  
Navigate to the directory where you want to install the node and clone the repository:

```bash
git clone https://github.com/PowerLoom/snapshotter-lite-v2.git powerloom-pre-mainnet-simulation
```

2. **Navigate to the Directory**:  
Change to the directory of the cloned repository:

```bash
cd powerloom-pre-mainnet-simulation
```

<h3>Step 5: Running the Node </h3>

1. Setting up Screen:   
The Screen utility allows you to run processes in the background, enabling you to maintain long-running tasks without keeping a terminal window open. To initiate a new Screen session for managing the Snapshotter Lite Node V2, follow these steps:

Enter the following command to create a new Screen session named "powerloom":

```bash
screen -S powerloom-pre-mainnet-simulation
```
    
- This command opens a new Screen session, where you can start the Snapshotter Lite Node V2.
- Once inside the new Screen session, initiate the Snapshotter Lite Node V2 as required.
    
This approach ensures your node can continue running in the background, even if you disconnect from the terminal session.

2. **Initialize the Node**:  
Initiate the snapshotter lite node v2 setup by typing the command in the terminal:

```bash
./build.sh
```
    
Follow the prompts to enter the required information.

:::tip
 Please do not use your NFT minting wallet to run the snapshotter lite node v2. The safest approach is to generate and assign a burner wallet. You can generate a burner wallet through any of the tools listed below:

  - [Vanity-ETH](https://vanity-eth.tk/)
  - [Powerloom Burner Wallet Generator](https://snapshotter-dashboard.powerloom.network/burner)

Once generated, make sure you assign your burner wallet on your [snapshotter dashboard](https://snapshotter-dashboard.powerloom.network/).
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


Everytime you restart the node, you should have a log message similar to the one shown below.
![Start node logs](/images/snapshot-lite-v2-restart-window.png)

If your node is generating snapshots during the assigned timeslot, you should have similar logs in your terminal:
![Sample node logs](/images/snapshot-lite-v2-running.png)

<h3>Step 6: Maintaining Your Node </h3>

- **Regular Updates**: Keep your system and Snapshotter Lite Node V2 updated by regularly pulling the latest changes from the repository and applying system updates.

- **Monitoring**: Regularly check the status of your node and the VPS to ensure everything is running smoothly.


</TabItem>
</Tabs>

</TabItem>

<TabItem value="mac/linux" label="macOS/Linux">
<Tabs groupId="setup-type" queryString="setup-type">
   <TabItem value="docker-setup-macos" label="Docker Setup">

<h2> Docker Setup for MacOS </h2>

<h3> Hardware Requirements </h3>

The Snapshotter Lite Node V2 is designed for minimal hardware demands, allowing it to operate effectively on various setups, including both local systems and cloud-based Virtual Machines.

<h3> MacOS System Requirements </h3>

For users running the node on personal hardware, the minimum specifications are:

- **RAM:** At least 4 GB.
- **CPU Core**:  Minimum of 2 Cores
- **Disk Space:** A minimum of 40 GB.



<h3> Pre-requisitie tools </h3>

- Install Docker on your machine. You can find the installation instructions for your operating system on the [official Docker website.](https://docs.docker.com/get-docker/)

- Install git if your system doesn't have git installed. To install git on MacOS, please follow this guide: https://www.atlassian.com/git/tutorials/install-git 


<h3> Installation </h3>

- Clone the snapshotter lite repository using the following command in the terminal:

```bash 
git clone https://github.com/PowerLoom/snapshotter-lite-v2.git powerloom-pre-mainnet-simulation
```

This will clone the repository into a directory named `powerloom-pre-mainnet`.

- Change your working directory to the powerloom directory:

```bash
cd powerloom-pre-mainnet-simulation
```

** 1. Setting up Screen**

The Screen utility allows you to run processes in the background, enabling you to maintain long-running tasks without keeping a terminal window open. To initiate a new Screen session for managing the Snapshotter Lite Node V2, follow these steps:

Enter the following command to create a new Screen session named "powerloom":

```bash
screen -S powerloom-pre-mainnet-simulation
```
    
- This command opens a new Screen session, where you can start the Snapshotter Lite Node V2.
- Once inside the new Screen session, initiate the Snapshotter Lite Node V2 as required.
    
This approach ensures your node can continue running in the background, even if you disconnect from the terminal session.

** 2. Run the node**

- Run `build.sh` in the terminal to start the snapshotter lite node v2:

```bash
./build.sh
```

<details><summary>Optional: Only for Developers</summary>
<p>

If you're a developer and want to play around with the code, instead of running build.sh, you can run the following command to start the snapshotter lite node v2:

```bash
./bootstrap.sh
./build-dev.sh
```

</p>
</details>

:::tip
 Please do not use your NFT minting wallet to run the snapshotter lite node v2. The safest approach is to generate and assign a burner wallet. You can generate a burner wallet through any of the tools listed below:

  - [Vanity-ETH](https://vanity-eth.tk/)
  - [Powerloom Burner Wallet Generator](https://snapshotter-dashboard.powerloom.network/burner)

Once generated, make sure you assign your burner wallet to your [snapshotter dashboard](https://snapshotter-dashboard.powerloom.network/).
:::

- During the setup, you'll be prompted to enter the following values:
  - `$SOURCE_RPC_URL`: Use any Ethereum Mainnet RPC, such as Ankr, Infura, or Alchemy.

  - `$SIGNER_ACCOUNT_ADDRESS`: Utilize a burner wallet for the signer account address. Please DO NOT use your main/primary wallet. 

  - `$SIGNER_ACCOUNT_PRIVATE_KEY`: Use the private key from your burner wallet.

  - `$SLOT_ID`: To assign your node to a specific slot, please provide the corresponding Slot ID or NFT ID. You can locate your NFT ID within your transaction details on PolygonScan.


This is a one-time configuration process that generates a .env file in the project's root directory.

Everytime you start or restart the node, it goes through two stages

### Simulation mode submissions

This does not count towards your snapshot quota. This ensures that your node can establish connections to the sequencer over libp2p relay circuits.

:::note
Learn more: 
* [Sequencer component](/docs/Protocol/Protocol_v2/sequencer.md)
* [libp2p circuit relay](/docs/Protocol/Protocol_v2/relay.md)
:::

:::info
Read more about monitoring and verifying the simulation mode submissions on the [`Monitoring and Troubleshooting`](/docs/build-with-powerloom/snapshotter-node/lite-node-v2/monitoring.md) page.
:::
### Regular snapshot submissions

Once you can verify the simulation mode submissions, you will have log messagse similar to the one shown below that will ensure .

![Sample node logs](/images/snapshot-lite-v2-running.png)

:::info
For further details on using the snapshotter dashboard to monitor the running status of your node, check the [`Monitoring Node Activity with the Snapshotter Dashboard`](/docs/build-with-powerloom/snapshotter-node/lite-node-v2/monitoring.md#monitoring-node-activity-with-the-snapshotter-dashboard) section.
:::

- To stop the node, you can press `Ctrl+C` in the terminal where the node is running or `docker-compose down` in a new terminal window from the project directory.

This will halt the running node and all associated processes. 

By following these steps, you can successfully configure the Snapshotter Lite Node V2 on your Mac system.

If you encounter any issues while operating the node, please refer our [troubleshooting section](./monitoring.md) for guidance on common debugging techniques.

---

</TabItem>
<TabItem value="non-docker-macos" label="Non-Docker Setup">
<h2>Non-Docker Setup for MacOS </h2>

<h3> Hardware Requirements </h3>

The Snapshotter Lite Node V2 is designed for minimal hardware demands, allowing it to operate effectively on various setups, including both local systems and cloud-based Virtual Machines.

For users running the node on personal hardware, the minimum specifications are:

- **RAM:** At least 4 GB.
- **CPU Core**:  Minimum of 2 Cores
- **Disk Space:** A minimum of 40 GB.
- **Python:** Ensure Python 3.11 is installed.

If you want to run the Snapshotter Lite Node V2 without Docker, you need to make sure that you have Git, and Python version 3.10 or higher installed on your machine and we recommend to use **python version 3.11.7**. You can find the installation instructions for your operating system on the [official Python website](https://www.python.org/downloads/).


<details><summary> Optional: Installing Virtual Environment </summary>
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
</details>

Once python3 is installed, we can go ahead and run the lite node:-

1. Clone this repository using the following command in the terminal:
```bash
git clone https://github.com/PowerLoom/snapshotter-lite-v2.git powerloom-pre-mainnet-simulation
```
This will clone the repository into a directory named `powerloom-pre-mainnet`.
  
2. Change your working directory to the `powerloom-pre-mainnet` directory, open the terminal, and type:

```bash
cd powerloom-pre-mainnet-simulation
```

3. Run `init.sh` command in the terminal to start the snapshotter lite node v2:
```bash
./init.sh
```
:::tip
 Please do not use your NFT minting wallet to run the snapshotter lite node v2. The safest approach is to generate and assign a burner wallet. You can generate a burner wallet through any of the tools listed below:

  - [Vanity-ETH](https://vanity-eth.tk/)
  - [Powerloom Burner Wallet Generator](https://snapshotter-dashboard.powerloom.network/burner)

Once generated, make sure you assign your burner wallet to your [snapshotter dashboard](https://snapshotter-dashboard.powerloom.network/).
:::


1. During the setup, you'll be prompted to enter the following values:

  - `$SOURCE_RPC_URL`: Use any Ethereum Mainnet RPC, such as Ankr, Infura, or Alchemy.

  - `$SIGNER_ACCOUNT_ADDRESS`: Utilize a burner wallet for the signer account address. Please DO NOT use your main/primary wallet. 

  - `$SIGNER_ACCOUNT_PRIVATE_KEY`: Use the private key from your burner wallet.

  - `$SLOT_ID`: To assign your node to a specific slot, please provide the corresponding Slot ID or NFT ID. You can locate your NFT ID within your transaction details on PolygonScan.


This is a one-time configuration process that generates a .env file in the project's root directory.

1. The node setup will be completed in approximately 2-3 minutes, after which the snapshotting process begins automatically.

Everytime you restart the node, you should have a log message similar to the one shown below.
![Start node logs](/images/snapshot-lite-v2-restart-window.png)

If your node is generating snapshots during the assigned timeslot, you should have similar logs in your terminal:
![Sample node logs](/images/snapshot-lite-v2-running.png)

<h3> Stopping the Snapshotter Lite Node V2 </h3>

To stop the node, use the command in the terminal:
```bash
pkill -f snapshotter
```

This will halt the running node and all associated processes.

By following these steps, you can successfully configure the Snapshotter Lite Node V2 on your Mac system.

If you encounter any issues while operating the node, please refer to our [troubleshooting section](./monitoring.md) for guidance on common debugging techniques.

---

</TabItem>
</Tabs>

</TabItem>

<TabItem value="win" label="Windows">
  The Snapshotter Lite Node V2 can operate on Windows systems when running in a Docker container. To set up the Snapshotter Lite Node V2 on Windows, follow the Docker installation and configuration instructions provided in this section.
<Tabs groupId="setup-type" queryString="setup-type">
<TabItem value="docker-setup-windows" label="Docker Setup">

<h2 id="windows-setup"> Windows Docker Setup </h2>

<h3> Hardware Requirements </h3>

The Snapshotter Lite Node V2 is designed for minimal hardware demands, allowing it to operate effectively on various setups, including both local systems and cloud-based Virtual Machines.

For users running the node on a personal Windows system, the minimum specifications are:

- **RAM:** At least 4 GB.
- **CPU Core**:  Minimum of 2 Cores
- **Disk Space:** A minimum of 40 GB.

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
   - Use the following command in WSL terminal to clone the Snapshotter Lite Node v2 repository:

   ```bash
   git clone https://github.com/PowerLoom/snapshotter-lite-v2.git powerloom-pre-mainnet-simulation
   ```

- **Navigate to the Repository Directory:**
    - Change to the cloned repository's directory:

      ```bash
      cd powerloom-pre-mainnet-simulation
      ```

- **Run the Build Script:**

:::tip
 Please do not use your NFT minting wallet to run the snapshotter lite node v2. The safest approach is to generate and assign a burner wallet. You can generate a burner wallet through any of the tools listed below:

  - [Vanity-ETH](https://vanity-eth.tk/)
  - [Powerloom Burner Wallet Generator](https://snapshotter-dashboard.powerloom.network/burner)

Once generated, make sure you assign your burner wallet on your [snapshotter dashboard](https://snapshotter-dashboard.powerloom.network/).

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

Everytime you restart the node, you should have a log message similar to the one shown below.
![Start node logs](/images/node-start-status.png)

If your node is generating snapshots during the assigned timeslot, you should have similar logs in your terminal:
![Sample node logs](/images/node-status-new.png)

By adhering to these instructions, you can successfully configure the Snapshotter Lite Node V2 on your Windows system.

If you encounter any issues while operating the node, please refer to our [troubleshooting section](./monitoring.md) for guidance on common debugging techniques.

---

</TabItem>
    <TabItem value="non-docker-win" label="Non-Docker Setup">
   Currently, there are no specific instructions for running the Snapshotter Lite Node V2 without Docker on Windows. Users are encouraged to use the Docker setup for Windows as detailed in the Docker Setup section above.
    </TabItem>
    </Tabs>
  </TabItem>
</Tabs>

---

## Setting Up Multiple Nodes on a VPS

If you're looking to run multiple nodes, you can use our Multi-node setup python script. This section will guide you through setting up and managing multiple nodes.

### Clone the Multi-node setup script

First, clone our multi-node script to get started:

```bash
git clone https://github.com/PowerLoom/snapshotter-lite-multi-setup
cd snapshotter-lite-multi-setup
```

### Setting Up the Environment

It is imperative to create an isolated virtual environment that includes the necessary Python version and modules. This approach ensures that the global Python installations on the VPS or your local machine are not altered.

#### Installing `Pyenv`

Follow the steps below to install `pyenv` according to your OS. 
Open the terminal and execute the below commands.

<Tabs groupId="pyenv-installation" className="unique-tabs" queryString="pyenv-os">

<TabItem value="Linux" label="pyenv installation(Linux)">

```bash
sudo apt install build-essential libssl-dev zlib1g-dev libbz2-dev libreadline-dev libsqlite3-dev curl libncursesw5-dev xz-utils tk-dev libxml2-dev libxmlsec1-dev libffi-dev liblzma-dev
```

After installing the packages, run the following command to execute the script for `pyenv` installation:

```bash
curl https://pyenv.run | bash
```

Next, add `pyenv` to the bashrc file:

```bash
cd
nano ~/.bashrc
```

Inside the `nano` editor, add the following lines at the end of the file:

```bash
export PATH="$HOME/.pyenv/bin:$PATH"
eval "$(pyenv init -)"
eval "$(pyenv virtualenv-init -)"
```

To save changes in the `.bashrc` file, press `ctrl + o`. 

Refresh the terminal by typing:

```bash
source ~/.bashrc
```

Next, proceed to install Python 3.11.5:

```bash
pyenv install 3.11.5
```
</TabItem>

<TabItem value="macOS" label="pyenv installation(MacOS)">

Install `pyenv` with the `brew` package manager. Ensure you run an update before the installation.

```bash
brew update
brew install pyenv
```

Next would be to add the right initializations into your `~/.bashrc` or `~/.zshrc` file depending upon whether you use the `bash` or `zsh` shell. If you use any other shell, consult its documentation to know where the similar profile `~/*rc` files are located.

The following example assumes a `~/.zshrc` file.

```bash
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.zshrc
echo '[[ -d $PYENV_ROOT/bin ]] && export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.zshrc
echo 'eval "$(pyenv init -)"' >> ~/.zshrc
```

Reload your shell profile in the terminal by running the command:

```bash
source ~/.zshrc
```

Next, proceed to install Python 3.11.5:

```bash
pyenv install 3.11.5
```

</TabItem>

</Tabs>

---

#### Installing `pyenv-virtualenv`

Execute the commands below to install `pyenv-virtualenv`:

```bash
git clone https://github.com/pyenv/pyenv-virtualenv.git $(pyenv root)/plugins/pyenv-virtualenv
echo 'eval "$(pyenv virtualenv-init -)"' >> ~/.bashrc
pyenv virtualenv 3.11.5 ss_lite_multi_311
pyenv local ss_lite_multi_311
```


#### Executing the Setup

To establish a multi-node setup, follow these steps:

```bash
# Prepare the .env file
./init.sh
# Install all Python requirements
pip install -r requirements.txt
# Execute the setup
python multi_clone.py
```
When you execute `python multi_clone.py`, you will see the following prompts that guide you through setting up your node(s).

1. **Terminate Existing containers:** "Do you want to kill all running containers and screen sessions of testnet nodes? (y/n) n"

- Type `y`. Use this option and stop all active containers or node instances. This will clean up all the older containers. Remember to cross-check your running containers before executing this command. 

2. **Custom Slot ID Deployment:** "Do you want to deploy a custom index of slot IDs (indices begin at 0, enter in the format [begin, end])? (indices/n)"

- For instance, to deploy the first four slot IDs as nodes, input `[0, 3]`, where 0 is the start index, and 3 represents the fourth element in the slot ID array associated with the wallet holder. If you want to deploy the entire array of slot IDs, type `n`.

3. **Deployment Batch Size:** " Enter the batch size into which you wish to split the deployment"

- A batch size of 1 means nodes will be deployed one by one, in batch size of 1. A batch size of 2 takes two nodes at a time and proceeds with deployment, and so on.

Following the setup prompts, the script will configure your node slots to run in separate screen sessions. To view the logs for a specific node slot, you can use the following commands:

To list all active screen sessions:
```bash
screen -ls
```
This command displays all currently running screen sessions.

![screen-command](/images/screen-command.png)

To attach to a specific node slot's screen session and check its status, use:
```bash
screen -r <screenId>
```
Note: Replace `<screenId>` with the actual ID of the screen session you wish to access.

To detach from the screen session and leave it running in the background, press `Ctrl + A` followed by `D`.

For more instructions and further assistance, please visit our [multi-node setup](https://github.com/PowerLoom/snapshotter-lite-multi-setup/?tab=readme-ov-file) repository.

---

## Troubleshooting

If you encounter any issues, please refer to our [Troubleshooting section](./monitoring.md) for more information. 

