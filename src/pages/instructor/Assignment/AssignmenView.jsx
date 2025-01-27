import { useState } from "react";

const ViewAssignment = () => {
    const [assignment, setAssignment] = useState([
        {
            id: "1",
            category: "cs500",
            title: "Assignment-1",
            link: "https://www.google.com",
            degree: 50,
            instructorName:"MostafaEzzat",
            publishDate:'21-1-2025'
        },
        {
            id: "2",
            category: "cs503",
            title: "Assignment-1",
            link: "https://www.youtube.com",
            degree: 100,
            instructorName:"zainab",
            publishDate:'20/1/2025'
        },
        {
            id: "3",
            category: "cs500",
            title: "Assignment-2",
            link: "https://www.youtube.com",
            degree: 100,
            instructorName:"Nadia",
            publishDate:'23/1/2025'

        },
        {
            id: "4",
            category: "cs503",
            title: "assignment-2",
            link: "https://www.youtube.com",
            degree: 100,
            instructorName:"AhmedHamza",
            publishDate:'20/1/2025'

        },
    ]);

    const [editAssignment, seteditAssignment] = useState(null); 

    const handleDelete = (id) => {
        const updatedassignment = assignment.filter((assignment) => assignment.id !== id);
        setAssignment(updatedassignment);
    };

    const handleEdit = (assignment) => {
        seteditAssignment(assignment);
    };

    const handleSave = () => {
        const updatedassignment = assignment.map((assignment) =>
            assignment.id === editAssignment.id ? editAssignment : assignment
        );
        setAssignment(updatedassignment);
        seteditAssignment(null); 
    };

    return (
        <div>
            <table className="table table-striped mt-5">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Degree</th>
                        <th>publishDate</th>
                         <th>instructorName</th>
                        <th>Link</th>
                    </tr>
                </thead>
                <tbody>
                    {assignment.map((assignment) => (
                        <tr key={assignment.id}>
                            <td>{assignment.title}</td>
                            <td>{assignment.category}</td>
                            <td>{assignment.degree}</td>
                            <td>{assignment.publishDate}</td>
                            <td>{assignment.instructorName}</td>
                            <td>
                                <a href={assignment.link} target="_blank" rel="noopener noreferrer">
                                    {assignment.link}
                                </a>
                            </td>
                            <td>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(assignment.id)}
                                >
                                    Delete
                                </button>{" "}
                                <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() => handleEdit(assignment)}
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

         
            {editAssignment && (
                <div className="mt-4">
                    <h3>Edit assignment</h3>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSave();
                        }}
                    >
                        <div className="form-group">
                            <label>Title</label>
                            <input
                                type="text"
                                className="form-control"
                                value={editAssignment.title}
                                onChange={(e) =>
                                    seteditAssignment({ ...editAssignment, title: e.target.value })
                                }
                            />
                        </div>
                        <div className="form-group">
                            <label>Category</label>
                            <input
                                type="text"
                                className="form-control"
                                value={editAssignment.category}
                                onChange={(e) =>
                                    seteditAssignment({ ...editAssignment, category: e.target.value })
                                }
                            />
                        </div>
                        <div className="form-group">
                            <label>Degree</label>
                            <input
                                type="number"
                                className="form-control"
                                value={editAssignment.degree}
                                onChange={(e) =>
                                    seteditAssignment({ ...editAssignment, degree: parseInt(e.target.value) })
                                }
                            />
                        </div>
                        <div className="form-group">
                            <label>Link</label>
                            <input
                                type="text"
                                className="form-control"
                                value={editAssignment.link}
                                onChange={(e) =>
                                    seteditAssignment({ ...editAssignment, link: e.target.value })
                                }
                            />
                        </div>
                        <button type="submit" className="btn btn-success mt-3">
                            Save
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary mt-3 ml-2"
                            onClick={() => seteditAssignment(null)}
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ViewAssignment;
