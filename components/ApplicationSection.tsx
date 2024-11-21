import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "./Table";

interface JobApplication {
  firstname: string;
  lastname: string;
  role: string;
  availableDate: string;
  experience: number;
  place: string;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const ApplicationSection: React.FC = () => {
  const [allApplications, setAllApplications] = useState<JobApplication[]>([]);

  const getAllApplications = async () => {
    try {
      const response = await axios.get("/api/getjobapplications");
      console.log("response from job section", response);
      const formattedApplications = response.data.jobApplications.map(
        (application: JobApplication) => ({
          ...application,
          availableDate: formatDate(application.availableDate),
        })
      );
      setAllApplications(formattedApplications);
    } catch (error) {
      console.error("Failed to fetch job applications", error);
    }
  };

  useEffect(() => {
    getAllApplications();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-6">
        All Job Applications
      </h1>
      <div className="mt-12">
        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl overflow-hidden shadow-2xl">
          <Table
            tableContent={allApplications}
            tableHeaders={[
              "First Name",
              "Last Name",
              "Role",
              "Available Date",
              "Experience",
              "Place",
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default ApplicationSection;
