import { Button, Table, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDeleteMaterial, useGetMaterial } from '../../../api/instructor/media.js';

const ViewMaterialList = () => {
  const navigate = useNavigate();

  const { data, isLoading, isError, refetch } = useGetMaterial();
  const { mutate } = useDeleteMaterial();

  // Handle loading state
  if (isLoading) {
    return <p>Loading Material...</p>;
  }

  // Handle error state
  if (isError) {
    return (
      <Alert variant="danger" className="mt-4">
        Error fetching Material. Please try again later.
      </Alert>
    );
  }
  // Handle empty data
  if (!data || data?.data?.length === 0) {
    return (
      <div className="container mt-4">
        <div className="d-flex justify-content-between">
          <h2> Material List</h2>
          <Button className="mb-3 btn-outline-purple" onClick={() => navigate('/UploadCourse')}>
            Add Material
          </Button>
        </div>
        <Alert variant="info" className="mt-3">
          No Material found. Click Add Material to create a new Material.
        </Alert>
      </div>
    );
  }

  const handleDelete = async (id) => {
    if (!id) {
      console.error('Error: Material ID is undefined!');
      return;
    }

    if (window.confirm('Are you sure you want to delete this material?')) {
      console.log('Deleting Material with ID:', id);

      mutate(id, {
        onSuccess: () => {
          console.log('Material deleted successfully!');
          refetch();
        },
        onError: (error) => {
          console.error('Error deleting Material:', error.response?.data?.message || error.message);
        },
      });
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between">
        <h2>Material List</h2>
        <Button className="btn-outline-purple" onClick={() => navigate('/UploadCourse')}>
          Add Material
        </Button>
      </div>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>publish Date</th>
            <th>file</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 ? (
            data.map((media) => (
              <tr key={media.m_id}>
                <td>{media.m_title}</td>
                <td>{media.m_description}</td>
                <td>{new Date(media.m_publish_date).toLocaleDateString()}</td>
                <td>
                  <img
                    src={`http://localhost:3000${media.m_link}`}
                    alt="Material"
                    width="100px"
                    height="100px"
                  />
                  {/* <a href={media.m_link} target="_blank" rel="noopener noreferrer">
                    Open Link
                  </a> */}
                </td>
                <td>
                  <Button
                    variant="warning"
                    onClick={() => navigate(`/instructor/courses/edit/${media.m_id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(media.m_id)}
                    className="ms-2"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No Materials Found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default ViewMaterialList;
