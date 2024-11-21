import React from "react";

interface TableProps {
  tableHeaders: string[];
  tableContent: any[];
  updateFunction?: (item: any) => void;
  deleteFunction?: (item: any) => void;
  excludeFields?: string[];
}

const Table: React.FC<TableProps> = ({
  tableHeaders,
  tableContent,
  updateFunction,
  deleteFunction,
  excludeFields = ["__v", "_id"],
}) => {
  console.log("tableContents from table", tableContent);
  return (
    <table className="w-full z-1">
      <thead className="bg-blue-600 text-white">
        <tr>
          {tableHeaders.map((head, i) => (
            <th key={i} className="py-3 px-6 text-left">
              {head}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableContent?.map((item, index) => (
          <tr
            key={index}
            className="border-t border-blue-200 border-opacity-20"
          >
            {Object.keys(item).map(
              (key, i) =>
                !excludeFields.includes(key) && (
                  <td key={i} className="py-4 px-6">
                    {item[key]}
                  </td>
                )
            )}
            {/* <td className="py-4 px-6">
              <button
                className="bg-blue-400 hover:bg-blue-300 text-white px-3 py-1 rounded-full mr-2 transition duration-300"
                onClick={() => updateFunction(item)}
              >
                Update
              </button>
              <button
                className="bg-red-500 hover:bg-red-400 text-white px-3 py-1 rounded-full transition duration-300"
                onClick={() => deleteFunction(item)}
              >
                Delete
              </button>
            </td> */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
