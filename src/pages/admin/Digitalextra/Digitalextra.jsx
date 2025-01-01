import React from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';

function digitalextra() {
  return (
    <HelmetProvider>
      <Helmet>
        <meta name="description" content="" />
        <title> Dgital markting - Extra Courses</title>
      </Helmet>
      <div className="container mt-4">
        <h2
          className="text-center text-white p-3 rounded shadow"
          style={{backgroundColor: '#4a028a',fontSize: '28px',}} >
          All Dgital markting Courses
        </h2>
        <div className="d-flex justify-content-end mt-3">
          <a href="/admin/addnewcourseextra" 
            className="btn"
              style={{
              backgroundColor: '#ffffff',
              color: '#7F55E0',
              border: '2px solid #7F55E0', 
              borderRadius: '15px',
              padding: '10px 20px',
              fontSize: '20px',
              fontWeight: 'bold', 
              textDecoration: 'none', 
              display: 'flex', 
              alignItems: 'center',
              gap: '8px', 
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#7F55E0'; 
              e.target.style.color = '#ffffff'; 
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#ffffff'; 
              e.target.style.color = '#7F55E0';
            }}
          >
            Add new Course
          </a>
        </div>
      </div>
    </HelmetProvider>
  );
}
export default digitalextra;
