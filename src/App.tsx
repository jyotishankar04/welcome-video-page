import { useState, useRef } from "react";

function App() {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const videoUrl =
    "https://res.cloudinary.com/djby1yfko/video/upload/v1727768666/ferwell_zm2s47.mp4";

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
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
          <div className="aspect-[9/16] w-10/12 rounded-lg">
            <video
              className="w-full"
              autoPlay
              playsInline
              loop
              ref={videoRef}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              <source src={videoUrl} type="video/mp4" />
              Sorry, your browser doesn't support videos.
            </video>
            <div className="flex flex-col w-full gap-3">
              <button
                onClick={handlePlayPause}
                className="text-white bg-orange-600 mt-2 py-2 font-bold rounded-lg"
              >
                {isPlaying ? "Pause" : "Play"}
              </button>
              <button
                onClick={handleDownload}
                className="text-white bg-black py-2 font-bold rounded-lg"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
