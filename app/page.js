import dynamic from "next/dynamic";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { ThemeProvider } from "@/components/theme-provider";

const About = dynamic(() => import("@/components/About"), {
  loading: () => <p>Loading...</p>,
});
const Education = dynamic(() => import("@/components/Education"), {
  loading: () => <p>Loading...</p>,
});
const Projects = dynamic(() => import("@/components/Projects"), {
  loading: () => <p>Loading...</p>,
});
const BlogShowcase = dynamic(() => import("@/components/BlogShowcase"), {
  loading: () => <p>Loading...</p>,
});
const Contact = dynamic(() => import("@/components/Contact"), {
  loading: () => <p>Loading...</p>,
});
const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => <p>Loading...</p>,
});

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
          <Suspense fallback={<div>Loading...</div>}>
            <About />
            <Education />
            <Projects />
            <BlogShowcase />
            <Contact />
          </Suspense>
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Page;
