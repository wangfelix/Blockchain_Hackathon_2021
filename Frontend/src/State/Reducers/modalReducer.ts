import { ModalAction } from "State/Actions/actions";
import { ActionType } from "State/Actions/actionTypes";

type ModalState = {
    isRegistrationModalOpen: boolean;
    isSettingsModalOpen: boolean;
    isUserPanelContributionModalOpen: boolean;
};

export const modalReducer = (
    state: ModalState = {
        isRegistrationModalOpen: false,
        isSettingsModalOpen: false,
        isUserPanelContributionModalOpen: false,
    },
    action: ModalAction
) => {
    switch (action.type) {
        case ActionType.SET_IS_REGISTRATION_MODAL_OPEN:
            return { ...state, isRegistrationModalOpen: action.payload };

        case ActionType.SET_IS_SETTINGS_MODAL_OPEN:
            return { ...state, isSettingsModalOpen: action.payload };

        case ActionType.SET_IS_USER_PANEL_CONTRIBUTION_MODAL_OPEN:
            return { ...state, isUserPanelContributionModalOpen: action.payload };

        default:
            return state;
    }
};
