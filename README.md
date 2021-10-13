# Blockchain_Hackathon_2021

## Table of Contents
[[_TOC_]]

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

    This will start a webpack development server. You can access the programm on localhost:8080
