"use client";
// Hero.jsx
import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import WaveAnimation from "./ui/wave-animation";
import Link from "next/link";

const Hero = () => {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background to-background/95 w-full"
      id="home"
    >
      <div className="container mx-auto text-center z-10 px-4 sm:px-6 lg:px-8 w-full">
        <div className="space-y-6 animate-in fade-in duration-1000">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
            Hi, I'm{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#56c8e1] via-[#4f8cc9] to-[#2a6ab1]">
              Aditya Sharma
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Full Stack Developer passionate about creating beautiful and
            functional web applications
          </p>
          <div className="flex flex-wrap justify-center gap-4">
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

export default Hero; // Use default export here
