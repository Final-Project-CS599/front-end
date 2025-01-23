import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import InstructorInfo from "./InstructorInfo";
import InstructorCourses from "./InstructorCourses";


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


export default function EditInstructor() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
 
 
  useEffect(() => {
    const selectedUser = mockData.find((item) => item.id === parseInt(id));
    setUser(selectedUser);
  }, [id]);


  if (!user) return <div>Loading...</div>;

  return (
    <>
    <h3 className="pb-4">Edit Instructor </h3>
      <ul className="nav nav-pills">
  <li className="nav-item">
    <a className="nav-link active" data-bs-toggle="tab" aria-current="page" href="#InstructorInfo">Instructor Info</a>
  </li>
  <li className="nav-item">
    <a className="nav-link" data-bs-toggle="tab" href="#InstructorCourses">Instructor Courses</a>
  </li>
</ul>
<div className="w-75 mx-auto mt-5">

<div className="tab-content">
  <div className="tab-pane container active" id="InstructorInfo"><InstructorInfo/></div>
  <div className="tab-pane container fade" id="InstructorCourses"><InstructorCourses/></div>
</div>
</div>
    </>
  );
}
