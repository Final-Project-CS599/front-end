import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Table } from "react-bootstrap";

const MyCourses = ({ instructorId }) => {
  const [materials, setMaterials] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMaterials();
  }, [instructorId]);

  const fetchMaterials = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/courseMaterial/view?instructorId=${instructorId}`);
      setMaterials(response.data);
    } catch (error) {
      console.error("Error fetching materials", error);
    }
  };

  const handleDelete = async (m_id) => {
    try {
      await axios.delete("http://localhost:5000/courseMaterial/delete", { data: { m_id } });
      setMaterials(materials.filter((material) => material.m_id !== m_id));
    } catch (error) {
      console.error("Error deleting material", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Course Materials</h2>
      <Button variant="primary" onClick={() => navigate("/add-material")}>Add Material</Button>
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
                <Button variant="warning" onClick={() => navigate(`/edit-material/${material.m_id}`)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(material.m_id)} className="ms-2">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default MyCourses;
