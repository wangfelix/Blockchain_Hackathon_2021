import React, { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import ReactModal from "react-modal";
import { batch, useDispatch, useSelector } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import {
    setDemoContribution,
    setDemoIndexOfContributingUser,
    setUserPanelContributionModalOpen,
} from "State/Actions/actionCreators";
import { RootState } from "State/Reducers";
import { Container } from "BaseComponents/container";
import { UserPanelContributionModalTopBar } from "Pages/DemoPage/Pages/DemoPageDemoPage/Components/UserPanelContributionModal/Components/userPanelContributionModalTopBar";
import { UserPanelContributionModalBottomBar } from "Pages/DemoPage/Pages/DemoPageDemoPage/Components/UserPanelContributionModal/Components/userPanelContributionModalBottomBar";
import { getUserPanelContributionModalStyle } from "Pages/DemoPage/Pages/DemoPageDemoPage/Components/UserPanelContributionModal/Utils/userPanelContributionModalHelper";
import { UserPanelContributionModalSuccessPart } from "Pages/DemoPage/Pages/DemoPageDemoPage/Components/UserPanelContributionModal/Components/userPanelContributionModalSuccessPart";
import { Colors } from "Utils/globalStyles";
import { UserPanelContributionModalConfigurationSlide } from "Pages/DemoPage/Pages/DemoPageDemoPage/Components/UserPanelContributionModal/Components/UserPanelContributionModalConfigurationSlide/userPanelContributionModalConfigurationSlide";
import { UserPanelConfigurationModalAlgorithmExplanationSlide } from "Pages/DemoPage/Pages/DemoPageDemoPage/Components/UserPanelContributionModal/Components/userPanelConfigurationModalAlgorithmExplanationSlide";
import { UserPanelContributionModalAssessmentSlide } from "Pages/DemoPage/Pages/DemoPageDemoPage/Components/UserPanelContributionModal/Components/userPanelContributionModalAssessmentSlide";

type SlideProps = {
    title?: string;
    content: ReactNode;
    primaryCtaLabel?: string;
};

export const UserPanelContributionModal = () => {
    const dispatch = useDispatch();

    // -- STATE --

    const isOpen = useSelector<RootState, boolean>((state) => state.modals.isUserPanelContributionModalOpen);

    const contributingUserIndex = useSelector<RootState, number | undefined>(
        (state) => state.demoPage.indexOfContributingUser
    );

    const [selectedSlide, setSelectedSlide] = useState(0);

    const [contentType, setContentType] = useState<"Carousel" | "SuccessPart">("Carousel");

    const [finalDatasetValue, setFinalDatasetValue] = useState<number>(0);

    const [diseaseName, setDiseaseName] = useState<string>("");

    // -- CALLBACKS --

    const handleCloseModal = () => {
        batch(() => {
            console.log(contentType);

            if (contentType === "Carousel") {
                dispatch(setDemoIndexOfContributingUser(undefined));
            }

            dispatch(setUserPanelContributionModalOpen(false));
            dispatch(setDemoContribution(undefined));
        });

        setSelectedSlide(0);
        setContentType("Carousel");
    };

    const handleGoToNextSlide = () =>
        isAtLastSlide ? setContentType("SuccessPart") : setSelectedSlide(selectedSlide + 1);

    const handleGoToDatasetConfigurationSlide = () => setSelectedSlide(0);

    // -- MEMOIZED DATA --

    const slides: SlideProps[] = useMemo(
        () => [
            { title: "Dataset", content: <UserPanelContributionModalConfigurationSlide /> },
            {
                title: "Value Evaluation",
                content: <UserPanelConfigurationModalAlgorithmExplanationSlide />,
            },
            {
                title: "Dataset Value",
                content: (
                    <UserPanelContributionModalAssessmentSlide
                        finalDatasetValue={finalDatasetValue}
                        setFinalDatasetValue={setFinalDatasetValue}
                        contributionDiseaseName={diseaseName}
                        setContributionDiseaseName={setDiseaseName}
                        handleGoToDatasetConfigurationSlide={handleGoToDatasetConfigurationSlide}
                    />
                ),
            },
        ],
        [diseaseName, finalDatasetValue]
    );

    // -- HELPER --

    const isAtLastSlide = selectedSlide === slides.length - 1;

    // -- STYLES --

    const modalStyles = getUserPanelContributionModalStyle(contentType);

    // -- RENDER --

    return (
        <ReactModal isOpen={isOpen} onRequestClose={handleCloseModal} style={modalStyles}>
            <Container
                styleProps={{
                    width: contentType === "Carousel" ? 800 : 650,
                    height: contentType === "Carousel" ? 600 : 600,
                    background: contentType === "Carousel" ? Colors.WHITE : "#16162e",
                    transition: "width 1s, height 1s, background 0.5s",
                    justifyContent: contentType === "SuccessPart" ? "center" : "flex-start",
                    alignItems: "center",
                }}
            >
                {contentType === "Carousel" ? (
                    <>
                        <UserPanelContributionModalTopBar
                            handleModalClose={handleCloseModal}
                            userIndex={contributingUserIndex}
                        />

                        <Carousel
                            selectedItem={selectedSlide}
                            showArrows={false}
                            showIndicators={false}
                            showStatus={false}
                            dynamicHeight={true}
                        >
                            {slides.map((slide) => (
                                <Container
                                    styleProps={{
                                        justifyContent: "center",
                                        alignItems: "center",
                                        height: "100%",
                                        margin: "auto 0",
                                        position: "relative",
                                    }}
                                >
                                    {slide.title && <h3 style={{ marginTop: 0, marginBottom: 40 }}>{slide.title}</h3>}

                                    <Container>{slide.content}</Container>
                                </Container>
                            ))}
                        </Carousel>

                        <UserPanelContributionModalBottomBar
                            value={selectedSlide}
                            setValue={setSelectedSlide}
                            handleGoToNextStep={handleGoToNextSlide}
                            ctaLabel={isAtLastSlide ? "Confirm Contribution" : "Next Step"}
                        />
                    </>
                ) : (
                    <UserPanelContributionModalSuccessPart
                        handleCloseModal={handleCloseModal}
                        finalDatasetValue={finalDatasetValue}
                    />
                )}
            </Container>
        </ReactModal>
    );
};

// TODO Move state finalatasetValue to Store
