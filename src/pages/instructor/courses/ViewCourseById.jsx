import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Spinner, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

const ViewCourse = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token"); // تأكد من وجود التوكن في التخزين المحلي
        const response = await axios.get("http://localhost:5000/api/courses", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourses(response.data.Courses);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">My Courses</h2>
      <div className="row">
        {courses.map((course) => (
          <div key={course.id} className="col-md-4 mb-3">
            <Card>
              <Card.Body>
                <Card.Title>{course.name}</Card.Title>
                <Card.Text>{course.description}</Card.Text>
                <Button variant="primary">View</Button>
                <Link to="/instructor/add-material" className="btn btn-secondary ms-2">Add Material</Link>
                <Link to="/instructor/view-material" className="btn btn-secondary ms-2">Add Material</Link>

              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewCourse;
