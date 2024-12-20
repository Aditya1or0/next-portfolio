"use client";
import React, { Suspense } from "react";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

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

FormInput.displayName = "FormInput"; // Setting displayName for FormInput

function Contact() {
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
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-inherit w-full pb-6 "
      id="contact"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-center">
        <div className="flex flex-col items-center justify-center w-full">
          <div className="flex items-center justify-center mb-6">
            <Phone className="text-black dark:text-white w-[30px] h-[30px] sm:w-[45px] sm:h-[45px] mr-4" />
            <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white text-center">
              Contact{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#56c8e1] via-[#4f8cc9] to-[#2a6ab1]">
                Me
              </span>
            </h2>
          </div>
          <div className="w-full flex justify-center">
            <div className="w-full max-w-md">
              {/* Added max-width to center the form */}
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
                  className="w-full  text-white bg-gradient-to-r from-sky-500 to-blue-900"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Contact.displayName = "Contact";

export default Contact;
