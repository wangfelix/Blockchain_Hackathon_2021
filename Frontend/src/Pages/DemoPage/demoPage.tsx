import React from "react";
import { Route, Switch } from "react-router-dom";

import { DemoPagePaths, Paths } from "Utils/paths";
import { DemoPageDemoPage } from "Pages/DemoPage/Pages/DemoPageDemoPage/demoPageDemoPage";
import { DemoPageIntroPage } from "Pages/DemoPage/Pages/DemoPageIntroPage/demoPageIntroPage";

export const DemoPage = () => {
    return (
        <Switch>
            <Route path={`${Paths.DEMO_PAGE}${DemoPagePaths.DEMO_PAGE}`} component={DemoPageDemoPage} />
            <Route component={DemoPageIntroPage} />
        </Switch>
    );
};
