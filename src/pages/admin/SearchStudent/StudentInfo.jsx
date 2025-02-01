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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const submit = () => {
    const fullName = user.firstName + " " + (user.middleName ? user.middleName + " " : "") + user.lastName;
  const [firstName, middleName, lastName] = fullName.split(" ");
    
  const updateBody = {
      email: user.email,
      nationalId: user.nationalId,
      department: user.department,
      firstName,
    middleName: middleName || "",
    lastName: lastName || middleName || "",
    };
    mutate({ id, updateBody }, {
          onSuccess: () => {
            showToast("Data updated successfully!", { type: "success" });
            refetch();
            setIsSubmitting(false);
          },
          onError: (error) => {
            showToast(error.message || "Update failed", { type: "error" });
          console.error(error);
          setIsSubmitting(false);
          }});
  };

  if (!user) return <div>Loading...</div>;

  return (
    <>
      <div>
        <form className="row g-3">
          <div className="col-md-6">
            <label htmlFor="fName">Full Name:</label>
            <input
              type="text"
              id="fName"
              className="form-control"
              value={
                user.firstName +
                " " +
                (user.middleName ? user.middleName + " " : "") +
                user.lastName
              }
              onChange={(e) => {
                const nameParts = e.target.value.split(" ");
                setUser({
                  ...user,
                  firstName: nameParts[0] || "",
                  middleName: nameParts.length > 2 ? nameParts[1] : "",
                  lastName: nameParts.length > 2 ? nameParts[2] : nameParts[1] || ""
                });}}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              className="form-control"
              name="email"
              value={user.email}
              onChange={inputChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="national" className="pt-3">
              National ID:
            </label>
            <input
              type="text"
              id="national"
              className="form-control"
              name="nationalId"
              value={user.nationalId}
              onChange={inputChange}
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="birthDate" className="pt-3">
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
            <label htmlFor="gender" className="pt-3">
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
          <div className="col-md-6 mx-auto">
            <label htmlFor="department" className="pt-3">
              Department <span className="text-danger">*</span> :
            </label>
            <select
              id="department"
              className="form-select mt-2"
              aria-label="Default select example"
              name="department"
              value={user.department}
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
        </form>
        <hr />
      </div>
      <br />
      <div className="mt-3 d-flex justify-content-end">
        <button className="btn btn-purple buttoncolor {`${isSubmitting ? 'opacity-50' : ''}`} "
                type="submit"
                disabled={isSubmitting} onClick={submit}>
          {isSubmitting ? 'Updating...' : 'Update'}
        </button>
      </div>
      <ToastContainer />
    </>
  );
}