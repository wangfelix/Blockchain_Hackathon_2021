import React, { ReactNode, useMemo, useState } from "react";
import ReactModal from "react-modal";
import { batch, useDispatch, useSelector } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import { setIndexOfContributingUser, setUserPanelContributionModalOpen } from "State/Actions/actionCreators";
import { RootState } from "State/Reducers";
import { UserPanelContributionModalMockupBrowserWindow } from "Pages/DemoPage/Components/UserPanelContributionModal/Components/userPanelContributionModalMockupBrowserWindow";
import { Text } from "BaseComponents/text";
import { Container } from "BaseComponents/container";
import { UserPanelContributionModalTopBar } from "Pages/DemoPage/Components/UserPanelContributionModal/Components/userPanelContributionModalTopBar";
import { UserPanelContributionModalBottomBar } from "Pages/DemoPage/Components/UserPanelContributionModal/Components/userPanelContributionModalBottomBar";
import { getUserPanelContributionModalStyle } from "Pages/DemoPage/Components/UserPanelContributionModal/Utils/userPanelContributionModalHelper";
import { UserPanelContributionModalSuccessPart } from "Pages/DemoPage/Components/UserPanelContributionModal/Components/userPanelContributionModalSuccessPart";
import { Colors } from "Utils/globalStyles";

type SlideProps = {
    title?: string;
    content: ReactNode;
};

export const UserPanelContributionModal = () => {
    const dispatch = useDispatch();

    // -- STATE --

    const isOpen = useSelector<RootState, boolean>((state) => state.modals.isUserPanelContributionModalOpen);

    const userIndex = useSelector<RootState, number | undefined>((state) => state.demoPage.indexOfContributingUser);

    const [selectedSlide, setSelectedSlide] = useState(0);

    const [contentType, setContentType] = useState<"Carousel" | "SuccessPart">("Carousel");

    // -- MEMOIZED DATA --

    const slides: SlideProps[] = useMemo(
        () => [
            { title: "Step 1", content: <Text>Load the dataset into the MediSystem Parser.</Text> },
            {
                content: (
                    <Container styleProps={{ padding: 20 }}>
                        <UserPanelContributionModalMockupBrowserWindow />
                    </Container>
                ),
            },
        ],
        []
    );

    // -- HELPER --

    const isAtLastSlide = selectedSlide === slides.length - 1;

    // -- CALLBACKS --

    const handleCloseModal = () => {
        batch(() => {
            dispatch(setIndexOfContributingUser(undefined));
            dispatch(setUserPanelContributionModalOpen(false));
        });

        setSelectedSlide(0);
        setContentType("Carousel");
    };

    const handleGoToNextStep = () =>
        isAtLastSlide ? setContentType("SuccessPart") : setSelectedSlide(selectedSlide + 1);

    // -- STYLES --

    const modalStyles = getUserPanelContributionModalStyle(contentType);

    // -- RENDER --

    return (
        <ReactModal isOpen={isOpen} onRequestClose={handleCloseModal} style={modalStyles}>
            <Container
                styleProps={{
                    width: contentType === "Carousel" ? 900 : 650,
                    height: contentType === "Carousel" ? 600 : 600,
                    background: contentType === "Carousel" ? Colors.WHITE : "#16162e",
                    transition: "width 1s, height 1s, background 0.5s",
                    justifyContent: contentType === "SuccessPart" ? "center" : "flex-start",
                    alignItems: "center",
                }}
            >
                {contentType === "Carousel" ? (
                    <>
                        <UserPanelContributionModalTopBar handleModalClose={handleCloseModal} userIndex={userIndex} />

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
                                    }}
                                >
                                    {slide.title && <h2 style={{ marginBottom: 30 }}>{slide.title}</h2>}

                                    <Container>{slide.content}</Container>
                                </Container>
                            ))}
                        </Carousel>

                        <UserPanelContributionModalBottomBar
                            value={selectedSlide}
                            setValue={setSelectedSlide}
                            handleGoToNextStep={handleGoToNextStep}
                        />
                    </>
                ) : (
                    <UserPanelContributionModalSuccessPart handleCloseModal={handleCloseModal} />
                )}
            </Container>
        </ReactModal>
    );
};
