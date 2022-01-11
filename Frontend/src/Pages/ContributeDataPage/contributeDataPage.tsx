import React from "react";
import { Route, Switch } from "react-router-dom";
import { ContributeDataPageDataSetValueDetailsPage } from "Pages/ContributeDataPage/Pages/contributeDataPageDataSetValueDetailsPage";
import { ContributeDataPagePaths, Paths } from "Utils/paths";
import { ContributeDataPageFileSelectorPage } from "Pages/ContributeDataPage/Pages/contributeDataPageFileSelectorPage";

export const ContributeDataPage = () => (
    <Switch>
        <Route
            path={`${Paths.CONTRIBUTE_DATA_PAGE}${ContributeDataPagePaths.FILE_UPLOADER}`}
            component={ContributeDataPageFileSelectorPage}
        />
        <Route
            path={`${Paths.CONTRIBUTE_DATA_PAGE}${ContributeDataPagePaths.DATASET_VALUE_DETAILS_PAGE}`}
            component={ContributeDataPageDataSetValueDetailsPage}
        />
    </Switch>
);
