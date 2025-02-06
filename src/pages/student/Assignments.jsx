import { useGetAssignments } from '../../api/student/assignment';
import CourseDropDown from '../../components/shared/CourseDropDown';

const Assignments = () => {
  return (
    <div>
      <CourseDropDown title="Assignments" type="assignments" fetchData={useGetAssignments} />
    </div>
  );
};

export default Assignments;
