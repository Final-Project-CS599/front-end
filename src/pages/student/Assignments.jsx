import React from 'react';
import img from '../../assets/images/student/7040859.jpg';
import Card from '../../components/shared/Card';

const Assignments = () => {
  return (
    <div>
      <h3 className="mb-3">Assignments</h3>
      <div className="row row-cols-lg-3 g-4 mx-0" style={{ overflowX: 'hidden' }}>
        <div className="col">
          <Card title={'Web Development'} description={'Assignment1'} img={img} />
        </div>
        <div className="col">
          <Card title={'Web Development'} description={'Assignment2'} img={img} />
        </div>
        <div className="col">
          <Card title={'Web Development'} description={'Assignment3'} img={img} />
        </div>
        <div className="col">
          <Card title={'Web Development'} description={'Assignment4'} img={img} />
        </div>
        <div className="col">
          <Card title={'Web Development'} description={'Assignment5'} img={img} />
        </div>
        <div className="col">
          <Card title={'Web Development'} description={'Assignment6'} img={img} />
        </div>
      </div>
    </div>
  );
};

export default Assignments;
