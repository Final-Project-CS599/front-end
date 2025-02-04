import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSearchByName, useSendMessage } from '../../../api/message';

const SendMessage = ({ onClose, role, onMessageSent }) => {
  const [receiverId, setReceiverId] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const { mutate: sendMessage, isLoading: isSending, isError, error } = useSendMessage();
  const { mutate: searchByName } = useSearchByName();

  const validationSchema = Yup.object({
    receiver: Yup.string()
      .required('Receiver is required')
      .min(2, 'Receiver name must be at least 2 characters'),
    content: Yup.string()
      .required('Message content is required')
      .min(10, 'Message must be at least 10 characters'),
  });

  const formik = useFormik({
    initialValues: {
      receiver: '',
      content: '',
    },
    validationSchema,
    onSubmit: (values) => {
      const newMessage = {
        m_message: values.content,
        role,
        reciever: receiverId,
      };

      sendMessage(newMessage, {
        onSuccess: () => {
          formik.resetForm();
          setReceiverId('');
          onMessageSent();
          onClose();
        },
      });
    },
  });

  const handleSearch = () => {
    if (!formik.values.receiver.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    searchByName(
      { role, name: formik.values.receiver },
      {
        onSuccess: (data) => {
          setSearchResults(data.data);
          setIsSearching(false);
        },
        onError: () => {
          setIsSearching(false);
        },
      }
    );
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [formik.values.receiver]);

  return (
    <div className="card shadow">
      <div className="card-header bg-primary text-white">
        <h5 className="card-title mb-0">Compose New Message</h5>
      </div>
      <div className="card-body">
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="receiver" className="form-label">
              Receiver
            </label>
            <input
              type="text"
              className={`form-control ${
                formik.touched.receiver && formik.errors.receiver ? 'is-invalid' : ''
              }`}
              id="receiver"
              placeholder="Enter receiver's name"
              {...formik.getFieldProps('receiver')}
            />
            {formik.touched.receiver && formik.errors.receiver ? (
              <div className="invalid-feedback">{formik.errors.receiver}</div>
            ) : null}

            {isSearching && <p>Searching...</p>}
            {!isSearching && searchResults.length > 0 && (
              <ul className="list-group mt-2">
                {searchResults.map((result) => (
                  <li
                    key={result.s_id || result.i_id}
                    className="list-group-item list-group-item-action p-2"
                    onClick={() => {
                      formik.setFieldValue('receiver', result.s_first_name || result.i_firstName);
                      setReceiverId(result.s_id || result.i_id);
                      setSearchResults([]);
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    {result.s_first_name || result.i_firstName}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="content" className="form-label">
              Message
            </label>
            <textarea
              className={`form-control ${
                formik.touched.content && formik.errors.content ? 'is-invalid' : ''
              }`}
              id="content"
              rows="5"
              placeholder="Type your message here..."
              {...formik.getFieldProps('content')}
            />
            {formik.touched.content && formik.errors.content ? (
              <div className="invalid-feedback">{formik.errors.content}</div>
            ) : null}
          </div>

          {isError && (
            <div className="alert alert-danger" role="alert">
              {error?.message || 'Failed to send message. Please try again.'}
            </div>
          )}

          <div className="d-flex justify-content-end gap-2">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-outline-purple" disabled={isSending}>
              {isSending ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendMessage;
