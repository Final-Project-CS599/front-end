import { useFormik } from 'formik';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import * as Yup from 'yup';
import { useGetProfile, useUpdateProfile } from '../../api/student/EditProfile';
import { showToast } from '../../utils/toast';

const Profile = () => {
  const { mutate, isLoading } = useUpdateProfile();
  const { data } = useGetProfile();

  // Validation schema using Yup
  const validationSchema = Yup.object({
    primaryPhoneNumber: Yup.string()
      .required('Primary phone number is required')
      .matches(/^[0-9]+$/, 'Must be only digits')
      .min(10, 'Must be exactly 10 digits')
      .max(11, 'Must be exactly 11 digits'),
    secondaryPhoneNumber: Yup.string()
      .matches(/^[0-9]+$/, 'Must be only digits')
      .min(10, 'Must be exactly 10 digits')
      .max(11, 'Must be exactly 11 digits'),
    password: Yup.string().min(8, 'Password must be at least 8 characters'),
    birthDate: Yup.date().required('Birth date is required'),
    gender: Yup.string().required('Gender is required'),
  });

  // Formik hook
  const formik = useFormik({
    initialValues: {
      primaryPhoneNumber: '',
      secondaryPhoneNumber: '',
      password: '',
      birthDate: '',
      gender: 'Male',
    },
    validationSchema,
    onSubmit: (values) => {
      const profileData = {
        secondaryPhone: values.secondaryPhoneNumber,
        primaryPhone: values.primaryPhoneNumber,
        password: values.password,
        birthDate: values.birthDate,
        gender: values.gender,
      };

      mutate(profileData, {
        onSuccess: () => {
          showToast('Profile updated successfully!', 'success');
        },
        onError: (error) => {
          showToast(`Error: ${error.message}`, 'error');
        },
      });
    },
  });

  // Effect to populate form fields with fetched student data
  useEffect(() => {
    if (data?.data?.studentData) {
      const studentData = data.data.studentData;

      // Set phone numbers
      if (studentData.phoneNumbers && studentData.phoneNumbers.length > 0) {
        formik.setFieldValue('primaryPhoneNumber', studentData.phoneNumbers[0] || '');
        formik.setFieldValue('secondaryPhoneNumber', studentData.phoneNumbers[1] || '');
      }

      // Set other fields
      formik.setFieldValue('birthDate', studentData.dateOfBirth || '');
      formik.setFieldValue('gender', studentData.gender || 'Male');
    }
  }, [data]);

  // Function to determine if a field has an error and has been touched
  const isFieldInvalid = (fieldName) => {
    return formik.touched[fieldName] && formik.errors[fieldName];
  };

  return (
    <div className="container">
      <h3 className="mb-4">Edit Profile</h3>
      <form onSubmit={formik.handleSubmit}>
        {/* Primary Phone Number */}
        <div className="d-flex justify-content-evenly gap-3">
          <div className="mb-3 w-50">
            <label className="form-label">Primary Phone Number</label>
            <input
              type="text"
              className={`form-control ${isFieldInvalid('primaryPhoneNumber') ? 'is-invalid' : ''}`}
              placeholder="Enter primary phone number"
              name="primaryPhoneNumber"
              value={formik.values.primaryPhoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {isFieldInvalid('primaryPhoneNumber') && (
              <div className="invalid-feedback">{formik.errors.primaryPhoneNumber}</div>
            )}
          </div>

          {/* Secondary Phone Number */}
          <div className="mb-3 w-50">
            <label className="form-label">Secondary Phone Number</label>
            <input
              type="text"
              className={`form-control ${isFieldInvalid('secondaryPhoneNumber') ? 'is-invalid' : ''}`}
              placeholder="Enter secondary phone number"
              name="secondaryPhoneNumber"
              value={formik.values.secondaryPhoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {isFieldInvalid('secondaryPhoneNumber') && (
              <div className="invalid-feedback">{formik.errors.secondaryPhoneNumber}</div>
            )}
          </div>
        </div>

        {/* Password and Birth Date */}
        <div className="row my-5">
          <div className="col-md-6">
            <label className="form-label">Password</label>
            <input
              type="password"
              className={`form-control ${isFieldInvalid('password') ? 'is-invalid' : ''}`}
              placeholder="Enter new password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {isFieldInvalid('password') && (
              <div className="invalid-feedback">{formik.errors.password}</div>
            )}
          </div>
          <div className="col-md-6">
            <label className="form-label">Birth Date</label>
            <input
              type="date"
              className={`form-control ${isFieldInvalid('birthDate') ? 'is-invalid' : ''}`}
              name="birthDate"
              value={formik.values.birthDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {isFieldInvalid('birthDate') && (
              <div className="invalid-feedback">{formik.errors.birthDate}</div>
            )}
          </div>
        </div>

        {/* Gender */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Gender</label>
            <select
              className={`form-select ${isFieldInvalid('gender') ? 'is-invalid' : ''}`}
              name="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            {isFieldInvalid('gender') && (
              <div className="invalid-feedback">{formik.errors.gender}</div>
            )}
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
