import React from 'react';
import { Link } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import style from './Courses.module.css'

function Courses() {
    return <>
    <HelmetProvider>
        <Helmet>
            <meta name='description' content='this is courses page' />
            <title> Courses</title>
        </Helmet>

        <div className="Body">
            <header  className={style.header}>
                <h1> 
                <Link to='/admin/allcourses'className="d-flex justify-content-around text-white text-center p-3 rounded shadow">
                All Courses
                </Link>
                </h1>
            </header>


            <main className="d-flex justify-content-around p-5 fs-4">
                <Link to="/admin/acadmic" className={`${style.link} text-decoration-none text-black d-block mt-5`}>
                        <div className={`${style.section} ${style.academic} `}>
                            <h2>Academic</h2>
                            <p>Here are the academic courses for the student, as he is not allowed to join certain study subjects without passing the subjects related to them. <br/>This is only allowed for postgraduate studies.</p>
                        </div>
                </Link>


                <div className=" p-5 fs-4">
                <Link to="/admin/Extra" className={`${style.link} text-decoration-none text-black d-block`}>
                        <div className={`${style.section} ${style.extra}`}>
                            <h2>Extra</h2>
                            <p>These are extra courses that the student enrolls and buying through the platform, It is available to any student on the platform.</p>
                        </div>
                    </Link>              
                </div>


            </main>

          

         {/* btn add new course */}
         <div className="d-flex justify-content-end mt-3">
                  <a href='/admin/addnewcourse' className="btn"
                    style={{ backgroundColor: "#ffffff", color: "#7F55E0", border: "2px solid #7F55E0", borderRadius: "15px", padding: "10px 20px",
                      fontSize: "20px", fontWeight: "bold", textDecoration: "none", display: "flex", alignItems: "center", gap: "8px",
                    }}
                    onMouseEnter={(e) => { e.target.style.backgroundColor = "#7F55E0"; e.target.style.color = "#ffffff"; }}
                    onMouseLeave={(e) => { e.target.style.backgroundColor = "#ffffff"; e.target.style.color = "#7F55E0"; }}
                  >
                  Add New Course
                  </a>
              </div>
        
        </div>
    </HelmetProvider>
</>
                   }
export default Courses