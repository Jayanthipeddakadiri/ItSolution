"use client";
import React from "react";

interface JobCardType {
  title: string;
  description: string;
  experience: number;
  onApply: (role: string) => void; // New prop for handling apply
}

const JobCard: React.FC<JobCardType> = ({
  title,
  description,
  experience,
  onApply,
}) => {
  return (
    <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl overflow-hidden shadow-2xl transform transition duration-300 hover:scale-105">
      <div className="p-6">
        <h3 className="text-2xl font-bold text-blue-100 mb-2">{title}</h3>
        <div className="flex items-center text-blue-200 mb-4">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span>Remote</span>
        </div>
        <div className="flex items-center text-blue-200 mb-4">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Experience: {experience} years</span>
        </div>
        <p className="text-blue-50 mb-6">{description}</p>
        <button
          onClick={() => onApply(title)}
          className="w-full bg-blue-400 text-white py-2 px-4 rounded-lg hover:bg-blue-300 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobCard;
