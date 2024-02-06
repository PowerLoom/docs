---
sidebar_position: 1
title: Running the Snapshotter Lite Node
---
# Setting Up and Running the Snapshotter Lite Node

This section provides a comprehensive guide to setting up and running the Snapshotter Lite Node, including prerequisites and operational instructions.

There are multiple ways to set up the Snapshotter Lite Node. You can either use the Docker image or run it directly on your local machine. However, it is recommended to use the Docker image as it is the easiest and most reliable way to set up the Snapshotter Lite Node.

## Adding your Burner Wallet

Before initiating the setup of the Snapshotter Node, it's important to add a burner wallet identity. This step is essential for the node's efficient operation.

1. **Burner Wallet Addition:** It is crucial to use your burner wallet identity for snapshotting. Do not use the wallet through which you minted the slot.

- Refer to the provided instructional image for guidance on adding your burner wallet.
![Adding Burner Wallet](/images/burner-wallet-add.png)

---

## Docker Setup:

- Install Docker on your machine. You can find the installation instructions for your operating system on the [official Docker website.](https://docs.docker.com/get-docker/)

- Clone this repository using the following command:

```bash 
git clone https://github.com/PowerLoom/snapshotter-lite powerloom
```

This will clone the repository into a directory named `powerloom`.

- Change your working directory to the powerloom directory:

```bash
cd powerloom
```

- Run `build.sh` to start the snapshotter lite node:

```bash
./build.sh
```
If you're a developer and want to play around with the code, instead of running build.sh, you can run the following command to start the snapshotter lite node:

```bash
./build-dev.sh
```

- When prompted, enter `$SOURCE_RPC_URL`, `SIGNER_ACCOUNT_ADDRESS`, `SIGNER_ACCOUNT_PRIVATE_KEY` (only required for the first time), this will create a .env file in the root directory of the project.

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

- To stop the node, you can press Ctrl+C in the terminal where the node is running or docker-compose down in a new terminal window from the project directory.

:::note
It is recommended to run build.sh in a screen or tmux session so that the process continues running even after you close the terminal.
:::

---
## Without Docker Setup


If you want to run the Snapshotter Lite Node without Docker, you need to make sure that you have Git, and Python 3.10.13 installed on your machine. You can find the installation instructions for your operating system on the [official Python website](https://www.python.org/downloads/).

1. Clone this repository using the following command:
   ```bash
   git clone https://github.com/PowerLoom/snapshotter-lite powerloom
   ```
    This will clone the repository into a directory named `powerloom`.
  
2. Change your working directory to the `powerloom` directory:
   ```bash
   cd powerloom
   ```

3. Run `init.sh` to start the snapshotter lite node:
   ```bash
   ./init.sh
   ```

4. When prompted, enter `$SOURCE_RPC_URL`, `SIGNER_ACCOUNT_ADDRESS`, `SIGNER_ACCOUNT_PRIVATE_KEY` (only required for the first time), this will create a `.env` file in the root directory of the project.

5. Your node should start in background and you should start seeing logs in your terminal.
6. To stop the node, you can run `pkill -f snapshotter` in a new terminal window.

1. **Snapshot Process:**
   - Once the above variables are entered, the system will install few required libraries. 
   - The setup will complete in approximately 2-3 minutes, after which the snapshotting process begins automatically.
   - The process timing depends on the timeslot, as illustrated in the provided terminal screenshot.
  ![Snapshotter-node-running](/images/snapshotter-node-running-terminal.png)

### Stopping the Snapshotter Lite Node

- **Command to Stop:**
  - To exit the node, use the command `pkill -f snapshotter` in the terminal.
  - This will halt the running node and all associated processes. 

**Note:** The provided images and links are for instructional purposes and offer visual and detailed steps for the setup and operation of the Snapshotter Lite Node.

## Troubleshooting

If you encounter any issues, please refer to our [Troubleshooting section](./Troubleshooting.md) for more information. 