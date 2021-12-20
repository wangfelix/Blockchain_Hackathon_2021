import React, { ReactNode } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { ChainId, Config, DAppProvider } from "@usedapp/core";

import { LandingPage } from "Pages/LandingPage/landingPage";
import { BasePage } from "BaseComponents/basePage";
import { ContributeDataPage } from "Pages/ContributeDataPage/contributeDataPage";
import { Paths } from "Utils/paths";
import { store } from "State/store";
import { AccountAndHistoryPage } from "Pages/AccountAndHistoryPage/accountAndHistoryPage";
import { AdminPage } from "Pages/AdminPage/adminPage";
import { DemoPage } from "Pages/DemoPage/demoPage";

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
                <Provider store={store}>
                    <BasePage>
                        <Switch>
                            <Route path={Paths.CONTRIBUTE_DATA_PAGE} component={ContributeDataPage} />

                            <Route path={Paths.ACCOUNT_AND_HISTORY_PAGE} component={AccountAndHistoryPage} />

                            <Route path={Paths.DEMO_PAGE} component={DemoPage} />

                            <Route path={Paths.ADMIN_PAGE} component={AdminPage} />

                            <Route path={Paths.LANDING_PAGE} component={LandingPage} />

                            <Route component={ErrorPage} />
                        </Switch>
                    </BasePage>
                </Provider>
            </DAppProviderWrapper>
        </BrowserRouter>
    );
};

type DAppProviderWrapperProps = {
    config: Config;
    children: ReactNode;
};
const DAppProviderWrapper = ({ children, config }: DAppProviderWrapperProps) => (
    // TODO Styling, add Loading Indicator for initial Load
    <DAppProvider config={config}>{children}</DAppProvider>
);

const ErrorPage = () => <>404</>;
