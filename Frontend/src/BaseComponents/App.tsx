import React, { ReactNode } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ChainId, Config, DAppProvider } from "@usedapp/core";

import { LandingPage } from "Pages/LandingPage/landingPage";
import { BasePage } from "BaseComponents/basePage";
import { ContributeDataPage } from "Pages/ContributeDataPage/contributeDataPage";
import { Paths } from "Utils/paths";

export const App = () => {
    // -- CONST DATA --

    const config: Config = {
        readOnlyChainId: ChainId.Localhost,
        readOnlyUrls: {
            [ChainId.Localhost]: "HTTP://127.0.0.1:7545",
        },
    };

    // -- RENDER --

    return (
        <BrowserRouter>
            <DAppProviderWrapper config={config}>
                <BasePage>
                    <Switch>
                        <Route path={Paths.CONTRIBUTE_DATA_PAGE} component={ContributeDataPage} />

                        <Route path={Paths.ACCOUNT_AND_HISTORY} component={TestPage} />

                        <Route path={Paths.DEMO} component={TestPage} />

                        <Route path={Paths.LANDING_PAGE} component={LandingPage} />

                        <Route component={ErrorPage} />
                    </Switch>
                </BasePage>
            </DAppProviderWrapper>
        </BrowserRouter>
    );
};

type DAppProviderWrapperProps = {
    config: Config;
    children: ReactNode;
};
const DAppProviderWrapper = ({ children, config }: DAppProviderWrapperProps) => (
    // TODO Styling, add Loading Indicator for inital Load
    <DAppProvider config={config}>{children}</DAppProvider>
);

// TODO REMOVE
const TestPage = () => (
    <>
        <div>Test!</div>
    </>
);

const ErrorPage = () => <>404</>;
