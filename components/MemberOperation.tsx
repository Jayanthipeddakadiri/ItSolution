import React, { ChangeEvent, useEffect, useState } from "react";
import CommonModal, { FieldConfig } from "./CommonModal";
import axios from "axios";
import Table from "./Table";

export interface FormType {
  name: string;
  position: string;
}
const MemberOperation = () => {
  const [isAddTeamMemberVisible, setisAddTeamMemberVisible] =
    useState<boolean>(false);
  const [dataForSubmission, setDataForSubmission] = useState<FormType>({
    name: "",
    position: "",
  });

  const [allTeamMembers, setAllTeamMembers] = useState<FormType[]>([]);

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
      label: "Team Member Name",
      name: "name",
      placeholder: "Enter Member name",
    },
    {
      type: "text",
      label: "Team Member Position",
      name: "position",
      placeholder: "Enter member position",
      rows: 5,
    },
  ];
  const getAllTeamMembers = async () => {
    const response = await axios.get("/api/getteammembers");
    console.log("response data from get", response.data);

    setAllTeamMembers(response.data.teamMembers);
  };

  useEffect(() => {
    getAllTeamMembers();
  }, []);
  const handleCloseModal = () => {
    setisAddTeamMemberVisible(false);
  };
  const submitTeamMemberHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const dataToBackend = {
      name: dataForSubmission.name,
      position: dataForSubmission.position,
    };
    const response = await axios.post("/api/addteammember", dataToBackend, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("response data from add", response.data);
    setAllTeamMembers(response.data.teamMembers);
    setisAddTeamMemberVisible(false);
    getAllTeamMembers();
  };
  // const handleShowDeleteModal = (id: string) => {
  //   // Show delete modal with the given id
  // };

  // const handleUpdateJob = (dataForUpdate: FormType) => {
  //   // Update the job with the given id and updatedData
  //   setDataForSubmission(dataForUpdate);
  //   setisAddTeamMemberVisible(true);
  // };
  return (
    <div>
      <button
        className="bg-blue-400 hover:bg-blue-300 text-white px-6 py-3 rounded-full font-semibold transition duration-300 shadow-lg"
        onClick={() => setisAddTeamMemberVisible(true)}
      >
        Add Team Member
      </button>
      {isAddTeamMemberVisible && (
        <CommonModal
          title="Add Team Member"
          handleSubmit={submitTeamMemberHandler}
          handleChange={handleChange}
          fields={modalFields}
          formData={dataForSubmission}
          handleCloseModal={handleCloseModal}
        />
      )}
      <div className="mt-12">
        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl overflow-hidden shadow-2xl">
          <Table
            tableContent={allTeamMembers}
            tableHeaders={["Name", "Position"]}
          />
        </div>
      </div>
    </div>
  );
};

export default MemberOperation;
