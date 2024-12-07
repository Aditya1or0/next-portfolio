import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { Box } from "@react-three/drei"; // Import a basic 3D object

const Earth = () => {
  const { scene } = useGLTF("/planet/scene.gltf");
  return <primitive object={scene} scale={2.5} position-y={0} rotation-y={0} />;
};

const EarthCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop="demand"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
    >
      <Suspense
        fallback={
          <Box args={[1, 1, 1]} position={[0, 0, 0]}>
            <meshStandardMaterial color="gray" />
          </Box>
        }
      >
        <OrbitControls
          enableZoom={false}
          autoRotate
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
        />
        <Earth />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;
