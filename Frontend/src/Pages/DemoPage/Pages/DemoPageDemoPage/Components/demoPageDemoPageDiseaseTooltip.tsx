import React, { useEffect, useState } from "react";
import MaterialButton from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { useDispatch, useSelector } from "react-redux";
import { ClickAwayListener, TextField } from "@mui/material";

import { Container } from "BaseComponents/container";
import { BORDER_RADIUS, Colors, Z_INDEX } from "Utils/globalStyles";
import { Row } from "BaseComponents/row";
import { RootState } from "State/Reducers";
import { Disease } from "State/Reducers/demoPageReducer";
import DownArrow from "Illustrations/downArrow.png";
import { Button } from "BaseComponents/Button/button";
import { isEmptyString } from "Utils/utils";
import { addNewDisease, setDemoDiseaseBudget } from "State/Actions/actionCreators";

type DiseaseBudgetChangeType = {
    diseaseName: string;
    newBudget: number;
};

export const DemoPageDemoPageDiseaseTooltip = () => {
    const dispatch = useDispatch();

    // -- STATE --

    const [isTooltipOpen, setIsTooltipOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const diseases = useSelector<RootState, Disease[]>((state) => state.demoPage.diseases);

    // Add new disease

    const [isAddingNewDisease, setIsAddingNewDisease] = useState(false);
    const [newDiseaseName, setNewDiseaseName] = useState("");
    const [newDiseaseIsNameInvalid, setNewDiseaseIsNameInvalid] = useState(false);
    const [newDiseaseBudget, setNewDiseaseBudget] = useState("");
    const [newDiseaseIsBudgetInvalid, setNewDiseaseIsBudgetInvalid] = useState(false);

    const newDiseaseIsAllInputValid = !newDiseaseIsNameInvalid && !newDiseaseIsBudgetInvalid;

    // Edit Budgets

    const [isEditingBudgets, setIsEditingBudgets] = useState(false);
    const [diseaseBudgets, setDiseasBudgets] = useState<DiseaseBudgetChangeType[]>([]);

    // -- EFFECTS --

    useEffect(() => {
        if (isNaN(Number(newDiseaseBudget)) || isEmptyString(newDiseaseBudget)) {
            setNewDiseaseIsBudgetInvalid(true);
        } else {
            setNewDiseaseIsBudgetInvalid(false);
        }
    }, [newDiseaseBudget]);

    useEffect(() => {
        if (isEmptyString(newDiseaseName)) {
            setNewDiseaseIsNameInvalid(true);
        } else {
            setNewDiseaseIsNameInvalid(false);
        }
    }, [newDiseaseName]);

    // -- CALLBACKS --

    const handleAddNewDisease = () => {
        if (!isAddingNewDisease) {
            setIsAddingNewDisease(!isAddingNewDisease);
        } else {
            if (!newDiseaseIsAllInputValid) return; // TODO Toast Error

            const newDisease: Disease = {
                name: newDiseaseName,
                budget: Number(newDiseaseBudget),
                numberContributions: 0,
            };

            dispatch(addNewDisease(newDisease));

            resetAddingNewDisease();
        }
    };

    const handleCloseTooltip = () => {
        setIsTooltipOpen(false);
        resetAddingNewDisease();
        resetEditingBudgets();
    };

    const handleEditBudget = (diseaseName: string, newBudget: string) => {
        if (isNaN(Number(newBudget))) return;

        const diseaseBudgetWithoutChangingDisease = diseaseBudgets.filter(
            (disease) => disease.diseaseName !== diseaseName
        );

        setDiseasBudgets([
            ...diseaseBudgetWithoutChangingDisease,
            { diseaseName: diseaseName, newBudget: Number(newBudget) },
        ]);
    };

    const handleSaveEditedBudgets = () => {
        resetEditingBudgets();

        diseaseBudgets.forEach((disease) => {
            dispatch(setDemoDiseaseBudget(disease.diseaseName, disease.newBudget));
        });
    };

    // -- HELPERS -

    const resetAddingNewDisease = () => {
        setIsAddingNewDisease(false);
        setNewDiseaseName("");
        setNewDiseaseIsNameInvalid(true);
        setNewDiseaseBudget("");
        setNewDiseaseIsBudgetInvalid(true);
    };

    const resetEditingBudgets = () => {
        setIsEditingBudgets(false);
        setDiseasBudgets([]);
    };

    // -- RENDER --

    return (
        <Container
            styleProps={{
                top: 50,
                margin: "0 auto",
                zIndex: Z_INDEX.DEMO_PAGE_MODAL,
                position: "absolute",
                background: isHovered || isTooltipOpen ? "rgba(104,178,255,0.25)" : Colors.TRANSPARENT,
                borderRadius: BORDER_RADIUS,
                padding: "0 10px",
                transition: "background 0.3s",
            }}
            onMouseEnter={() => {
                setIsHovered(true);
                setIsTooltipOpen(true);
            }}
            onMouseLeave={() => setIsHovered(false)}
        >
            <ClickAwayListener onClickAway={handleCloseTooltip}>
                <div>
                    <Tooltip
                        disableHoverListener
                        open={isTooltipOpen}
                        title={
                            <>
                                <Container
                                    styleProps={{
                                        background: Colors.WHITE,
                                        borderRadius: BORDER_RADIUS,
                                        padding: "10px 0",
                                        color: Colors.PRIMARY_ACCENT_BLUE_HUE,
                                        fontFamily: "Work Sans",
                                        fontSize: 16,
                                        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                                        position: "relative",
                                        maxHeight: 500,
                                        gap: 5,
                                    }}
                                >
                                    <Row
                                        styleProps={{
                                            flexShrink: 0,
                                            justifyContent: "space-between",
                                            width: "100%",
                                            borderBottom: "solid 2px",
                                            borderColor: Colors.GREY_LIGHT,
                                            padding: "10px 0",
                                        }}
                                    >
                                        <Container
                                            styleProps={{
                                                width: "50%",
                                                alignItems: "center",
                                            }}
                                        >
                                            <b>Disease</b>
                                        </Container>

                                        <Container styleProps={{ width: "50%", alignItems: "center" }}>
                                            <b>Budget (in MDC)</b>
                                        </Container>
                                    </Row>

                                    <Container
                                        styleProps={{
                                            alignItems: "center",
                                            justifyContent: "center",
                                            margin: "0 auto",
                                            width: 500,
                                            overflow: "auto",
                                            display: "flex",
                                            padding: "20px",
                                        }}
                                    >
                                        {diseases.map((disease, index) => (
                                            <Row
                                                styleProps={{
                                                    justifyContent: "space-between",
                                                    width: "100%",
                                                    borderBottom: isAddingNewDisease
                                                        ? `solid 2px ${Colors.GREY_LIGHT}`
                                                        : index === diseases.length - 1
                                                        ? ""
                                                        : `solid 2px ${Colors.GREY_LIGHT}`,
                                                    padding: "10px 0",
                                                    minHeight: 42,
                                                }}
                                            >
                                                <Container
                                                    styleProps={{
                                                        width: "50%",
                                                        alignItems: "center",
                                                        borderRight: `solid 2px ${Colors.GREY_LIGHT}`,
                                                    }}
                                                >
                                                    {disease.name}
                                                </Container>

                                                <Container styleProps={{ width: "50%", alignItems: "center" }}>
                                                    {isEditingBudgets ? (
                                                        <TextField
                                                            id="new-disease-budget"
                                                            type="number"
                                                            variant="standard"
                                                            defaultValue={"" + disease.budget}
                                                            onChange={(e) =>
                                                                handleEditBudget(disease.name, e.target.value)
                                                            }
                                                            InputProps={{
                                                                style: {
                                                                    fontFamily: "Work Sans",
                                                                    color: Colors.PRIMARY_ACCENT_BLUE_HUE,
                                                                    height: 20,
                                                                    width: 100,
                                                                },
                                                            }}
                                                        />
                                                    ) : (
                                                        disease.budget.toFixed(2)
                                                    )}
                                                </Container>
                                            </Row>
                                        ))}

                                        {isAddingNewDisease && (
                                            <Row
                                                styleProps={{
                                                    justifyContent: "space-between",
                                                    width: "100%",
                                                    padding: "10px 0",
                                                }}
                                            >
                                                <Container
                                                    styleProps={{
                                                        width: "50%",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <TextField
                                                        id="filled-number"
                                                        label="Name"
                                                        error={newDiseaseIsNameInvalid}
                                                        InputLabelProps={{
                                                            shrink: true,
                                                            style: {
                                                                fontFamily: "Work Sans",
                                                                color: Colors.PRIMARY_ACCENT_BLUE_HUE,
                                                            },
                                                        }}
                                                        InputProps={{
                                                            style: {
                                                                fontFamily: "Work Sans",
                                                                color: Colors.PRIMARY_ACCENT_BLUE_HUE,
                                                                height: 20,
                                                            },
                                                        }}
                                                        value={newDiseaseName}
                                                        onChange={(e) => setNewDiseaseName(e.target.value)}
                                                        style={{ height: 40, padding: 0 }}
                                                        variant="standard"
                                                    />
                                                </Container>

                                                <Container styleProps={{ width: "50%", alignItems: "center" }}>
                                                    <TextField
                                                        id="new-disease-budget"
                                                        label="Budget"
                                                        type="number"
                                                        variant="standard"
                                                        value={newDiseaseBudget}
                                                        error={newDiseaseIsBudgetInvalid}
                                                        onChange={(e) => setNewDiseaseBudget(e.target.value)}
                                                        InputLabelProps={{
                                                            shrink: true,
                                                            style: {
                                                                fontFamily: "Work Sans",
                                                                color: Colors.PRIMARY_ACCENT_BLUE_HUE,
                                                            },
                                                        }}
                                                        InputProps={{
                                                            style: {
                                                                fontFamily: "Work Sans",
                                                                color: Colors.PRIMARY_ACCENT_BLUE_HUE,
                                                                height: 20,
                                                            },
                                                        }}
                                                    />
                                                </Container>
                                            </Row>
                                        )}
                                    </Container>

                                    <Row
                                        styleProps={{
                                            boxShadow: "rgba(120, 120, 120, 0.1) 0px -5px 10px 0px",
                                            padding: "5px 10px 0 10px",
                                            gap: 10,
                                        }}
                                    >
                                        {isAddingNewDisease || isEditingBudgets ? (
                                            <Button
                                                buttonType="text"
                                                styleProps={{ width: "100%" }}
                                                onClickHandle={() =>
                                                    isAddingNewDisease ? resetAddingNewDisease() : resetEditingBudgets()
                                                }
                                            >
                                                Cancel
                                            </Button>
                                        ) : (
                                            <Button
                                                buttonType="text"
                                                styleProps={{ width: "100%" }}
                                                onClickHandle={() => setIsEditingBudgets(true)}
                                            >
                                                Edit Budgets
                                            </Button>
                                        )}

                                        <Button
                                            buttonType="text"
                                            styleProps={{ width: "100%" }}
                                            onClickHandle={
                                                isEditingBudgets ? handleSaveEditedBudgets : handleAddNewDisease
                                            }
                                        >
                                            {isAddingNewDisease || isEditingBudgets ? "Save" : "Add Disease"}
                                        </Button>
                                    </Row>
                                </Container>
                            </>
                        }
                        placement="bottom"
                    >
                        <div>
                            <Row styleProps={{ justifyContent: "center", alignItems: "center", cursor: "pointer" }}>
                                <MaterialButton
                                    style={{ ...(isHovered || isTooltipOpen ? { color: Colors.WHITE_OFF_WHITE } : {}) }}
                                >
                                    Diseases and Budgets
                                </MaterialButton>
                                <img src={DownArrow} style={{ height: "22px" }} />
                            </Row>
                        </div>
                    </Tooltip>
                </div>
            </ClickAwayListener>
        </Container>
    );
};
