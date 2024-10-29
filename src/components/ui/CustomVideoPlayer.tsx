import React, { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Settings,
  SkipBack,
  SkipForward,
} from "lucide-react";

interface CustomVideoPlayerProps {
  src: string;
  poster?: string;
}

const CustomVideoPlayer: React.FC<CustomVideoPlayerProps> = ({
  src,
  poster,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const controlsTimeoutRef = useRef<NodeJS.Timeout>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const startControlsTimer = () => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }

    if (isPlaying && !isHovering) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 2000);
    }
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setShowControls(false);
    if (isPlaying) {
      startControlsTimer();
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    startControlsTimer();
  };

  const handlePlayPause = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      void videoRef.current.play();
      setIsPlaying(true);
      startControlsTimer();
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
      setShowControls(true);
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;

    const progress =
      (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setProgress(progress);
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const clickedValue = (x / rect.width) * videoRef.current.duration;
    videoRef.current.currentTime = clickedValue;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;

    const value = parseFloat(e.target.value);
    setVolume(value);
    videoRef.current.volume = value;
    setIsMuted(value === 0);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;

    if (isMuted) {
      videoRef.current.volume = volume;
      setIsMuted(false);
    } else {
      videoRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const toggleFullscreen = async () => {
    if (!playerRef.current) return;

    try {
      if (!document.fullscreenElement) {
        await playerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (error) {
      console.error("Error toggling fullscreen:", error);
    }
  };

  const skipForward = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime += 10;
  };

  const skipBackward = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime -= 10;
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!videoRef.current) return;

      switch (e.code) {
        case "Space":
          e.preventDefault();
          handlePlayPause();
          break;
        case "ArrowRight":
          skipForward();
          break;
        case "ArrowLeft":
          skipBackward();
          break;
        case "KeyM":
          toggleMute();
          break;
        case "KeyF":
          void toggleFullscreen();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div
      ref={playerRef}
      className="relative w-full bg-black rounded-lg overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <video
        ref={videoRef}
        className="w-full cursor-pointer"
        poster={poster}
        onTimeUpdate={handleTimeUpdate}
        onClick={handlePlayPause}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Play/Pause large center button - shown when paused */}
      {!isPlaying && (
        <button
          onClick={handlePlayPause}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                     text-white/90 hover:text-white transition-colors"
          aria-label="Play"
        >
          <Play size={64} />
        </button>
      )}

      {/* Controls overlay */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4
                    transition-opacity duration-300 ${
                      showControls ? "opacity-100" : "opacity-0"
                    }`}
      >
        {/* Progress bar */}
        <div
          className="w-full h-1 bg-gray-600 cursor-pointer mb-4"
          onClick={handleProgressClick}
        >
          <div
            className="h-full bg-gray-100"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between">
          {/* Left controls */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handlePlayPause}
              className="text-white hover:text-gray-500 transition w-16 h-16"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>

            <button
              onClick={skipBackward}
              className="text-white hover:text-gray-500 transition"
              aria-label="Skip backward 10 seconds"
            >
              <SkipBack size={24} />
            </button>

            <button
              onClick={skipForward}
              className="text-white hover:text-gray-500 transition"
              aria-label="Skip forward 10 seconds"
            >
              <SkipForward size={24} />
            </button>

            <div className="flex items-center space-x-2">
              <button
                onClick={toggleMute}
                className="text-white hover:text-gray-500 transition"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-20 h-4 appearance-none bg-white hover:bg-gray-500 rounded-full"
                style={{ height: 10 }}
                aria-label="Volume"
              />
            </div>

            <div className="text-white text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          {/* Right controls */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => void toggleFullscreen()}
              className="text-white hover:text-gray-500 transition"
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {isFullscreen ? <Minimize size={24} /> : <Maximize size={24} />}
            </button>
          </div>
        </div>
      </div>
      <style jsx>{`
        input[type="range"] {
          -webkit-appearance: none; /* Remove default styling in WebKit browsers */
          width: 100%; /* Full width */
          margin: 0; /* Reset margin to prevent misalignment */
          border: none; /* Remove border */
          background: transparent; /* Ensure background is transparent */
        }

        input[type="range"]::-webkit-slider-runnable-track {
          background: #6b7280; /* Tailwind gray-500 */
          height: 4px; /* Adjust height as needed */
          border-radius: 2px; /* Optional: rounded edges */
        }

        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none; /* Remove default styling for the thumb */
          width: 16px; /* Thumb width */
          height: 16px; /* Thumb height */
          background: #ffffff; /* Thumb color */
          border: none; /* Remove border from thumb */
          border-radius: 50%; /* Round thumb */
          cursor: pointer; /* Pointer cursor on hover */
          margin-top: -6px; /* Adjust to center the thumb vertically */
        }

        input[type="range"]::-moz-range-track {
          background: #6b7280; /* Tailwind gray-500 */
          height: 4px; /* Adjust height as needed */
          border-radius: 2px; /* Optional: rounded edges */
        }

        input[type="range"]::-moz-range-thumb {
          width: 16px; /* Thumb width */
          height: 16px; /* Thumb height */
          background: #ffffff; /* Thumb color */
          border: none; /* Remove border from thumb */
          border-radius: 50%; /* Round thumb */
          cursor: pointer; /* Pointer cursor on hover */
        }
      `}</style>
    </div>
  );
};

export default CustomVideoPlayer;
