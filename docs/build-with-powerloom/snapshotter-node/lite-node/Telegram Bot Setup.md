### Setting up your Telegram Bot | Node Health Monitoring 


This guide provides instructions for setting up your Powerloom Telegram Bot to monitor the health of your node for failed or missed snapshots. The Snapshotter-lite nodes currently require manual monitoring to detect any issues.

Introducing the Powerloom Telegram Bot, ‘PowerloomReportingBot’. This bot service maintains an internal health state and reports any issues to operators, such as failed or missed snapshots 

### Follow the steps below to set up your Node Health Monitoring process using Telegram.

- Step 1: Find the telegram bot by searching ‘PowerloomReportingBot’ on Telegram
- Step 2: Type ‘/start’ to activate the bot. This will provide you with a Chat ID.

![chatID-start](/images/chatID-start.png)

### If you are a new Snapshotter
Enter the ChatID when prompted on the terminal during the node setup. 

### If you are an existing Snapshotter, 

Here's what you can do:

A. 
  - Update your `.env` file with the generated ChatID & the Telegram Reporting URL, as seen in the image below.
  - Run the build setup again

![updated-env-screenshot](/images/updated-env-screenshot.png)

OR

B.
  - Delete your existing `.env` file & Run the build setup again.
  - Enter the ChatID when prompted on the terminal.

![terminal-prompt](/images/terminal-prompt.png)

### To check if the Bot is successfully running, try these:

- Limit API request rates per second
- Limit the API being requested by specifying the allowed API methods. (e.g. eth_getBlockNumber)

If you see messages of failed or missed snapshots like the images below, know that the bot is running successfully. 

![failed-snapshot](/images/failed-snapshot.png)

---

### What should I do if I receive alerts for errors related to failed or missed snapshots?
Reach out to the team on [Discord](https://discord.com/invite/powerloom). Our goal is to ensure your node runs smoothly, and we're here to help with any challenges you might face.
