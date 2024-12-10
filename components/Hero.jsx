"use client";
import { useState, useEffect, useRef } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import WaveAnimation from "./wave-animation";
import Link from "next/link";
import * as THREE from "three";

const Hero = () => {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);

  // Typewriter Effect State
  const [text, setText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  // Array of texts to cycle through
  const textArray = [
    "Full Stack Developer",
    "Frontend Developer",
    "MERN Stack Developer",
    "Web Designer",
  ];

  // 3D Particle Background Setup
  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current = renderer;

    // Particles
    const particleCount = 200;
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];

    const materialColors = [
      new THREE.Color(0x56c8e1), // Lighter blue from gradient
      new THREE.Color(0x4f8cc9), // Medium blue from gradient
      new THREE.Color(0x2a6ab1), // Darker blue from gradient
    ];

    for (let i = 0; i < particleCount; i++) {
      // Random initial position
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 10;

      positions.push(x, y, z);

      // Random color
      const color =
        materialColors[Math.floor(Math.random() * materialColors.length)];
      colors.push(color.r, color.g, color.b);
    }

    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.7,
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Get current positions
      const positions = geometry.getAttribute("position").array;

      // Simple particle movement simulation
      for (let i = 0; i < particleCount; i++) {
        // Update position
        positions[i * 3] += (Math.random() - 0.5) * 0.05; // x
        positions[i * 3 + 1] += (Math.random() - 0.5) * 0.05; // y
        positions[i * 3 + 2] += (Math.random() - 0.5) * 0.05; // z

        // Boundary check and wrap-around
        if (Math.abs(positions[i * 3]) > 5) positions[i * 3] *= -1;
        if (Math.abs(positions[i * 3 + 1]) > 5) positions[i * 3 + 1] *= -1;
        if (Math.abs(positions[i * 3 + 2]) > 5) positions[i * 3 + 2] *= -1;
      }

      // Mark geometry as needing update
      geometry.attributes.position.needsUpdate = true;

      // Rotate scene slightly for dynamic effect
      scene.rotation.y += 0.001;

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  // Typewriter Effect
  useEffect(() => {
    let typingInterval;
    let cursorInterval;

    // Handle typing and deleting text
    if (!isDeleting) {
      // Typing the text
      typingInterval = setInterval(() => {
        if (currentIndex < textArray[currentTextIndex].length) {
          setText(
            (prevText) =>
              prevText + textArray[currentTextIndex].charAt(currentIndex)
          );
          setCurrentIndex((prevIndex) => prevIndex + 1);
        } else {
          // Once a line is fully typed, start deleting after a short delay
          clearInterval(typingInterval);
          setTimeout(() => {
            setIsDeleting(true);
          }, 1000); // Delay before starting to delete
        }
      }, 100); // Adjust typing speed here (ms per character)
    } else {
      // Deleting the text
      typingInterval = setInterval(() => {
        if (currentIndex > 0) {
          setText((prevText) => prevText.slice(0, -1)); // Remove one character
          setCurrentIndex((prevIndex) => prevIndex - 1);
        } else {
          // Once the text is fully deleted, move to the next text
          clearInterval(typingInterval);
          setIsDeleting(false);
          setCurrentTextIndex(
            (prevIndex) => (prevIndex + 1) % textArray.length
          ); // Loop through texts
        }
      }, 50); // Adjust deleting speed here (ms per character)
    }

    // Handle cursor blinking
    cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev); // Toggle cursor visibility every 500ms
    }, 500);

    return () => {
      clearInterval(typingInterval); // Cleanup typing interval on component unmount
      clearInterval(cursorInterval); // Cleanup cursor interval
    };
  }, [currentIndex, currentTextIndex, isDeleting, textArray]);

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-transparent w-full"
      id="home"
    >
      {/* 3D Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 w-full h-full opacity-50"
      />

      <div className="container mx-auto text-center relative z-10 px-4 sm:px-6 lg:px-8 w-full">
        <div className="space-y-6 animate-in fade-in duration-1000">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white drop-shadow-lg">
            Hi, I'm{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#56c8e1] via-[#4f8cc9] to-[#2a6ab1]">
              Aditya Sharma
            </span>
          </h1>

          <div className="typewriter-container">
            <p className="text-base sm:text-lg md:text-xl text-gray-800 dark:text-gray-300 max-w-2xl mx-auto drop-shadow-md min-h-[2rem]">
              <span className="typewriter-text">{text}</span>
              {cursorVisible && <span className="cursor">|</span>}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <a href="https://github.com/Aditya1or0" target="_blank">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <Github className="mr-2 h-5 w-5" />
                GitHub
              </Button>
            </a>
            <a
              href="https://www.linkedin.com/in/adityashharmaa/"
              target="_blank"
            >
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <Linkedin className="mr-2 h-5 w-5" />
                LinkedIn
              </Button>
            </a>
            <Link href="/#contact">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <Mail className="mr-2 h-5 w-5" />
                Contact
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 w-full">
        <WaveAnimation />
      </div>
    </section>
  );
};

export default Hero;
