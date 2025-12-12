import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../redux/store";

type Props = {
  videoUrl: string;
  title: string;
};

const CoursePlayer: FC<Props> = ({ videoUrl }) => {
  console.log("video url in courseplayer", videoUrl);
  const [videoData, setVideoData] = useState({
    otp: "",
    playbackInfo: "",
  });
  const [isClient, setIsClient] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && videoUrl) {
      setLoading(true);
      setError(null);
      axios
        .post(`${server}/getVdoCipherOTP`, {
          videoId: videoUrl,
        })
        .then((res) => {
          console.log("player info", res);
          setVideoData(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching video OTP:", error);
          setError(error.response?.data?.message || "Failed to load video player");
          setLoading(false);
        });
    }
  }, [videoUrl, isClient]);

  // Only render on client side to prevent hydration errors
  if (!isClient) {
    return (
      <div style={{ position: "relative", paddingTop: "56.25%", overflow: "hidden" }}>
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "#f0f0f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#666"
        }}>
          Loading video player...
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: "relative", paddingTop: "56.25%", overflow: "hidden" }}>
      {videoData.otp && videoData.playbackInfo && !error && (
        <iframe
          src={`https://player.vdocipher.com/v2/?otp=${videoData?.otp}&playbackInfo=${videoData.playbackInfo}&player=3oUGdRVv0ReaBczA`}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: 0,
          }}
          allowFullScreen={true}
          allow="encrypted-media"
        ></iframe>
      )}
      {loading && (
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "#f0f0f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#666"
        }}>
          Loading video player...
        </div>
      )}
      {error && (
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "#ffebee",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#c62828",
          flexDirection: "column",
          padding: "20px",
          textAlign: "center"
        }}>
          <div style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>
            Video Player Error
          </div>
          <div>{error}</div>
          <div style={{ fontSize: "14px", marginTop: "10px", color: "#666" }}>
            Please check your video configuration or contact support.
          </div>
        </div>
      )}
      {!loading && !error && !videoData.otp && videoUrl && (
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "#f0f0f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#666"
        }}>
          Preparing video...
        </div>
      )}
      {!videoUrl && (
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "#f0f0f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#666"
        }}>
          No video available
        </div>
      )}
    </div>
  );
};

export default CoursePlayer;
