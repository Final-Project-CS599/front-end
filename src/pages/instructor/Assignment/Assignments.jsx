import { Button, Table, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDeleteAssignment, useGetAssignment } from '../../../api/instructor/assignments.js';

const Assignments = () => {
  const navigate = useNavigate();

  const { data, isLoading, isError, refetch } = useGetAssignment();
  const { mutate } = useDeleteAssignment();

  // Handle loading state
  if (isLoading) {
    return <p>Loading assignments...</p>;
  }

  // Handle error state
  if (isError) {
    return (
      <Alert variant="danger" className="mt-4">
        Error fetching assignments. Please try again later.
      </Alert>
    );
  }
  // Handle empty data
  if (!data || data?.data?.length === 0) {
    return (
      <div className="container mt-4">
        <div className="d-flex justify-content-between">
          <h2> Assignments List</h2>
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

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between">
        <h2>Assignments List</h2>
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
            <th>type</th>
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
        </tbody>
      </Table>
      
    </div>
  );
};

export default Assignments;
