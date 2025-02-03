// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { Button, Table } from "react-bootstrap";

// const MyCourses = ({ instructorId }) => {
//   const [materials, setMaterials] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchMaterials();
//   }, [instructorId]);

//   const fetchMaterials = async () => {
//     try {
//       const response = await axios.get(`http://localhost:3000/api/v1/courseMaterial/view?instructorId=${instructorId}`);
//       setMaterials(response.data);
//     } catch (error) {
//       console.error("Error fetching materials", error);
//     }
//   };

//   const handleDelete = async (m_id) => {
//     try {
//       await axios.delete("http://localhost:3000/api/v1/courseMaterial/delete", { data: { m_id } });
//       setMaterials(materials.filter((material) => material.m_id !== m_id));
//     } catch (error) {
//       console.error("Error deleting material", error);
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h2>Course Materials</h2>
//       <Button variant="primary" onClick={() => navigate("/add-material")}>Add Material</Button>
//       <Table striped bordered hover className="mt-3">
//         <thead>
//           <tr>
//             <th>Title</th>
//             <th>Description</th>
//             <th>Type</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {materials.map((material) => (
//             <tr key={material.m_id}>
//               <td>{material.m_title}</td>
//               <td>{material.m_description}</td>
//               <td>{material.m_type}</td>
//               <td>
//                 <Button variant="warning" onClick={() => navigate(`/edit-material/${material.m_id}`)}>Edit</Button>
//                 <Button variant="danger" onClick={() => handleDelete(material.m_id)} className="ms-2">Delete</Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </div>
//   );
// };

// export default MyCourses;

import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const MyCourses = ({ instructorId }) => {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, [instructorId]);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/courseMaterial/view?instructorId=${instructorId}`);
      setCourses(response.data.Courses);
    } catch (err) {
      setError("Failed to fetch courses");
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) return;
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/courseMaterial/search?s=${search}`);
      setCourses(response.data.courses);
    } catch (err) {
      setError("No courses found");
    }
  };

  const handleDelete = async (c_id) => {
    try {
      await axios.delete("http://localhost:3000/api/v1/courseMaterial/delete", { data: { c_id } });
      setCourses(courses.filter((course) => course.c_id !== c_id));
    } catch (error) {
      console.error("Error deleting course", error);
    }
  };

  return (
    <Container className="mt-4">
      <h2>My Courses</h2>
      <Button variant="primary" onClick={() => navigate("/add-course")}>Add Course</Button>
      <Form onSubmit={handleSearch} className="mb-3 d-flex">
        <Form.Control
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button type="submit" variant="primary" className="ms-2">Search</Button>
      </Form>
      {error && <Alert variant="danger">{error}</Alert>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Type</th>
            <th>Media</th>
            <th>Assignments</th>
            <th>Exams</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={course.c_id}>
              <td>{index + 1}</td>
              <td>{course.c_name}</td>
              <td>{course.c_type}</td>
              <td>{Array.isArray(course.media) ? course.media.length : course.media}</td>
              <td>{Array.isArray(course.assignments) ? course.assignments.length : course.assignments}</td>
              <td>{Array.isArray(course.exams) ? course.exams.length : course.exams}</td>
              <td>
                <Button variant="warning" onClick={() => navigate(`/edit-course/${course.c_id}`)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(course.c_id)} className="ms-2">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default MyCourses;
