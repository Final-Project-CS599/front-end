import { useParams } from "react-router-dom";
import { useState } from "react";
import { useGetStudentAcademicCourses } from "../../../api/admin/users";


export default function StudentAcademicCourses() {
  const { id } = useParams();
  const [sortCol, setSortCol] = useState({ key: null, direction: "asc" });
  
  const { data: courses = [], isLoading, error } = useGetStudentAcademicCourses(id);

  const colSort = (key) => {
    let direction = "asc";
    if (sortCol.key === key && sortCol.direction === "asc") {
      direction = "desc";
    }
    setSortCol({ key, direction });
  };

  const getSortedCourses = () => {
    if (!courses.length) return [];
    
    return [...courses].sort((a, b) => {
      if (a[sortCol.key] < b[sortCol.key]) return sortCol.direction === "asc" ? -1 : 1;
      if (a[sortCol.key] > b[sortCol.key]) return sortCol.direction === "asc" ? 1 : -1;
      return 0;
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    // Handle specific error cases from backend
    if (error.response?.status === 404) {
      return <div>No academic courses found for this student.</div>;
    }
    return <div>{error.response?.data?.message || 'Something went wrong'}</div>;
  }

  const sortedCourses = sortCol.key ? getSortedCourses() : courses;

  return (
    <div>
      <table className="table table-light table-bordered table-striped mt-4">
        <thead>
          <tr>
            <th
              onClick={() => colSort("courseId")}
              style={{ cursor: "pointer" }}
            >
              Course ID{" "}
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
          {sortedCourses.map((course) => (
            <tr key={course.courseId}>
              <td>{course.courseId}</td>
              <td>{course.courseName}</td>
              <td>{course.courseCode}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}