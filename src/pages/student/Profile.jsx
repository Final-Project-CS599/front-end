import { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import { useGetProfile, useUpdateProfile } from '../../api/student/EditProfile';
import { showToast } from '../../utils/toast';

const Profile = () => {
  const [phoneNumbers, setPhoneNumbers] = useState(['']);
  const [password, setPassword] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('Male');

  const { mutate, isLoading } = useUpdateProfile();
  const { data } = useGetProfile();

  // Effect to populate form fields with fetched student data
  useEffect(() => {
    if (data?.data?.studentData) {
      const studentData = data.data.studentData;

      // Set phone numbers
      if (studentData.phoneNumbers && studentData.phoneNumbers.length > 0) {
        setPhoneNumbers(studentData.phoneNumbers);
      }

      // Set other fields
      setBirthDate(studentData.dateOfBirth || '');
      setGender(studentData.gender || 'Male');
    }
  }, [data]);

  const handlePhoneNumberChange = (index, value) => {
    const newPhoneNumbers = [...phoneNumbers];
    newPhoneNumbers[index] = value;
    setPhoneNumbers(newPhoneNumbers);
  };

  const addPhoneNumber = () => {
    setPhoneNumbers([...phoneNumbers, '']);
  };

  const removePhoneNumber = (index) => {
    const newPhoneNumbers = phoneNumbers.filter((_, i) => i !== index);
    setPhoneNumbers(newPhoneNumbers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare data for submission
    const profileData = {
      phoneNumbers,
      password,
      birthDate,
      gender,
    };

    // Call the mutation to update the profile
    mutate(profileData, {
      onSuccess: () => {
        showToast('Profile updated successfully!', 'success');
      },
      onError: (error) => {
        showToast(`Error: ${error.message}`, 'error');
      },
    });
  };

  return (
    <div className="container">
      <h3 className="mb-4">Edit Profile</h3>
      <form onSubmit={handleSubmit}>
        {/* Phone Numbers */}
        <div className="mb-3">
          <label className="form-label">Phone Numbers</label>
          <div className="d-flex gap-2 align-items-center">
            {phoneNumbers.map((phone, index) => (
              <div key={index} className="input-group w-50">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter phone number"
                  value={phone}
                  onChange={(e) => handlePhoneNumberChange(index, e.target.value)}
                />
                {phoneNumbers.length > 1 && (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => removePhoneNumber(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <FaPlus onClick={addPhoneNumber} className="fs-3 text-purple" />
          </div>
        </div>

        {/* Password and Birth Date */}
        <div className="row my-5">
          <div className="col-md-6">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Birth Date</label>
            <input
              type="date"
              className="form-control"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>
        </div>

        {/* Gender */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Gender</label>
            <select
              className="form-select"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="d-flex justify-content-end">
          <button type="submit" className="btn buttoncolor w-25" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Profile;
