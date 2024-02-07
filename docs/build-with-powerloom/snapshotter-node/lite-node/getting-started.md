---
sidebar_position: 0
title: Getting Started with Lite Node
---
# Setting Up and Running the Snapshotter Lite Node

This section provides a comprehensive guide to setting up and running the Snapshotter Lite Node, including prerequisites and operational instructions.

There are multiple ways to set up the Snapshotter Lite Node. You can either use the Docker image or run it directly on your local machine. However, it is recommended to use the Docker image as it is the easiest and most reliable way to set up the Snapshotter Lite Node.

:::info
Important Announcement: Our Testnet is gearing up for launch shortly. In the interim, we invite developers to experiment with running our Snapshotter node.

While currently operating the node does not yield rewards, this is an excellent opportunity to simulate and test the Snapshotter node, providing valuable insights into its functionality and operation.
:::

## Hardware Requirements

The Snapshotter Lite Node is designed for minimal hardware demands, allowing it to operate effectively on various setups, including both local systems and cloud-based Virtual Machines.

### Local System Requirements

For users running the node on personal hardware, the minimum specifications are:

- **RAM:** At least 4 GB.
- **CPU Core**:  Minimum of 4 Cores
- **Disk Space:** A minimum of 40 GB.
- **Operating System:** Windows, macOS, or Linux.
- **Python:** Ensure Python 3.10 or newer is installed.

### Requirements for Virtual Private Server (VPS)

For those choosing a VPS solution (like AWS, GCP, DigitalOcean, etc.):

- **RAM:** A minimum of 4 GB.
- **CPU Core**:  Minimum of 4 Cores
- **Disk Space:** At least 40 GB.
- **Operating System:** Windows or Linux.
- **Python:** Ensure Python 3.10 or newer is installed.

Snapshotter Lite is optimized for low resource usage, so these minimum requirements are quite manageable. Whether you're using a basic local computer or a modest VPS instance, setting up should be straightforward.

There are two distinct methods for deploying the Snapshotter node:

1. [**Docker Setup**](#1-docker-setup): We highly recommend this approach as it simplifies the setup process and facilitates a quick start.
2. [**Non-Docker Setup**](#2-non-docker-setup): An alternative method for those who prefer not to use Docker.

---

## 1. Docker Setup:

- Install Docker on your machine. You can find the installation instructions for your operating system on the [official Docker website.](https://docs.docker.com/get-docker/)

- Clone this repository using the following command in the terminal:

```bash 
git clone https://github.com/PowerLoom/snapshotter-lite powerloom
```

This will clone the repository into a directory named `powerloom`.

- Change your working directory to the powerloom directory:

```bash
cd powerloom
```

- Run `build.sh` in the terminal to start the snapshotter lite node:

```bash
./build.sh
```

:::info
If you're a developer and want to play around with the code, instead of running build.sh, you can run the following command to start the snapshotter lite node:

```bash
./build-dev.sh
```
:::

- During the setup, you'll be prompted to enter the following values:
  - `$SOURCE_RPC_URL`: Use any Ethereum Mainnet RPC, such as Ankr, Infura, or Alchemy.
  - `SIGNER_ACCOUNT_ADDRESS`: Utilize a burner wallet for the signer account address.
  - `SIGNER_ACCOUNT_PRIVATE_KEY`: Use the private key from your burner wallet.

This is a one-time configuration process that generates a .env file in the project's root directory.

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

- To stop the node, you can press` Ctrl+C` in the terminal where the node is running or `docker-compose down` in a new terminal window from the project directory.

:::note
It is recommended to run build.sh in a screen or tmux session so that the process continues running even after you close the terminal.
:::

---
## 2. Non-Docker Setup


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
   git clone https://github.com/PowerLoom/snapshotter-lite powerloom
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

5. The node setup will complete in approximately 2-3 minutes, after which the snapshotting process begins automatically.

6. The process timing depends on the assigned timeslot, as illustrated in the provided terminal screenshot.
  ![Snapshotter-node-running](/images/snapshotter-node-running-terminal.png)

### Stopping the Snapshotter Lite Node

  - To stop the node, use the command in the terminal:
  ```bash
  pkill -f snapshotter
  ```
  - This will halt the running node and all associated processes. 

## Troubleshooting

If you encounter any issues, please refer to our [Troubleshooting section](./Troubleshooting.md) for more information. 