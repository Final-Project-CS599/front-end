import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGetDepartmentsData } from "../../../api/admin/GetDepartments";
import { useEditStudent, useGetStudentById } from "../../../api/admin/users";
import { showToast } from "../../../utils/toast";
import { ToastContainer } from "react-toastify";

export default function StudentInfo() {
  const { id } = useParams();
  const { data: studentData, refetch } = useGetStudentById(id);
  const [user, setUser] = useState(null);
  const { data: departmentData } = useGetDepartmentsData();
  const { mutate } = useEditStudent();

  useEffect(() => {
    if (studentData?.student) {
      const selectedUser = studentData.student;
      setUser(selectedUser);
    }
  }, [studentData]);

  const inputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const submit = () => {
    const updateBody = {
      email: user.email,
      nationalId: user.nationalId,
      department: user.department,
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
    };
    mutate({ id, updateBody }, {
      onSuccess: () => {
        showToast("Data updated successfully!", { type: "success" });
        refetch();
      },
      onError: (error) => {
        if (error.response && error.response.data.errors) {
          error.response.data.errors.forEach((err) => {
            showToast(err.msg, { type: "error" });
          });
        } else {
          showToast("Update failed. Please try again.", { type: "error" });
        }
      },
    });
  };

  if (!user) return <div>Loading...</div>;

  return (
    <>
      <div>
        <form className="row g-3">

          <div className="col-md-4">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              className="form-control"
              name="firstName"
              value={user.firstName || ""}
              onChange={inputChange}
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="middleName">Middle Name:</label>
            <input
              type="text"
              id="middleName"
              className="form-control"
              name="middleName"
              value={user.middleName || ""}
              onChange={inputChange}
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              className="form-control"
              name="lastName"
              value={user.lastName || ""}
              onChange={inputChange}
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              className="form-control"
              name="email"
              value={user.email || ""}
              onChange={inputChange}
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="national" >
              National ID:
            </label>
            <input
              type="text"
              id="national"
              className="form-control"
              name="nationalId"
              value={user.nationalId || ""}
              onChange={inputChange}
            />
          </div>


          <div className="col-md-6 mx-auto">
            <label htmlFor="department" >
              Department <span className="text-danger">*</span> :
            </label>
            <select
              id="department"
              className="form-select mt-2"
              aria-label="Default select example"
              name="department"
              value={user.department || ""}
              onChange={inputChange}
            >
              <option value="">Select Department</option>
              {departmentData?.departments?.map((department) => (
                <option key={department.id} value={department.department_name}>
                  {department.department_name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-3">
            <label htmlFor="birthDate" className="pt-2">
              Birth Date:
            </label>
            <input
              type="date"
              id="birthDate"
              className="form-control"
              value={user.dateOfBirth}
              disabled
            />
          </div>

          <div className="col-md-3">
            <label htmlFor="gender" className="pt-2">
              Gender :
            </label>
            <input
              type="text"
              id="gender"
              className="form-control"
              value={user.gender}
              disabled
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="phone" className="pt-3">
              Phone 1:
            </label>
            <input
              type="tel"
              id="phone"
              className="form-control"
              name="phone"
              value={user.phones[0]}
              disabled
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="phone2" className="pt-3">
              Phone 2:
            </label>
            <input
              type="tel"
              id="phone2"
              className="form-control"
              name="phone2"
              value={user.phones[1]}
              disabled
            />
          </div>


        </form>
        <hr />
      </div>
      <br />
      <div className="mt-3 d-flex justify-content-end">
        <button
          className="btn btn-purple buttoncolor"
          type="submit"
          onClick={submit}
        >
          Update
        </button>
      </div>
      <ToastContainer />
    </>
  );
}