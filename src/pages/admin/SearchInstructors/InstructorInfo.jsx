import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGetDepartmentsData } from "../../../api/admin/GetDepartments";
import { useEditInstructor, useGetInstructorById } from "../../../api/admin/users";
import { showToast } from "../../../utils/toast";
import { ToastContainer } from "react-toastify";


export default function InstructorInfo() {
  const { id } = useParams();
  const { data: instructorData, refetch } = useGetInstructorById(id);
  const [user, setUser] = useState(null);
  const { data: departmentData } = useGetDepartmentsData();
  const { mutate } = useEditInstructor();

 
  useEffect(() => {
    if (instructorData?.instructor) {
      setUser(instructorData.instructor);
    }
  }, [instructorData]);

 
const inputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const submit = () => {
    const fullName = user.firstName + " "  + user.lastName;
  const [firstName, lastName] = fullName.split(" ");

    const updateBody = {
      email: user.email,
      department: user.department,
      firstName,
    lastName: lastName || "",
    };
    mutate({ id, updateBody }, {
      onSuccess: () => {
        showToast("Data updated successfully!", { type: "success" });
        refetch();
        setIsSubmitting(false);
      },
      onError: (error) => {
        if (error.response && error.response.data.errors) {
          error.response.data.errors.forEach((err) => {
            showToast(err.msg, { type: "error" });
          });
        } else {
          showToast("Update failed. Please try again.", { type: "error" });
        }
        setIsSubmitting(false);
      },});
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
                user.lastName
              }
              onChange={(e) => {
                const nameParts = e.target.value.split(" ");
                setUser({
                  ...user,
                  firstName: nameParts[0] || "",
                  lastName: nameParts.slice(1).join(" ") || "" 
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
