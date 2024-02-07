---
sidebar_position: 2
title: Monitoring and Troubleshooting
---

# Monitoring Node Status
This section will guide you through the process of Monitoring the status of your node's snapshotting process.

## Steps to Confirm and Monitor Node Snapshotting Process

1. **Terminal Status Check:**
   - The primary method to verify node status is through the terminal, which displays log responses from the node.

   - Monitor these logs to assess the health and activity of your node. 
   
   - A healthy snapshotter node will produce logs similar to the provided example screenshot. These logs indicate normal operation and successful snapshotting.
   ![Snapshotter-node-running](/images/snapshotter-node-running-terminal.png)

## Troubleshooting and Support

This section provides guidance on troubleshooting your node in case of encountered issues. The steps outlined below are designed to help identify and resolve common problems efficiently.

### Steps for Troubleshooting

- **Confirm Setup Prerequisites**:

Before proceeding, please double-check your system's configurations and the setup process. If you're using a Docker setup, ensure that Docker is actively running. For a non-Docker setup, verify that [prerequisite tools](./getting-started.md) such as Python and Git are installed.

- **Review Setup Instructions:**
   - Revisit the [setup instructions](./getting-started) to confirm that all steps were followed correctly. Often, issues arise from missing or incorrectly executed setup procedures.
   
   - Verify your .env variables: 
     - `SOURCE_RPC_URL`: Confirm that the RPC URL you've provided is valid.. 
     - `SIGNER_WALLET_ADDRESS`: Review your burner wallet address to ensure its correctness 
     - `SIGNER_PRIVATE_KEY`: Cross-verify your private key to identify any potential issues.
  

## Additional Support

If you have followed these troubleshooting steps and still encounter issues, please contact us on [discord](https://discord.com/invite/powerloom) for further assistance. Our goal is to ensure your node runs smoothly, and we're here to help with any challenges you might face.