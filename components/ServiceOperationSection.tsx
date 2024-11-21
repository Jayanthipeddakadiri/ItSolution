import React, { ChangeEvent, useEffect, useState } from "react";
import CommonModal, { FieldConfig } from "./CommonModal";
import axios from "axios";
import Table from "./Table";

export interface FormType {
  title: string;
  description: string;
  learnMore: string;
}
const ServiceOperationSection = () => {
  const [isAddPortfolioVisible, setIsAddPortfolioVisible] =
    useState<boolean>(false);
  const [dataForSubmission, setDataForSubmission] = useState<FormType>({
    title: "",
    description: "",
    learnMore: "",
  });

  const [allPortfolios, setAllPortfolios] = useState<FormType[]>([]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    const target = e.target as HTMLInputElement;
    console.log("name is here", name);
    if (target.files) {
      console.log("target is here", target.files[0]);
    }
    if (target.files && target.files[0]) {
      console.log("image condition working");
      setDataForSubmission({ ...dataForSubmission, [name]: target.files[0] });
    } else {
      setDataForSubmission({ ...dataForSubmission, [name]: value });
    }
  };

  console.log("data need to submit", dataForSubmission);
  const modalFields: FieldConfig[] = [
    {
      type: "text",
      label: "Portfolio Name",
      name: "title",
      placeholder: "Enter job title",
    },
    {
      type: "text",
      label: "Service name",
      name: "description",
      placeholder: "Describe your portfolio",
      rows: 5,
    },
    {
      type: "text",
      label: "More about Portfolio",
      name: "learnMore",
      placeholder: "Add something more",
      rows: 6,
    },
  ];
  const getAllServices = async () => {
    const response = await axios.get("/api/getservices");
    console.log("response data from get", response.data);
    setAllPortfolios(response.data.portfolio);
  };

  useEffect(() => {
    getAllServices();
  }, []);
  const handleCloseModal = () => {
    setIsAddPortfolioVisible(false);
  };
  const submitPortfoliohandler = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const dataToBackend = {
      title: dataForSubmission.title,
      description: dataForSubmission.description,
      learnMore: dataForSubmission.learnMore,
    };
    const response = await axios.post("/api/addservice", dataToBackend, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("response data from add", response.data);
    getAllServices();
    setIsAddPortfolioVisible(false);
  };
  // const handleShowDeleteModal = (id: string) => {
  //   // Show delete modal with the given id
  // };

  // const handleUpdateJob = (dataForUpdate: FormType) => {
  //   // Update the job with the given id and updatedData
  //   setDataForSubmission(dataForUpdate);
  //   setIsAddPortfolioVisible(true);
  // };
  return (
    <div>
      <button
        className="bg-blue-400 hover:bg-blue-300 text-white px-6 py-3 rounded-full font-semibold transition duration-300 shadow-lg"
        onClick={() => setIsAddPortfolioVisible(true)}
      >
        Add Service
      </button>
      {isAddPortfolioVisible && (
        <CommonModal
          title="Add Portfolio"
          handleSubmit={submitPortfoliohandler}
          handleChange={handleChange}
          fields={modalFields}
          formData={dataForSubmission}
          handleCloseModal={handleCloseModal}
        />
      )}
      <div className="mt-12">
        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl overflow-hidden shadow-2xl">
          <Table
            tableContent={allPortfolios}
            tableHeaders={["Title", "Description", "LearnMore"]}
          />
        </div>
      </div>
    </div>
  );
};

export default ServiceOperationSection;
