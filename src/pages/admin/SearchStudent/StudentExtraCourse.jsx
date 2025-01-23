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


export default function StudentExtraCourses() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [sortCol, setSortCol] = useState({ key: null, direction: "asc" });
  const [editableRowIndex, setEditableRowIndex] = useState(null);

 

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
    setEditableRowIndex(user.course.length);
  };

  const updateCourseField = (index, field, value) => {
    const updatedCourses = user.course.map((course, i) =>
      i === index ? { ...course, [field]: value } : course
    );
    setUser({ ...user, course: updatedCourses });
  };

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

  useEffect(() => {
    const selectedUser = mockData.find((item) => item.id === parseInt(id));
    setUser(selectedUser);
  }, [id]);


  if (!user) return <div>Loading...</div>;

  return (
    <>       

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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {user.course.map((course, index) => (
                <tr key={index}>
                  {editableRowIndex === index ? (
                    <>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          value={course.courseId}
                          onChange={(e) =>
                            updateCourseField(index, "courseId", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          value={course.courseName}
                          onChange={(e) =>
                            updateCourseField(index, "courseName", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          value={course.courseCode}
                          onChange={(e) =>
                            updateCourseField(index, "courseCode", e.target.value)
                          }
                        />
                      </td>
                     
                    </>
                  ) : (
                    <>
                      <td>{course.courseId}</td>
                      <td>{course.courseName}</td>
                      <td>{course.courseCode}</td>
                    </>
                  )}
                  <td>
                    <button
                      className="btn buttoncolor shadow"
                      onClick={() => deleteCourse(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className="btn buttoncolor shadow me-2 mb-2"
            onClick={addCourse}
          >
            Add Course
          </button>
        </div>
    </>
  );
}
