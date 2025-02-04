import React from 'react';
import { Link } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import style from './Courses.module.css';

function Courses() {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <meta name="description" content="this is courses page" />
          <title>Courses</title>
        </Helmet>

        <div className={style.body}>
          <h3 className="pb-4">Courses</h3>

          <main className={style.cardContainer}>
            {/* Card for All Courses */}
            <Link to="/admin/courses/allcourses" className={`${style.card} ${style.allCourses}`}>
              <div className={style.cardContent}>
                <h2>All Courses</h2>
                <p>
                  Browse through all the courses available on the platform, including academic and
                  extra courses.
                </p>
              </div>
            </Link>

            {/* Card for Academic Courses */}
            <Link
              to="/admin/courses/chooseDepartment"
              className={`${style.card} ${style.academic}`}
            >
              <div className={style.cardContent}>
                <h2>Academic</h2>
                <p>
                  Here are the academic courses for the student. Certain study subjects require
                  passing related subjects before enrollment. This is only allowed for postgraduate
                  studies.
                </p>
              </div>
            </Link>

            {/* Card for Extra Courses */}
            <Link to="/admin/courses/chooseSection" className={`${style.card} ${style.extra}`}>
              <div className={style.cardContent}>
                <h2>Extra</h2>
                <p>
                  These are extra courses that the student can enroll in and purchase through the
                  platform. They are available to any student on the platform.
                </p>
              </div>
            </Link>
          </main>
        </div>
      </HelmetProvider>
    </>
  );
}

export default Courses;
