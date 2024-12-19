"use client";
import { useState, useEffect, useRef } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import * as THREE from "three";
import { motion } from "framer-motion";

const Hero = () => {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const animationFrameRef = useRef(null);

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
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const particles = new THREE.BufferGeometry();
    const particleCount = 1000;

    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
      colors[i] = Math.random();
    }

    particles.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particles.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
    });

    const particleSystem = new THREE.Points(particles, material);
    scene.add(particleSystem);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      particleSystem.rotation.x += 0.001;
      particleSystem.rotation.y += 0.001;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto text-center relative z-10 px-4 sm:px-6 lg:px-8 w-full"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white drop-shadow-lg"
        >
          Hi, I'm{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#56c8e1] via-[#4f8cc9] to-[#2a6ab1]">
            Aditya Sharma
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="typewriter-container"
        >
          <p className="text-base sm:text-lg md:text-xl text-gray-800 dark:text-gray-300 max-w-2xl mx-auto drop-shadow-md min-h-[2rem]">
            <span className="typewriter-text">{text}</span>
            {cursorVisible && <span className="cursor">|</span>}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-4 mt-6"
        >
          <a
            href="https://github.com/Aditya1or0"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              <Github className="mr-2 h-5 w-5" />
              GitHub
            </Button>
          </a>
          <a
            href="https://www.linkedin.com/in/adityashharmaa/"
            target="_blank"
            rel="noopener noreferrer"
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
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 w-full"></div>
    </section>
  );
};

export default Hero;
