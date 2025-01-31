import  { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/assignments')
      .then((response) => {
        setAssignments(response.data.Assignments);
      })
      .catch((error) => {
        console.error("There was an error fetching the assignments", error);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/assignments/delete/${id}`);
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
          {assignments.map((assignment) => (
            <tr key={assignment.a_id}>
              <td>{assignment.a_title}</td>
              <td>{assignment.a_description}</td>
              <td>{assignment.a_degree}</td>
              <td>
                <Button variant="warning" onClick={() => navigate(`/edit-assignment/${assignment.a_id}`)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(assignment.a_id)} className="ms-2">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Assignments;
