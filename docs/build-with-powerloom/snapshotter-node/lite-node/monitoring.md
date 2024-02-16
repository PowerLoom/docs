---
sidebar_position: 2
title: Monitoring and Troubleshooting
---

# Monitoring and Troubleshooting

This section will guide you through the process of Monitoring and Troubleshooting the status of your node's snapshotting process.

## Steps to Confirm and Monitor Node Snapshotting Process

1. **Terminal Status Check:**
   - The primary method to verify node status is through the terminal, which displays log responses from the node.

   - Monitor these logs to assess the health and activity of your node. 
   
   - A healthy snapshotter node will produce logs similar to the provided example screenshot. These logs indicate normal operation and successful snapshotting.
   ![Snapshotter-node-running](/images/snapshotter-node-running-terminal.png)

2. **Monitoring Node Activity with the Snapshotter Dashboard**
Our Snapshotter Dashboard enables you to verify if your node slot is actively submitting snapshots.


## Troubleshooting and Support

This section provides guidance on troubleshooting your node in case of encountered issues. The steps outlined below are designed to help identify and resolve common problems efficiently.

### Confirm setup Prerequisites

Before proceeding, please double-check your system's configurations and the setup process. If you're using a Docker setup, ensure that Docker is actively running. For a non-Docker setup, verify that [prerequisite tools](./getting-started/#2-non-docker-setup) such as Python and Git are installed.

---

### Review setup Instructions
   - Revisit the [setup instructions](./getting-started) to confirm that all steps were followed correctly. Often, issues arise from missing or incorrectly executed setup procedures.

   - Verify your .env variables: 
     - `SOURCE_RPC_URL`: Confirm that the RPC URL you've provided is valid.. 
     - `SIGNER_WALLET_ADDRESS`: Review your burner wallet address to ensure its correctness 
     - `SIGNER_PRIVATE_KEY`: Cross-verify your burner private key to identify any potential issues.
     - `SLOT_ID`: To assign your node to a specific slot, please provide the corresponding Slot ID or NFT ID. You can locate your NFT ID within your transaction details on PolygonScan.

---

### Updating the .env File

The `.env` file contains essential configuration details such as `SOURCE_RPC_URL`, `SIGNER_WALLET_ADDRESS`, `SIGNER_PRIVATE_KEY`, and `SLOT_ID`. Should you need to modify any of these variables, follow the steps below:

1. **Accessing the Server:**
   Use the following command to log into your server:

```bash
   ssh root@vps_url
```

2. **Navigating to the Node Directory:**
   Change to the directory where your Powerloom Snapshotter Lite Node is located:

```bash
   cd powerloom
```

3. **Editing the .env File:**
   Open the `.env` file for editing:

```bash
   nano .env
```

Inside, you will find configurations similar to those shown in the provided screenshot.
![EnvScreen](/images/env-screen.png)

4. **Modifying Variables:**
   Update the variables as needed. To save and exit, press `CTRL+X`.

5. **Rebuilding the Node:**
   In the same directory, rerun the `build.sh` script to apply the changes. Execute the following command in the terminal:

```bash
   ./build.sh
```

This process allows you to easily update your node's configuration settings directly on the server.

---

### RPC URLs 
Sometimes, you may encounter errors related to RPC. Should this occur, it's important to verify that your RPC URL is accurate. For instructions on changing the RPC URL, please refer to the previously mentioned section.

For your RPC provider, you have several reliable options, including:
- **Ankr**: `https://rpc.ankr.com/eth` - This is a public RPC service that does not require signup.
- **Infura**: Requires signup to obtain a key, which is ideal if you wish to monitor your RPC usage.
- **Alchemy**: Similar to Infura, signup is necessary to receive a key, offering the advantage of tracking your RPC usage.

---

### Resetting Your Node
If you wish to perform a complete reset of your node or start afresh with the Snapshotter Lite Node, the following steps will guide you through the process:

1. **Locate the Existing Directory:**
   Begin by opening your terminal. Locate the `powerloom` directory by entering the following command:

   ```bash
   ls
   ```

   This command lists all files and directories, allowing you to confirm the presence of the `powerloom` directory.


:::warning Warning
   Before proceeding with the directory deletion, it is crucial to ensure that you have securely backed up the private key of your burner wallet.
:::

2. **Remove the Directory:**
   To delete the `powerloom` directory and all its contents, use the command:

   ```bash
   sudo rm -rf powerloom
   ```

   This action cannot be undone, so ensure that you wish to proceed with the reset.

3. **Reinstalling the Snapshotter Lite Node:**
   After successfully removing the directory, you're ready to reinstall the Snapshotter Lite Node. Follow these steps for reinstallation:

   a. **Clone the Repository:**
      Clone the Snapshotter Lite Node repository from GitHub to your system with the following command:

      ```bash
      git clone https://github.com/PowerLoom/snapshotter-lite powerloom-testnet
      ```

      This command creates a new `powerloom-testnet` directory containing the node's files.

   b. **Initialize the Node:**
      Change into the newly created directory:

      ```bash
      cd powerloom-testnet
      ```

      Then, initiate the setup process by executing the initialization script:

      ```bash
      ./init.sh
      ```

      Follow the on-screen prompts to configure your node settings, such as the RPC URL, signer account details, and slot ID.

By completing these steps, you will have successfully reset and reinstalled your Snapshotter Lite Node, ready for operation.

---

### Restarting your Node
If you're experiencing issues or simply wish to restart your node, the process is straightforward:

1. **Access the Node Directory:**
   Open a terminal window and navigate to the directory of your Powerloom Snapshotter Node by executing:

```bash
   cd powerloom
```

2. **Execute the Build Script:**
   Restart your node by re-running the `build.sh` script with the following command:

```bash
   ./build.sh
```

Congratulations, you have successfully restarted your node.

## Additional Support

If you have followed these troubleshooting steps and still encounter issues, please contact us on [discord](https://discord.com/invite/powerloom) for further assistance. Our goal is to ensure your node runs smoothly, and we're here to help with any challenges you might face.