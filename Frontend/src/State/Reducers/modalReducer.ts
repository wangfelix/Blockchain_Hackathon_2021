import { ModalAction } from "State/Actions/actions";
import { ActionType } from "State/Actions/actionTypes";

type ModalState = {
    isRegistrationModalOpen: boolean;
    isSettingsModalOpen: boolean;
};

export const modalReducer = (
    state: ModalState = { isRegistrationModalOpen: false, isSettingsModalOpen: false },
    action: ModalAction
) => {
    switch (action.type) {
        case ActionType.SET_IS_REGISTRATION_MODAL_OPEN:
            return { ...state, isRegistrationModalOpen: action.payload };

        case ActionType.SET_IS_SETTINGS_MODAL_OPEN:
            return { ...state, isSettingsModalOpen: action.payload };

        default:
            return state;
    }
};
