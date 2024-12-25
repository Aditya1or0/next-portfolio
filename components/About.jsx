"use client";

import { motion } from "framer-motion";
import { FileText, UserRound } from "lucide-react";
import { Button } from "./ui/button";

const About = () => {
  return (
    <section
      className="min-h-screen py-16 sm:py-20 px-4 sm:px-6 lg:px-8"
      id="about"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center justify-center">
            <UserRound className="text-inherit w-8 h-8 sm:w-10 sm:h-10 mr-3" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              About{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#56c8e1] via-[#4f8cc9] to-[#2a6ab1]">
                Me
              </span>
            </h2>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-2xl sm:text-3xl font-bold">My Journey</h3>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              I'm a Full Stack Developer based in Ghaziabad. I graduated in
              Computer Science from AKTU. I am a self-taught developer with a
              passion for web development. I build web apps and websites using
              the MERN stack. My expertise in MongoDB, Express.js, React,
              Node.js, and Next.js enables me to create dynamic, user-friendly
              interfaces that enhance user experiences. I love creating
              beautiful and functional experiences that solve real-world
              problems.
            </p>
            <div>
              <a
                href="https://drive.google.com/file/d/1cJSZx1BigHYjaFhLPVW7Oe1LO961N5FK/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="mt-4 px-6 py-3 text-white bg-sky-600 hover:bg-sky-700 dark:bg-sky-800 dark:hover:bg-sky-900 transition-colors duration-300">
                  <FileText className="mr-2 h-5 w-5" />
                  View Resume
                </Button>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 bg-gradient-to-r from-[#56c8e1] via-[#4f8cc9] to-[#2a6ab1] rounded-lg transform rotate-3"></div>
              <img
                src="https://theninehertz.com/wp-content/uploads/2020/06/full-stack-development.gif"
                alt="Full Stack Development"
                width="400"
                height="300"
                className="relative z-10 w-full h-auto rounded-lg shadow-xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
