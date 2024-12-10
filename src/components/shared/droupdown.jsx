import React from "react";
import { useState } from "react";

const Dropdown = () => {
  const data = {
    option1: [
      {
        id: 1,
        Name: "Ch 1",
        Startdate: "1-1-2024",
        Enddate: "5-1-2024",
        Degree: "5",
      },
      {
        id: 2,
        Name: "Ch 2",
        Startdate: "15-1-2024",
        Enddate: "20-1-2024",
        Degree: "4",
      },
    ],
    option2: [
      {
        id: 1,
        Name: "Ch assignment1",
        Startdate: "1-1-2024",
        Enddate: "5-1-2024",
        Degree: "5",
      },
      {
        id: 2,
        Name: "assignment2",
        Startdate: "15-1-2024",
        Enddate: "20-1-2024",
        Degree: "4",
      },
    ],
    option3: [
      {
        id: 1,
        Name: "ass1",
        Startdate: "1-1-2024",
        Enddate: "5-1-2024",
        Degree: "5",
      },
      {
        id: 2,
        Name: "ass Ch 2",
        Startdate: "15-1-2024",
        Enddate: "20-1-2024",
        Degree: "4",
      },
    ],
  };

  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div>
      <select
        id="dropdown"
        className="form-select"
        onChange={handleSelectChange}
        style={{ maxWidth: "200px" }}
      >
        <option value="">Select Course</option>
        <option value="option1">CS500</option>
        <option value="option2">CS505</option>
        <option value="option3">CS507</option>
      </select>
      <div style={{ margin: "50px" }}>
        {selectedOption && (
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Start date</th>
                <th>End date</th>
                <th>Degree</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {data[selectedOption].map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.Name}</td>
                  <td>{row.Startdate}</td>
                  <td>{row.Enddate}</td>
                  <td>{row.Degree}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
