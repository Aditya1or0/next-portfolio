"use client";
import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { CardFooter } from "./ui/card";
import { ExternalLink, Github, BriefcaseBusiness, Code } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import { useInView } from "react-intersection-observer";

const projects = [
  {
    title: "TripGo (Full Stack)",
    description:
      "This project is a Travel Agency Booking System that enables customers to explore and book travel packages. ",
    image:
      "https://firebasestorage.googleapis.com/v0/b/chat-app-86f48.appspot.com/o/my-projects%2FScreenshot%202024-12-19%20134645.png?alt=media&token=33140726-fa42-4db0-805d-e27c286a9644",
    tags: [
      "React.js",
      "Node.js",
      "Express.js",
      "Tailwind CSS",
      "MongoDB",
      "Framer Motion",
    ],
    link: "https://trip-go-frontend.vercel.app/",
    codeLink: "https://github.com/Aditya1or0/TripGo",
  },
  {
    title: "AuthiFy (Full Stack)",
    description:
      "AuthiFy is a secure authentication system.The project provides features like email verification, password reset functionality, and overall user authentication.",
    image:
      "https://firebasestorage.googleapis.com/v0/b/chat-app-86f48.appspot.com/o/my-projects%2Fhome.png?alt=media&token=4b10a817-cdf9-4616-877c-c1a852f27da2",
    tags: [
      "React.js",
      "Node.js",
      "Express.js",
      "Tailwind CSS",
      "MongoDB",
      "Node Mailer",
    ],
    link: "https://github.com/Aditya1or0/Mern-Auth",
    codeLink: "https://github.com/Aditya1or0/Mern-Auth",
  },
  {
    title: "imaginAI",
    description:
      "Full Stack Text-to-Image Generator AI SaaS Application.This app allows users to generate images by entering text prompts.",
    image:
      "https://firebasestorage.googleapis.com/v0/b/chat-app-86f48.appspot.com/o/my-projects%2FimaginAI.png?alt=media&token=e9100837-97a7-4f92-bd9a-42ee79c12dc2",
    tags: ["React.js", "Youtube Api"],
    link: "https://imagin-ai-frontend.vercel.app/",
    codeLink: "https://github.com/Aditya1or0/imaginAI",
  },
  {
    title: "Kharidari (MERN Stack)",
    description:
      "A fully functional e-commerce website for clothing, using React, Node, Express, Tailwind and MongoDB",
    image:
      "https://firebasestorage.googleapis.com/v0/b/chat-app-86f48.appspot.com/o/my-projects%2FScreenshot%202024-12-04%20211239.png?alt=media&token=3126acc0-088b-46c0-a944-8d77c5bfbed6",
    tags: ["React.js", "Node.js", "Express.js", "Tailwind CSS", "MongoDB"],
    link: "https://kharidari-frontend.vercel.app/",
    codeLink: "https://github.com/Aditya1or0/kharidari",
  },
  {
    title: "MyProjects (Full Stack)",
    description:
      "A full-stack web application to manage my personal project portfolio",
    image:
      "https://firebasestorage.googleapis.com/v0/b/chat-app-86f48.appspot.com/o/my-projects%2FScreenshot%202024-12-04%20211705.png?alt=media&token=0ad50dce-425e-4013-a975-9201726ff783",
    tags: [
      "Next.js",
      "Three.js",
      "Tailwind",
      "Shadcn UI",
      "NextAuth",
      "Firebase",
    ],
    link: "https://my-projects-two.vercel.app/",
    codeLink: "https://github.com/ADitya1or0/my-projects-full-stack",
  },
  {
    title: "BgRemover (MERN Stack)",
    description:
      "A full-stack background removal app using React, Node, Express, Tailwind and MongoDB ",
    image:
      "https://firebasestorage.googleapis.com/v0/b/chat-app-86f48.appspot.com/o/my-projects%2FBgremover.png?alt=media&token=83d8db04-1f3e-4b55-a573-ec819a490590",
    tags: ["React.js", "Express.js", "Node.js", "Tailwind", "MongoDB", "AI"],
    link: "https://bg-remover-client.vercel.app/",
    codeLink: "https://github.com/Aditya1or0/bgremover",
  },
  {
    title: "BlogiFy (Full Stack)",
    description: "A full-stack blog web application",
    image:
      "https://firebasestorage.googleapis.com/v0/b/chat-app-86f48.appspot.com/o/my-projects%2FScreenshot%202024-12-02%20131252.png?alt=media&token=a592f3e3-23ac-4121-b9c2-050c15946c5b",
    tags: ["Next.js", "Three.js", "Shadcn UI", "Tailwind", "MongoDB"],
    link: "https://blog-app-beta-three-27.vercel.app/",
    codeLink: "https://github.com/yourusername/blogify",
  },
  {
    title: "ChatApp (Full Stack)",
    description: "A Real-Time Chat application with React.js and Firebase",
    image:
      "https://firebasestorage.googleapis.com/v0/b/chat-app-86f48.appspot.com/o/my-projects%2FChatapp.png?alt=media&token=d40055df-2b8f-49bc-a387-b3ea52458db8",
    tags: ["React.js", "Firebase"],
    link: "https://chat-app-nine-ruby.vercel.app/",
    codeLink: "https://github.com/Aditya1or0/ChatApp",
  },

  {
    title: "VibeTube",
    description:
      "A Video Streaming application using React.js, fetching videos through the YouTube Data API",
    image:
      "https://firebasestorage.googleapis.com/v0/b/chat-app-86f48.appspot.com/o/my-projects%2Fvibetube%20(2).png?alt=media&token=7ebdf539-20c3-4bc8-91c3-cdd601950db5",
    tags: ["React.js", "Youtube Api"],
    link: "https://vibe-tube-omega.vercel.app/",
    codeLink: "https://github.com/Aditya1or0/VibeTube",
  },
];

