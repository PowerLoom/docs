---
sidebar_position: 5
---

# Troubleshooting


## Debugging:

If you are getting an error that says:

```bash
Container "<container_id>" is unhealthy.
ERROR: Encountered errors while bringing up the project.
```

Check if all the necessary docker containers are up and running. You should see an output against docker ps with the following containers listed:

```bash
#docker ps

CONTAINER ID   IMAGE                                  COMMAND                  CREATED       STATUS                 PORTS                                                                                                                                                 NAMES
bfa1abe2b8aa   powerloom-pooler-frontend              "sh -c 'sh snapshott…"   2 hours ago   Up 2 hours (healthy)   0.0.0.0:3000->3000/tcp, :::3000->3000/tcp                                                                                                             deploy-pooler-frontend-1
852f3445f11c   powerloom-pooler                       "bash -c 'sh init_pr…"   2 hours ago   Up 2 hours (healthy)   0.0.0.0:8002->8002/tcp, :::8002->8002/tcp, 0.0.0.0:8555->8555/tcp, :::8555->8555/tcp                                                                  deploy-pooler-1
ee652fda8513   powerloom-audit-protocol               "bash -c 'sh init_pr…"   2 hours ago   Up 2 hours (healthy)   0.0.0.0:9000->9000/tcp, :::9000->9000/tcp, 0.0.0.0:9002->9002/tcp, :::9002->9002/tcp                                                                  deploy-audit-protocol-1
5547fb5c1ab4   ipfs/kubo:release                      "/sbin/tini -- /usr/…"   2 hours ago   Up 2 hours (healthy)   4001/tcp, 8080-8081/tcp, 4001/udp, 0.0.0.0:5001->5001/tcp, :::5001->5001/tcp                                                                          deploy-ipfs-1
999de5864a1b   rabbitmq:3-management                  "docker-entrypoint.s…"   2 hours ago   Up 2 hours (healthy)   4369/tcp, 5671/tcp, 0.0.0.0:5672->5672/tcp, :::5672->5672/tcp, 15671/tcp, 15691-15692/tcp, 25672/tcp, 0.0.0.0:15672->15672/tcp, :::15672->15672/tcp   deploy-rabbitmq-1
2c14926d7cfd   redis                                  "docker-entrypoint.s…"   2 hours ago   Up 2 hours (healthy)   0.0.0.0:6379->6379/tcp, :::6379->6379/tcp                                                                                                             deploy-redis-1
```

### Accessing the logs:

You can access the logs folders if you need to debug or monitor the services running on your Powerloom Snapshotter node. Logs can be found in `/logs` folder in the root directory of your node and the cloned `deploy` repository.


These logs can provide valuable information for debugging or troubleshooting purposes. You can use them to identify any service errors or issues and take appropriate actions to resolve them.

Feel free to explore the logs folders and review the logs of different services to gain insights into the functioning of your Powerloom Snapshotter node.

If everything is functioning properly and you are able to check the status on the dashboard, it indicates that your node is working correctly.

:::info
If the issues still persists, you can raise a ticket on our [Discord Support](https://discord.com/channels/777248105636560948/1146936525544759457)
:::