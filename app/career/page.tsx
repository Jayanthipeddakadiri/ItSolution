"use client";
import JobCard from "@/components/JobCard";
import axios from "axios";
import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import CommonModal, { FieldConfig } from "@/components/CommonModal";

interface Job {
  _id?: string;
  title: string;
  description: string;
  experience: number;
}

const Page = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    role: "",
    availableDate: "",
    experience: 0,
    place: "",
  });
  const [confirmationMessage, setConfirmationMessage] = useState<string>("");

  useEffect(() => {
    getAllJobs();
  }, []);

  const getAllJobs = async () => {
    try {
      const response = await axios.get("/api/getjobs");
      if (response.status === 200) {
        setJobs(response.data.jobs);
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  const handleApply = (role: string) => {
    setFormData((prev) => ({ ...prev, role }));
    setIsModalOpen(true);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      firstname: "",
      lastname: "",
      role: "",
      availableDate: "",
      experience: 0,
      place: "",
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("/api/postjobapplication", formData);
      setConfirmationMessage("Application submitted successfully!");
      handleCloseModal();
      setTimeout(() => setConfirmationMessage(""), 5000); // Hide the message after 5 seconds
    } catch (err) {
      console.error(err);
    }
  };

  const fields: FieldConfig[] = [
    { type: "text", label: "First Name", name: "firstname" },
    { type: "text", label: "Last Name", name: "lastname" },
    {
      type: "text",
      label: "Role",
      name: "role",
      placeholder: "Role",
    },
    {
      type: "text",
      label: "Available Date for Interview",
      name: "availableDate",
      placeholder: "YYYY-MM-DD",
    },
    { type: "number", label: "Experience", name: "experience" },
    { type: "text", label: "Place", name: "place" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white">
      <div className="container mx-auto px-6 py-20">
        <div className="text-center">
          <h1 className="text-6xl font-extrabold tracking-tight">
            Careers at <span className="text-blue-200">TechSolutions</span>
          </h1>
          <p className="mt-6 text-xl text-blue-100">
            Join our team and help shape the future of technology.
          </p>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-4xl font-bold text-blue-200">
            Our Company Culture
          </h2>
          <p className="mt-6 text-lg text-blue-50 leading-relaxed max-w-3xl mx-auto">
            At TechSolutions we believe in fostering a collaborative and
            inclusive environment where innovation thrives. We value creativity,
            dedication, and teamwork, and we are committed to helping our
            employees grow both professionally and personally.
          </p>
        </div>

        <div className="mt-16 flex flex-col md:flex-row md:space-x-8 items-center">
          <div className="md:w-1/2">
            <img
              src="/images/company-culture.jpg"
              alt="Company Culture"
              className="w-full h-auto rounded-xl shadow-2xl"
            />
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <h2 className="text-4xl font-bold text-blue-200">
              Why Work With Us?
            </h2>
            <ul className="mt-6 space-y-4 text-lg text-blue-50">
              {[
                "Competitive Salaries and Benefits",
                "Flexible Working Hours",
                "Opportunities for Growth and Development",
                "Inclusive and Diverse Workplace",
                "Collaborative and Supportive Team Environment",
              ].map((item, index) => (
                <li key={index} className="flex items-center">
                  <svg
                    className="h-6 w-6 mr-2 text-blue-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 text-center">
          <h2 className="text-4xl font-bold text-blue-200">Open Positions</h2>
          <p className="mt-6 text-lg text-blue-50">
            We are always looking for talented individuals to join our team.
            Check out our current job openings below:
          </p>
          {confirmationMessage && (
            <div className="mt-6 text-green-500 font-semibold">
              {confirmationMessage}
            </div>
          )}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobs.map((job) => (
              <JobCard
                key={job._id}
                title={job.title}
                description={job.description}
                experience={job.experience}
                onApply={handleApply}
              />
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <CommonModal
          title="Job Application"
          handleSubmit={handleSubmit}
          handleCloseModal={() => setIsModalOpen(false)}
          fields={fields}
          formData={formData}
          handleChange={handleChange}
        />
      )}
    </div>
  );
};

export default Page;
