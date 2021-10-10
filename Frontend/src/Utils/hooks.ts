import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { useContractCall, useEthers, useContractFunction } from "@usedapp/core";
import { BigNumber, Contract } from "ethers";
import { Interface } from "@ethersproject/abi";

import mediSysAbi from "Source/Contracts/MediSystem.json";
import { MediSys_Functions } from "Utils/smartContractUtils";

/**
 * The blockchain address of the MediSystem smart contract.
 *
 * After the deployment of the smart contract, the owner of the system (medicalvalues) should
 * update this constant to the address of the smart contract.
 */
const MEDISYSTEM_ADDRESS = "0x5f9ed66263815FE539c7a1935e53527aC23DF987";
const MEDI_SYSTEM_INTERFACE = new Interface(mediSysAbi.abi);

export const MEDICOIN_ADDRESS = "0xdE4CA82ee2a935Db8A1Baa950121B005b79A67B9";

/**
 * Returns the current URL's pathname without any subdirectories or query parameters.
 *
 * @return string current URL's pathname without any subdirectories or query parameters
 *
 * @example "/contribute-data/abc/def" -> "/contribute-data"
 */
export const usePage = () => {
    const location = useLocation();

    const [page, setPage] = useState(getPageFromPathname(location.pathname));

    useEffect(() => {
        setPage(getPageFromPathname(location.pathname));
    }, [location.pathname]);

    return page;
};

/**
 * Removes any optional subdirectories or query parameters from the pathname.
 *
 * @return string current URL's pathname without any subdirectories or query parameters
 *
 * @example "/contribute-data/abc/def" -> "/contribute-data"
 */
const getPageFromPathname = (pathname: string) => {
    const pathnameParts = pathname.split("/");

    return `/${pathnameParts[1]}`;
};

/**
 * Returns function from useDApp to connect the application with a browser wallet, like Metamask. In case of Metamask,
 * a popup-window will occur, asking for the accounts to be connected.
 *
 * @return function for connecting the application with a browser wallet.
 */
export const useConnectWallet = () => {
    const { activateBrowserWallet } = useEthers();

    return activateBrowserWallet;
};

const getViewportDimensions = () => {
    const { innerWidth: viewportWidth, innerHeight: viewportHeight } = window;

    return {
        viewportWidth,
        viewportHeight,
    };
};

