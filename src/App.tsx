import { useState, useRef, useEffect } from "react";
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaDownload,
  FaExpand,
  FaCompress,
} from "react-icons/fa";
const image =
  "../src/assets/Black and Purple Digital Glitch Tech YouTube Banner.png";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.muted = isMuted;
        videoRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            setIsLoading(false);
          })
          .catch((error) => {
            console.error("Autoplay was prevented:", error);
            setIsLoading(false);
          });
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [isMuted]);

  const videoUrl =
    "https://res.cloudinary.com/djby1yfko/video/upload/v1727768666/ferwell_zm2s47.mp4";

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.error("Play was prevented:", error);
          });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMuteUnmute = () => {
    if (videoRef.current) {
      const isCurrentlyMuted = videoRef.current.muted;
      videoRef.current.muted = !isCurrentlyMuted;
      setIsMuted(!isCurrentlyMuted);
    }
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = videoUrl;
    link.download = "carnival_craze_video.mp4";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFullScreen = () => {
    if (!isFullScreen) {
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen();
      } else if (containerRef.current?.webkitRequestFullscreen) {
        /* Safari */
        containerRef.current.webkitRequestFullscreen();
      } else if (containerRef.current?.msRequestFullscreen) {
        /* IE11 */
        containerRef.current.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        /* Safari */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        /* IE11 */
        document.msExitFullscreen();
      }
    }
    setIsFullScreen(!isFullScreen);
  };

  return (
    <>
      <div
        className={`w-full h-screen  items-center bg-orange-950 gap-3 overflow-auto justify-start flex flex-col`}
      >
        <h1 className="text-4xl font-mainFont text-center  font-bold m-5">
          CARNIVAL CRAZE 2K24
        </h1>
        <div className="w-full flex justify-center items-center rounded-lg">
          <div
            ref={containerRef}
            className="aspect-[9/16] pb-8 w-80 sm:w-96 rounded-lg relative"
          >
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
                <div className="loader border-t-4 border-orange-600 w-12 h-12 rounded-full animate-spin"></div>
              </div>
            )}

            <video
              className="w-full rounded-lg"
              muted={isMuted}
              playsInline
              loop
              ref={videoRef}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              <source src={videoUrl} type="video/mp4" />
              Sorry, your browser doesn't support videos.
            </video>

            <div className="flex flex-col bg-transparent w-full gap-3 mt-2">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handlePlayPause}
                  className="text-white w-full bg-orange-600 py-2 font-bold rounded-lg flex items-center justify-center gap-2 transition hover:bg-orange-700"
                >
                  {isPlaying ? (
                    <>
                      <FaPause /> Pause
                    </>
                  ) : (
                    <>
                      <FaPlay /> Play
                    </>
                  )}
                </button>
                <button
                  onClick={handleMuteUnmute}
                  className="text-white w-full bg-orange-600 py-2 font-bold rounded-lg flex items-center justify-center gap-2 transition hover:bg-orange-700"
                >
                  {isMuted ? (
                    <>
                      <FaVolumeMute /> Unmute
                    </>
                  ) : (
                    <>
                      <FaVolumeUp /> Mute
                    </>
                  )}
                </button>
              </div>
              <button
                onClick={handleFullScreen}
                className="text-white bg-gray-800 py-2 font-bold rounded-lg flex items-center justify-center gap-2 transition hover:bg-gray-900"
              >
                {isFullScreen ? (
                  <>
                    <FaCompress /> Exit Full Screen
                  </>
                ) : (
                  <>
                    <FaExpand /> Full Screen
                  </>
                )}
              </button>
              <button
                onClick={handleDownload}
                className="text-white bg-black py-2 font-bold rounded-lg flex items-center justify-center gap-2 transition hover:bg-gray-800"
              >
                <FaDownload /> Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
