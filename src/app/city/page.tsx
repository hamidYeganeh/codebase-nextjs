"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html } from "@react-three/drei";
import * as THREE from "three";
import { cityGalleryData, GalleryItem } from "./data";
import Link from "next/link";

type ModelItem = {
  id: number;
  url: string;
  name?: string;
  position: [number, number, number];
};

// Preload models referenced by gallery data
const PRELOAD_URLS = Array.from(
  new Set(cityGalleryData.map((d) => d.galleryName))
);
PRELOAD_URLS.forEach((u) => useGLTF.preload(u));

function randRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function generatePositions(
  count: number,
  bounds: number,
  minDistance: number
): [number, number, number][] {
  const positions: [number, number, number][] = [];
  while (positions.length < count) {
    const x = randRange(-bounds, bounds);
    const z = randRange(-bounds, bounds);
    const y = 0; // ground level
    const tooClose = positions.some(
      ([px, , pz]) => Math.hypot(px - x, pz - z) < minDistance
    );
    if (!tooClose) positions.push([x, y, z]);
  }
  return positions;
}

function pickRandomWithReplacement<T>(arr: T[], count: number): T[] {
  const result: T[] = [];
  for (let i = 0; i < count; i++) {
    const j = Math.floor(Math.random() * arr.length);
    result.push(arr[j]);
  }
  return result;
}

function buildItemsFromData(
  data: GalleryItem[],
  count: number,
  bounds: number,
  minDistance: number
): ModelItem[] {
  const selected = pickRandomWithReplacement(data, count);
  const positions = generatePositions(selected.length, bounds, minDistance);
  return selected.map((d, idx) => ({
    id: d.id,
    url: d.galleryName,
    name: d.name,
    position: positions[idx],
  }));
}

type Selection = {
  id: number;
  name?: string;
  group: THREE.Group;
};

function Model({
  id,
  name,
  url,
  position,
  onSelect,
  onLoaded,
  selectedId,
}: {
  id: number;
  name?: string;
  url: string;
  position: [number, number, number];
  onSelect: (sel: Selection) => void;
  onLoaded?: () => void;
  selectedId: number | null;
}) {
  const gltf = useGLTF(url);
  const groupRef = useRef<THREE.Group>(null!);
  const [hovered, setHovered] = useState(false);
  const loadedOnceRef = useRef(false);
  const [height, setHeight] = useState<number>(4);

  // Fire onLoaded once when the component mounts after GLTF load completes
  useEffect(() => {
    if (onLoaded && !loadedOnceRef.current) {
      loadedOnceRef.current = true;
      onLoaded();
    }
  }, [onLoaded]);

  // Determine model height for overlay positioning
  useEffect(() => {
    const bbox = new THREE.Box3().setFromObject(gltf.scene);
    const size = new THREE.Vector3();
    bbox.getSize(size);
    setHeight(Math.max(4, size.y));
  }, [gltf.scene]);

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered]);

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (groupRef.current) onSelect({ id, name, group: groupRef.current });
      }}
    >
      <primitive object={gltf.scene} />

      {selectedId === id && (
        <Html transform position={[0, height + 1, 0]} distanceFactor={8} occlude="blending">
          <div
            style={{
              padding: "8px 10px",
              background: "#111",
              color: "#fff",
              borderRadius: 8,
              border: "1px solid #444",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              whiteSpace: "nowrap",
            }}
          >
            <div style={{ fontWeight: 600, marginBottom: 6 }}>{name || `Item ${id}`}</div>
            <Link href={`/city/${id}`} style={{ color: "#4dabf7", textDecoration: "underline" }}>
              View details
            </Link>
          </div>
        </Html>
      )}
    </group>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[10, 20, 10]} intensity={0.8} castShadow />
      <hemisphereLight args={[0xffffff, 0x444444, 0.4]} />
    </>
  );
}

function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[400, 400]} />
      <meshStandardMaterial color="#8ca69e" />
    </mesh>
  );
}

