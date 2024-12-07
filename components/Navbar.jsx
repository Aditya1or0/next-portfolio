"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { ModeToggle } from "./theme-button";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import Head from "next/head";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const menuVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "100%" },
  };

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      const sections = ["home", "about", "education", "projects"];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  const NavLink = ({ href, children }) => {
    const isActive = activeSection === href.replace("#", "");

    return (
      <Link href={href}>
        <div className="relative group">
          <span
            className={`text-base transition-colors duration-300 ${
              isActive
                ? "text-blue-500 dark:text-blue-400"
                : "text-gray-900 dark:text-white hover:text-blue-500 dark:hover:text-blue-400"
            }`}
          >
            {children}
          </span>
          <span
            className={`absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500 transform origin-left transition-transform duration-300 ${
              isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
            }`}
          />
        </div>
      </Link>
    );
  };

  const MobileNavLink = ({ href, children }) => {
    const isActive = activeSection === href.replace("#", "");

    return (
      <Link
        href={href}
        onClick={() => setIsOpen(false)}
        className={`block py-2 px-4 transition-all duration-300 ${
          isActive
            ? "bg-blue-50 dark:bg-blue-900/20 text-blue-500 dark:text-blue-400"
            : "text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50"
        }`}
      >
        {children}
      </Link>
    );
  };

  return (
    <>
      <Head>
        <link
          rel="icon"
          href={theme === "dark" ? "/favicon-dark.ico" : "/favicon-light.ico"}
          type="image/x-icon"
        />
      </Head>

      <nav className="fixed w-full z-50 bg-[linear-gradient(270deg, #56c8e1 50%, #4876c6 100%)] dark:bg-inherit backdrop-blur-sm ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex-shrink-0"
              >
                <Image
                  src={
                    theme === "dark"
                      ? "/name-logo-white.svg"
                      : "/name-logo-favicon.svg"
                  }
                  alt="Logo"
                  width={70}
                  height={60}
                  className="mt-5 "
                  priority
                />
              </motion.div>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <div className="flex items-center space-x-6">
                <NavLink href="#home">Home</NavLink>
                <NavLink href="#about">About</NavLink>
                <NavLink href="#education">Education</NavLink>
                <NavLink href="#projects">Projects</NavLink>
              </div>

              <div className="ml-4">
                <ModeToggle />
              </div>
            </div>

            <div className="md:hidden flex items-center gap-3">
              <ModeToggle />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-accent transition-colors duration-200"
                aria-label="Toggle Menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        <motion.div
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          variants={menuVariants}
          className="md:hidden absolute top-16 inset-x-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800"
        >
          <div className="py-2">
            <MobileNavLink href="#home">Home</MobileNavLink>
            <MobileNavLink href="#about">About</MobileNavLink>
            <MobileNavLink href="#education">Education</MobileNavLink>
            <MobileNavLink href="#projects">Projects</MobileNavLink>
          </div>
        </motion.div>
      </nav>
    </>
  );
};

export default Navbar;
