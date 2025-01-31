import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Table, Dropdown, DropdownButton } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useGetAssignments } from '../../../api/instructor/assignments.js';

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [selectedType, setSelectedType] = useState(''); // النوع الذي تم اختياره
  const navigate = useNavigate();

  const {data} = useGetAssignments()

  console.log(data)

  // جلب المهام عند تحميل الصفحة
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        // جلب المهام بناءً على النوع المحدد
        const response = await axios.get(`http://localhost:3000/assignment?type=${selectedType}`);
        setAssignments(response.data.Assignments);
      } catch (error) {
        console.error("There was an error fetching the assignments", error);
      }
    };

    fetchAssignments();
  }, [selectedType]); // تحديث عند تغيير النوع

  // حذف مهمة
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/assignment/delete/${id}`);
      setAssignments(assignments.filter(assignment => assignment.a_id !== id));
    } catch (error) {
      console.error("There was an error deleting the assignment", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Assignments List</h2>
      
      
      
      <Button variant="primary" onClick={() => navigate('/add-assignment')}>Add Assignment</Button>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Degree</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {assignments.length > 0 ? (
            assignments.map((assignment) => (
              <tr key={assignment.a_id}>
                <td>{assignment.a_title}</td>
                <td>{assignment.a_description}</td>
                <td>{assignment.a_degree}</td>
                <td>
                  <Button variant="warning" onClick={() => navigate(`/edit-assignment/${assignment.a_id}`)}>Edit</Button>
                  <Button variant="danger" onClick={() => handleDelete(assignment.a_id)} className="ms-2">Delete</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">No assignments found</td>
            </tr>
          )}
        </tbody>
      </Table>
      {/* Dropdown لاختيار النوع */}
      <DropdownButton 
        variant="secondary" 
        title="Select Assignment Type" 
        onSelect={(type) => setSelectedType(type)} 
        className="mb-3"
      >
        <Dropdown.Item eventKey="extra">Extra-Assignment</Dropdown.Item>
        <Dropdown.Item eventKey="academic">Academic-Assignment</Dropdown.Item>
      </DropdownButton>
    </div>
  );
};

export default Assignments;
