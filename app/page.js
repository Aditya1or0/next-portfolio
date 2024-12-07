import About from "@/components/About";
import Education from "@/components/Education";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import React from "react";
import Contact from "@/components/Contact";

const Page = () => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <Hero />
          <About />

          <Education />
          <Projects />
          <Contact />
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Page;
