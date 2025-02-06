import { useState } from 'react';
import { Table, Alert, Form, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {
  useDeleteAssignment,
  useGetAssignment,
  useSearchAssignment,
} from '../../../api/instructor/assignments.js';

const Assignments = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');

  // Fetching assignments
  const { data, isLoading, isError, refetch } = useGetAssignment();
  const { data: searchData, isFetching } = useSearchAssignment(query);
  const { mutate } = useDeleteAssignment();

  // Handle search submit
  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim() !== query) {
      setQuery(search.trim());
    }
  };

  // Handle assignment deletion
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

  // Determine the displayed assignments
  const assignments = query ? searchData?.courses || [] : data?.data || [];

  return (
    <div className="container mt-4">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center">
        <h2>Assignments List</h2>

        {/* Search & Add Buttons */}
        <div className="d-flex">
          <Form onSubmit={handleSearch} className="d-flex me-3">
            <Form.Control
              type="text"
              placeholder="Search assignments..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button type="submit" className="ms-2  btn-outline-purple">
              {isFetching ? <Spinner animation="border" size="sm" /> : 'Search'}
            </Button>
          </Form>

          <Button
            variant="primary"
            onClick={() => navigate('/instructor/Assignment/Assign-details')}
          >
            Add
          </Button>
        </div>
      </div>

      {/* Error Message */}
      {isError && (
        <Alert variant="danger" className="mt-3">
          Error fetching assignments. Please try again later.
        </Alert>
      )}

      {/* Loading Indicator */}
      {isLoading ? (
        <div className="text-center mt-4">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
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
            {assignments.length > 0 ? (
              assignments.map((assignment) => (
                <tr key={assignment.a_id}>
                  <td>{assignment.a_title}</td>
                  <td>{assignment.a_description}</td>
                  <td>{assignment.a_degree}</td>
                  <td>{assignment.a_type === 'extra' ? 'Extra' : 'Final Exam'}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => navigate(`/instructor/Assignment/edit/${assignment.a_id}`)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      className="ms-2"
                      onClick={() => handleDelete(assignment.a_id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  {query ? 'No assignments found for your search.' : 'No assignments available.'}
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default Assignments;
