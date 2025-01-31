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


export default function InstructorExtraCourses() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [sortCol, setSortCol] = useState({ key: null, direction: "asc" });
 

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
            </tr>
          </thead>
          <tbody>
            {user.course.map((course, index) => (
              <tr key={index}>
                {
                  <>
                    <td>{course.courseId}</td>
                    <td>{course.courseName}</td>
                    <td>{course.courseCode}</td>
                  </>
                }
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
