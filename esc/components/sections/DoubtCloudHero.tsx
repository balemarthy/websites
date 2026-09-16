"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls, useGLTF } from "@react-three/drei";
import styles from "./DoubtCloudHero.module.css";

// The GLB's native scale/pivot is unknown (it wasn't authored by us), so the
// model is normalized to a fixed world-space height on load and re-centered
// at the origin — everything below (camera distance, ring radius, ring
// height) is then a known quantity regardless of how the source file was
// modeled or exported.
const MODEL_HEIGHT = 3;
const RING_RADIUS = 2.15;
const RING_Y = MODEL_HEIGHT * 0.62;
const CAMERA_DISTANCE = 5.6;
const CAMERA_HEIGHT = RING_Y - 0.4;
const CAMERA_POSITION: [number, number, number] = [0, CAMERA_HEIGHT, CAMERA_DISTANCE];
const CAMERA_TARGET: [number, number, number] = [0, CAMERA_HEIGHT, 0];

type DoubtCloudHeroProps = {
  statements: string[];
  modelPath?: string;
  backgroundImage?: string;
  pageTitle: string;
};

function Model({ path }: { path: string }) {
  const { scene } = useGLTF(path);
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;

    const rawBox = new THREE.Box3().setFromObject(group);
    const rawSize = new THREE.Vector3();
    rawBox.getSize(rawSize);
    const scale = rawSize.y > 0 ? MODEL_HEIGHT / rawSize.y : 1;
    group.scale.setScalar(scale);

    const scaledBox = new THREE.Box3().setFromObject(group);
    const center = new THREE.Vector3();
    scaledBox.getCenter(center);
    group.position.x -= center.x;
    group.position.z -= center.z;
    group.position.y -= scaledBox.min.y;
  }, [scene]);

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}

function LoadingFallback() {
  return (
    <Html center>
      <div className={styles.loader}>
        <div className={styles.loaderPulse} />
        <span className={`font-body ${styles.loaderLabel}`}>Loading</span>
      </div>
    </Html>
  );
}

// Normalizes an angular difference into [-π, π] so the comparison doesn't
// break at the 0°/360° seam (e.g. angles of 0.05 and 6.27 radians are ~0.01
// apart, not ~6.2 apart).
function normalizeAngleDiff(diff: number) {
  return ((diff + Math.PI) % (2 * Math.PI)) - Math.PI;
}

function StatementRing({
  statements,
  azimuthalAngle,
}: {
  statements: string[];
  azimuthalAngle: number;
}) {
  const positions = useMemo(() => {
    const step = (2 * Math.PI) / statements.length;
    return statements.map((_, i) => {
      const theta = i * step;
      // Matches OrbitControls' own spherical convention (theta measured so
      // that camera.position = [r*sin(theta), y, r*cos(theta)]) — so a
      // statement's fixed theta equaling the camera's current azimuthal
      // angle means that statement sits directly between the camera and the
      // model, i.e. it's the one currently being "faced".
      const position: [number, number, number] = [
        RING_RADIUS * Math.sin(theta),
        RING_Y,
        RING_RADIUS * Math.cos(theta),
      ];
      return { theta, position };
    });
  }, [statements]);

  let activeIndex = 0;
  let smallestDiff = Infinity;
  positions.forEach(({ theta }, i) => {
    const diff = Math.abs(normalizeAngleDiff(theta - azimuthalAngle));
    if (diff < smallestDiff) {
      smallestDiff = diff;
      activeIndex = i;
    }
  });

  return (
    <>
      {statements.map((text, i) => (
        <Html key={text} position={positions[i].position} center distanceFactor={5}>
          <div
            className={`font-body ${styles.statement} ${
              i === activeIndex ? styles.statementActive : styles.statementInactive
            }`}
            style={{ "--statement-scale": i === activeIndex ? 1.3 : 0.7 } as CSSProperties}
          >
            {text}
          </div>
        </Html>
      ))}
    </>
  );
}

export default function DoubtCloudHero({
  statements,
  modelPath = "/models/pagla-pagli-hero.glb",
  backgroundImage = "/images/hero/doubt-cloud-bg.jpg",
  pageTitle,
}: DoubtCloudHeroProps) {
  const [azimuthalAngle, setAzimuthalAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  return (
    <section
      data-dark-bg
      className={styles.section}
      aria-label="Program hero"
      style={{ "--hero-bg-image": `url(${backgroundImage})` } as CSSProperties}
    >
      <div className={styles.canvasWrap}>
        <Canvas camera={{ position: CAMERA_POSITION, fov: 42 }} gl={{ alpha: true }}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[4, 6, 5]} intensity={1.3} />
          <directionalLight position={[-4, 2, -3]} intensity={0.4} />

          <Suspense fallback={<LoadingFallback />}>
            <Model path={modelPath} />
            <StatementRing statements={statements} azimuthalAngle={azimuthalAngle} />
          </Suspense>

          <OrbitControls
            target={CAMERA_TARGET}
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 2}
            maxPolarAngle={Math.PI / 2}
            touches={{ ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.ROTATE }}
            rotateSpeed={0.6}
            onStart={() => setIsDragging(true)}
            onEnd={() => setIsDragging(false)}
            onChange={(e) => {
              if (e) setAzimuthalAngle(e.target.getAzimuthalAngle());
            }}
          />
        </Canvas>
      </div>

      {/* Persistent page identifier — without this, a visitor who lands
          directly on this hero (bookmark, back button, reopened tab) has no
          way to tell which program page they're on: the floating statements
          rotate and the nav's active-pill state isn't visible until you
          look up at it. Bottom-left, same vertical row as "Drag to
          explore" (bottom-center) so neither competes with the other. */}
      <span className={`font-display ${styles.pageLabel}`}>
        <span aria-hidden className={styles.pageLabelRule} />
        {pageTitle}
      </span>

      <div
        className={`${styles.dragHintWrap} ${isDragging ? styles.dragHintWrapHidden : ""}`}
      >
        <div className={styles.rotateIconTilt}>
          <svg
            className={styles.rotateIcon}
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M4 12a8 8 0 0 1 8-8c2.5 0 4.75 1.2 6.2 3.06M20 12a8 8 0 0 1-8 8c-2.5 0-4.75-1.2-6.2-3.06"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="M18.6 3.4v3.9h-3.9"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5.4 20.6v-3.9h3.9"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span className={`font-body ${styles.dragHint}`}>Drag to explore</span>
      </div>
    </section>
  );
}
