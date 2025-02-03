import React, { useState } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";



//   اضافة على الابديت اسم الدكتور و الايدي تحويل زرار سيف تشانج الى سبميت


function CoursePage() {
  // بيانات الكورس الأساسية
  const [course, setCourse] = useState({
    name: "Advanced Mathematics" ,
    doctor: "Dr. John Smith",
    code: "MATH-401",
    category: "Mathematics",
    department: "Science",
    startTime: "2025-01-30 10:00 AM",
    endTime: "2025-01-30 12:00 PM",
    description: "An advanced course in mathematical theories and applications.",
  });
  

  const [students, setStudents] = useState([]); // قائمة الطلاب
  const [newStudent, setNewStudent] = useState({ name: "", id: "" }); // بيانات الطالب الجديد
  const [isEditing, setIsEditing] = useState(false); // للتحكم في حالة التعديل

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handleStudentChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveChanges = () => {
    setIsEditing(false);
    alert("Course details updated successfully!");
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleAddStudent = () => {
    if (newStudent.name && newStudent.id) {
      setStudents([...students, newStudent]);
      setNewStudent({ name: "", id: "" });
      alert("Student added successfully!");
    } else {
      alert("Please fill in all student details.");
    }
  };

  const handleDelete = () => {
    alert("Course Deleted!");
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Course Details - {course.name}</title>
        <meta name="description" content={`Details of the course: ${course.name}`} />
      </Helmet>

      <div className="container mt-5">
        <div className="card shadow" >
          <div className="card-header "  style={{ backgroundColor: "#7F55E0", color: "white" }} > 
            <h3 className="mb-0">Course Details</h3>
          </div>
          <div className="card-body">
            {isEditing ? (
              // نموذج تعديل بيانات الكورس
              <form>
                <div className="mb-3"  >
                  <label className="form-label" >Course Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={course.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Doctor</label>
                  <input
                    type="text"
                    className="form-control"
                    name="doctor"
                    value={course.doctor}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Course Code</label>
                  <input
                    type="text"
                    className="form-control"
                    name="code"
                    value={course.code}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Start Time</label>
                  <input
                    type="text"
                    className="form-control"
                    name="startTime"
                    value={course.startTime}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">End Time</label>
                  <input
                    type="text"
                    className="form-control"
                    name="endTime"
                    value={course.endTime}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    rows="3"
                    value={course.description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <div className="d-flex justify-content-between">
                  <button type="button" className="btn btn-success" onClick={handleSaveChanges}>
                    Save Changes
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={handleCancelEdit}>
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                {/* عرض تفاصيل الكورس */}
                <h4 className="mb-4 text-center text-primary">{course.name}</h4>
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <th>Doctor</th>
                      <td>{course.doctor}</td>
                    </tr>
                    <tr>
                      <th>Course Code</th>
                      <td>{course.code}</td>
                    </tr>
                    <tr>
                      <th>Category</th>
                      <td>{course.category}</td>
                    </tr>
                    <tr>
                      <th>Department</th>
                      <td>{course.department}</td>
                    </tr>
                    <tr>
                      <th>Start Time</th>
                      <td>{course.startTime}</td>
                    </tr>
                    <tr>
                      <th>End Time</th>
                      <td>{course.endTime}</td>
                    </tr>
                    <tr>
                      <th>Description</th>
                      <td>{course.description}</td>
                    </tr>
                  </tbody>
                </table>

                {/* الأزرار */}
                <div className="d-flex justify-content-between mt-4">
                  <button className="btn btn-danger" onClick={handleDelete}>
                    Delete Course
                  </button>
                  <button className="btn"  onClick={handleEditToggle} style={{ backgroundColor: "#7F55E0", color: "white" }}>
                    Edit Course
                  </button>
                </div>
              </>
            )}

            {/* إضافة الطلاب */}
            <div className="mt-5">
              <h5 className="text-primary">Add Student to the Course</h5>
              <div className="mb-3">
                <label className="form-label">Student Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={newStudent.name}
                  onChange={handleStudentChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Student ID</label>
                <input
                  type="text"
                  className="form-control"
                  name="id"
                  value={newStudent.id}
                  onChange={handleStudentChange}
                />
              </div>
              <button className="btn btn-success" onClick={handleAddStudent}>
                Add Student
              </button>

              {/* قائمة الطلاب */}
              <h5 className="mt-4">Enrolled Students</h5>
              <ul className="list-group">
                {students.map((student, index) => (
                  <li key={index} className="list-group-item">
                    {student.name} (ID: {student.id})
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
}

export default CoursePage;
