import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
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


export default function InstructorInfo() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const { data: departmentData } = useGetDepartmentsData();

  const inputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };


  useEffect(() => {
    const selectedUser = mockData.find((item) => item.id === parseInt(id));
    setUser(selectedUser);
  }, [id]);

  const submit = () => {
    alert(`Edits updated for ID: ${id}`);
    console.log("Updated user data submitted:", user);
  };

  if (!user) return <div>Loading...</div>;

  return (
    <>
   
      <div>
        <div>
          

          <form className="row g-3">
            <div className="col-md-6">
              <label htmlFor="fName">Full Name:</label>
              <input
                type="text"
                id="fName"
                className=" form-control"
                value={
                  user.firstName +
                  " " +
                  user.lastName
                }                
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={user.email}
              />
            </div>


            <div className="col-md-6">
              <label htmlFor="phone" className=" pt-3">
                Phone 1<span className="text-danger">*</span> :
              </label>
              <input
                type="tel"
                id="phone"
                className=" form-control"
                value={user.phone}
                onChange={inputChange}
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="phone2" className=" pt-3">
                Phone 2:
              </label>
              <input
                type="tel"
                id="phone2"
                className=" form-control"
                value={user.phone2}
                onChange={inputChange}
              />
            </div>

            <div className="col-md-6 mx-auto">
              <label htmlFor="department" className=" pt-3">
                Department <span className="text-danger">*</span> :
              </label>
              <select
                id="department"
                className="form-select mt-2"
                aria-label="Default select example"
                onChange={inputChange}
              >
                <option value="">{user.department}</option>
                  {departmentData?.departments?.map((department) => (  
                    <option key={department.id} value={department.department_name}>
                      {department.department_name}
                    </option>
                  ))}
              </select>
            </div>
          </form>
          <hr />
        </div>

        <br />
        <div className="mt-3 d-flex justify-content-end">
          <button className="btn buttoncolor shadow" onClick={submit}>
            Update
          </button>
        </div>
      </div>
    </>
  );
}
