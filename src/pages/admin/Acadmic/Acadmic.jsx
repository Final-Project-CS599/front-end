import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { HelmetProvider, Helmet } from 'react-helmet-async';

function Acadmic() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('http://localhost:3000/courses/getAllCoursesAcademic');
        setDepartments(response.data);
      } catch (err) {
        setError(`Failed to load departments: ${err.message}`);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <meta name="description" content="This is the academic page" />
          <title>Academic Courses</title>
        </Helmet>

        <h2 className="text-center mb-4 p-3 rounded shadow">
          <Link to='/admin/allacademic' className="text-decoration-none text-black">
            All Academic courses
          </Link>
        </h2>

        <div className="container d-flex justify-content-center align-items-center" style={{ height: '60vh', flexDirection: 'column' }}>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-danger">{error}</p>
          ) : (
            <div className="d-flex flex-column align-items-center">
              {departments.length > 0 ? (
                departments.map((dept) => (
                  <div key={dept.id} className="mb-3" style={{ width: '800px', height: '70px' }}>
                    <Link to={`/admin/${encodeURIComponent(dept.d_dept_name.toLowerCase())}-acadmic`} className="text-decoration-none">
                      <div
                        className="text-white text-center p-3 rounded shadow"
                        style={{
                          backgroundColor: '#4a028a',
                          fontSize: '24px',
                          cursor: 'pointer',
                          transition: 'transform 0.3s ease, background-color 0.3s ease',
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.transform = 'scale(1.1)';
                          e.currentTarget.style.backgroundColor = '#221130';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.transform = 'scale(1)';
                          e.currentTarget.style.backgroundColor = '#4a028a';
                        }}
                      >
                        {dept.d_dept_name}
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <p>No departments available.</p>
              )}
            </div>
          )}
        </div>
      </HelmetProvider>
    </>
  );
}

export default Acadmic;
