import { useState, useRef, useEffect } from "react";
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaDownload,
} from "react-icons/fa"; // Importing icons from react-icons

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false); // For managing mute state
  const [isLoading, setIsLoading] = useState(true); // For showing the loader initially
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Show loader for 1 second, then attempt to play the video
    const timer = setTimeout(() => {
      if (videoRef.current) {
        // Play the video with muted sound first
        videoRef.current.muted = isMuted;
        videoRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            setIsLoading(false); // Hide loader once video starts playing
          })
          .catch((error) => {
            console.error("Autoplay was prevented:", error);
            setIsLoading(false); // Hide loader even if autoplay is blocked
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
      setIsMuted(!isCurrentlyMuted); // Update state based on new mute status
    }
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = videoUrl;
    link.download = "carnival_craze_video.mp4"; // Suggested filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="w-full h-screen bg-orange-950 items-center gap-8 overflow-auto justify-start flex flex-col">
        <h1 className="text-4xl text-center text-orange-500 font-bold m-5 ">
          CARNIVAL CRAZE 2K24
        </h1>
        <div className="w-full flex justify-center items-center rounded-lg ">
          <div className="aspect-[9/16] w-10/12 rounded-lg relative">
            {/* Loader */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
                <div className="loader border-t-4 border-orange-600 w-12 h-12 rounded-full animate-spin"></div>
              </div>
            )}

            <video
              className="w-full"
              muted={isMuted} // Sync mute state with the video
              playsInline
              loop
              ref={videoRef}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              <source src={videoUrl} type="video/mp4" />
              Sorry, your browser doesn't support videos.
            </video>

            <div className="flex flex-col w-full gap-3 mt-2">
              <button
                onClick={handlePlayPause}
                className="text-white bg-orange-600 py-2 font-bold rounded-lg flex items-center justify-center gap-2"
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
                className="text-white bg-orange-600 py-2 font-bold rounded-lg flex items-center justify-center gap-2"
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
              <button
                onClick={handleDownload}
                className="text-white bg-black py-2 font-bold rounded-lg flex items-center justify-center gap-2"
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
