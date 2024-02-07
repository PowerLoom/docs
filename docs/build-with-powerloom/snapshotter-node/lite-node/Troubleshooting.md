---
sidebar_position: 1
title: Troubleshooting
---
# Troubleshooting Node Issues

This section provides guidance on troubleshooting your node in case of encountered issues. The steps outlined below are designed to help identify and resolve common problems efficiently.

## Steps for Troubleshooting

- **Confirm Setup Prerequisites**:

Before proceeding, please double-check your system's configurations and the setup process. If you're using a Docker setup, ensure that Docker is actively running. For a non-Docker setup, verify that prerequisite tools such as Python and Git are installed.


- **Check Node Status:**
   - Monitor the node's status through the terminal. To verify whether the node is operational, you can check out our guide on [Monitoring the node status](./monitoring). 

- **Review Setup Instructions:**
   - Revisit the setup instructions to confirm that all steps were followed correctly. Often, issues arise from missing or incorrectly executed setup procedures.
   - Verify your .env variables: 
     - `SOURCE_RPC_URL`: Confirm that the RPC URL you've provided is valid.. 
     - `SIGNER_WALLET_ADDRESS`: Review your burner wallet address to ensure its correctness 
     - `SIGNER_PRIVATE_KEY`: Cross-verify your private key to identify any potential issues.
  

## Additional Support

If you have followed these troubleshooting steps and still encounter issues, please contact us on [discord](https://discord.com/invite/powerloom) for further assistance. Our goal is to ensure your node runs smoothly, and we're here to help with any challenges you might face.