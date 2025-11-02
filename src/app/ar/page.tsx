"use client";
import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";

function ImagePlane({ size }: { size: number }) {
  const tex = useTexture("/icons/icon-512.png");
  // Keep aspect ratio using 1:1 for icon-512
  const width = size;
  const height = size;
  return (
    <mesh position={[0, 0, -1]}> {/* Slightly in front of camera */}
      <planeGeometry args={[width / 100, height / 100]} />
      <meshBasicMaterial map={tex} transparent />
    </mesh>
  );
}

export default function ARPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  const [size, setSize] = useState(240);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: "environment" } },
          audio: false,
        });
        if (!videoRef.current) return;
        const video = videoRef.current;
        video.srcObject = stream;
        // iOS Safari requires playsinline + muted for autoplay
        video.playsInline = true;
        video.muted = true;
        await video.play();
        setReady(true);
      } catch (err) {
        setError(
          (err as Error)?.message || "Unable to access camera. Please allow permission."
        );
      }
    };
    startCamera();

    return () => {
      const tracks = (videoRef.current?.srcObject as MediaStream | null)?.getTracks?.();
      tracks?.forEach((t) => t.stop());
    };
  }, []);

  // No manual dragging; use OrbitControls for positioning/scale via slider

  return (
    <div className="relative h-dvh w-full bg-black text-white">
      {/* Video feed */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        playsInline
        muted
      />

      {/* React Three Fiber canvas overlay */}
      <Canvas
        className="absolute inset-0"
        gl={{ alpha: true }}
        camera={{ position: [0, 0, 1.5], fov: 60 }}
      >
        <ambientLight intensity={1} />
        <ImagePlane size={size} />
        <OrbitControls enablePan enableRotate enableZoom />
      </Canvas>

      {/* Controls */}
      <div className="pointer-events-auto absolute bottom-4 left-0 right-0 mx-auto w-[90%] rounded-xl bg-black/50 p-4 backdrop-blur">
        <div className="mb-2 text-sm opacity-80">
          {ready ? "Use gestures to move/zoom the image." : "Starting camera..."}
        </div>
        <div className="flex items-center gap-3">
          <label className="text-xs opacity-70">Size</label>
          <input
            type="range"
            min={120}
            max={480}
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="w-full"
          />
        </div>
        {error && (
          <div className="mt-2 text-xs text-red-300">
            {error} — Check browser permissions and use a secure origin (https).
          </div>
        )}
      </div>
    </div>
  );
}