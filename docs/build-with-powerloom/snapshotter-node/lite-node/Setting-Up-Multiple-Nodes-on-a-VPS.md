## Setting Up Multiple Nodes on a VPS

If you're looking to run multiple nodes, you can use our Multi-node setup python script. This section will guide you through setting up and managing multiple nodes.

Clone the Multi-node setup script
First, clone our multi-node script to get started:

git clone https://github.com/PowerLoom/snapshotter-lite-multi-setup
Navigate to the directory & type the below command on your terminal:

```bash
cd snapshotter-lite-multi-setup
```
Setting Up the Environment
It is imperative to create an isolated virtual environment that includes the necessary Python version and modules. This approach ensures that the global Python installations on the VPS or your local machine are not altered.

Installing Pyenv
Follow the steps below to install pyenv. Open the terminal and execute the below command to install the required packages:

sudo apt install build-essential libssl-dev zlib1g-dev libbz2-dev libreadline-dev libsqlite3-dev curl libncursesw5-dev xz-utils tk-dev libxml2-dev libxmlsec1-dev libffi-dev liblzma-dev
After installing the packages, run the following command to execute the script for pyenv installation:

curl https://pyenv.run | bash
Next, add pyenv to the bashrc file:

cd
nano ~/.bashrc
Inside the nano editor, add the following lines at the end of the file:

export PATH="$HOME/.pyenv/bin:$PATH"
eval "$(pyenv init -)"
eval "$(pyenv virtualenv-init -)"
To save changes in the .bashrc file, press ctrl + o.

Refresh the terminal by typing:

source ~/.bashrc
Next, proceed to install Python 3.11.5:

pyenv install 3.11.5
Installing pyenv-virtualenv
Execute the commands below to install pyenv-virtualenv:

git clone https://github.com/pyenv/pyenv-virtualenv.git $(pyenv root)/plugins/pyenv-virtualenv
echo 'eval "$(pyenv virtualenv-init -)"' >> ~/.bashrc
pyenv virtualenv 3.11.5 ss_lite_multi_311
pyenv local ss_lite_multi_311
Executing the Setup
To establish a multi-node setup, follow these steps:

# Prepare the .env file
./init.sh
# Install all Python requirements
pip install -r requirements.txt
# Execute the setup
python multi_clone.py
When you execute python multi_clone.py, you will see the following prompts that guide you through setting up your node(s).

Terminate Existing containers: "Do you want to kill all running containers and screen sessions of testnet nodes? (y/n) n"
Type y. Use this option and stop all active containers or node instances. This will clean up all the older containers. Remember to cross-check your running containers before executing this command.
Custom Slot ID Deployment: "Do you want to deploy a custom index of slot IDs (indices begin at 0, enter in the format [begin, end])? (indices/n)"
For instance, to deploy the first four slot IDs as nodes, input [0, 3], where 0 is the start index, and 3 represents the fourth element in the slot ID array associated with the wallet holder. If you want to deploy the entire array of slot IDs, type n.
Deployment Batch Size: " Enter the batch size into which you wish to split the deployment"
A batch size of 1 means nodes will be deployed one by one, in batch size of 1. A batch size of 2 takes two nodes at a time and proceeds with deployment, and so on.
Following the setup prompts, the script will configure your node slots to run in separate screen sessions. To view the logs for a specific node slot, you can use the following commands:

To list all active screen sessions:

screen -ls
This command displays all currently running screen sessions.

screen-command

To attach to a specific node slot's screen session and check its status, use:

screen -r <screenId>
Note: Replace <screenId> with the actual ID of the screen session you wish to access.

To detach from the screen session and leave it running in the background, press Ctrl + A followed by D.

For more instructions and further assistance, please visit our multi-node setup repository.

Troubleshooting
If you encounter any issues, please refer to our Troubleshooting section for more information.