const Projects = () => {
  const [visibleProjects, setVisibleProjects] = useState(6);
  const showMoreProjects = () => {
    if (visibleProjects === 6) {
      setVisibleProjects(projects.length);
    } else {
      setVisibleProjects(6);
    }
  };
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      className="min-h-screen bg-inherit py-12 px-4 sm:px-6 lg:px-8"
      id="projects"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center">
            <BriefcaseBusiness className="text-black dark:text-white w-[30px] h-[30px] sm:w-[50px] sm:h-[50px] mr-4 mb-4" />
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#56c8e1] via-[#4f8cc9] to-[#2a6ab1]">
                My
              </span>{" "}
              Projects
            </h2>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and
            expertise
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.slice(0, visibleProjects).map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center mt-10">
        <Button
          className="bg-sky-600 dark:bg-sky-800 px-12 w-auto py-5 text-white"
          onClick={showMoreProjects}
        >
          {visibleProjects === 6 ? "Show More" : "Show Less"}
        </Button>
      </div>
    </div>
  );
};

const ProjectCard = ({ project, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="bg-[#f9f9f9] dark:bg-[#121212] rounded-lg overflow-hidden shadow-lg"
    >
      <div className="relative w-full h-56 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="text-lg sm:text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-sm sm:text-base text-muted-foreground mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="bg-gray-100 dark:bg-gray-300 text-gray-800 text-xs sm:text-sm px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-4 flex justify-between items-center">
          <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-transparent bg-clip-text bg-gradient-to-r from-[#56c8e1] via-[#4f8cc9] to-[#2a6ab1] rounded-md duration-300 ml-[-20px]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-center">
              Live Demo
              <ExternalLink className="w-[20px] h-[20px] text-sky-600 ml-2" />
            </div>
          </motion.a>
          <motion.a
            href={project.codeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-transparent bg-clip-text bg-gradient-to-r from-[#56c8e1] via-[#4f8cc9] to-[#2a6ab1] rounded-md duration-300 ml-[-20px]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-center">
              Code
              <Code className="w-[20px] h-[20px] text-sky-600 ml-2" />
            </div>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;
