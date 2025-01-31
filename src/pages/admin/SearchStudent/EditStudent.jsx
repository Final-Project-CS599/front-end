import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import StudentInfo from "./StudentInfo";
import StudentCourses from "./StudentCourses";
import { useGetStudentById } from "../../../api/admin/users";


export default function EditStudent() {
  const { id } = useParams();

  const { data: studentData } = useGetStudentById(id);
  const [user, setUser] = useState(null);

  // Initialize user state once student data is loaded
  useEffect(() => {
    if (studentData?.student) {
      const selectedUser = studentData.student;
      setUser(selectedUser);
    }
  }, [studentData]);


  if (!user) return <div>Loading...</div>;

  return (
    <>
      <h3 className="pb-4">Edit Student </h3>
      <ul className="nav nav-pills">
        <li className="nav-item">
          <a className="nav-link active" data-bs-toggle="tab" aria-current="page" href="#StudentInfo">Student Info</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" data-bs-toggle="tab" href="#StudentCourses">Student Courses</a>
        </li>
      </ul>
      <div className="w-75 mx-auto mt-5">

        <div className="tab-content">
          <div className="tab-pane container active" id="StudentInfo"><StudentInfo /></div>
          <div className="tab-pane container fade" id="StudentCourses"><StudentCourses /></div>
        </div>
      </div>
    </>
  );
}
