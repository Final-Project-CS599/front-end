import { useState } from "react";
import { Table, Alert, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "react-bootstrap-icons"; 
import {
  useDeleteAssignment,
  useGetAssignment,
  useSearchAssignment,
} from "../../../api/instructor/assignments.js";

const Assignments = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState(""); 
  const [query, setQuery] = useState(""); 

  const { data, isLoading, isError, refetch } = useGetAssignment();
  const { data: searchData, isFetching } = useSearchAssignment(query); 
  const { mutate } = useDeleteAssignment();

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(search);
  };

  const handleDelete = async (id) => {
    mutate(id, {
      onSuccess: () => {
        refetch();
      },
      onError: (error) => {
        console.error("Error deleting assignment:", error);
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

  const assignments = query ? searchData?.assignments || [] : data?.data || [];

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <ArrowLeft
            size={28}
            style={{ cursor: "pointer" }}
            className="me-3"
            onClick={() => navigate("/instructor/Assignment/Assignment")}
          />
          <h2>Assignments List</h2>
        </div>

        <div className="d-flex">
          <Form onSubmit={handleSearch} className="d-flex me-3">
            <Form.Control
              type="text"
              placeholder="Search assignments..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" className="ms-2 btn btn-outline-purple">
              {isFetching ? "Searching..." : "Search"}
            </button>
          </Form>

          {/* زر الإضافة */}
          <Button variant="primary" onClick={() => navigate("/instructor/Assignment/Assign-details")}>
            Add
          </Button>
        </div>
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
          {assignments.length > 0 ? (
            assignments.map((assignment) => (
              <tr key={assignment.a_id}>
                <td>{assignment.a_title}</td>
                <td>{assignment.a_description}</td>
                <td>{assignment.a_degree}</td>
                <td>{assignment.a_type === "extra" ? "Extra" : "Final Exam"}</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() =>
                      navigate(`/instructor/Assignment/edit/${assignment.a_id}`)
                    }
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger ms-2"
                    onClick={() => handleDelete(assignment.a_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                {query ? "No assignments found" : "No assignments available."}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default Assignments;
