"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

const Education = () => {
  return (
    <div
      className="min-h-screen text-white py-20 px-4 sm:px-6 lg:px-8"
      id="education"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center">
            <GraduationCap className="text-black dark:text-white w-[40px] h-[40px] sm:w-[60px] sm:h-[60px] mr-4 mb-4" />
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-black dark:text-white">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#56c8e1] via-[#4f8cc9] to-[#2a6ab1]">
                My
              </span>{" "}
              Education
            </h2>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            My academic journey and certifications
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="relative h-[300px] sm:h-[400px]">
            <Canvas>
              <OrbitControls enableZoom={false} />
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <mesh>
                <boxGeometry args={[2, 2, 2]} />
                <meshStandardMaterial color="#4299e1" />
              </mesh>
            </Canvas>
          </div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <TimelineItem
              year="2020 - 2024"
              title="Bachelor of Technology"
              institution="R D Engineering College, Ghaziabad"
              description="Specialized in Computer Science and Engineering"
            />
            <TimelineItem
              year="October 2023 - Jan 2024"
              title="Internship"
              institution="Octanet Software Services"
              description="Web devloper Remote Internship"
            />
            <TimelineItem
              year="2019 - 2020"
              title=" 12th Grade"
              institution="Kendriya Vidyalaya, Kamla Nehru Nagar, Ghaziabad"
            />
            <TimelineItem
              year="2018-2019"
              title="10th Grade "
              institution="Kendriya Vidyalaya, Kamla Nehru Nagar, Ghaziabad"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const TimelineItem = ({ year, title, institution, description }) => (
  <motion.div
    whileHover={{ x: 10 }}
    className="border-l-2 border-[#1594b6] pl-4 bg-[rgb(250, 249, 246)]/10"
  >
    <span className="text-[rgba(37,134,207,255)] text-sm sm:text-base">
      {year}
    </span>
    <h3 className="text-lg sm:text-xl text-black dark:text-white font-bold mt-1">
      {title}
    </h3>
    <p className="text-sm sm:text-base text-muted-foreground">{institution}</p>
    <p className="text-sm sm:text-base text-gray-400 mt-1 italic">
      {description}
    </p>
  </motion.div>
);

export default Education;
