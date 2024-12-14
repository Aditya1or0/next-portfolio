"use client";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import EarthCanvas from "./Earth";
import ContactBackground from "./ContactBackground";

export default function Contact() {
  const accessKey = process.env.NEXT_PUBLIC_ACCESS_KEY;

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        name: e.target.name.value,
        email: e.target.email.value,
        message: e.target.message.value,
      }),
    });
    const result = await response.json();
    console.log(result); // Log the entire response for debugging
    if (result.success) {
      alert("Form submitted successfully!");
    } else {
      alert("Form submission failed.");
    }
  }

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-background to-background/95 w-full dark pb-6 pt-6" // Add `dark` class here
      id="contact"
    >
      <ContactBackground />
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center">
          <Phone className="text-black dark:text-white w-[30px] h-[30px] sm:w-[45px] sm:h-[45px] mr-4 mb-12" />
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-foreground text-center">
            Contact{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#56c8e1] via-[#4f8cc9] to-[#2a6ab1]">
              Me
            </span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8 relative">
          <div className="space-y-6 relative">
            {/* Background blur div for the Earth */}
            <div className="h-[300px] sm:h-[400px] w-full relative z-10">
              <EarthCanvas />
            </div>
          </div>
          <div className="relative z-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-foreground"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full p-3 rounded-md border border-input bg-background text-foreground"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-foreground"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-3 rounded-md border border-input bg-background text-foreground"
                  required
                />
              </div>
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
