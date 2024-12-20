"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import * as THREE from "three";
import { motion } from "framer-motion";

const Hero = () => {
  const canvasRef = useRef(null);
  const rendererRef = useRef(null);
  const animationFrameRef = useRef(null);

  const [text, setText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [typingSpeed, setTypingSpeed] = useState(100);

  const textArray = [
    "Full Stack Developer",
    "Frontend Developer",
    "MERN Stack Developer",
    "Web Designer",
  ];

  const setupParticles = useCallback(() => {
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
    rendererRef.current = renderer;

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
      depthTest: false,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(particles, material);
    scene.add(particleSystem);

    camera.position.z = 5;

    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
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
      particleSystem.geometry.dispose();
      particleSystem.material.dispose();
      renderer.dispose();
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  useEffect(() => {
    const cleanup = setupParticles();
    return cleanup;
  }, [setupParticles]);

  useEffect(() => {
    const typingInterval = setInterval(
      () => {
        if (!isDeleting) {
          if (currentIndex < textArray[currentTextIndex].length) {
            setText(
              (prevText) => prevText + textArray[currentTextIndex][currentIndex]
            );
            setCurrentIndex((prevIndex) => prevIndex + 1);
          } else {
            // Pause at the end of the word
            setTimeout(() => setIsDeleting(true), 1500);
          }
        } else {
          if (currentIndex > 0) {
            setText((prevText) => prevText.slice(0, -1));
            setCurrentIndex((prevIndex) => prevIndex - 1);
          } else {
            setIsDeleting(false);
            setCurrentTextIndex(
              (prevIndex) => (prevIndex + 1) % textArray.length
            );
            // Pause before starting the next word
            setTimeout(() => {}, 500);
          }
        }
      },
      isDeleting ? 50 : Math.random() * 50 + 100
    );

    return () => clearInterval(typingInterval);
  }, [currentIndex, currentTextIndex, isDeleting, textArray]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);

    return () => {
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-transparent w-full"
      id="home"
    >
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
            <span
              className={`cursor ${cursorVisible ? "visible" : "invisible"}`}
            >
              |
            </span>
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
      <style jsx>{`
        @keyframes blink {
          0% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
        .cursor {
          font-weight: 100;
          animation: blink 1s infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
