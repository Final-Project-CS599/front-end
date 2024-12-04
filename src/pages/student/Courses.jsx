import React from 'react';
import Card from '../../components/shared/Card';
import img from '../../assets/images/student/7040859.jpg';

const Courses = () => {
  return (
    <div>
      <h3 className="mb-3">Courses</h3>
      <div className="row row-cols-lg-3 g-4 mx-0" style={{ overflowX: 'hidden' }}>
        <div className="col">
          <Card title={'Web Development'} description={'Course'} img={img} />
        </div>
        <div className="col">
          <Card title={'Web Development'} description={'Course'} img={img} />
        </div>
        <div className="col">
          <Card title={'Web Development'} description={'Course'} img={img} />
        </div>
        <div className="col">
          <Card title={'Web Development'} description={'Course'} img={img} />
        </div>
        <div className="col">
          <Card title={'Web Development'} description={'Course'} img={img} />
        </div>
        <div className="col">
          <Card title={'Web Development'} description={'Course'} img={img} />
        </div>
      </div>
    </div>
  );
};

export default Courses;
