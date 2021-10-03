import { ActionType } from "State/Actions/actionTypes";

export interface RegistrationModalAction {
    type: ActionType.SET_IS_REGISTRATION_MODAL_OPEN;
    payload: boolean;
}

interface SettingsModalAction {
    type: ActionType.SET_IS_SETTINGS_MODAL_OPEN;
    payload: boolean;
}

export type ModalAction = RegistrationModalAction | SettingsModalAction;
