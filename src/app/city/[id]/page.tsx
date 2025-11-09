"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import Link from "next/link";
import { cityGalleryData } from "../data";

function ModelViewer({ url }: { url: string }) {
  const gltf = useGLTF(url);
  return <primitive object={gltf.scene} />;
}

export default function CityItemPage({ params }: { params: { id: string } }) {
  const idNum = Number(params.id);
  const item = cityGalleryData.find((d) => d.id === idNum);

  if (!item) {
    return (
      <main style={{ padding: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700 }}>Item not found</h1>
        <p style={{ marginTop: 8 }}>No gallery item with id {params.id}.</p>
        <p style={{ marginTop: 12 }}>
          <Link href="/city" style={{ color: "#4dabf7", textDecoration: "underline" }}>
            Back to city
          </Link>
        </p>
      </main>
    );
  }

  return (
    <main style={{ width: "100%", height: "100dvh", position: "relative" }}>
      <div style={{ position: "absolute", top: 12, left: 12, zIndex: 10 }}>
        <Link href="/city" style={{ color: "#4dabf7", textDecoration: "underline" }}>
          ← Back to city
        </Link>
      </div>
      <div style={{ position: "absolute", top: 12, right: 12, zIndex: 10, color: "#fff" }}>
        <div style={{ fontWeight: 700 }}>{item.name || `Item ${item.id}`}</div>
      </div>

      <Canvas shadows camera={{ position: [0, 3, 6], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 20, 10]} intensity={0.8} castShadow />
        <hemisphereLight args={[0xffffff, 0x444444, 0.4]} />

        <ModelViewer url={item.galleryName} />

        <OrbitControls enableDamping dampingFactor={0.08} autoRotate autoRotateSpeed={0.6} />
      </Canvas>
    </main>
  );
}