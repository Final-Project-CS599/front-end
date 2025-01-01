import React from 'react';
import { Link } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';

function Extra() {
  const items = [
    { name: 'Back-end', link: '/admin/backendextra' },
    { name: 'Front-end', link: '/admin/frontendextra' },
    { name: 'Languages', link: '/admin/languagesextra' },
    { name: 'Programing', link: '/admin/programingextra' },
    { name: 'Digital marketing', link: '/admin/digitalextra' },
  ];

  return (
    <>
            <HelmetProvider>
            <Helmet>
                <meta name='description' content='' />
                <title>Extra courses</title>
            </Helmet>
      <h2 className="text-center mb-4  text-black p-3 rounded shadow">
      Categories
      </h2>
      <div 
        className="container d-flex justify-content-center align-items-center" 
        style={{ height: '60vh', flexDirection: 'column' }}>

        <div className="d-flex flex-column align-items-center">
          {items.map((item, index) => (
            <div key={index} className="mb-3" style={{ width: '800px', height:'70px'}}>
              <Link to={item.link} className="text-decoration-none">
                
                <div className="text-white text-center p-3 rounded shadow" 
                  style={{backgroundColor: '#4a028a', fontSize: '24px', cursor: 'pointer',transition: 'transform 0.3s ease, background-color 0.3s ease',}}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1)';
                    e.currentTarget.style.backgroundColor = '#221130';
                                     }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.backgroundColor = '#4a028a';
                                     }} >
                  {item.name}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

              {/* btn add course */}
              <div className="d-flex justify-content-end mt-3">
          <a
            href="#"
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
            Add New Categories
          </a>
        </div>

      </HelmetProvider>
    </>
  );
}

export default Extra;
