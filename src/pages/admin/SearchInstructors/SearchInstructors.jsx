import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetDepartmentsData } from "../../../api/admin/GetDepartments";
import { useSearchInstructors } from "../../../api/admin/users";

export default function SearchInstructor() {
  const [searchParams, setSearchParams] = useState({
    department: '',
    firstName: '',
    lastName: ''
  });


  const { data: departmentData } = useGetDepartmentsData();
  const {
    mutate, data: searchData, isPending
  } = useSearchInstructors(searchParams);

  const [data, setData] = useState([]);
  const [sortCol, setSortCol] = useState({ key: null, direction: "asc" });

  useEffect(() => {
    console.log('Search Data received:', searchData);
    if (searchData?.data?.instructors) {
        setData(searchData.data.instructors);
    }
}, [searchData]);

  const handleSearch = (e) => {
    e.preventDefault();
    mutate(searchParams)

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

  const navigate = useNavigate();
  const handleEditClick = (user) => {
    navigate(`/admin/editInstructors/${user.id}`, { state: { user } });
  };

  console.log(searchParams, 'searchParams')

  return (
    <div className="container ms-5 mt-3" style={{ width: "95%" }}>
      <form onSubmit={handleSearch}>
        <div className="row mt-4">
          <label htmlFor="deptS" className="col-sm-2 col-form-label">
            Department Name<span className="text-danger">*</span>
          </label>
          <div className="col-7">
            <select
              className="form-select"
              id="deptS"
              required
              value={searchParams.department}
              onChange={(e) => setSearchParams({ ...searchParams, department: e.target.value })}
            >
              <option value="">Choose A department</option>
              {departmentData?.departments?.map((department) => (
                <option
                  key={department.id}
                  value={department.department_name}
                >
                  {department.department_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="col row mt-4">
          <label htmlFor="firstName" className="col-sm-2 col-form-label">
            First Name
          </label>
          <div className="col-7">
            <input
              type="text"
              className="form-control"
              id="firstName"
              placeholder="First name"
              value={searchParams.firstName}
              onChange={(e) =>
                setSearchParams({
                  ...searchParams,
                  firstName: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="col row mt-4">
          <label htmlFor="lastName" className="col-sm-2 col-form-label">
            Last Name
          </label>
          <div className="col-7">
            <input
              type="text"
              className="form-control"
              id="lastName"
              placeholder="Last name"
              value={searchParams.lastName}
              onChange={(e) =>
                setSearchParams({
                  ...searchParams,
                  lastName: e.target.value,
                })
              }
            />
          </div>
        </div>

        <button type="submit" className="btn buttoncolor shadow mt-4">
          Search
        </button>
      </form>

      {isPending && <div>Loading...</div>}

      {!isPending && (
        <div>
          <table className="table table-light table-bordered table-striped mt-3 w-75">
            <thead>
              <tr>
                <th onClick={() => handleSort("id")} style={{ cursor: "pointer" }}>
                  # {sortCol.key === "id" && (sortCol.direction === "asc" ? "↑" : "↓")}
                </th>
                <th onClick={() => handleSort("firstName")} style={{ cursor: "pointer" }}>
                  First Name {sortCol.key === "firstName" && (sortCol.direction === "asc" ? "↑" : "↓")}
                </th>
                <th onClick={() => handleSort("lastName")} style={{ cursor: "pointer" }}>
                  Last Name {sortCol.key === "lastName" && (sortCol.direction === "asc" ? "↑" : "↓")}
                </th>
                <th onClick={() => handleSort("email")} style={{ cursor: "pointer" }}>
                  Email {sortCol.key === "email" && (sortCol.direction === "asc" ? "↑" : "↓")}
                </th>
                <th>Department</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.email}</td>
                  <td>{item.department}</td>
                  <td>
                    <button
                      className="btn buttoncolor shadow"
                      onClick={() => handleEditClick(item)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {data.length === 0 && <div className="w-75 text-center">No results found.</div>}
        </div>
      )}
    </div>
  );
}