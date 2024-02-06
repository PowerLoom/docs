---
sidebar_position: 5
title: Troubleshooting
---
# Troubleshooting Node Issues

This section provides guidance on troubleshooting your node in case of encountered issues. The steps outlined below are designed to help identify and resolve common problems efficiently.

## Steps for Troubleshooting

1. **Verify Identity Wallet Address:**
- Verify that the identity wallet address used for the node is accurate. This is a crucial step, as an incorrect address can cause numerous operational issues with the node.

- You can validate this on your node dashboard. Choose the node whose identity you wish to confirm.
![Node-dashboard-identity-verification](/images/wallet-address-verification.png)

Inspect the `.env` file for the `SIGNER_WALLET_ADDRESS`. If there's a mismatch, you should consider updating the details. If you want to update your wallet address for a particular node slot, you can check out the [changing the wallet section](#).

2. **Check Node Status:**
   - Monitor the node's status through the terminal. To verify whether the node is operational, you can check out guide on [verifying the node status](./monitoring.md). 

3. **Review Setup Instructions:**
   - Revisit the setup instructions to confirm that all steps were followed correctly. Often, issues arise from missing or incorrectly executed setup procedures.
   - Verify your .env variables: 
     - `SOURCE_RPC_URL`: Confirm that the RPC URL you've provided is valid.. 
     - `SIGNER_WALLET_ADDRESS`: Review your burner wallet address to ensure its correctness 
     - `SIGNER_PRIVATE_KEY`: Cross-verify your private key to identify any potential issues.
  

## Additional Support

If you have followed these troubleshooting steps and still encounter issues, please contact us on [discord](https://discord.com/invite/powerloom) for further assistance. Our goal is to ensure your node runs smoothly, and we're here to help with any challenges you might face.