import { Box, useMediaQuery } from "@mui/material";
import Row1 from "./Row1";
import Row2 from "./Row2";
import Row3 from "./Row3";
import React from "react";
import {withAuthenticationRequired} from "@auth0/auth0-react";
import Loading from "@/components/loading";
import "@/components/style.css"
const gridTemplateLargeScreens = `
  "a b c"
  "a b c"
  "a b c"
  "a b f"
  "d e f"
  "d e f"
  "d h i"
  "g h i"
  "g h j"
  "g h j"
`;
const gridTemplateSmallScreens = `
  "a"
  "a"
  "a"
  "a"
  "b"
  "b"
  "b"
  "b"
  "c"
  "c"
  "c"
  "d"
  "d"
  "d"
  "e"
  "e"
  "f"
  "f"
  "f"
  "g"
  "g"
  "g"
  "h"
  "h"
  "h"
  "h"
  "i"
  "i"
  "j"
  "j"
`;

const Dashboard = () => {
    const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)");


    const screenshotBtnRef = React.useRef(null);
    const screenshotPreviewRef = React.useRef(null);
    const closeBtnRef = React.useRef(null);


    React.useEffect(() => {
        const screenshotBtn = screenshotBtnRef.current;
        const screenshotPreview = screenshotPreviewRef.current;
        const closeBtn = closeBtnRef.current;

        const captureScreen = async () => {
            try {

                const stream = await navigator.mediaDevices.getDisplayMedia({ preferCurrentTab: true });
                const video = document.createElement("video");

                video.addEventListener("loadedmetadata", () => {
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");

                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;

                    video.play();

                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                    stream.getVideoTracks()[0].stop();


                    screenshotPreview.querySelector("img").src = canvas.toDataURL();
                    screenshotPreview.classList.add("show");
                });
                video.srcObject = stream;
            } catch (error) {
                alert("Pas de capture");
            }
        };

        const handleCloseClick = () => {
            if (screenshotPreview) {
                screenshotPreview.classList.toggle("show");
            }
        };

        // Attach event listeners
        if (screenshotBtn) {
            screenshotBtn.addEventListener("click", captureScreen);
        }

        if (closeBtn) {
            closeBtn.addEventListener("click", handleCloseClick);
        }


        return () => {
            if (screenshotBtn) {
                screenshotBtn.removeEventListener("click", captureScreen);
            }

            if (closeBtn) {
                closeBtn.removeEventListener("click", handleCloseClick);
            }
        };
    }, []);

    return (
        <Box
            width="100%"
            height="100%"
            display="grid"
            gap="1.5rem"
            sx={
                isAboveMediumScreens
                    ? {
                        gridTemplateColumns: "repeat(3, minmax(370px, 1fr))",
                        gridTemplateRows: "repeat(10, minmax(60px, 1fr))",
                        gridTemplateAreas: gridTemplateLargeScreens,
                    }
                    : {
                        gridAutoColumns: "1fr",
                        gridAutoRows: "80px",
                        gridTemplateAreas: gridTemplateSmallScreens,
                    }
            }
        >
            *
            <Row1 />
            <Row2 />
            <Row3 />
            <button ref={screenshotBtnRef} id="src-btn">Capture Screenshot</button>
            <div className="src-preview" ref={screenshotPreviewRef}>
                <div className="screenshot">
                    <i id="close-btn"  ref={closeBtnRef} className="fa-solid fa-xmark"></i>
                    <img src="" alt="screenshot"/>
                </div>
            </div>
        </Box>
    );
};

export default withAuthenticationRequired(Dashboard, {
    onRedirecting: () => <Loading />,
});