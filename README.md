# Blockchain Hackathon 2021 - Medi-System


#### Table of Contents
[[_TOC_]]


<br></br>

## About Medi-System

## Installation

- Prerequisites
    1. Git
    2. Node.js for using the Node package manager.
    3. Google Chrome or any other chromium browser, like Brave or Edge.

1. **Clone the project** to any directory by running 
    ```
    $ git clone https://git.scc.kit.edu/urtma/blockchain_hackathon_2021.git
    ```

2. <details><summary>Install Dependencies</summary>

    1. In your terminal, navigate to the root direcotry of the project `blockchain_hackathon_2021` and run
        ```
        $ npm i
        ```
        to install the dependencies.

    2. In your terminal, navigate to the directory `blockchain_hackathon_2021/Frontend` and run
        ```
        $ npm i
        ```
        to install all frontend dependencies.
    </details>

3. <details><summary>Install and configure Ganache</summary>

    1. Install ganache from https://www.trufflesuite.com/ganache and create an Ethereum workspace. Using the **QUICKSTART** option will also work. Ganache provides a local ethereum blockchain, where we can deploy our smart-contracts for testing and demonstration purposes.

    2. In your workspace, click on the settings icon in the upper right corner and add the `truffle-config.js` file of the project to the **TRUFFLE PROJECTS** list.
    
    3. Click **SAVE AND RESTART** in the upper right corner to save the changes and restart the ganache instance. 
    </details>

4. **Deploy the smart contracts** by navigating to the root project folder `blockchain_hackathon_2021` in your terminal and running
    ```
    $ truffle migrate
    ```
    This will deploy the contracts to the local blockchain and build the application binary interfaces for the frontend to `blockchain_hackathon_2021/Frontend/src/Contracts`.

5. Open the file `hooks.ts` which can be found in `blockchain_hackathon_2021/Frontend/src/Utils/`. At the top, you will find a constant named `MEDISYSTEM_ADDRESS`. Open the **Contracts** tab in Ganache and paste the address of the MediSystem smart contract into `MEDISYSTEM_ADDRESS`.
    ```typescript
    // hooks.ts

    //...

    const MEDISYSTEM_ADDRESS = "0xF45ca895F618A6dB3680E71E7dD405e9A3b517F0";

    //...
    ```

6. <details><summary>Install and Configure Metamask</summary>

    1. Install the Metamask browser extension from https://metamask.io/ and register/login.

    2. Under Settings, add a new Network. Input http://127.0.0.1:7545 as URL and 1337 as ChainId.
</details>

7. **Start the frontend client** by navigating to `blockchain_hackathon_2021/Frontend` and running
    ```
    $ npm run build
    ```

    This will start a webpack development server. You can access the programm on `localhost:8080`.

<br></br>

## Using Medi-System

>**Notice: If you want to use the MediSystem web-application, please note that it has only been tested with Chromium based browsers. Using other browsers like Firefox, Safari or Internet Explorer can cause problems.**

### Landing Page
On the landing-page, you will be able to read more about the program. If you are not logged in or registered, you can do so by clicking the **Getting Started** button.

___

### Demo Page
On the demo-page, you can see a animated and interactive demonstration of what Medi-System. This page is solely for demonstration purposes and does not connect to any network or blockchain instance.

___

### Login System

>Notice: In the following, we will talk about accounts rather than users, as one user may have multiple accounts, conected to the website via metamask.

When first accessing Medi-Systems on `localhost:8080` you will be able to access the **landing-page** and the **demo-page**. After log-in, you will be access the tabs **Contributed-Data** and **Account and Hisstory**.

There are three states of the login-system, where the account can be situated. These are as follow:

| Logged out | Registered but not approved | Logged In |
| ---      | ---      | ---      |
| Account in Metamask is not connected to Medi-System | Account in Metamask is connected to Medi-System, Name has been registered but account has not been approved. | Account in Metamask is connected to Medi-System, Name has been registered and account has been approved |

#### Login and Registration
To login or register, either click on the `login` button in top right corner of the navigation bar, or, when currently on the landin page, on the `Getting Started` button in the center of the screen. This will trigger a modal to pop up, asking you to connect to your browser wallet, in our case Metamask. Click on `Connect with Metamask` to trigger the Metamaskpop up, which will ask you to choose an account to connect to the website. After the wallet has successfully connected to the web site, the Modal disappears.

If this is the first time the selected account is connecting to the website, a second modal will appear, asking for the name of the user. This is part of the registration process. Submitting the name will call the function `registerDoctor` in the MediSystem smart contract. 

#### Logout
Currently there seems to be a problem with _web3.js_, where disconnecting the wallet programmatically does not work. To log out properly, we recommend opening Metamask, clicking on the _kebab menu_, and then on _connected sites_. Now click on the _trashcan icon_ to disconnect the selected account from the Medi-Systems web application. If you wish to log in again, see the section [Login and Registration](#login-and-registration).

For more information, see the github issues:
- https://github.com/NoahZinsmeister/web3-react/issues/228
- https://github.com/EthWorks/useDApp/issues/273

#### Switching between Accounts
For testing purposes, it is helpful to import multiple accounts from the local Ganache instance into Metamask and switch between them between transactions. To properly switch accounts, it is currently needed to [log out](#logout) properly, before selecting a different account in Metamask and logging in again.

___

### Contributing Datasets

To contribute datasets, navigate to the **Contribute Data Page** using the navigation bar.
First, specify the disease your dataset is providing data for. In the future, this will be a searchable dropdown menu, so that duplicated disease names for a single disease will be avoided.

Underneath the input field, there is a droppable area, where you can drag and drop your dataset. Alternatively, click on the area to select the file via the file exporer. Please note, that only csv files are supported.

When the name of the disease and the dataset are provided, a button labelled `Calculate Value` will appear. Clicking it will call the 

___ 

### Admin Rights

To use the admin rights, the **Admin Panel** must be accessed. Especially the approve of newly registered participants in the network (e.g. doctors) is important. As an admin you only have to press the approve button on the admin page. If this is done, the participant can get paid for contributing datasets in Medicoins.

___ 

## Future Steps

- clean up solidity code, remove redundant methods
- Hook up Account & History page to the smart contract
- Set up a local server that moves all contributed csv-files to a local directory, and then serves them to the fronted via an API, so that the history page can analyze them to show details of previous contributions in the Details Pane.
