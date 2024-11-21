"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  name: string;
  email: string;
  contactnumber: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    contactnumber: "",
    message: "",
  });

  const [responseMessage, setResponseMessage] = useState<string>("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    try {
      const response = await fetch("/api/addcontact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setResponseMessage("Contact submission successful!");
        setFormData({ name: "", email: "", contactnumber: "", message: "" }); // Clear the form
      } else {
        setResponseMessage(`Failed to submit contact: ${result.message}`);
      }
    } catch (error) {
      setResponseMessage(`An error occurred: ${(error as Error).message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-6xl font-extrabold text-center text-white mb-16 tracking-tight">
          Contact <span className="text-blue-200">Us</span>
        </h1>
        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl overflow-hidden shadow-2xl max-w-2xl mx-auto">
          <div className="p-8">
            <h2 className="text-3xl font-bold text-blue-100 text-center mb-6">
              Get In Touch
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-blue-100 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-blue-50 bg-opacity-20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-white placeholder-blue-200"
                  placeholder="Enter your name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-blue-100 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-blue-50 bg-opacity-20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-white placeholder-blue-200"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-4">
                <label className="block text-blue-100 mb-2">Phone</label>
                <input
                  type="tel"
                  name="contactnumber"
                  value={formData.contactnumber}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-blue-50 bg-opacity-20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-white placeholder-blue-200"
                  placeholder="Enter your phone number"
                />
              </div>
              <div className="mb-6">
                <label className="block text-blue-100 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-blue-50 bg-opacity-20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-white placeholder-blue-200 h-32"
                  placeholder="Enter your message"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-400 text-white py-2 px-4 rounded-lg hover:bg-blue-300 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Submit
              </button>
            </form>
            {responseMessage && (
              <div className="mt-4 text-center text-white">
                {responseMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
