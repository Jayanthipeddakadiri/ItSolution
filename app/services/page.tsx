"use client";
import { FormType } from "@/components/ServiceOperationSection";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Services = () => {
  const [allServices, setAllServices] = useState<FormType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    description: "",
    learnMore: "",
  });

  const services = [
    {
      title: "Web Development",
      description:
        "Build modern, responsive websites that engage your users and enhance your online presence.",
      image: "/images/webdevelopment_image.jpg",
    },
    {
      title: "Mobile App Development",
      description:
        "Create powerful mobile applications that run smoothly on both iOS and Android platforms.",
      image: "/images/mobile_app.jpg",
    },
    {
      title: "UI/UX Design",
      description:
        "Design user interfaces that are not only visually appealing but also provide an excellent user experience.",
      image: "/images/uiux.jpg",
    },
    {
      title: "Cloud Computing",
      description:
        "Utilize the power of the cloud to increase efficiency, reduce costs, and scale your business.",
      image: "/images/cloud_computing.jpeg",
    },
    {
      title: "Cyber Security",
      description:
        "Protect your business from cyber threats with our comprehensive security solutions.",
      image: "/images/cyber-security.jpg",
    },
    {
      title: "IT Consulting",
      description:
        "Get expert advice on how to optimize your IT infrastructure and streamline your operations.",
      image: "/images/service.jpeg",
    },
  ];

  const images = [
    "/images/webdevelopment_image.jpg",
    "/images/mobile_app.jpg",
    "/images/uiux.jpg",
    "/images/cloud_computing.jpeg",
    "/images/cyber-security.jpg",
    "/images/service.jpeg",
  ];

  const getAllServices = async () => {
    const response = await axios.get("/api/getservices");
    console.log("response data from get", response.data);
    setAllServices(response.data.portfolio);
  };

  function getRandomImageLink() {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  }

  const openModal = (service: {
    title: string;
    description: string;
    learnMore: string;
  }) => {
    setModalContent(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getAllServices();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-6xl font-extrabold text-center text-white mb-16 tracking-tight">
          Our <span className="text-blue-200">Services</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {allServices.map((service, index) => (
            <div
              key={index}
              className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl overflow-hidden shadow-2xl transform transition duration-300 hover:scale-105"
            >
              <img
                src={getRandomImageLink()}
                alt={service.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold text-blue-100 mb-3">
                  {service.title}
                </h2>
                <p className="text-blue-50 text-sm leading-relaxed">
                  {service.description}
                </p>
                <button
                  className="mt-6 px-4 py-2 bg-blue-400 text-white font-semibold rounded-full text-sm transition duration-300 hover:bg-blue-300"
                  onClick={() => openModal(service)}
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

export default Services;
