import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";

const mockData = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    department: "Math",
    phone: "",
    phone2: "",
    course: [
      {
        courseId: "5",
        courseName: "Algebra",
        courseCode: "MA254",
        courseType: "Academic",
      },
      {
        courseId: "40",
        courseName: "Software Engineering",
        courseCode: "CS542",
        courseType: "Extra",
      },
    ],
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane@example.com",
    department: "CS",
    course: [
      {
        courseId: "56",
        courseName: "Bio",
        courseCode: "BI254",
        courseType: "Extra",
      },
      {
        courseId: "40",
        courseName: "Software Engineering",
        courseCode: "CS542",
        courseType: "Extra",
      },
    ],
  },
  {
    id: 3,
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice@example.com",
    department: "Arts",
    course: "History",
  },
];


export default function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [changePass, showChangePass] = useState(false);
  // const [originUser, setOriginUser] = useState(null);

  useEffect(() => {
    setUser(mockData.find((item) => item.id));
  }, [id]);

  function inputChange(e) {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }
  

  if (!user) return <div>Loading...</div>;

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <meta name="description" content="" />
          <title>Profile</title>
        </Helmet>
        <div className="w-75 mx-auto">
          <div>
            <h3 className="pb-4">Edit Profile</h3>

            <form className="row g-3">
              <div className="col-md-6">
                <label htmlFor="fName">Full Name:</label>
                <input
                  type="text"
                  id="fName"
                  className=" form-control"
                  value={user.firstName + " " + user.lastName}
                  onChange={inputChange}
                  disabled
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  className="form-control-plaintext"
                  readOnly
                  value={user.email}
                  onChange={inputChange}
                />
              </div>

              <div className="col-md-5">
                <label htmlFor="national" className=" pt-3">
                  National ID:
                </label>
                <input
                  type="number"
                  id="national"
                  className=" form-control"
                  value={user.nationalId}
                  onChange={inputChange}
                  disabled
                />
              </div>

              <div className="col-md-3">
                <label htmlFor="date_Birth" className=" pt-3">
                  Birth Date:{" "}
                </label>
                <input
                  type="date"
                  id="date_Birth"
                  className=" form-control"
                  value={user.bDate}
                  onChange={inputChange}
                />
              </div>

              <div className="col-md-3">
                <label htmlFor="gender">Select Gender :</label>
                <select
                  className="form-select mt-3"
                  aria-label="Default select example"
                  id="gender"
                  value={user.gender}
                  onChange={inputChange}
                  disabled
                >
                  <option value="">Select Gender</option>
                  <option value="1">Male</option>
                  <option value="2">Female</option>
                </select>
              </div>

              <div className="col-md-6">
                <label htmlFor="phone" className=" pt-3">
                  Phone 1<span className="text-danger">*</span> :
                </label>
                <input
                  type="tel"
                  id="phone"
                  className=" form-control"
                  value={user.phone}
                  onChange={inputChange}
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="phone2" className=" pt-3">
                  Phone 2:
                </label>
                <input
                  type="tel"
                  id="phone2"
                  className=" form-control"
                  value={user.phone2}
                  onChange={inputChange}
                />
              </div>

              <div className="row row-cols-md-6 mt-3 g-2 mb-4">
                <div className="col-12">
                  <label className="mt-2" htmlFor="password">
                    Password
                  </label>
                </div>
                <div className="d-flex justify-content-end">
                  <button
                    id="password"
                    className="btn buttoncolor shadow "
                    type="button"
                    onClick={() => showChangePass(!changePass)} 
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </form>
          </div>

          {changePass && (
        <div>
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label">Old Password</label>
            <div className="col-sm-10">
              <input type="password" className="form-control" placeholder="Old Password" />
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label">New Password</label>
            <div className="col-sm-10">
              <input type="password" className="form-control" placeholder="New Password" />
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label">Confirm Password</label>
            <div className="col-sm-10">
              <input type="password" className="form-control" placeholder="Confirm Password" />
            </div>
          </div>
          <div className="row mb-3 row-cols-md-6">
          <button
              className="btn buttoncolor shadow"
              type="submit"
              value="Submit"
            >
              Submit
            </button>
          </div>
        </div>
      )}

          <br />
          <div className="mt-3 d-flex justify-content-end">
            <button
              className="btn buttoncolor shadow me-2"
              type="reset"
              value="Reset"
            >
              Rollback
            </button>
            <button
              className="btn buttoncolor shadow"
              type="submit"
              value="Submit"
            >
              Update
            </button>
          </div>
        </div>
      </HelmetProvider>
    </>
  );
}
