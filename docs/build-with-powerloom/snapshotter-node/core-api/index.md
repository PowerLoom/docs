---
sidebar_position: 0
---

# Introduction

Core API facilitates access to the finalized protocol state on the smart contract running on the anchor chain. Although it is possible to directly query the smart contract, it is not recommended as it is expensive and slow. Instead, you can use the Core API to access the finalized state. Every snapshotter node runs a Core API service that can be accessed by other services or applications.

We have hosted snapshotter nodes for UniswapV2 and Zkevm Quests on the Powerloom Protocol's testnet. You can interact with those endpoints directly from the next couple of sections.

## Hosted API
![Changing Base URL in UI](/images/base_url_selection.png)

All the API endpoints are available for the given protocols.

```
💡 While the endpoints allow nominal usage for public access without an API key, we **do not** recommend them for developers. Doing so can severely restrict access to your IP address.
```


### Steps to generate API key for privileged access

Follow the steps to generate the API key to access the mentioned API endpoints in the postman collection:

1. Visit [Snapshotter API Dashboard](https://snapshotter-api-dashboard.powerloom.io/) and enter your email to Sign In.

![Screenshot 2022-11-30 at 10.56.19 PM.png](/images/Screenshot_2022-12-14_at_6.21.41_PM.png)

1. You will see a pop-up as shown below. *Note: Don’t close this tab*
    
    ![Screenshot 2022-11-30 at 10.57.36 PM.png](/images/Screenshot_2022-12-14_at_6.21.51_PM.png)
    
2. Login through the link provided on the email and go back to the [Dashboard](https://pooler-api-dashboard.powerloom.io/) tab to get the API key. It should look as shown below
    
    ![Screenshot 2022-11-30 at 11.02.31 PM.png](/images/Screenshot_2022-12-14_at_6.27.54_PM.png)
    