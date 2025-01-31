import { useState, useEffect } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { useEditAdminData, useGetAdminData } from "../../../api/admin/EditProfile";

export default function Profile() {
  const [user, setUser] = useState(null);
  const { data: profileData, refetch } = useGetAdminData();
  const { mutate } = useEditAdminData()

  useEffect(() => {
    if (profileData?.adminData) {
      setUser(profileData.adminData);
    }
  }, [profileData]);

  function inputChange(e) {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }


  const handleSubmit = (e) => {
    e.preventDefault();

    const { primaryPhone, secondaryPhone, newPassword, confirmPassword } = user;

    if (newPassword !== confirmPassword) {
      // Handle password mismatch
      return;
    }

    mutate({
      primaryPhone,
      secondaryPhone,
      newPassword,
      confirmPassword
    }, {
      onSuccess: () => {
        refetch();
      },
      onError: (error) => {
        // Handle error (show error message)
        console.error(error);
      }
    });
  };

  if (!user) return <div>Loading...</div>;

  return (
    <HelmetProvider>
      <Helmet>
        <meta name="Profile Information" content="" />
        <title>Profile</title>
      </Helmet>
      <div className="w-75 mx-auto">
        <div>
          <h3 className="pb-4">Edit Profile</h3>
          <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-md-6">
              <label htmlFor="fName">Full Name:</label>
              <input
                type="text"
                id="fName"
                className="form-control"
                value={`${user.firstName} ${user.lastName}`}
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
              <label htmlFor="national" className="pt-3">
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
              <label htmlFor="role" className="pt-3">
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
              <label htmlFor="primaryPhone" className="pt-3">
                Primary Phone<span className="text-danger">*</span>:
              </label>
              <input
                type="tel"
                id="primaryPhone"
                name="primaryPhone"
                className="form-control"
                value={user.primaryPhone || ''}
                onChange={inputChange}
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="secondaryPhone" className="pt-3">
                Secondary Phone:
              </label>
              <input
                type="tel"
                id="secondaryPhone"
                name="secondaryPhone"
                className="form-control"
                value={user.secondaryPhone || ''}
                onChange={inputChange}
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="password" className="pt-3">New Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="New Password"
                id="password"
                name="newPassword"
                onChange={inputChange}
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="ConfirmPassword" className="pt-3">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                id="ConfirmPassword"
                name="confirmPassword"
                onChange={inputChange}
              />
            </div>

            <div className="mt-3 d-flex justify-content-end">
              <button
                className="btn buttoncolor shadow"
                type="submit"
                value="Submit"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </HelmetProvider>
  );
}