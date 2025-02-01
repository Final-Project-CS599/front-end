import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import { showToast } from '../../../utils/toast';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { useUpdateProfile } from '../../../api/instructor/EditProfileInst.js';

const ProfilePage = () => {
  const [phoneNumbers, setPhoneNumbers] = useState(['']);
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { mutate, isLoading } = useUpdateProfile();

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

    if (!password || !phoneNumbers.every((num) => num.trim() !== '')) {
      showToast('Please fill out all fields.', 'error');
      return;
    }

    const profileData = {
      phoneNumbers,
      password
    };

    mutate(profileData, {
      onSuccess: () => {
        showToast('Profile updated successfully!', 'success');
        setTimeout(() => navigate('/dashboard'), 2000);
      },
      onError: (error) => {
        showToast(`Error: ${error.message}`, 'error');
      },
    });

    console.log('Profile Data:', profileData);
  };

  return (
    <div className="container">
      <h3 className="mb-4">Edit Profile</h3>
      <form onSubmit={handleSubmit}>
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
            <FaPlus onClick={addPhoneNumber} className="fs-3 text-primary" />
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
              required
            />
          </div>
        </div>

        <div className="d-flex justify-content-end">
          <button
            type="submit"
            className="btn buttoncolor w-25"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ProfilePage;
