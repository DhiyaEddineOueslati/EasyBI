import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import { useGetKpisQuery } from "@/api/api";
import { Box, Button, Typography, useTheme } from "@mui/material";
import React, { useMemo, useState } from "react";
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import regression, { DataPoint } from "regression";
import Navbar from "@/pages/navbar";
import {withAuthenticationRequired} from "@auth0/auth0-react";
import Loading from "@/components/loading";

const Predictions = () => {
  const { palette } = useTheme();
  const [isPredictions, setIsPredictions] = useState(false);
  const { data: kpiData } = useGetKpisQuery();

  const formattedData = useMemo(() => {
    if (!kpiData) return [];
    const monthData = kpiData[0].monthlyData;

    const formatted: Array<DataPoint> = monthData.map(
        ({ revenue }, i: number) => {
          return [i, revenue];
        }
    );
    const regressionLine = regression.linear(formatted);

    return monthData.map(({ month, revenue }, i: number) => {
      return {
        name: month,
        "Revenu Réel": revenue,
        "Ligne de Régression": regressionLine.points[i][1],
        "Revenu Prédit": regressionLine.predict(i + 12)[1],
      };
    });
  }, [kpiData]);
    const screenshotBtnRef = React.useRef(null);
    const screenshotPreviewRef = React.useRef(null);
    const closeBtnRef = React.useRef(null);

    // useEffect to set up event listeners after the component is mounted
    React.useEffect(() => {
        const screenshotBtn = screenshotBtnRef.current;
        const screenshotPreview = screenshotPreviewRef.current;
        const closeBtn = closeBtnRef.current;

        const captureScreen = async () => {
            try {
                // asking permission to use a media input to record current tab
                const stream = await navigator.mediaDevices.getDisplayMedia({ preferCurrentTab: true });
                const video = document.createElement("video");

                video.addEventListener("loadedmetadata", () => {
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");
                    // passing video width & height as canvas width & height
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;

                    video.play(); // playing the video so the drawn image won't be black or blank
                    // drawing an image of the captured video stream
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                    stream.getVideoTracks()[0].stop(); // terminating first video track of the stream

                    // passing canvas data url as screenshot preview src
                    screenshotPreview.querySelector("img").src = canvas.toDataURL();
                    screenshotPreview.classList.add("show");
                });
                video.srcObject = stream; // passing capture stream data as video source object
            } catch (error) { // if image couldn't capture by any reason, then alert the msg
                alert("Failed to capture screenshot!");
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

        // Clean up event listeners when the component unmounts
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
      <DashboardBox width="100%" height="100%" p="1rem" overflow="hidden">
        <FlexBetween m="1rem 2.5rem" gap="1rem">
          <Box>
            <Typography variant="h3">Revenu et Prédictions</Typography>
            <Typography variant="h6">
              Revenu graphiqué et revenu prédit basé sur un modèle de régression
              linéaire simple
            </Typography>
          </Box>
          <Button
              onClick={() => setIsPredictions(!isPredictions)}
              sx={{
                color: palette.grey[900],
                backgroundColor: palette.grey[700],
                boxShadow: "0.1rem 0.1rem 0.1rem 0.1rem rgba(0,0,0,.4)",
              }}
          >
            Afficher le Revenu Prédit pour l'Année Prochaine
          </Button>
        </FlexBetween>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
              data={formattedData}
              margin={{
                top: 20,
                right: 75,
                left: 20,
                bottom: 80,
              }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={palette.grey[800]} />
            <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }}>
              <Label value="Mois" offset={-5} position="insideBottom" />
            </XAxis>
            <YAxis
                domain={[12000, 26000]}
                axisLine={{ strokeWidth: "0" }}
                style={{ fontSize: "10px" }}
                tickFormatter={(v) => `$${v}`}
            >
              <Label
                  value="Revenu en DT"
                  angle={-90}
                  offset={-5}
                  position="insideLeft"
              />
            </YAxis>
            <Tooltip />
            <Legend verticalAlign="top" />
            <Line
                type="monotone"
                dataKey="Revenu Réel"
                stroke={palette.primary.main}
                strokeWidth={0}
                dot={{ strokeWidth: 5 }}
            />
            <Line
                type="monotone"
                dataKey="Ligne de Régression"
                stroke="#8884d8"
                dot={false}
            />
            {isPredictions && (
                <Line
                    strokeDasharray="5 5"
                    dataKey="Revenu Prédit"
                    stroke={palette.secondary[500]}
                />
            )}
          </LineChart>
        </ResponsiveContainer>
          <button ref={screenshotBtnRef} id="src-btn">Capture Screenshot</button>
          <div className="src-preview" ref={screenshotPreviewRef}>
              <div className="screenshot">
                  <i id="close-btn"  ref={closeBtnRef} className="fa-solid fa-xmark"></i>
                  <img src="" alt="screenshot"/>
              </div>
          </div>
      </DashboardBox>
  );
};

export default withAuthenticationRequired(Predictions, {
  onRedirecting: () => <Loading />,
});
