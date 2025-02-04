import React from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

function Sections() {
  const items = [
    { name: 'Back-end', path: '/admin/courses/extra?section=backend' },
    { name: 'Front-end', path: '/admin/courses/extra?section=frontend' },
    { name: 'Languages', path: '/admin/courses/extra?section=languages' },
    { name: 'Programming', path: '/admin/courses/extra?section=programming' },
    { name: 'Digital marketing', path: '/admin/courses/extra?section=digital marketing' },
  ];

  return (
    <HelmetProvider>
      <Helmet>
        <meta name="description" content="this is Extra page" />
        <title>Categories</title>
      </Helmet>
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="mb-4">Categories</h2>
        <button className="btn btn-outline-purple text-white" onClick={() => {}}>
          <Link to="/admin/courses/extra" className="text-decoration-none text-white">
            All Extra Courses
          </Link>
        </button>
      </div>
      <div className="container ">
        <div className="list-group">
          {items.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="list-group-item list-group-item-action text-center mb-2"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </HelmetProvider>
  );
}

export default Sections;
