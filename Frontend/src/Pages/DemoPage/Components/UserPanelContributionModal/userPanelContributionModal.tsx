import React from "react";
import ReactModal from "react-modal";
import { useDispatch, useSelector } from "react-redux";

import { setUserPanelContributionModalOpen } from "State/Actions/actionCreators";
import { BORDER_RADIUS, Colors, Z_INDEX } from "Utils/globalStyles";
import { RootState } from "State/Reducers";
import { UserPanelContributionModalMockupBrowserWindow } from "Pages/DemoPage/Components/UserPanelContributionModal/Components/userPanelContributionModalMockupBrowserWindow";

export const UserPanelContributionModal = () => {
    const dispatch = useDispatch();

    // -- STATE --

    const isOpen = useSelector<RootState, boolean>((state) => state.modals.isUserPanelContributionModalOpen);

    // -- CALLBACKS --

    const handleModalClose = () => dispatch(setUserPanelContributionModalOpen(false));

    // -- RENDER --

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={handleModalClose}
            style={{
                content: {
                    background: Colors.WHITE,
                    border: "none",
                    borderRadius: BORDER_RADIUS,
                    maxWidth: "900px",
                    overflow: "hidden",
                    padding: "25px",
                    position: "relative",
                    width: "100%",
                    // height: "600px",
                    // boxShadow: "0 0 20px 10px rgba(180, 180, 180, 0.5)",
                    top: 0,
                    right: 0,
                    left: 0,
                    bottom: 0,
                },
                overlay: {
                    padding: 16,
                    alignItems: "center",
                    background: "rgba(200, 195, 215, 0.5)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    position: "fixed",
                    zIndex: Z_INDEX.DEMO_PAGE_MODAL,
                },
            }}
        >
            <UserPanelContributionModalMockupBrowserWindow />
        </ReactModal>
    );
};
