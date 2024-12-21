"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, BookOpen } from "lucide-react";
import { Button } from "./ui/button";

const BlogShowcase = () => {
  // Manually adding blog posts
  const blogs = [
    {
      title:
        "A Complete Guide to Deploying Your MERN Stack Application on Vercel: Frontend and Backend",
      pubDate: "20 DEC 2024",
      link: "https://medium.com/@adityasharma264",
      subtitle:
        "Learn how to deploy a full MERN stack application with Vercel, covering both frontend and backend.",
    },
    {
      title:
        "Fixing NextAuth Redirect URI Mismatch Error When Deploying to Vercel",
      pubDate: "9 DEC 2024",
      link: "https://medium.com/@adityasharma264",
      subtitle:
        "Learn how to resolve the redirect URI mismatch error when using NextAuth with Vercel deployment.",
    },
    {
      title:
        "Solving 'NextRouter was not mounted' Error in Next.js: My First Next.js Project Experience",
      pubDate: "8 DEC 2024",
      link: "https://medium.com/@adityasharma264",
      subtitle:
        "A deep dive into troubleshooting the 'NextRouter was not mounted' error during my first Next.js project.",
    },
  ];

  return (
    <section
      className="min-h-screen bg-inherit py-20 px-4 sm:px-6 lg:px-8"
      id="blogs"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center">
            <BookOpen className="text-black dark:text-white w-[30px] h-[30px] sm:w-[50px] sm:h-[50px] mr-4 mb-4" />
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#56c8e1] via-[#4f8cc9] to-[#2a6ab1]">
                My
              </span>{" "}
              Blog Posts
            </h2>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Check out my latest articles on Medium
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <BlogCard key={index} blog={blog} index={index} />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center">
        <a
          href="https://medium.com/@adityasharma264"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="bg-sky-600 dark:bg-sky-800 mt-10 px-12 w-auto py-5 text-white">
            View All Posts
            <ExternalLink className="ml-2" />
          </Button>
        </a>
      </div>
    </section>
  );
};

const BlogCard = ({ blog, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ y: -10 }}
    className="bg-[#f9f9f9] dark:bg-[#121212] rounded-lg overflow-hidden shadow-lg"
  >
    <div className="p-6">
      <h3 className="text-lg sm:text-xl font-bold mb-2">{blog.title}</h3>
      <p className="text-sm sm:text-base text-muted-foreground mb-4">
        {blog.subtitle}
      </p>
      <p className="text-xs text-muted-foreground mb-4">
        Published on: {blog.pubDate}
      </p>
      <motion.a
        href={blog.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-4 py-2 text-transparent bg-clip-text bg-gradient-to-r from-[#56c8e1] via-[#4f8cc9] to-[#2a6ab1] rounded-md duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex items-center">
          Read More
          <ExternalLink className="w-[20px] h-[20px] text-sky-600 ml-2" />
        </div>
      </motion.a>
    </div>
  </motion.div>
);

export default BlogShowcase;
