"use client";
import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

const WaveAnimation = () => {
  const canvasRef = useRef(null);
  const { theme } = useTheme();
  const [touch, setTouch] = useState(null); // State to hold touch data

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 400;
    };

    window.addEventListener("resize", resize);
    resize();

    let animationFrameId;
    let offset = 0;
    const waveTouchEffect = 50; // Maximum effect area

    // Function to handle touch events
    const handleTouch = (e) => {
      const touchX = e.touches ? e.touches[0].clientX : e.clientX; // Get touch position
      const touchY = e.touches ? e.touches[0].clientY : e.clientY;
      setTouch({ x: touchX, y: touchY });
    };

    // Add touch event listeners
    canvas.addEventListener("touchstart", handleTouch);
    canvas.addEventListener("touchmove", handleTouch);

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const primaryColor =
        theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)";
      const secondaryColor =
        theme === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)";

      // First wave
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);

      for (let i = 0; i < canvas.width; i++) {
        let y = Math.sin(i * 0.01 + offset) * 40 + canvas.height - 100;

        // Apply touch effect to the wave
        if (touch && Math.abs(touch.x - i) < waveTouchEffect) {
          y -= 50 * Math.sin((touch.x - i) * 0.1); // Distort the wave near the touch point
        }

        ctx.lineTo(i, y);
      }

      ctx.lineTo(canvas.width, canvas.height);
      ctx.closePath();
      ctx.fillStyle = primaryColor;
      ctx.fill();

      // Second wave
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);

      for (let i = 0; i < canvas.width; i++) {
        let y = Math.sin(i * 0.02 + offset * 1.5) * 30 + canvas.height - 60;

        // Apply touch effect to the second wave
        if (touch && Math.abs(touch.x - i) < waveTouchEffect) {
          y += 40 * Math.sin((touch.x - i) * 0.1); // Distort the second wave near the touch point
        }

        ctx.lineTo(i, y);
      }

      ctx.lineTo(canvas.width, canvas.height);
      ctx.closePath();
      ctx.fillStyle = secondaryColor;
      ctx.fill();

      offset += 0.05;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener("touchstart", handleTouch);
      canvas.removeEventListener("touchmove", handleTouch);
    };
  }, [theme, touch]);

  return (
    <div className="absolute bottom-0 left-0 w-full pointer-events-none">
      <canvas ref={canvasRef} className="w-full" style={{ display: "block" }} />
    </div>
  );
};

export default WaveAnimation;
