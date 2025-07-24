---
sidebar_position: 6
title: Slot Monitoring Service Setup
---

### Setting up the Powerloom Slot Monitoring Service

The Slot Monitoring Service provides comprehensive real-time monitoring for your node's slot activities. This service offers webhook-based notifications through platforms like Slack and Discord, giving you instant alerts about your slot's performance and submission status.

## Overview

The monitoring service operates in two modes:
- **Slot Monitor**: Monitors specific slot IDs and their performance
- **Active Node Monitor**: Tracks overall node activity and health for the entire Powerloom network

## Prerequisites

Before setting up the monitoring service, ensure you have:
- [Docker](https://docs.docker.com/get-started/get-docker/)
- [Git](https://github.com/git-guides/install-git)

## Installation and Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/Powerloom/submissions-monitor-alerts.git
cd submissions-monitor-alerts
```

### Step 2: Run the Build Script

```bash
./build.sh
```

### Step 3: Select Your Monitoring Service

When prompted by the interactive menu, select:
- **Option 1**: Slot Monitor - Monitor slot submission status
- **Option 2**: Active Node Monitor - Monitor active node counts and sequencer health

```
🚀 Powerloom Active Node Monitor - Build Script
==============================================

Please select which monitoring service you would like to run:

1) Slot Monitor - Monitor slot submission status
2) Active Node Monitor - Monitor active node counts and sequencer health

Enter your choice (1-2): 
```

### Step 4: Configure Webhook Notifications

The service supports both single and multiple webhook configurations:

```
🔔 Configuring webhook notifications...
Do you want to configure:
1) Single webhook URL (simple setup)
2) Multiple webhook URLs (advanced setup)
Enter your choice (1-2, default: 1): 
```

#### Option 1: Single Webhook (Simple Setup)
- Your webhook URL (e.g., Slack webhook URL)
- The webhook service type (default: "slack")

```
Enter webhook URL: https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK
Enter webhook service type (default: slack): slack
✅ Configured single webhook: slack
```

#### Option 2: Multiple Webhooks (Advanced Setup)
- During setup, you'll be prompted to enter webhook URLs and service names interactively
- Enter each webhook as: `<webhook-url> <service-name>`
- Press Enter (empty input) or type `done` when finished

```
Enter webhook #1 (or press Enter/type 'done' to finish):
URL and service name: https://hooks.slack.com/services/... slack
✅ Added webhook #1: slack

Enter webhook #2 (or press Enter/type 'done' to finish):
URL and service name: https://discord.com/api/webhooks/... discord
✅ Added webhook #2: discord

Enter webhook #3 (or press Enter/type 'done' to finish):
URL and service name: 
📝 Configured 2 webhook(s)
```

### Step 5: Service-Specific Configuration

#### For Slot Monitor
- **WALLET_HOLDER_ADDRESS**: The node holding wallet address to monitor
- **SLOTS_TO_IGNORE**: (Optional) List of slot numbers to ignore, formatted as comma-separated values (e.g., 1,2,3,4,5)

#### For Active Node Monitor
- **AUTH_READ_TOKEN**: The API token for the Powerloom Sequencer API

The build script will automatically bootstrap the environment, build the Docker image, and start the selected service.

## Webhook Message Format

The monitoring service sends structured JSON messages to your configured webhook URL. All services use a unified message format:

| Field | Type | Description |
|-------|------|-------------|
| `network` | String | Network identifier (e.g., "mainnet") |
| `dataMarketAddress` | String | Contract address for the data market |
| `message` | String | Notification message content |
| `reportingTime` | String | Timestamp of when the report was generated |
| `webhookService` | String | Target webhook service (e.g., "slack", "discord") |
| `error` | Boolean | Indicates if this is an error notification |

Example Slot Monitor message:

```json
{
  "network": "mainnet",
  "dataMarketAddress": "0x21cb57C1f2352ad215a463DD867b838749CD3b8f",
  "message": "❌ The following slots have failed to submit data in the last 5 epochs: [4827]",
  "reportingTime": "2024-02-13 10:10:15",
  "webhookService": "discord",
  "error": true
}
```

Example Active Node Monitor message:

```json
{
  "network": "mainnet",
  "dataMarketAddress": "0x21cb57C1f2352ad215a463DD867b838749CD3b8f",
  "message": "✅ epoch 1235 has 100 active nodes for day 42",
  "reportingTime": "2024-01-15 14:30:25",
  "webhookService": "slack",
  "error": false
}
```

**Message indicators:**
- ✅ Success notifications
- ❌ Error alerts
- 🚨 Critical alerts

## Supported Webhook Services

The service supports notifications to multiple platforms:
- **Slack**: Use Slack incoming webhook URLs
- **Discord**: Use Discord webhook URLs
- **Custom webhooks**: Any service that accepts JSON POST requests

## Benefits of Multiple Webhooks

- **Redundancy**: If one webhook fails, others continue working
- **Multi-platform notifications**: Send alerts to Slack and Discord simultaneously
- **Individual cooldowns**: Each webhook maintains separate rate limiting
- **Flexible configuration**: Add or remove webhooks as needed

## Troubleshooting

If you encounter issues during setup:

1. **Check Docker**: Ensure Docker and Docker Compose are running
2. **Verify webhook URLs**: Test your webhook URLs are valid and accessible
3. **Review logs**: Check container logs for error messages
4. **Network connectivity**: Ensure your server can reach the webhook endpoints

For additional support, reach out to the team on [Discord](https://discord.com/invite/powerloom).