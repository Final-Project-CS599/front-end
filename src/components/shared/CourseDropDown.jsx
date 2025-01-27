import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CourseDropDown = ({ title, type }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const navigate = useNavigate();

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleViewClick = (id) => {
    if (type === 'quizzes') {
      navigate(`/student/quizzes/${id}`);
    } else if (type === 'assignments') {
      navigate(`/student/assignments/${id}`);
    }
  };

  return (
    <div>
      <h3 className="mb-3">{title}</h3>
      <select
        id="dropdown"
        className="form-select"
        onChange={handleSelectChange}
        style={{ maxWidth: '200px' }}
      >
        <option value="">Select Course</option>
        <option value="option1">CS500</option>
        <option value="option2">CS505</option>
        <option value="option3">CS507</option>
      </select>
      <div className="mt-5">
        {selectedOption && (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Degree</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {data[selectedOption].map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.Name}</td>
                  <td>{row.StartDate}</td>
                  <td>{row.EndDate}</td>
                  <td>{row.Degree}</td>
                  <td>
                    <button onClick={() => handleViewClick(row.id)} className="btn btn-outline-purple w-50">
          View
        </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CourseDropDown;