export function useViewportDimensions() {
    const [viewportDimensions, setViewportDimensions] = useState(getViewportDimensions());

    useEffect(() => {
        const handleResize = () => {
            setViewportDimensions(getViewportDimensions());
        };

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return viewportDimensions;
}

export const useIsLoggedIn = () => {
    const { account } = useEthers();
    const myName = useMyName(account);

    return !!myName;
};

/**
 * Returns the username (ideally the real name) of the logged in user.
 *
 * @param account The ethereum account address of the currently logged in user.
 */
export const useMyName = (account: string | null | undefined) => {
    const [doctorsName]: any =
        useContractCall({
            abi: MEDI_SYSTEM_INTERFACE,
            address: MEDISYSTEM_ADDRESS,
            method: MediSys_Functions.GET_MY_NAME,
            args: [account],
        }) ?? [];

    return doctorsName ? `${doctorsName}` : doctorsName;
};

/**
 * This hook returns the value of the pending contribution, provided the user has one
 * (meaning a dataset has been and evaluated by the MediSystem contract).
 *
 * @param account The ethereum account address of the currently logged in user.
 *
 * @return string A string representation of the value of the pending dataset, expressed in amount of MediCoins.
 * @return null If the user currently has no pending data.
 */
export const useGetDatasetValue = (account: string | null | undefined) => {
    const [value, setValue] = useState<null | string>(null);

    const [datasetValue]: any =
        useContractCall({
            abi: MEDI_SYSTEM_INTERFACE,
            address: MEDISYSTEM_ADDRESS,
            method: MediSys_Functions.GET_DATASET_VALUE,
            args: [account],
        }) ?? [];

    useEffect(() => {
        if (!datasetValue) return;

        setValue(datasetValue.toString());
    }, [datasetValue]);

    return value;
};

/**
 * This hook returns the MediCoin balance of the user.
 *
 * @param account The ethereum account address of the currently logged in user.
 *
 * @return string string representation of the MediCoin balance of the currently logged in user.
 * @return null if the user is logged out or other errors occured.
 */
export const useGetMyMediCoinBalance = (account: string | null | undefined) => {
    const [value, setValue] = useState<null | string>(null);

    const [balance]: any =
        useContractCall({
            abi: MEDI_SYSTEM_INTERFACE,
            address: MEDISYSTEM_ADDRESS,
            method: MediSys_Functions.GET_MY_MEDICOIN_BALANCE,
            args: [account],
        }) ?? [];

    useEffect(() => {
        if (!balance && balance !== BigNumber.from(0)) return;

        setValue(balance.toString());
    }, [balance]);

    return value;
};

const contract = new Contract(MEDISYSTEM_ADDRESS, mediSysAbi.abi);

/**
 * This hook returns a function send, which should be used for setting the blockchain address of the MediCoin contract in the MediSystem contract.
 * The returned TransactionStatus object contains information about the transaction and can be used to monitor the transaction.
 *
 * @return {state: TransactionStatus, send: (...args: [any]) => Promise<void>} Object with fields state,
 *      a Object of type TransactionStatue, containing information about the transaction,
 *      and send, a function to call the function for setting the mediCoinAddress in the MediSystem smart contract.
 *      The blockchain address of the deployed MediCoin smart contract should be passed into the function.
 */
export const useSetMediCoinAddress = () => {
    const { state, send } = useContractFunction(contract, MediSys_Functions.SET_MEDICOIN_ADDRESS, {});

    return { state, send };
};

/**
 * This hook retrieves the address of the MediCoin contract on the blockchain.
 *
 * @return string The address of the MediCoin contract on the blockchain.
 * @return null If the address of the MediCoin contract is not set in the MediSystem contract.
 */
export const useGetMediCoinAddress = () => {
    const [contractAddress]: any =
        useContractCall({
            abi: MEDI_SYSTEM_INTERFACE,
            address: MEDISYSTEM_ADDRESS,
            method: MediSys_Functions.GET_MEDICOIN_ADDRESS,
            args: [],
        }) ?? [];

    return contractAddress ? `${contractAddress}` : null;
};

export const useGetIsOwner = (account: string | null | undefined) => {
    const [isOwner]: any =
        useContractCall({
            abi: MEDI_SYSTEM_INTERFACE,
            address: MEDISYSTEM_ADDRESS,
            method: MediSys_Functions.GET_IS_OWNER,
            args: [],
        }) ?? [];

    return `${isOwner}` === account;
};

export const useGetAllUnapprovedDoctors = () => {
    const [unapprovedDoctors] =
        useContractCall({
            abi: MEDI_SYSTEM_INTERFACE,
            address: MEDISYSTEM_ADDRESS,
            method: MediSys_Functions.GET_ALL_UNAPPROVED_DOCTORS,
            args: [],
        }) ?? [];

    console.log("unapprovedDoctors:");
    console.log(unapprovedDoctors);

    return unapprovedDoctors ? [...unapprovedDoctors] : null;
};

export const useGetAmIApproved = (account: string | null | undefined) => {
    const [amIApproved] =
        useContractCall({
            abi: MEDI_SYSTEM_INTERFACE,
            address: MEDISYSTEM_ADDRESS,
            method: "getIsIApproved",
            args: [account],
        }) ?? [];

    return amIApproved;
};

/**
 * This hook returns returns the function send and TransactionStatus object from useDapp's useContractFunction hook.
 * By passing in the name of the desired function in the MediSystem contract, using the returned send function will call it.
 *
 * @param functionName The name of the desired function in the MediSystem contract.
 *
 * @return {state: TransactionStatus, send: (...args: [any]) => Promise<void>} Object with fields state,
 *      a Object of type TransactionStatue, containing information about the transaction,
 *      and send, a function to call the desired function in the smart contract.
 */
export function useMediSysMethod(functionName: string) {
    const { state, send } = useContractFunction(contract, functionName, {});

    return { state, send };
}
