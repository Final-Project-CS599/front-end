import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const mockData = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    department: "Math",
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


export default function StudentInfo() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

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
                  (user.midName ? user.midName + " " : "") +
                  user.lastName
                }                
                disabled
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                className="form-control-plaintext"
                readOnly
                value={user.email}
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="national" className=" pt-3">
                National ID:
              </label>
              <input
                type="number"
                id="national"
                className=" form-control"
                value={user.nationalId}
                disabled
              />
            </div>

            <div className="col-md-3">
              <label htmlFor="date_Birth" className=" pt-3">
                Birth Date:{" "}
              </label>
              <input
                type="date"
                id="date_Birth"
                className=" form-control"
                value={user.bDate}
                onChange={inputChange}
              />
            </div>

            <div className="col-md-3">
              <label htmlFor="gender">Select Gender :</label>
              <select
                className="form-select mt-3"
                aria-label="Default select example"
                id="gender"
                value={user.gender}
                disabled
              >
                <option value="">Select Gender</option>
                <option value="1">Male</option>
                <option value="2">Female</option>
              </select>
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
                <option value="1">Department 1</option>
                <option value="2">Department 2</option>
                <option value="3">Department 3</option>
              </select>
            </div>
          </form>
          <hr />
        </div>
        <br />
        <div className="mt-3 d-flex justify-content-end">
          <button className="btn buttoncolor shadow me-2">
            Delete Student
          </button>
          <button className="btn buttoncolor shadow" onClick={submit}>
            Update
          </button>
        </div>
    </>
  );
}
