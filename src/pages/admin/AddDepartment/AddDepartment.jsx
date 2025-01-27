import { useEffect, useState } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { addDepartment, useGetDepartmentsData } from "../../../api/admin/GetDepartments";
import { showToast } from "../../../utils/toast";
import { ToastContainer } from "react-toastify";

export default function AddDepartment() {
  const [formData, setFormData] = useState({
    department_name: "",
    department_code: "",
  });
  const [sortCol, setSortCol] = useState({ key: null, direction: "asc" });

  const { data: departmentData, refetch } = useGetDepartmentsData();
  
  const [sortedDepartments, setSortedDepartments] = useState([]);

  // Update sortedDepartments when departmentData changes
  useEffect(() => {
    if (departmentData?.departments) {
      setSortedDepartments([...departmentData.departments]);
    }
  }, [departmentData]);

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

    const sorted = [...sortedDepartments].sort((a, b) => {
      // Handle numeric sorting for id
      if (key === "id") {
        return direction === "asc"
          ? a[key] - b[key]
          : b[key] - a[key];
      }

      // Handle string sorting for other columns
      const aValue = (a[key] || "").toLowerCase();
      const bValue = (b[key] || "").toLowerCase();

      if (direction === "asc") {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });

    setSortedDepartments(sorted);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Assuming useAddDepartment().mutateAsync is available
      await addDepartment({
        department_name: formData.department_name,
        department_code: formData.department_code,
      });

      showToast("Department added successfully!");
      setFormData({
        department_name: "",
        department_code: ""
      });

      // Refetch departments data after adding
      refetch();
    } catch (error) {
      console.log(error);

      showToast("Error adding department: " + error.response.data.message, 'error');
    }
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
            <table className="table table-light table-bordered table-striped mt-3 w-75">
              <thead>
                <tr>
                  <th onClick={() => handleSort("id")} style={{ cursor: "pointer" }}>
                    # {sortCol.key === "id" && (
                      <span>{sortCol.direction === "asc" ? "↑" : "↓"}</span>
                    )}
                  </th>
                  <th onClick={() => handleSort("department_name")} style={{ cursor: "pointer" }}>
                    Department Name {sortCol.key === "department_name" && (
                      <span>{sortCol.direction === "asc" ? "↑" : "↓"}</span>
                    )}
                  </th>
                  <th onClick={() => handleSort("department_code")} style={{ cursor: "pointer" }}>
                    Department Code {sortCol.key === "department_code" && (
                      <span>{sortCol.direction === "asc" ? "↑" : "↓"}</span>
                    )}
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedDepartments.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.department_name}</td>
                    <td>{item.department_code}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {sortedDepartments.length === 0 && (
              <div className="w-75 text-center">No results found.</div>
            )}
          </div>

        </div>
        <ToastContainer />

      </HelmetProvider>
    </>
  );
}