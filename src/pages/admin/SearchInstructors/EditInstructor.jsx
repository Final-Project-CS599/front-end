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

export default function EditInstructor() {
  const { id } = useParams();
  const [user, setUser] = useState(null, { course: [] });
  const [originUser, setOriginUser] = useState(null);
  const [sortCol, setSortCol] = useState({ key: null, direction: "asc" });
  const [addCourseActive, setAddCourseActive] = useState(false);

  const inputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const courseChange = (e, index) => {
    const { name, value } = e.target;
    const updatedCourses = [...user.course];
    updatedCourses[index] = { ...updatedCourses[index], [name]: value };
    setUser({ ...user, course: updatedCourses });
  };

  const deleteCourse = (index) => {
    const updatedCourses = user.course.filter((_, i) => i !== index);
    setUser({ ...user, course: updatedCourses });
  };

  const addCourse = () => {
    const newCourse = {
      courseId: "",
      courseName: "",
      courseCode: "",
      courseType: "",
    };
    setUser({ ...user, course: [...user.course, newCourse] });
    setAddCourseActive(true);
  };

  /*2 sorting methods, first to check the direction of sorting and sorted based on the choesn column. The second works on sorting data.*/
  const colSort = (key) => {
    let direction = "asc";
    if (sortCol.key === key && sortCol.direction === "asc") {
      direction = "desc";
    }
    setSortCol({ key, direction });

    const sortedCourses = [...user.course].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setUser({ ...user, course: sortedCourses });
  };

  //useEffect method is being used to save original data for a while to get it back if rollback button is used
  useEffect(() => {
    const selectedUser = mockData.find((item) => item.id === parseInt(id));
    setUser(selectedUser);
    setOriginUser(JSON.parse(JSON.stringify(selectedUser)));
  }, [id]);
  const rollback = () => {
    setUser(JSON.parse(JSON.stringify(originUser)));
  };

  //it records the edits made to the DB
  const submit = () => {
    alert(`Edits updated for ID: ${id}`);
    console.log("Updated user data submitted:", user);
  };

  if (!user) return <div>Loading...</div>;

  return (
    <>
      <div className="w-75 mx-auto">
        <div>
          <h3 className="pb-4">Edit Instructor </h3>

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

        <div>
          <table className="table table-light table-bordered table-striped mt-4">
            <thead>
              <tr>
                <th
                  onClick={() => colSort("courseId")}
                  style={{ cursor: "pointer" }}
                >
                  Course Id{" "}
                  {sortCol.key === "courseId" &&
                    (sortCol.direction === "asc" ? "↑" : "↓")}
                </th>
                <th
                  onClick={() => colSort("courseName")}
                  style={{ cursor: "pointer" }}
                >
                  Course Name{" "}
                  {sortCol.key === "courseName" &&
                    (sortCol.direction === "asc" ? "↑" : "↓")}
                </th>
                <th
                  onClick={() => colSort("courseCode")}
                  style={{ cursor: "pointer" }}
                >
                  Course Code{" "}
                  {sortCol.key === "courseCode" &&
                    (sortCol.direction === "asc" ? "↑" : "↓")}
                </th>
                <th
                  onClick={() => colSort("courseType")}
                  style={{ cursor: "pointer" }}
                >
                  Course Type{" "}
                  {sortCol.key === "courseType" &&
                    (sortCol.direction === "asc" ? "↑" : "↓")}
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {user.course.map((course, index) =>
                addCourseActive ? (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        name="courseId"
                        className="form-control"
                        value={course.courseId}
                        onChange={(e) => courseChange(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="courseName"
                        className="form-control"
                        value={course.courseName}
                        onChange={(e) => courseChange(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="courseCode"
                        className="form-control"
                        value={course.courseCode}
                        onChange={(e) => courseChange(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="courseType"
                        className="form-control"
                        value={course.courseType}
                        onChange={(e) => courseChange(e, index)}
                      />
                    </td>
                    <td>
                      <button
                        className="btn buttoncolor shadow"
                        onClick={() => deleteCourse(index)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ) : (
                  <tr key={course.courseId}>
                    <td>{course.courseId}</td>
                    <td>{course.courseName}</td>
                    <td>{course.courseCode}</td>
                    <td>{course.courseType}</td>
                    <td>
                      <button
                        className="btn buttoncolor shadow"
                        onClick={() => deleteCourse(course.courseId)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
          <button
            className="btn buttoncolor shadow me-2 mb-2"
            onClick={() => {
              if (!addCourseActive) {
                addCourse();
              }
              setAddCourseActive(!addCourseActive);
            }}
          >
            {addCourseActive ? "Disable Edit" : "Add Course"}
          </button>
        </div>

        <br />
        <div className="mt-3 d-flex justify-content-end">
          <button className="btn buttoncolor shadow me-2" onClick={rollback}>
          Delete Student
          </button>
          <button className="btn buttoncolor shadow" onClick={submit}>
            Update
          </button>
        </div>
      </div>
    </>
  );
}
