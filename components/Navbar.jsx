"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { ModeToggle } from "./theme-button";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import Head from "next/head";
import React from "react";

// Helper function for throttling scroll events
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Smooth scroll function
const smoothScroll = (e, href) => {
  e.preventDefault();
  const targetId = href.replace("#", "");
  const targetElement = document.getElementById(targetId);
  if (targetElement) {
    window.scrollTo({
      top: targetElement.offsetTop - 80,
      behavior: "smooth",
    });
  }
};

// Navbar component
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about"); // Default to 'about' since Home is removed
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const menuVariants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: -20 },
  };

  useEffect(() => {
    setMounted(true);

    const handleScroll = throttle(() => {
      const sections = ["about", "education", "projects", "blogs", "skills"]; // 'skills' added to sections
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
    }, 100);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  const NavLink = React.memo(({ href, children }) => {
    const isActive = activeSection === href.replace("#", "");

    return (
      <Link href={href} onClick={(e) => smoothScroll(e, href)}>
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
          <motion.span
            className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500"
            initial={false}
            animate={{ scaleX: isActive ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </Link>
    );
  });

  NavLink.displayName = "NavLink"; // Set displayName for NavLink

  const MobileNavLink = React.memo(({ href, children }) => {
    const isActive = activeSection === href.replace("#", "");

    return (
      <Link
        href={href}
        onClick={(e) => {
          smoothScroll(e, href);
          setIsOpen(false); // Close the menu when a link is clicked
        }}
        className={`block py-2 px-4 transition-all duration-300 ${
          isActive
            ? "bg-blue-50 dark:bg-blue-900/20 text-blue-500 dark:text-blue-400"
            : "text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50"
        }`}
      >
        {children}
      </Link>
    );
  });

  MobileNavLink.displayName = "MobileNavLink"; // Set displayName for MobileNavLink

  return (
    <>
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
                  src="/logo.svg"
                  alt="Logo"
                  width={70}
                  height={60}
                  className="mt-5"
                  priority
                />
              </motion.div>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <div className="flex items-center space-x-6">
                <NavLink href="#about">About</NavLink>
                <NavLink href="#skills">Skills</NavLink> {/* Added 'Skills' */}
                <NavLink href="#education">Education</NavLink>
                <NavLink href="#projects">Projects</NavLink>
                <NavLink href="#blogs">Blogs</NavLink>
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
          transition={{ duration: 0.3 }}
          className="md:hidden absolute top-16 inset-x-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800"
        >
          <div className="py-2">
            <MobileNavLink href="#about">About</MobileNavLink>
            <MobileNavLink href="#skills">Skills</MobileNavLink>{" "}
            {/* Added 'Skills' */}
            <MobileNavLink href="#education">Education</MobileNavLink>
            <MobileNavLink href="#projects">Projects</MobileNavLink>
            <MobileNavLink href="#blogs">Blogs</MobileNavLink>
          </div>
        </motion.div>
      </nav>
    </>
  );
};

Navbar.displayName = "Navbar"; // Set displayName for Navbar

export default Navbar;
