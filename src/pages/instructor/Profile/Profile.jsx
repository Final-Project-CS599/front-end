import { useState, useEffect } from 'react';
import axios from 'axios';

function ProfilePage() {
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    // specialization: '',
    profilePicture: '',
    id: '' // أضف `id` هنا إذا كان مطلوبًا
   ,onSubmit:(values)=>{
        console.log(values);
        
   }
  });
  const [isEditing, setIsEditing] = useState(false);
  const [newProfileData, setNewProfileData] = useState({ ...profileData });
  const [newImage, setNewImage] = useState(null);
  const id = profileData.id;
  useEffect(() => {
    axios.get(`http://localhost:3000/profile/view-profile/${id}`)
      .then(response => {
        setProfileData(response.data);
        setNewProfileData(response.data);
      })
      .catch(error => console.log(error));
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProfileData({
      ...newProfileData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  const handleSave = () => {
    const formData = new FormData();
    formData.append('name', newProfileData.name);
    formData.append('email', newProfileData.email);
    // formData.append('specialization', newProfileData.specialization);
    if (newImage) {
      formData.append('profilePicture', newImage);
    }

    const id = profileData.id; // تأكد من وجود `id`
    const token = localStorage.getItem('token'); // أو اجلب التوكن من مصدر آخر

    axios.put(`http://localhost:3000/profile/update-profile/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}` // إذا كان التوكن مطلوبًا
      }
    })
      .then(response => {
        setProfileData(newProfileData);
        setIsEditing(false);
        alert('Profile updated successfully');
      })
      .catch(error => {
        console.error('Error updating profile', error.response?.data || error.message);
        alert('Failed to update profile. Please try again.');
      });
  };

  return (
    <div className="container mt-2">
      <h2>{isEditing ? 'Edit Profile' : 'My Profile'}</h2>
      <div className="row">
        <div className="col-lg-2">
          <img
            src={profileData.profilePicture || 'default-profile.jpg'}
            alt="Profile"
            className="img-fluid rounded-circle"
            style={{ width: '150px', height: '150px' }}
          />
          {isEditing && (
            <input type="file" onChange={handleImageChange} className="form-control mt-3" />
          )}
        </div>
        <div className="col-lg-8">
          <div className="mb-3">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={newProfileData.name}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={newProfileData.email}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="form-control"
            />
          </div>

          {/* <div className="mb-3">
            <label>Specialization</label>
            <input
              type="text"
              name="specialization"
              value={newProfileData.specialization}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="form-control"
            />
          </div> */}

          {isEditing ? (
            <button onClick={handleSave} className="btn btn-primary">Save</button>
          ) : (
            <button onClick={() => setIsEditing(true)} className="btn btn-secondary">Edit</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
