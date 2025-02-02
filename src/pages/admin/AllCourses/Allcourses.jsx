import React, { useState, useEffect } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";

function AllCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:3000/courses/getAllCourses");
        if (!response.ok) {
          throw new Error("Error servers: for all courses");
                          }
        const result = await response.json();
    
        console.log("Fetched Courses:", result);
        
        if (result.data && Array.isArray(result.data)) {
          setCourses(result.data);
        } else {
          throw new Error("Invalid data format received");
        }
          } 
      catch (err) {
        setError(err.message);
                  } 
      finally {
        setLoading(false);
              }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <div className="container mt-4 text-center">Loading courses...</div>;
  }

  if (error) {
    return <div className="container mt-4 text-center text-danger">Error: {error}</div>;
  }

  if (courses.length === 0) {
    return <div className="container mt-4 text-center text-warning">No courses available.</div>;
  }

  return (
    <HelmetProvider>
      <Helmet>
        <meta name="description" content="Browse all courses." />
        <title>All Courses</title>
      </Helmet>

      <div className="container mt-4">
        <h2
          className="text-center text-white p-3 rounded shadow"
          style={{ backgroundColor: "#4a028a", fontSize: "28px" }}
        >
          All Courses
        </h2>

        <div className="row mt-4">
          {courses.map((course) => (
            <div key={course.id} className="col-md-4 mb-4">
              <a
                href={course.link || "#"}
                style={{ textDecoration: "none", color: "#000000" }}
              >
                <div
                  className="p-4 rounded shadow"
                  style={{
                    backgroundColor: "#f9f9f9",
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    cursor: "pointer",
                    transition: "transform 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.03)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <h4
                    className="text-center mb-3"
                    style={{ color: "#4a028a", fontWeight: "bold" }}
                  >
                    {course.courseName}
                  </h4>
                  <p>
                    <strong>Instructor:</strong> {course.instructorName || "Unknown"}
                  </p>
                  <p>
                    <strong>Type:</strong> {course.courseType}
                  </p>
                  <p>
                    <strong>Category:</strong> {course.courseCategory}
                  </p>
                  <p>{course.courseDescription}</p>
                  <p>
                    <strong>Start Date:</strong> {course.courseStartDate}
                  </p>
                  <p>
                    <strong>End Date:</strong> {course.courseEndDate}
                  </p>
                </div>
              </a>
            </div>
          ))}
        </div>

              {/* btn delete course */}
              <div className="d-flex justify-content-end mt-3">
                      <a href='/admin/deletecourse' className="btn"
                        style={{ backgroundColor: "#ffffff", color: "#7F55E0", border: "2px solid #7F55E0", borderRadius: "15px", padding: "10px 20px",
                          fontSize: "20px", fontWeight: "bold", textDecoration: "none", display: "flex", alignItems: "center", gap: "8px",}}

                        onMouseEnter={(e) => { e.target.style.backgroundColor = "#7F55E0"; e.target.style.color = "#ffffff"; }}
                        onMouseLeave={(e) => { e.target.style.backgroundColor = "#ffffff"; e.target.style.color = "#7F55E0"; }}
                      >
                     delete Course
                      </a>
              </div>
      </div>
    </HelmetProvider>
  );
}

export default AllCourses;
