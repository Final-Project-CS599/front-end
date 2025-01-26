import React from 'react';
import { Link } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';


function Acadmic() {
  const items = [
    { name: ' Statistical Methods', link: '/admin/asacadmic' },
    { name: 'Computer Science', link: '/admin/csacadmic' },
    { name: 'Information systems', link: '/admin/isacadmic' },
    { name: 'Mathematical Methods', link: '/admin/msacadmic' },
    { name: 'Operation research', link: '/admin/oracadmic' },
                ];

  return (
    <>
    <HelmetProvider>
            <Helmet>
                <meta name='description' content='' />
                <title>Acadmic courses</title>
            </Helmet>
      <h2 className="text-center mb-4  text-black p-3 rounded shadow">
        Departments
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

      </HelmetProvider>
    </>
  );
}

export default Acadmic;
