import React from 'react';
import Card from '../../components/shared/Card';
import img from '../../assets/images/student/7040859.jpg';

const Quizzes = () => {
  return (
    <div>
      <h3 className="mb-3">Quizzes</h3>
      <div className="row row-cols-lg-3 g-4 mx-0" style={{ overflowX: 'hidden' }}>
        <div className="col">
          <Card title={'Web Development'} description={'Quiz1 '} img={img} />
        </div>
        <div className="col">
          <Card title={'Web Development'} description={'Quiz2'} img={img} />
        </div>
        <div className="col">
          <Card title={'Web Development'} description={'Quiz3'} img={img} />
        </div>
        <div className="col">
          <Card title={'Web Development'} description={'Quiz4'} img={img} />
        </div>
        <div className="col">
          <Card title={'Web Development'} description={'Quiz5'} img={img} />
        </div>
        <div className="col">
          <Card title={'Web Development'} description={'Quiz6'} img={img} />
        </div>
      </div>
    </div>
  );
};

export default Quizzes;
