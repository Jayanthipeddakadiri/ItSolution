"use client";
import { FormType } from "@/components/ServiceOperationSection";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Portfolio = () => {
  const [allPortfolios, setAllPortfolios] = useState<FormType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    description: "",
    learnMore: "",
  });

  const projects = [
    {
      title: "Team Management App",
      description:
        "A comprehensive tool for managing team tasks, communication, and project timelines efficiently.",
      image: "/images/project.jpg",
    },
    {
      title: "E-commerce Platform",
      description:
        "A robust e-commerce platform designed to facilitate seamless online shopping experiences.",
      image: "/images/webdevelopment_image.jpg",
    },
    {
      title: "Cyber Security Suite",
      description:
        "A suite of tools designed to protect businesses from cyber threats and ensure data integrity.",
      image: "/images/cyber-security.jpg",
    },
    {
      title: "Customer Service Portal",
      description:
        "An intuitive customer service portal to enhance customer support and streamline service requests.",
      image: "/images/service.jpeg",
    },
    {
      title: "UI/UX Design System",
      description:
        "A comprehensive UI/UX design system for creating consistent and engaging user interfaces.",
      image: "/images/uiux.jpg",
    },
    {
      title: "Cloud Computing Solution",
      description:
        "A scalable cloud computing solution to manage and deploy applications in the cloud seamlessly.",
      image: "/images/cloud_computing.jpeg",
    },
  ];

  const images = [
    "/images/project.jpg",
    "/images/webdevelopment_image.jpg",
    "/images/mobile_app.jpg",
    "/images/uiux.jpg",
    "/images/cloud_computing.jpeg",
    "/images/cyber-security.jpg",
  ];

  function getRandomImageLink() {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  }

  const getAllPortfolios = async () => {
    const response = await axios.get("/api/getportfolios");
    console.log("response data from get", response.data);
    setAllPortfolios(response.data.portfolio);
  };

  const openModal = (project: {
    title: string;
    description: string;
    learnMore: string;
  }) => {
    setModalContent(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getAllPortfolios();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-6xl font-extrabold text-center text-white mb-16 tracking-tight">
          Our <span className="text-blue-200">Portfolio</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {allPortfolios.map((project, index) => (
            <div
              key={index}
              className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl overflow-hidden shadow-2xl transform transition duration-300 hover:scale-105"
            >
              <img
                src={getRandomImageLink()}
                alt={project.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold text-blue-100 mb-3">
                  {project.title}
                </h2>
                <p className="text-blue-50 text-sm leading-relaxed">
                  {project.description}
                </p>
                <button
                  className="mt-6 px-4 py-2 bg-blue-400 text-white font-semibold rounded-full text-sm transition duration-300 hover:bg-blue-300"
                  onClick={() => openModal(project)}
                >
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-8 max-w-lg mx-auto shadow-2xl">
            <h2 className="text-2xl font-bold text-blue-100 mb-4">
              {modalContent.title}
            </h2>
            <p className="text-blue-50 text-sm leading-relaxed">
              {modalContent.learnMore}
            </p>
            <button
              className="mt-6 px-4 py-2 bg-blue-400 text-white font-semibold rounded-full text-sm transition duration-300 hover:bg-blue-300"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