function Scene() {
  const HOUSE_COUNT = 20;
  const items = useMemo(
    () => buildItemsFromData(cityGalleryData, HOUSE_COUNT, 60, 8),
    []
  );
  const controlsRef = useRef<any>(null);
  const targetRef = useRef(new THREE.Vector3(0, 0, 0));
  const desiredCamPosRef = useRef(new THREE.Vector3(0, 30, 80));
  const [selected, setSelected] = useState<Selection | null>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [loadedCount, setLoadedCount] = useState(0);

  // Smoothly lerp camera and controls target
  useFrame((state, delta) => {
    if (!controlsRef.current) return;
    const camera = state.camera;

    // When no selection, keep auto rotating around origin
    if (!selected) {
      // Keep looking at origin
      targetRef.current.lerp(new THREE.Vector3(0, 5, 0), 0.05);
      controlsRef.current.target.copy(targetRef.current);
      return;
    }

    // Smoothly move camera to desired position looking at selected house
    camera.position.lerp(desiredCamPosRef.current, Math.min(1, 3 * delta));
    targetRef.current.lerp(targetRef.current, 0.1); // no-op but keeps consistency
    controlsRef.current.target.lerp(targetRef.current, Math.min(1, 5 * delta));
  });

  const focusOn = (sel: Selection) => {
    // Toggle selection: clicking selected item again clears
    if (selected && selected.id === sel.id) {
      clearSelection();
      return;
    }
    // Compute bounding box and center in world space
    const bbox = new THREE.Box3().setFromObject(sel.group);
    const center = new THREE.Vector3();
    bbox.getCenter(center);
    const size = new THREE.Vector3();
    bbox.getSize(size);
    const radius = Math.max(size.x, size.y, size.z) * 0.5;

    // Place camera in front of the model on +Z direction, at a reasonable distance
    const camOffset = new THREE.Vector3(
      0,
      Math.max(6, size.y * 0.6),
      radius * 2.2
    );
    const desired = new THREE.Vector3().copy(center).add(camOffset);

    targetRef.current.copy(center);
    desiredCamPosRef.current.copy(desired);
    setSelected(sel);
    setAutoRotate(false);
  };

  const clearSelection = () => {
    setSelected(null);
    setAutoRotate(true);
  };

  return (
    <>
      {/* Use Html to render DOM inside Canvas safely */}
      <Html fullscreen prepend>
        <div style={{ position: "fixed", top: 16, left: 16, zIndex: 50 }}>
          <button
            onClick={clearSelection}
            style={{
              padding: "8px 12px",
              background: selected ? "#222" : "#666",
              color: "#fff",
              borderRadius: 8,
              border: "1px solid #444",
              cursor: "pointer",
              opacity: selected ? 1 : 0.7,
            }}
          >
            Clear Selection
          </button>
        </div>
      </Html>

      <Lights />
      <Ground />

      {items.map((it) => (
        <Model
          key={`${it.id}-${it.position.join(',')}`}
          id={it.id}
          name={it.name}
          url={it.url}
          position={it.position}
          onSelect={focusOn}
          selectedId={selected ? selected.id : null}
          onLoaded={() => setLoadedCount((c) => c + 1)}
        />
      ))}

      <OrbitControls
        ref={controlsRef}
        enableDamping
        dampingFactor={0.08}
        autoRotate={autoRotate}
        autoRotateSpeed={0.3}
      />

      {/* Loading overlay while models load */}
      {loadedCount < items.length && (
        <Html center>
          <div
            style={{
              padding: "8px 12px",
              background: "#222",
              color: "#fff",
              borderRadius: 8,
              border: "1px solid #444",
            }}
          >
            Loading 3D models... {loadedCount}/{items.length}
          </div>
        </Html>
      )}
    </>
  );
}

export default function CityPage() {
  return (
    <main style={{ width: "100%", height: "100dvh", position: "relative" }}>
      <Canvas shadows camera={{ position: [0, 30, 80], fov: 50 }}>
        {/* Render lights/ground immediately; models will appear as they load */}
        <Scene />
      </Canvas>
    </main>
  );
}
