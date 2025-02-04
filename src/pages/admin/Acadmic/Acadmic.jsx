import React from 'react';
import { Link } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { useGetDepartmentsData } from '../../../api/admin/GetDepartments';

function Acadmic() {
  const { data, isLoading, error } = useGetDepartmentsData();

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <meta name="description" content="This is the academic page" />
          <title>Academic Courses</title>
        </Helmet>
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="mb-4">Departments</h2>
          <button className="btn btn-outline-purple text-white" onClick={() => {}}>
            <Link to="/admin/allacademic" className="text-decoration-none text-white">
              All Academic Courses
            </Link>
          </button>
        </div>

        <div className="container">
          {isLoading ? (
            <p className="text-center">Loading...</p>
          ) : error ? (
            <p className="text-center text-danger">{error}</p>
          ) : (
            <div className="list-group">
              {data?.departments.length > 0 ? (
                data.departments.map((dept) => (
                  <Link
                    key={dept.id}
                    to={`/admin/${encodeURIComponent(dept.department_name.toLowerCase())}-acadmic`}
                    className="list-group-item list-group-item-action text-center mb-2"
                  >
                    {dept.department_name}
                  </Link>
                ))
              ) : (
                <p className="text-center">No departments available.</p>
              )}
            </div>
          )}
        </div>
      </HelmetProvider>
    </>
  );
}

export default Acadmic;
