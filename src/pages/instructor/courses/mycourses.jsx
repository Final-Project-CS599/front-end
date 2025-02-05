import { useEffect, useState } from 'react';
import { Table, Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {  getCourses, searchCourses } from '../../../api/instructor/courses';

const MyCourses = () => {
  const [courses, setCourses] = useState([]); // Holds the list of courses
  const [search, setSearch] = useState(''); // Holds the search term
  const [error, setError] = useState(null); // Holds error messages
  const [isSearching, setIsSearching] = useState(false); // Tracks if a search is in progress
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  // Fetch all courses
  const fetchCourses = async () => {
    try {
      const response = await getCourses();
      const coursesData = response?.Courses || [];

      // Format courses data
      const formattedCourses = coursesData.map((course) => ({
        ...course,
        media: Array.isArray(course.media) ? course.media.length : 0,
        assignments: Array.isArray(course.assignments) ? course.assignments.length : 0,
        exams: Array.isArray(course.exams) ? course.exams.length : 0,
      }));

      setCourses(formattedCourses);
      setIsSearching(false); // Reset search state
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch courses');
    }
  };

  // Handle search form submission
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search.trim()) {
      fetchCourses(); // If search term is empty, fetch all courses
      return;
    }

    setIsSearching(true); // Set searching state to true

    try {
      const response = await searchCourses(search);

      const searchResults = response.courses || [];

      // Format search results
      const formattedSearchResults = searchResults.map((course) => ({
        ...course,
        media: Array.isArray(course.media) ? course.media.length : 0,
        assignments: Array.isArray(course.assignments) ? course.assignments.length : 0,
        exams: Array.isArray(course.exams) ? course.exams.length : 0,
      }));

      setCourses(formattedSearchResults);
    } catch (err) {
      setError(err.response?.data?.message || 'No courses found');
      setCourses([]); // Clear courses if no results are found
    }
  };

 
  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>My Courses</h2>
        
      </div>

      {/* Search Form */}
      <Form onSubmit={handleSearch} className="mb-3 d-flex">
        <Form.Control
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button type="submit" className="ms-2 btn-outline-purple">
          Search
        </Button>
      </Form>

      {/* Error Message */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Courses Table */}
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
                <td>{course.c_id}</td>
                <td>{course.c_name}</td>
                <td>{course.c_type}</td>
                <td>{course.media}</td>
                <td>{course.assignments}</td>
                <td>{course.exams}</td>
                <td>
                  <Button variant="info" className="me-2" onClick={() => navigate(`/view-material`)}>
                    View Material
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                {isSearching ? 'No courses found for your search.' : 'No courses available.'}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default MyCourses;