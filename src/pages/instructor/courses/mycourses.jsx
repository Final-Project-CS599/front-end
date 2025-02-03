import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Table } from 'react-bootstrap';
import { getCourses, useGetCourses } from '../../../api/instructor/courses';

const MyCourses = ({ instructorId }) => {
  const [materials, setMaterials] = useState([]);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  const { data } = useGetCourses();

  if (!data || data?.data?.length === 0) {
    return (
      <div className="container mt-4">
        <div className="d-flex justify-content-between">
          <h2> Course Materials</h2>
          <Button className="mb-3 btn-outline-purple" onClick={() => navigate('/UploadCourse')}>
            Add Material
          </Button>
        </div>
        <Alert variant="info" className="mt-3">
          No Course Materials found. Click " Add Material" to create a new Course Materials.
        </Alert>
      </div>
    );
  }

  const handleDelete = async (m_id) => {
    try {
      await axios.delete('http://localhost:5000/courseMaterial/delete', { data: { m_id } });
      setMaterials(materials.filter((material) => material.m_id !== m_id));
    } catch (error) {
      console.error('Error deleting material', error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between">
        <h2>Course Materials</h2>
        <Button className="btn-outline-purple" onClick={() => navigate('/UploadCourse')}>
          Add Material
        </Button>
      </div>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {materials.map((material) => (
            <tr key={material.m_id}>
              <td>{material.m_title}</td>
              <td>{material.m_description}</td>
              <td>{material.m_type}</td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => navigate(`/instructor/courses/edit/${material.m_id}`)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(material.m_id)}
                  className="ms-2"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default MyCourses;
