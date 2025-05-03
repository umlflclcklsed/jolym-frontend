"use client"

import { useRef, useEffect, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, useTexture, Environment, Stars } from "@react-three/drei"
import * as THREE from "three"
import { useTheme } from "next-themes"

function Globe({ isDarkTheme }: { isDarkTheme: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const texture = useTexture("/assets/3d/texture_earth.jpg")
  const { viewport, camera } = useThree()

  // Adjust camera position based on viewport
  useEffect(() => {
    const isMobile = viewport.width < 5
    camera.position.z = isMobile ? 4 : 3
  }, [viewport, camera])

  useFrame((state) => {
    if (meshRef.current) {
      // Slow rotation
      meshRef.current.rotation.y += 0.001

      // Subtle wobble
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.05
    }
  })

  return (
    <>
<pointLight position={[0, 0, 5]} intensity={2} />

      <mesh ref={meshRef}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          metalness={0.1}
          roughness={0.7}
          emissive={isDarkTheme ? new THREE.Color(0x222222) : new THREE.Color(0x000000)}
          emissiveIntensity={isDarkTheme ? 0.2 : 0}
        />
      </mesh>
    </>
  )
}

export default function GlobeVisualization() {
  const { resolvedTheme } = useTheme()
  const [isDarkTheme, setIsDarkTheme] = useState(true)

  useEffect(() => {
    setIsDarkTheme(resolvedTheme === "dark")
  }, [resolvedTheme])

  return (
    <div className="w-full h-full">
      <Canvas>
        <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.5} autoRotate autoRotateSpeed={0.5} />
        <Globe isDarkTheme={isDarkTheme} />
        <Environment preset="night" />
        <Stars radius={100} depth={50} count={5000} factor={4} fade speed={1} />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
    </div>
  )
}
