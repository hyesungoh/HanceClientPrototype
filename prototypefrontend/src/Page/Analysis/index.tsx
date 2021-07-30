import { useRef } from "react";
import { useState } from "react";
import Webcam from "react-webcam";
import styled, { CSSProperties } from "styled-components";
import ReactPlayer from "react-player";
import { Button } from "@material-ui/core";

import Controllers from "Components/Analysis/Controller";
import weride2VideoSrc from "Static/Video/weride2.mp4";

const Analysis = () => {
    const youtubeRef = useRef<ReactPlayer>(null);
    const userVideoRef = useRef<ReactPlayer>(null);

    const [playing, setPlaying] = useState<boolean>(true);
    const [following, setFollowing] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState<number>(0);

    const onProgress = (state: {
        played: number;
        playedSeconds: number;
        loaded: number;
        loadedSeconds: number;
    }) => {
        setCurrentTime(state.playedSeconds);
    };

    const WebcamStyle: CSSProperties = {
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        objectFit: "cover",
        opacity: "0.5",
    };

    return (
        <Wrapper>
            <VideoSection>
                <VideoWrapper>
                    <ReactPlayer
                        ref={youtubeRef}
                        url="https://www.youtube.com/watch?v=SZ0UU3Ud3m0"
                        playing={playing}
                        progressInterval={200}
                        volume={0}
                        onProgress={onProgress}
                        config={{
                            youtube: {
                                playerVars: {
                                    showinfo: 0,
                                    controls: 0,
                                    disablekb: 1,
                                    modestbranding: 1
                                },
                            },
                        }}
                    />
                    {following && <Webcam style={WebcamStyle} />}2
                </VideoWrapper>
                <VideoWrapper>
                    <ReactPlayer
                        ref={userVideoRef}
                        url={weride2VideoSrc}
                        playing={playing}
                        progressInterval={200}
                        volume={0}
                    />
                    {following && <Webcam style={WebcamStyle} />}
                </VideoWrapper>
            </VideoSection>

            <ControllerWrapper>
                <Controllers
                    currentTime={currentTime}
                    setCurrentTime={setCurrentTime}
                    endTime={18}
                    youtubeRef={youtubeRef}
                    userVideoRef={userVideoRef}
                />

                <ControllerBtnWrapper>
                    <Button
                        variant="contained"
                        onClick={() => {
                            setPlaying(!playing);
                        }}
                    >
                        Start/Stop
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => {
                            setFollowing(!following);
                        }}
                    >
                        따라하기
                    </Button>
                </ControllerBtnWrapper>
            </ControllerWrapper>
        </Wrapper>
    );
};

export default Analysis;

const Wrapper = styled.main`
    width: 100vw;
    height: 100vh;

    display: flex;
    align-items: center;
    flex-direction: column;
`;

const VideoSection = styled.section`
    width: 100%;
    display: flex;
    justify-content: center;
`;

const VideoWrapper = styled.div`
    position: relative;
    width: 400px;
    height: 80vh;
    overflow: hidden;

    & > * {
        position: absolute;
        top: 0;
        left: 0;
        width: 100% !important;
        height: 100% !important;
    }
`;

const ControllerWrapper = styled.div`
    width: 80vw;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ControllerBtnWrapper = styled.div`
    display: flex;
    gap: 12px;
`;
