### Setting up your Telegram Bot | Node Health Monitoring 

This guide provides instructions for setting up your Powerloom Telegram Bot to monitor your Node Health for failed or missed Snapshots. The snapshotter-lite nodes currently require manual monitoring to discover any issues with the node.

Introducing the Powerloom Telegram Bot ‘PowerloomReportingBot’. This bot service should maintain an internal health state and report any issues to operators such as failed or missed snapshots. 

### Follow the steps below to set up your Node Health Monitoring process using Telegram.

- Step 1: Find the telegram bot by searching ‘PowerloomSnapshotterReportingService’ on Telegram
- Step 2: Type ‘/start’ to activate the bot. This will provide you with a Chat ID.

Image1 (chatid & start)

Enter the ChatID when prompted on the terminal during the node setup. 

If you are an existing snapshotter, 
1. Update your `.env` file with the generated ChatID & the Telegram Reporting URL , as seen in the image below: 
2. Run the build setup again

Image2 (.env ss with tg marked)

OR

1. Delete your existing `.env` file & Run the build setup again.
2. Enter the ChatID when prompted on the terminal.

Image3 (terminal prompt tg)


### To check if the Bot is successfully running, try these:

- Limit API request Rates
- Limit the API being requested

If you see messages of failed or missed snapshots like the images below, know that the bot is running successfully. 

Image4 (fail message)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/0c23e60c-6343-4793-90be-1ef4d172143a/eb0ad172-db9b-4671-b1f4-b7eaf2b3de28/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/0c23e60c-6343-4793-90be-1ef4d172143a/bb40c964-cc51-49ac-aecd-a35589c0cad8/Untitled.png)

---

### What should I do if I receive alerts for errors related to failed or missed snapshots?
Reach out to the team on [Discord](https://discord.com/invite/powerloom). Our goal is to ensure your node runs smoothly, and we're here to help with any challenges you might face.
