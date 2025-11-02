"use client";
import { useEffect, useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";
import Button from "@/components/ui/Button/Button";

function ImagePlane({ size, position }: { size: number; position: THREE.Vector3 }) {
  const tex = useTexture("/icons/icon-512.png");
  // Keep aspect ratio using 1:1 for icon-512
  const width = size;
  const height = size;
  return (
    <mesh position={position as unknown as [number, number, number]}> {/* Positioned via computed placement */}
      <planeGeometry args={[width / 100, height / 100]} />
      <meshBasicMaterial map={tex} transparent />
    </mesh>
  );
}

function SceneBridge({ onReady }: { onReady: (camera: THREE.Camera) => void }) {
  const { camera } = useThree();
  useEffect(() => {
    onReady(camera);
  }, [camera, onReady]);
  return null;
}

export default function ARPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  const [size, setSize] = useState(240);
  const [fixed, setFixed] = useState(false);
  const [planePos, setPlanePos] = useState(() => new THREE.Vector3(0, 0, -1));
  const cameraRef = useRef<THREE.Camera | null>(null);
  const lastPointerRef = useRef<{ x: number; y: number } | null>(null);

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
        onPointerDown={(e) => {
          lastPointerRef.current = { x: e.clientX, y: e.clientY };
        }}
        onPointerMove={(e) => {
          lastPointerRef.current = { x: e.clientX, y: e.clientY };
        }}
      >
        <SceneBridge onReady={(cam) => (cameraRef.current = cam)} />
        <ambientLight intensity={1} />
        <ImagePlane size={size} position={planePos} />
        <OrbitControls enablePan={!fixed} enableRotate={!fixed} enableZoom={!fixed} />
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
        <div className="mt-3 flex items-center justify-between gap-3">
          <div className="text-xs opacity-70">
            {fixed ? "Object fixed. Tap size to adjust." : "Tap screen to choose position, then Fix object."}
          </div>
          <Button
            className="px-3 py-2 rounded bg-white/20 hover:bg-white/30 text-white"
            onClick={() => {
              const cam = cameraRef.current as THREE.PerspectiveCamera | THREE.Camera | null;
              const pointer = lastPointerRef.current ?? {
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
              };
              if (!cam) return;
              // Convert to NDC
              const ndcX = (pointer.x / window.innerWidth) * 2 - 1;
              const ndcY = -(pointer.y / window.innerHeight) * 2 + 1;
              const ray = new THREE.Ray();
              ray.origin.copy((cam as THREE.PerspectiveCamera).position);
              const ndc = new THREE.Vector3(ndcX, ndcY, 0.5).unproject(cam as THREE.Camera);
              ray.direction.copy(ndc.sub((cam as THREE.PerspectiveCamera).position)).normalize();
              // Plane z = -1
              const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 1);
              const target = new THREE.Vector3();
              ray.intersectPlane(plane, target);
              setPlanePos(target);
              setFixed(true);
            }}
          >
            {fixed ? "Fixed" : "Fix object here"}
          </Button>
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