import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { useEthers } from "@usedapp/core";

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
