"use client";

import { motion } from "framer-motion";
import { Code } from "lucide-react";

const skills = [
  { name: "React.js", level: 68 },
  { name: "Node.js", level: 60 },
  { name: "JavaScript", level: 75 },
  { name: "MongoDB", level: 60 },
  { name: "Next.js", level: 50 },
  { name: "Java", level: 65 },
  { name: "Express.js", level: 55 },
  { name: "C++", level: 70 },
];

const Skills = () => {
  return (
    <section id="skills">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 py-16 sm:py-24"
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center justify-center">
            <Code className="text-inherit w-8 h-8 sm:w-12 sm:h-12 mr-3" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              My{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#56c8e1] via-[#4f8cc9] to-[#2a6ab1]">
                Skills
              </span>
            </h2>
          </div>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex justify-between mb-2">
                <span className="font-medium text-lg">{skill.name}</span>
                <span className="text-gray-600">{skill.level}%</span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-l from-[#56c8e1] to-[#4876c6] rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;
