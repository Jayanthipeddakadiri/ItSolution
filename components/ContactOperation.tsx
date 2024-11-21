import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "./Table";

interface Contact {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const ContactOperation: React.FC = () => {
  const [allContacts, setAllContacts] = useState<Contact[]>([]);

  const getAllContacts = async () => {
    try {
      const response = await axios.get("/api/getcontacts");
      setAllContacts(response.data.contacts);
    } catch (error) {
      console.error("Failed to fetch contacts", error);
    }
  };

  useEffect(() => {
    getAllContacts();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-6">All Contacts</h1>
      <div className="mt-12">
        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl overflow-hidden shadow-2xl">
          <Table
            tableContent={allContacts}
            tableHeaders={["Name", "Email", "Phone", "Message"]}
          />
        </div>
      </div>
    </div>
  );
};

export default ContactOperation;
