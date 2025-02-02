import React, { useEffect, useState } from "react";
import axios from "axios";
import { HelmetProvider, Helmet } from "react-helmet-async";

function AllAcademic() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/courses") 
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, []);

  return (
    <HelmetProvider>
      <Helmet>
        <meta name="description" content="Browse all academic courses." />
        <title>All - Academic Courses</title>
      </Helmet>

      <div className="container mt-4">
        <h2 className="text-center text-white p-3 rounded shadow" style={{ backgroundColor: "#4a028a", fontSize: "28px" }}>
          All Academic Courses
        </h2>


        {/* btn add course */}
        <div className="d-flex justify-content-end mt-3">
          <a
            href="/admin/addnewcourseacadmic"
            className="btn"
            style={{
              backgroundColor: "#ffffff",
              color: "#7F55E0",
              border: "2px solid #7F55E0",
              borderRadius: "15px",
              padding: "10px 20px",
              fontSize: "20px",
              fontWeight: "bold",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#7F55E0";
              e.target.style.color = "#ffffff";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#ffffff";
              e.target.style.color = "#7F55E0";
            }}
          >
            Add New academic Course
          </a>
        </div>

          {/* btn delete course */}
          <div className="d-flex justify-content-end mt-3">
          <a
            href="/admin/deletecourse"
            className="btn"
            style={{
              backgroundColor: "#ffffff",
              color: "#7F55E0",
              border: "2px solid #7F55E0",
              borderRadius: "15px",
              padding: "10px 20px",
              fontSize: "20px",
              fontWeight: "bold",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#7F55E0";
              e.target.style.color = "#ffffff";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#ffffff";
              e.target.style.color = "#7F55E0";
            }}
          >
            Delete Course
          </a>
        </div>
        
        <div className="row mt-4">
          {courses.map((course) => (
            <div key={course.id} className="col-md-4 mb-4">
              <a href={course.link || "#"} style={{ textDecoration: "none", color: "#000000" }}>
                <div className="p-4 rounded shadow" style={{ backgroundColor: "#f9f9f9", border: "1px solid #ddd", borderRadius: "10px", cursor: "pointer", transition: "transform 0.2s ease" }}>
                  
                  {/* اسم الكورس */}
                  <h4 className="text-center mb-3" style={{ color: "#4a028a", fontWeight: "bold" }}>{course.name}</h4>
                  
                  {/* بيانات الكورس */}
                  <p><strong>Course Code:</strong> {course.code}</p>
                  <p><strong>Instructor:</strong> {course.instructor}</p>
                  <p><strong>Department:</strong> {course.department}</p>
                  <p><strong>Category:</strong> {course.category}</p>
                  <p><strong>Description:</strong> {course.description}</p>
                  <p><strong>Start Date:</strong> {new Date(course.startDate).toLocaleDateString()}</p>
                  <p><strong>End Date:</strong> {new Date(course.endDate).toLocaleDateString()}</p>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </HelmetProvider>
  );
}

export default AllAcademic;
