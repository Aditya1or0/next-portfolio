"use client";
import { motion } from "framer-motion";
import { FileText, User } from "lucide-react";
import { Button } from "./ui/button";

const skills = [
  { name: "React.js", level: 68 },
  { name: "Node.js", level: 60 },
  { name: "JavaScript", level: 75 },
  { name: "MongoDB", level: 60 },
  { name: "Next.js", level: 50 },
  { name: "Java", level: 65 },
];

const About = () => {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8" id="about">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center">
            <User className="text-inherit w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] mr-4 mb-4" />
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              About{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#56c8e1] via-[#4f8cc9] to-[#2a6ab1]">
                Me
              </span>
            </h2>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            I'm a passionate developer with expertise in building modern web
            applications. I love creating beautiful and functional experiences
            that solve real-world problems.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-6">My Journey</h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              I'm a Full Stack Developer based in Ghaziabad. I graduated in
              Computer Science from AKTU. I am a self-taught developer with a
              passion for web development. I build web apps and websites using
              the MERN stack. My expertise in MongoDB, Express.js, React,
              Node.js, and Next.js enables me to create dynamic, user-friendly
              interfaces that enhance user experiences.
            </p>
            <a
              href="https://drive.google.com/file/d/1cJSZx1BigHYjaFhLPVW7Oe1LO961N5FK/view?usp=drive_link"
              target="_blank"
            >
              <Button className="mt-6 px-5 py-4 text-white bg-sky-600 dark:bg-sky-800">
                <FileText className="mr-1 h-5 w-5" />
                Resume
              </Button>
            </a>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-6">Skills</h3>
            <div className="space-y-4">
              {skills.map((skill, index) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-gray-600">{skill.level}%</span>
                  </div>
                  <motion.div
                    className="h-2 bg-gray-200 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  >
                    <motion.div
                      className="h-full bg-gradient-to-l from-[#56c8e1] to-[#4876c6] rounded-full"
                      style={{ width: `${skill.level}%` }}
                    />
                  </motion.div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
