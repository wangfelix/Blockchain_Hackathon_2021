import { Colors, BORDER_RADIUS } from "Styles/utils";

// -- CONSTANTS --

const BUTTON_PRIMARY_BACKGROUND = Colors.PRIMARY_ACCENT;
const BUTTON_PRIMARY_BORDER = Colors.PRIMARY_ACCENT;
const BUTTON_PRIMARY_FONT_COLOR = Colors.WHITE;
const BUTTON_SECONDARY_BACKGROUND = Colors.TRANSPARENT;
const BUTTON_SECONDARY_BORDER = Colors.PRIMARY_ACCENT;
const BUTTON_SECONDARY_FONT_COLOR = Colors.PRIMARY_ACCENT;

const BUTTON_HEIGHT = "36px";

// -- STYLES --

const commonButtonStyle = {
    paddingLeft: "20px",
    paddingRight: "20px",
    borderStyle: "solid",
    cursor: "pointer",
};

export const primaryButtonStyle = {
    ...commonButtonStyle,
    background: BUTTON_PRIMARY_BACKGROUND,
    color: BUTTON_PRIMARY_FONT_COLOR,
    height: BUTTON_HEIGHT,
    borderColor: BUTTON_PRIMARY_BORDER,
    borderRadius: BORDER_RADIUS,
};

export const secondaryButtonStyle = {
    ...commonButtonStyle,
    background: BUTTON_SECONDARY_BACKGROUND,
    color: BUTTON_SECONDARY_FONT_COLOR,
    height: BUTTON_HEIGHT,
    borderColor: BUTTON_SECONDARY_BORDER,
    borderRadius: BORDER_RADIUS,
};
