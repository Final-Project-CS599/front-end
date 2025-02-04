import React from 'react';
import { IoChevronBackSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useSendHelpDeskMessage } from '../../../api/student/HelpDesk';
import { showToast } from '../../../utils/toast';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Send = () => {
  const navigate = useNavigate();
  const { mutate: sendMessage, isPending } = useSendHelpDeskMessage();

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(3, 'Title must be at least 3 characters long.')
      .required('Title is required.'),
    email: Yup.string().email('Please enter a valid email address.').required('Email is required.'),
    description: Yup.string()
      .min(10, 'Message must be at least 10 characters long.')
      .required('Message is required.'),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      title: '',
      email: '',
      description: '',
    },
    validationSchema,
    onSubmit: (values) => {
      sendMessage(values, {
        onSuccess: () => {
          showToast('Message sent successfully!');
          navigate('/student/helpdesk');
        },
      });
    },
  });

  return (
    <>
      <div>
        <div className="d-flex gap-5 align-items-center mb-4">
          <IoChevronBackSharp cursor={'pointer'} onClick={() => navigate(-1)} />
          <h3>Send Help Desk Message</h3>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            className={`form-control w-50 mt-4 ${
              formik.touched.title && formik.errors.title ? 'is-invalid' : ''
            }`}
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.title && formik.errors.title && (
            <div className="invalid-feedback">{formik.errors.title}</div>
          )}

          <input
            type="email"
            placeholder="Email"
            className={`form-control w-50 mt-4 ${
              formik.touched.email && formik.errors.email ? 'is-invalid' : ''
            }`}
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="invalid-feedback">{formik.errors.email}</div>
          )}

          <div className="form-floating">
            <textarea
              className={`form-control w-50 mt-4 ${
                formik.touched.description && formik.errors.description ? 'is-invalid' : ''
              }`}
              placeholder="Description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={{ height: '200px' }}
            />
            <label htmlFor="floatingTextarea">Your Message</label>
            {formik.touched.description && formik.errors.description && (
              <div className="invalid-feedback">{formik.errors.description}</div>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-outline-purple mt-4 w-25"
            disabled={isPending || !formik.isValid}
          >
            {isPending ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Send;
