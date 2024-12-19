import React from 'react'
import { Link } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import style from './Courses.module.css'

function Courses() {
    return <>
    <HelmetProvider>
        <Helmet>
            <meta name='description' content='' />
            <title>Courses</title>
        </Helmet>
        <div className="Body">
            <header  className={style.header}>
                <h1>Courses</h1>
            </header>

            <main className=" d-flex justify-content-center p-4 fs-3">
                <Link to="/admin/acadmic" className={`${style.link} text-decoration-none text-black d-block`}>
                    <div className={`${style.section} ${style.academic} mt-4 `}>
                        <h2>Academic</h2>
                        <p>Here are the academic courses for the student, as he is not allowed to join certain study subjects without passing the subjects related to them. <br/>This is only allowed for postgraduate studies.</p>
                    </div>
                </Link>

                <div className="d-flex justify-content-center p-4 fs-3">
                    <Link to="/admin/coursesExtra" className={`${style.link} text-decoration-none text-black d-block`}>
                        <div className={`${style.section} ${style.extra}`}>
                            <h2>Extra</h2>
                            <p>These are extra courses that the student enrolls and buying through the platform, It is available to any student on the platform.</p>
                        </div>
                    </Link>              
                </div>
            </main>
        </div>
    </HelmetProvider>
    </>
}

export default Courses