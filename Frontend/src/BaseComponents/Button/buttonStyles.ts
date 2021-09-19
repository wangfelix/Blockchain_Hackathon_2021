import { Colors, BORDER_RADIUS, Z_INDEX } from "Utils/globalStyles";

// -- CONSTANTS --

const BUTTON_PRIMARY_BACKGROUND = Colors.PRIMARY_ACCENT;
const BUTTON_PRIMARY_BORDER = Colors.PRIMARY_ACCENT;
const BUTTON_PRIMARY_FONT_COLOR = Colors.WHITE_OFF_WHITE;

const BUTTON_SECONDARY_BACKGROUND = Colors.TRANSPARENT;
const BUTTON_SECONDARY_BORDER = Colors.PRIMARY_ACCENT;
const BUTTON_SECONDARY_FONT_COLOR = Colors.PRIMARY_ACCENT;

const BUTTON_TEXT_BACKGROUND = Colors.TRANSPARENT;
const BUTTON_TEXT_FONT_COLOR = Colors.WHITE_OFF_WHITE;

const BUTTON_HEIGHT = "36px";

// -- STYLES --

const commonButtonStyle = {
    paddingLeft: "20px",
    paddingRight: "20px",
    borderStyle: "solid",
    cursor: "pointer",
    fontWeight: "bold" as "bold",
    zIndex: Z_INDEX.BUTTON,
    height: BUTTON_HEIGHT,
    fontFamily: "Work Sans",
};

export const primaryButtonStyle = {
    ...commonButtonStyle,
    background: BUTTON_PRIMARY_BACKGROUND,
    color: BUTTON_PRIMARY_FONT_COLOR,
    borderColor: BUTTON_PRIMARY_BORDER,
    borderRadius: BORDER_RADIUS,
};

export const secondaryButtonStyle = {
    ...commonButtonStyle,
    background: BUTTON_SECONDARY_BACKGROUND,
    color: BUTTON_SECONDARY_FONT_COLOR,
    borderColor: BUTTON_SECONDARY_BORDER,
    borderRadius: BORDER_RADIUS,
};

export const textButtonStyle = {
    ...commonButtonStyle,
    borderStyle: "none",
    background: BUTTON_TEXT_BACKGROUND,
    color: BUTTON_TEXT_FONT_COLOR,
};
