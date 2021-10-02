import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { useContractCall, useEthers, useContractFunction } from "@usedapp/core";
import { Contract } from "ethers";
import { Interface } from "@ethersproject/abi";
import mediSysAbi from "Source/Contracts/MediSystem.json";

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

const simpleContractInterface = new Interface(mediSysAbi.abi);

export const useMyName = (account: string | null | undefined) => {
    const [doctorsName]: any =
        useContractCall({
            abi: simpleContractInterface,
            address: "0xed4685AE45E1004c9dF65d26E0552709E3308893",
            method: "getMyName",
            args: [account],
        }) ?? [];

    useEffect(() => {
        return doctorsName;
    }, [doctorsName]);

    return doctorsName;
};

const contract = new Contract("0xed4685AE45E1004c9dF65d26E0552709E3308893", mediSysAbi.abi);

export function useMediSysMethod(functionName: string) {
    const { state, send } = useContractFunction(contract, functionName, {});

    return { state, send };
}
