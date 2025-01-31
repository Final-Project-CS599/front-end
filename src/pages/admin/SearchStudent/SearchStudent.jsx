import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetDepartmentsData } from "../../../api/admin/GetDepartments";


const mockData = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    department: "Computer Science",
    phone: "",
    phone2: "",
    course: [
      {
        courseId: "5",
        courseName: "Algebra",
        courseCode: "MA254",
        courseType: "Academic",
      },
      {
        courseId: "40",
        courseName: "Software Engineering",
        courseCode: "CS542",
        courseType: "Extra",
      },
    ],
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane@example.com",
    department: "CS",
    course: [
      {
        courseId: "56",
        courseName: "Bio",
        courseCode: "BI254",
        courseType: "Extra",
      },
      {
        courseId: "40",
        courseName: "Software Engineering",
        courseCode: "CS542",
        courseType: "Extra",
      },
    ],
  },
  {
    id: 3,
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice@example.com",
    department: "Arts",
    course: [
      {
        courseId: "56",
        courseName: "History",
        courseCode: "BI254",
        courseType: "Extra",
      },
      {
        courseId: "40",
        courseName: "Software Engineering",
        courseCode: "CS542",
        courseType: "Extra",
      },
    ],
  },
];

export default function SearchStudent() {
  const [searchParams, setSearchParams] = useState({
    firstName: "",
    lastName: "",
    department: "",
  });

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { data: departmentData } = useGetDepartmentsData();


  /* A method used for front-end demo data, it initiates loading of data. 
it starts to check the fields and checks if there is an equal data, if not it moves to the next field. It fills the found data.*/
  const handleSearch = () => {
    setLoading(true);
    setError(null);
    try {
      const filteredData = mockData.filter((item) => {
        return (
          (!searchParams.firstName ||
            item.firstName
              .toLowerCase()
              .includes(searchParams.firstName.toLowerCase())) &&
          (!searchParams.lastName ||
            item.lastName
              .toLowerCase()
              .includes(searchParams.lastName.toLowerCase())) &&
          (!searchParams.department ||
            item.department === searchParams.department) &&
          (!searchParams.course || item.course === searchParams.course)
        );
      });
      setData(filteredData);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  /*2 sorting methods, first to check the direction of sorting and sorted based on the choesn column. The second works on sorting data.*/
  const [sortCol, setSortCol] = useState({ key: null, direction: "asc" });

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

  // A methode used to navigat to the edit page based on the chosen id
  const navigate = useNavigate();
  const handleEditClick = (user) => {
    navigate(`/admin/editStudent/${user.id}`, { state: { user } });
  };
  
  return (
    <>
      <div className="container ms-5 mt-3" style={{ width: "95%" }}>
        {/*-------div made for the form of search fields and contains setSearch method to reflect the change to the table-----------------------*/}
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
          >
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
                  onChange={(e) =>
                    setSearchParams({
                      ...searchParams,
                      department: e.target.value,
                    })
                  }
                >
                  <option value="">Choose A department</option>
                  {departmentData?.departments?.map((department) => (  
                    <option key={department.id} value={department.department_name}>
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
        </div>

        {/*--------------------- a div made for a table to show rendered data and checks if there is no data, show no result ------------------ */}
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
                    onClick={() => handleSort("firstName")}
                    style={{ cursor: "pointer" }}
                  >
                    First Name{" "}
                    {sortCol.key === "firstName" &&
                      (sortCol.direction === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    onClick={() => handleSort("lastName")}
                    style={{ cursor: "pointer" }}
                  >
                    Last Name{" "}
                    {sortCol.key === "lastName" &&
                      (sortCol.direction === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    onClick={() => handleSort("email")}
                    style={{ cursor: "pointer" }}
                  >
                    Email{" "}
                    {sortCol.key === "email" &&
                      (sortCol.direction === "asc" ? "↑" : "↓")}
                  </th>
                  <th>Department</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="">
                {data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.email}</td>
                    <td>{item.department}</td>
                    <td>
                      {/* <Link className='btn buttoncolor shadow'  to={'/admin/editStudent/:id'}>Edit</Link> */}
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
          </div>
          {!loading && !error && data.length === 0 && (
            <div className="w-75 text-center">No results found.</div>
          )}
        </div>
      </div>
    </>
  );
}
