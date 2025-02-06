import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetStudents } from '../../../api/instructor/assignments';
import { useGetExam } from '../../../api/instructor/exam';
import { useSubmitExam } from '../../../api/student/quiz';

const EnterExamGrade = () => {
  const { id } = useParams();
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [grade, setGrade] = useState('');
  const [courseId, setCourseId] = useState(null);
  const [maxGrade, setMaxGrade] = useState(0);
  const [gradeError, setGradeError] = useState('');
  const { data: exams, isLoading, isError } = useGetExam();

  const { mutate } = useSubmitExam();
  const navigate = useNavigate();

  // Filter assignments and get course ID and max grade
  useEffect(() => {
    if (exams?.data) {
      const filteredExams = exams.data.find((exam) => exam.e_id === Number(id));

      if (filteredExams) {
        setCourseId(filteredExams.e_courseId);
        setMaxGrade(filteredExams.e_degree || 0);
      }
    }
  }, [exams, id]);

  const { data: studentsData } = useGetStudents(courseId);

  // Set students data
  useEffect(() => {
    if (studentsData?.data) {
      setStudents(studentsData.data);
    }
  }, [studentsData]);

  const validateGrade = (value) => {
    const numValue = Number(value);
    if (numValue < 0) {
      setGradeError('Grade cannot be negative');
      return false;
    }
    if (numValue > maxGrade) {
      setGradeError(`Grade cannot exceed maximum grade of ${maxGrade}`);
      return false;
    }
    setGradeError('');
    return true;
  };

  const handleGradeChange = (e) => {
    const value = e.target.value;
    setGrade(value);
    validateGrade(value);
  };

  const handleSubmit = () => {
    if (!selectedStudent || !grade) {
      alert('Please select a student and enter a grade.');
      return;
    }

    if (!courseId) {
      alert('Could not determine course ID. Please try again.');
      return;
    }

    if (!validateGrade(grade)) {
      alert(gradeError);
      return;
    }

    mutate(
      {
        tExam_studentId: selectedStudent,
        tExam_examId: id,
        tExam_examGrade: grade,
      },
      {
        onSuccess: () => {
          alert('Grade submitted successfully!');
          setGrade('');
          navigate('/instructor/Quizzes/quizzes');
        },
        onError: () => {
          alert('Failed to submit grade.');
        },
      }
    );
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading assignments</div>;
  }

  return (
    <Card className="p-4">
      <h2>Enter Assignment Grade</h2>
      <div className="mb-3">
        <p className="text-muted">Maximum grade: {maxGrade}</p>
      </div>
      <select
        className="form-select mb-3"
        value={selectedStudent}
        onChange={(e) => setSelectedStudent(e.target.value)}
      >
        <option value="">Select Student</option>
        {students?.map((student) => (
          <option key={student?.s_id} value={student?.s_id}>
            {student?.s_first_name + ' ' + student?.s_last_name}
          </option>
        ))}
      </select>
      <div className="mb-3">
        <input
          type="number"
          className={`form-control ${gradeError ? 'is-invalid' : ''}`}
          placeholder={`Enter Grade (max: ${maxGrade})`}
          value={grade}
          onChange={handleGradeChange}
          min="0"
          max={maxGrade}
        />
        {gradeError && <div className="invalid-feedback">{gradeError}</div>}
      </div>
      <button className="btn btn-outline-purple" onClick={handleSubmit} disabled={!!gradeError}>
        Submit
      </button>
    </Card>
  );
};

export default EnterExamGrade;
