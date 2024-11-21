"use client";
import ApplicationSection from "@/components/ApplicationSection";
import CommonModal from "@/components/CommonModal";
import { FieldConfig } from "@/components/CommonModal";
import ContactOperation from "@/components/ContactOperation";
import JobOperationSection from "@/components/JobOperationSection";
import MemberOperation from "@/components/MemberOperation";
import PortfolioOperationSection from "@/components/PortfolioOperationSection";
import ServiceOperationSection from "@/components/ServiceOperationSection";
import Table from "@/components/Table";
import axios from "axios";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";

const Page: React.FC = () => {
  const adminFeatures = [
    "Jobs",
    "Services",
    "Portfolio",
    "Members",
    "contact",
    "jobapplications",
  ];
  const [selectedFeature, setSelectedFeature] = useState<string>(
    adminFeatures[0]
  );

  const handleFeatureClick = (feature: string) => {
    setSelectedFeature(feature);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white py-20">
      <h1 className="text-5xl font-extrabold text-center mb-12 tracking-tight">
        Admin <span className="text-blue-200">Dashboard</span>
      </h1>
      <div className="flex justify-center mb-8">
        {adminFeatures.map((feature) => (
          <button
            key={feature}
            className={`mx-2 px-4 py-2 rounded-lg transition duration-300 ${
              selectedFeature === feature ? "bg-blue-300" : "bg-blue-700"
            }`}
            onClick={() => handleFeatureClick(feature)}
          >
            {feature}
          </button>
        ))}
      </div>
      {selectedFeature === "Jobs" && <JobOperationSection />}
      {selectedFeature === "Services" && <ServiceOperationSection />}
      {selectedFeature === "Portfolio" && <PortfolioOperationSection />}
      {selectedFeature === "Members" && <MemberOperation />}
      {selectedFeature === "contact" && <ContactOperation />}
      {selectedFeature === "jobapplications" && <ApplicationSection />}
    </div>
  );
};

export default Page;
