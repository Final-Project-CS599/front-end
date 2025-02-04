import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:3000/api/v1/courses/viewCoursesWithExtra",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const coursesData = response.data?.Courses || [];
      
      const formattedCourses = coursesData.map((course) => ({
        ...course,
        media: Array.isArray(course.media) ? course.media.length : 0,
        assignments: Array.isArray(course.assignments) ? course.assignments.length : 0,
        exams: Array.isArray(course.exams) ? course.exams.length : 0,
      }));

      setCourses(formattedCourses);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch courses");
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) return;

    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/courses/search?s=${search}`
      );
      setCourses(response.data.courses || []);
    } catch (err) {
      setError(err.response?.data?.message || "No courses found");
    }
  };

  const handleDelete = async (c_id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete("http://localhost:3000/api/v1/courseMaterial/delete", {
        headers: { Authorization: `Bearer ${token}` },
        data: { c_id },
      });

      setCourses(courses.filter((course) => course.c_id !== c_id));
    } catch (error) {
      setError(error.response?.data?.message || "Error deleting course");
    }
  };

  return (
    <Container className="mt-4">
      <h2>My Courses</h2>
      <Button variant="primary" onClick={() => navigate("/UploadCourse")}>
        Add Material
      </Button>
      <Form onSubmit={handleSearch} className="mb-3 d-flex">
        <Form.Control
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button type="submit" variant="primary" className="ms-2">
          Search
        </Button>
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
          {courses.length > 0 ? (
            courses.map((course, index) => (
              <tr key={course.c_id}>
                <td>{index + 1}</td>
                <td>{course.c_name}</td>
                <td>{course.c_type}</td>
                <td>{course.media}</td> 
                <td>{course.assignments}</td>  
                <td>{course.exams}</td>  
                <td>
                  <Button
                    variant="warning"
                    onClick={() => navigate(`/edit-course/${course.c_id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(course.c_id)}
                    className="ms-2"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No courses available
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default MyCourses;
