import { ActionType } from "State/Actions/actionTypes";

export const setRegistrationModalOpen = (isOpen: boolean) => {
    return { type: ActionType.SET_IS_REGISTRATION_MODAL_OPEN, payload: isOpen };
};

export const setSettingsModalOpen = (isOpen: boolean) => {
    return { type: ActionType.SET_IS_SETTINGS_MODAL_OPEN, payload: isOpen };
};
