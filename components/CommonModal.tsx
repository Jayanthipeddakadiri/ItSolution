import React, { ChangeEvent, FormEvent } from "react";

export interface FieldConfig {
  type: "text" | "number" | "textarea" | "file";
  label: string;
  name: string;
  placeholder?: string;
  rows?: number;
}

interface CommonModalProps {
  title: string;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  formData: any;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleCloseModal: () => void;
  fields: FieldConfig[];
}

const CommonModal: React.FC<CommonModalProps> = ({
  title,
  handleSubmit,
  formData,
  handleChange,
  handleCloseModal,
  fields,
}) => {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleChange({
        target: {
          name: e.target.name,
          value: e.target.files[0],
        },
      } as unknown as ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <div className="fixed z-50 inset-0 bg-blue-900 bg-opacity-75 backdrop-blur-md flex justify-center items-center overflow-y-auto">
      <div className="bg-blue-100 p-8 rounded-2xl shadow-2xl w-full max-w-md min-h-[300px] max-h-[80vh] overflow-y-auto transform transition-all duration-300 ease-in-out hover:scale-105">
        <h2 className="text-3xl font-bold mb-6 text-blue-800 border-b-2 border-blue-300 pb-2">
          {title}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {fields.map((field, index) => (
            <div key={index}>
              <label className="block text-blue-700 mb-2 font-semibold">
                {field.label}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200 bg-white text-blue-800"
                  rows={field.rows || 4}
                  required
                  placeholder={field.placeholder}
                />
              ) : field.type === "file" ? (
                <input
                  type={field.type}
                  name={field.name}
                  onChange={handleFileChange}
                  className="w-full px-4 py-3 border-2 border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200 bg-white text-blue-800"
                  required
                />
              ) : field.name === "availableDate" ? (
                <input
                  type="date"
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200 bg-white text-blue-800"
                  required
                />
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200 bg-white text-blue-800"
                  required
                  placeholder={field.placeholder}
                />
              )}
            </div>
          ))}
          <div className="flex justify-end space-x-4 mt-8">
            <button
              type="button"
              onClick={handleCloseModal}
              className="px-6 py-3 rounded-lg text-blue-700 bg-blue-200 hover:bg-blue-300 transition-colors duration-200 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 font-semibold shadow-md hover:shadow-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommonModal;
