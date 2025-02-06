import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InstructorCourses from "./InstructorCourses";
import InstructorInfo from "./InstructorInfo";
import { useGetInstructorById } from "../../../api/admin/users";

export default function EditInstructor() {
   const { id } = useParams();
  const { data: instructorData } = useGetInstructorById(id);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (instructorData?.instructor) {
      const selectedUser = instructorData.instructor;
      setUser(selectedUser);
    }
  }, [instructorData]);


  if (!user) return <div>Loading...</div>;

  return (
    <>
      <h3 className="pb-4">Edit Instructor </h3>
      <ul className="nav nav-pills">
        <li className="nav-item">
          <a className="nav-link active buttoncolor" data-bs-toggle="tab" aria-current="page" href="#InstructorInfo">Instructor Info</a>
        </li>
        <li className="nav-item">
          <a className="nav-link buttoncolor" data-bs-toggle="tab" href="#InstructorCourses">Instructor Courses</a>
        </li>
      </ul>
      <div className="w-75 mx-auto mt-5">

        <div className="tab-content">
          <div className="tab-pane container active" id="InstructorInfo"><InstructorInfo /></div>
          <div className="tab-pane container fade" id="InstructorCourses"><InstructorCourses /></div>
        </div>
      </div>
    </>
  );
}
