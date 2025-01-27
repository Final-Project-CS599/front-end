import { useState } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";

export default function AddDepartment() {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    department_name: "",
    department_code: "",
  });
  const [message, setMessage] = useState("");
  const [sortCol, setSortCol] = useState({ key: null, direction: "asc" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortCol.key === key && sortCol.direction === "asc") {
      direction = "desc";
    }
    setSortCol({ key, direction });

    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setData(sortedData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newDepartment = {
      id: data.length + 1,
      ...formData
    };

    setData([...data, newDepartment]);
    setMessage("Department added successfully!");
    
    setFormData({
      department_name: "",
      department_code: ""
    });
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <meta name="description" content="" />
          <title>Department</title>
        </Helmet>

        <div className="p-2">
          <h2>Department</h2>
        </div>

        <div className="container mt-5 w-75">
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-3">
              <label htmlFor="department_name" className="form-label">
                Department Name <span className="text-danger">*</span> :
              </label>
              <input
                type="text"
                className="form-control"
                id="department_name"
                name="department_name"
                value={formData.department_name}
                onChange={handleChange}
                placeholder="Enter dept name"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="department_code" className="form-label">
                Department Code <span className="text-danger">*</span> :
              </label>
              <input
                type="text"
                className="form-control"
                id="department_code"
                name="department_code"
                value={formData.department_code}
                onChange={handleChange}
                placeholder="Enter dept code"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-purple buttoncolor"
            >
              Add Department
            </button>
          </form>

          <div>
            <div>
              <table className="table table-light table-bordered table-striped mt-3 w-75">
                <thead>
                  <tr>
                    <th
                      onClick={() => handleSort("id")}
                      style={{ cursor: "pointer" }}
                    >
                      #{" "}
                      {sortCol.key === "id" &&
                        (sortCol.direction === "asc" ? "↑" : "↓")}
                    </th>
                    <th
                      onClick={() => handleSort("department_name")}
                      style={{ cursor: "pointer" }}
                    >
                      Department Name{" "}
                      {sortCol.key === "department_name" &&
                        (sortCol.direction === "asc" ? "↑" : "↓")}
                    </th>
                    <th
                      onClick={() => handleSort("department_code")}
                      style={{ cursor: "pointer" }}
                    >
                      Department Code{" "}
                      {sortCol.key === "department_code" &&
                        (sortCol.direction === "asc" ? "↑" : "↓")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.department_name}</td>
                      <td>{item.department_code}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {data.length === 0 && (
              <div className="w-75 text-center">No results found.</div>
            )}
          </div>

          {message && (
            <div className="alert mt-4" role="alert">
              {message}
            </div>
          )}
        </div>
      </HelmetProvider>
    </>
  );
}