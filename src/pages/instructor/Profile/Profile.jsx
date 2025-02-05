import { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import { showToast } from '../../../utils/toast';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useGetProfile, useUpdateProfile } from '../../../api/instructor/EditProfileInst.js';

const ProfilePage = () => {
  const [phoneNumbers, setPhoneNumbers] = useState(['']);
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { mutate, isLoading } = useUpdateProfile();
  const { data: profileData, isLoading: isProfileLoading, refetch } = useGetProfile();

  useEffect(() => {
    if (profileData) {
      setPhoneNumbers(profileData.phoneNumbers || ['']);
    }
  }, [profileData]);

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

    const phonePattern = /^[0-9]{11}$/;
    if (!phoneNumbers.every((num) => phonePattern.test(num))) {
      showToast('Please enter valid 11-digit phone numbers.', 'error');
      return;
    }

    const profileUpdateData = {
      phoneNumbers,
      password: password || undefined,
    };

    mutate(profileUpdateData, {
      onSuccess: () => {
        showToast('Profile updated successfully!', 'success');
        refetch();
      },
      onError: (error) => {
        showToast(`Error: ${error.message}`, 'error');
      },
    });
  };

  if (isProfileLoading) return <p>Loading profile...</p>;

  return (
    <div className="container">
      <h3 className="mb-4">Edit Profile</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Phone Numbers</label>
          <div className="d-flex flex-column gap-2">
            {phoneNumbers.map((phone, index) => (
              <div key={index} className="input-group w-50">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter phone number"
                  value={phone}
                  onChange={(e) => handlePhoneNumberChange(index, e.target.value)}
                  required
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
            <FaPlus onClick={addPhoneNumber} className="fs-3 text-primary cursor-pointer" />
          </div>
        </div>

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
        </div>

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

export default ProfilePage;
