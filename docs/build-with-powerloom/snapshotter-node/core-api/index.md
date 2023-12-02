---
sidebar_position: 0
---

# Introduction

The Core API facilitates access to the finalized protocol state on the smart contract running on the anchor chain. Although it is possible to directly query the smart contract, it is not recommended due to its expense and slowness. Instead, you can use the Core API to access the finalized state. Every snapshotter node runs a Core API service that can be accessed by other services or applications.

We have hosted snapshotter nodes for UniswapV2 and Zkevm Quests on the Powerloom Protocol's testnet. You can interact with those endpoints directly from the next couple of sections.

## Hosted API
![Changing Base URL in UI](/images/base_url_selection.png)

All the API endpoints are available for the given protocols.

```
💡 While the endpoints allow nominal usage for public access without an API key, we do not recommend them for developers. Doing so can severely restrict access to your IP address.
```

### Steps to Generate an API Key for Privileged Access

Follow the steps below to generate the API key to access the mentioned API endpoints in the Postman collection:

1. Visit the [Snapshotter API Dashboard](https://snapshotter-api-dashboard.powerloom.io/) and enter your email to sign in.

![Screenshot 2022-11-30 at 10.56.19 PM.png](/images/Screenshot_2022-12-14_at_6.21.41_PM.png)

2. You will see a pop-up as shown below. *Note: Don’t close this tab*

![Screenshot 2022-11-30 at 10.57.36 PM.png](/images/Screenshot_2022-12-14_at_6.21.51_PM.png)

3. Log in through the link provided in the email and return to the [Dashboard](https://pooler-api-dashboard.powerloom.io/) tab to retrieve the API key. It should look as shown below

![Screenshot 2022-11-30 at 11.02.31 PM.png](/images/Screenshot_2022-12-14_at_6.27.54_PM.png)
