import React from 'react';
import Card from '../../components/shared/Card';
import img from '../../assets/images/student/7040859.jpg';

const coursesData = [
  { id: 1, title: 'Web Development', description: 'Course', image: img },
  { id: 2, title: 'Data Science', description: 'Course', image: img },
  { id: 3, title: 'Machine Learning', description: 'Course', image: img },
  { id: 4, title: 'Artificial Intelligence', description: 'Course', image: img },
  { id: 5, title: 'Cybersecurity', description: 'Course', image: img },
  { id: 6, title: 'Cloud Computing', description: 'Course', image: img },
];

const Courses = () => {
  return (
    <div>
      <h3 className="mb-3">Courses</h3>
      <div className="row row-cols-1 row-cols-md-3 g-4 mx-0" style={{ overflowX: 'hidden' }}>
        {coursesData.map((course) => (
          <div className="col" key={course.id}>
            <Card
              title={course.title}
              description={course.description}
              img={course.image}
              id={course.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
