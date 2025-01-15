import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";

const mockData = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    role: "Admin",
    primaryPhone: "0254585868",
    secondaryPhone: "0125565688",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane@example.com",
    role: "Admin",
  },
  {
    id: 3,
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice@example.com",
    role: "Admin",
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
          <meta name="Profile Information" content="" />
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
                  className="form-control"
                  value={user.firstName + " " + user.lastName}
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
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="national" className=" pt-3">
                  National ID:
                </label>
                <input
                  type="number"
                  id="national"
                  className="form-control"
                  value={user.nationalId}
                  disabled
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="role" className=" pt-3">
                  Role:
                </label>
                <input
                  type="text"
                  id="role"
                  className="form-control-plaintext"                
                  value={user.role}
                  readOnly
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="primaryPhone" className=" pt-3">
                  Primary Phone<span className="text-danger">*</span> :
                </label>
                <input
                  type="tel"
                  id="primaryPhone"
                  className="form-control"
                  value={user.primaryPhone}
                  onChange={inputChange}
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="secondaryPhone" className=" pt-3">
                Secondary Phone:
                </label>
                <input
                  type="tel"
                  id="secondaryPhone"
                  className="form-control"
                  value={user.secondaryPhone}
                  onChange={inputChange}
                />
              </div>

              <br />
          <div className="mt-3 d-flex justify-content-end">
            <button
              className="btn buttoncolor shadow"
              type="submit"
              value="Submit"
            >
              Update
            </button>
            </div>
            <br />

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
              className="btn buttoncolor shadow me-2"
              type="submit"
              value="Submit"
            >
              Submit
            </button>
            <button
              className="btn buttoncolor shadow me-2"
              type="reset"
              value="Reset"
            >
              Rollback
            </button>
          </div>
        </div>
      )}

        </div>
      </HelmetProvider>
    </>
  );
}
