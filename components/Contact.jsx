"use client";
import React, { Suspense, lazy } from "react";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const LazyEarthCanvas = lazy(() => import("./Earth"));
const LazyContactBackground = lazy(() => import("./ContactBackground"));

const FormInput = React.memo(({ label, id, type = "text", ...props }) => (
  <div>
    <label
      htmlFor={id}
      className="block mb-2 text-sm font-medium text-foreground"
    >
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      className="w-full p-3 rounded-md border border-input bg-background text-foreground"
      required
      {...props}
    />
  </div>
));

export default function Contact() {
  const accessKey = process.env.NEXT_PUBLIC_ACCESS_KEY;

  const handleSubmit = React.useCallback(
    async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: accessKey,
            ...Object.fromEntries(formData),
          }),
        });
        const result = await response.json();
        if (result.success) {
          alert("Form submitted successfully!");
        } else {
          throw new Error("Form submission failed");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("Form submission failed. Please try again.");
      }
    },
    [accessKey]
  );

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-background to-background/95 w-full dark pb-6 pt-6"
      id="contact"
    >
      <Suspense fallback={<div>Loading background...</div>}>
        <LazyContactBackground />
      </Suspense>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-center mb-12">
          <Phone className="text-black dark:text-white w-[30px] h-[30px] sm:w-[45px] sm:h-[45px] mr-4" />
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-center">
            Contact{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#56c8e1] via-[#4f8cc9] to-[#2a6ab1]">
              Me
            </span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8 relative">
          <div className="space-y-6 relative">
            <div className="h-[300px] sm:h-[400px] w-full relative z-10">
              <Suspense fallback={<div>Loading Earth...</div>}>
                <LazyEarthCanvas />
              </Suspense>
            </div>
          </div>
          <div className="relative z-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <FormInput label="Name" id="name" />
              <FormInput label="Email" id="email" type="email" />
              <div>
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-foreground"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  className="w-full p-3 rounded-md border border-input bg-background text-foreground"
                  required
                ></textarea>
              </div>
              <Button
                type="submit"
                className="w-full bg-sky-600 dark:bg-sky-800 text-white"
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
