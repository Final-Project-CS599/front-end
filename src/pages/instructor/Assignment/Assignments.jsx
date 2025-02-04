import { useState } from 'react';
import { Button, Table, Alert, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDeleteAssignment, useGetAssignment, searchAssignment } from '../../../api/instructor/assignments.js';

const Assignments = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);
  const [assignments, setAssignments] = useState([]);

  const { data, isLoading, isError, refetch } = useGetAssignment();
  const { mutate } = useDeleteAssignment();

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsSearching(true);
    setError(null);
  
    try {
      const response = await searchAssignment(search);  
      const searchResults = response.assignments || [];
  
      const formattedSearchResults = searchResults.map((assignments) => ({
        ...assignments,
        assignments: Array.isArray(assignments) ? assignments.length : 0
      }));
  
      setAssignments(formattedSearchResults);
    } catch (err) {
      setError(err.response?.data?.message || 'No assignment found');
      setAssignments([]);
    } finally {
      setIsSearching(false);
    }
  };
  

  const handleDelete = async (id) => {
    mutate(id, {
      onSuccess: () => {
        refetch();
      },
      onError: (error) => {
        console.error('Error deleting assignment:', error);
      },
    });
  };

  if (isLoading) {
    return <p>Loading assignments...</p>;
  }

  if (isError) {
    return (
      <Alert variant="danger" className="mt-4">
        Error fetching assignments. Please try again later.
      </Alert>
    );
  }

  if (!data || data?.data?.length === 0) {
    return (
      <div className="container mt-4">
        <div className="d-flex justify-content-between">
          <h2>Assignments List</h2>
          <Form onSubmit={handleSearch} className="mb-3 d-flex">
            <Form.Control
              type="text"
              placeholder="Search assignments..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button type="submit" className="ms-2 btn-outline-purple">
              Search
            </Button>
          </Form>
          <Button
            className="mb-3 btn-outline-purple"
            onClick={() => navigate('/instructor/Assignment/Assign-details')}
          >
            Add Assignment
          </Button>
        </div>
        <Alert variant="info" className="mt-3">
          No Assignments found. Click Add Assignment to create a new assignment.
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between">
        <h2>Assignments List</h2>
        <Form onSubmit={handleSearch} className="mb-3 d-flex">
          <Form.Control
            type="text"
            placeholder="Search assignments..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button type="submit" className="ms-2 btn-outline-purple">
            Search
          </Button>
        </Form>
        <Button
          className="mb-3 btn-outline-purple"
          onClick={() => navigate('/instructor/Assignment/Assign-details')}
        >
          Add Assignment
        </Button>
      </div>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Degree</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((assignment) => (
            <tr key={assignment.a_id}>
              <td>{assignment.a_title}</td>
              <td>{assignment.a_description}</td>
              <td>{assignment.a_degree}</td>
              <td>{assignment.a_type === 'extra' ? 'Extra' : 'Final Exam'}</td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => navigate(`/instructor/Assignment/edit/${assignment.a_id}`)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(assignment.a_id)}
                  className="ms-2"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
          {isSearching && assignments.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center">
                No assignments found for your search.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default Assignments;