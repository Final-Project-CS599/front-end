import React from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";

function Isacadmic() {
  const courses = [
    {
      id: 1,
      name: "Advanced Mathematics",
      doctor: "Dr. John Smith",
      code: "MATH-401",
      description: "An advanced course in mathematical theories and applications.",
      link: "/course-details/1",
    },
    {
      id: 2,
      name: "Physics for Engineers",
      doctor: "Dr. Sarah Johnson",
      code: "PHYS-201",
      description: "Explores the principles of physics with real-world engineering examples.",
      link: "/course-details/2",
    },
    {
      id: 3,
      name: "Introduction to Programming",
      doctor: "Dr. Emily Davis",
      code: "CS-101",
      description: "Covers the basics of programming using Python.",
      link: "/course-details/3",
    },
  ];

  return (
    <HelmetProvider>
      <Helmet>
        <meta
          name="description"
          content="Browse all AS academic courses, including detailed descriptions and instructors."
        />
        <title>IS - Academic Courses</title>
      </Helmet>

      <div className="mt-4">
        <div className="row">
          <div className="col-md-12">
            <div>
            <h2
          className="text-center text-white p-3 rounded shadow"
          style={{
            backgroundColor: "#4a028a",
            fontSize: "28px",
          }}
        >
          All IS Courses
        </h2>

            </div>
          </div>


          <div className="col-md-12">
            <div> {/* btn add course */}
              <div className="d-flex justify-content-end mt-3">
                <button
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
                  Add New Course
                </button>
              </div>
            </div>
          </div>



          <div className="">
           {/* boxes */}
        <div className="mt-4">
          {courses.map((course) => (
            <div key={course.id} className="col-md-4 mb-4">
              <a
                href={course.link}
                style={{
                  textDecoration: "none",
                  color:'#000000', }} >

                <div
                  className="p-4 rounded shadow"
                  style={{  backgroundColor: "#f9f9f9",
                            border: "1px solid #ddd",
                            borderRadius: "10px",
                            cursor: "pointer",
                            transition: "transform 0.2s ease", }}  
                            
                  onMouseEnter={(e) => { e.target.style.transform = "scale(1.03)";}}
                  onMouseLeave={(e) => {e.target.style.transform = "scale(1)"; }}
                >

                  <h4 className="text-center mb-3"style={{color: "#4a028a",fontWeight: "bold",}}>
                    {course.name}
                  </h4>
                  <p><strong>Doctor:</strong> {course.doctor}</p>
                  <p><strong>Code:</strong> {course.code}</p>
                  <p>{course.description}</p>
                </div>
              </a>
            </div>
          ))}
        </div>
        </div>
        </div>
       
       



       
      
      </div>
    
    </HelmetProvider>
  );
}
export default Isacadmic;
