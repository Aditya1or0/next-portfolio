"use client";
import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="w-full py-6 border-t border-gray-200 dark:border-[#3b3b3b]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link href="/">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex-shrink-0"
            >
              <Image
                src="/name-logo-favicon.svg"
                alt="Logo"
                width={40}
                height={40}
                priority
              />
            </motion.div>
          </Link>
          <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
            Designed with ❤️ by{"  "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#56c8e1] via-[#4f8cc9] to-[#2a6ab1] ">
              Aditya Sharma
            </span>
          </p>
          <div className="flex items-center space-x-4">
            <Link
              href="https://github.com/Aditya1or0"
              target="_blank"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              <span className="sr-only">GitHub</span>
              <Github className="h-5 w-5 sm:h-6 sm:w-6" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/adityashharmaa/"
              target="_blank"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="h-5 w-5 sm:h-6 sm:w-6" />
            </Link>
            <Link
              href="mailto:adityapandit264@gmail.com"
              target="_blank"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              <span className="sr-only">Email</span>
              <Mail className="h-5 w-5 sm:h-6 sm:w-6" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
