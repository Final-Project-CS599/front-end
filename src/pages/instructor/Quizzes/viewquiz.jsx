import { useState } from "react";

const ViewQuizz = () => {
    const [quizzes, setQuizzes] = useState([
        {
            id: "1",
            category: "cs500",
            title: "Quiz-1",
            link: "https://www.google.com",
            degree: 50,
            instructorName:"MostafaEzzat",
            publishDate:'21-1-2025'
        },
        {
            id: "2",
            category: "cs503",
            title: "Quiz-1",
            link: "https://www.youtube.com",
            degree: 100,
            instructorName:"zainab",
            publishDate:'20/1/2025'
        },
        {
            id: "3",
            category: "cs500",
            title: "Quiz-2",
            link: "https://www.youtube.com",
            degree: 100,
            instructorName:"Nadia",
            publishDate:'23/1/2025'

        },
        {
            id: "4",
            category: "cs503",
            title: "Quiz-2",
            link: "https://www.youtube.com",
            degree: 100,
            instructorName:"AhmedHamza",
            publishDate:'20/1/2025'

        },
    ]);

    const [editQuiz, setEditQuiz] = useState(null); 

    const handleDelete = (id) => {
        const updatedQuizzes = quizzes.filter((quiz) => quiz.id !== id);
        setQuizzes(updatedQuizzes);
    };

    const handleEdit = (quiz) => {
        setEditQuiz(quiz);
    };

    const handleSave = () => {
        const updatedQuizzes = quizzes.map((quiz) =>
            quiz.id === editQuiz.id ? editQuiz : quiz
        );
        setQuizzes(updatedQuizzes);
        setEditQuiz(null); 
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
                    {quizzes.map((quiz) => (
                        <tr key={quiz.id}>
                            <td>{quiz.title}</td>
                            <td>{quiz.category}</td>
                            <td>{quiz.degree}</td>
                            <td>{quiz.publishDate}</td>
                            <td>{quiz.instructorName}</td>
                            <td>
                                <a href={quiz.link} target="_blank" rel="noopener noreferrer">
                                    {quiz.link}
                                </a>
                            </td>
                            <td>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(quiz.id)}
                                >
                                    Delete
                                </button>{" "}
                                <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() => handleEdit(quiz)}
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

         
            {editQuiz && (
                <div className="mt-4">
                    <h3>Edit Quiz</h3>
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
                                value={editQuiz.title}
                                onChange={(e) =>
                                    setEditQuiz({ ...editQuiz, title: e.target.value })
                                }
                            />
                        </div>
                        <div className="form-group">
                            <label>Category</label>
                            <input
                                type="text"
                                className="form-control"
                                value={editQuiz.category}
                                onChange={(e) =>
                                    setEditQuiz({ ...editQuiz, category: e.target.value })
                                }
                            />
                        </div>
                        <div className="form-group">
                            <label>Degree</label>
                            <input
                                type="number"
                                className="form-control"
                                value={editQuiz.degree}
                                onChange={(e) =>
                                    setEditQuiz({ ...editQuiz, degree: parseInt(e.target.value) })
                                }
                            />
                        </div>
                        <div className="form-group">
                            <label>Link</label>
                            <input
                                type="text"
                                className="form-control"
                                value={editQuiz.link}
                                onChange={(e) =>
                                    setEditQuiz({ ...editQuiz, link: e.target.value })
                                }
                            />
                        </div>
                        <button type="submit" className="btn btn-success mt-3">
                            Save
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary mt-3 ml-2"
                            onClick={() => setEditQuiz(null)}
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ViewQuizz;
