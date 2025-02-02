import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Bars } from 'react-loader-spinner';
import { HelmetProvider } from 'react-helmet-async';
import { Helmet } from 'react-helmet';

export default function ConfirmEmail() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const confirmEmail = async () => {
      setIsLoading(true);

      // استخراج الـ token من الـ URL
      const searchParams = new URLSearchParams(window.location.search);
      const token = searchParams.get('token');

      const storedToken = localStorage.getItem('userToken');
      if (!token && !storedToken) {
        setError('Token is missing');
        setIsLoading(false);
        return;
      }

      // تستخدم الـ token من الـ URL أو localStorage
      const finalToken = token || storedToken;

      try {
        // بيتخزين الـ token في localStorage إذا كان موجودًا في الـ URL
        if (token) {
          localStorage.setItem('userToken', token);
        }
        // إزالة الـ token من الـ URL
        window.history.replaceState({}, document.title, '/confirmEmail');

        const { data } = await axios.post(
          `http://localhost:3000/api/v1/auth/confirmEmail`,
          {},
          {
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
              Authorization: finalToken,
            },
          }
        );
        navigate('/login', { replace: true });
      } catch (err) {
        setIsLoading(false);
        console.log('Error ', err);
        setError(err.response?.data?.message || 'An error occurred');
      }
    };

    confirmEmail();
  }, [navigate]);

  const handleGoToLogin = () => {
    navigate('/login', { replace: true });
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <meta name="description" content="" />
          <title>ConfirmEmail</title>
        </Helmet>
        <div className=" container w-100 mx-auto py-5">
          <div className="row">
            <div className="col-md-12">
              <div className=" d-flex justify-content-center">
                <h1> Check Your Email For The Confirmation</h1>
              </div>
            </div>
            <div className="col-md-12">
              <div className=" d-flex justify-content-center">
                {isLoading ? (
                  <button type=" buttom" className="btn bg-main text-white mt-2">
                    <Bars
                      height="20"
                      width="80"
                      color="white"
                      ariaLabel="bars-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                    />
                  </button>
                ) : (
                  <>
                    <div className="d-flex align-items-center">
                      <button
                        onClick={handleGoToLogin}
                        disabled={isLoading}
                        className="btn buttoncolor shadow px-4 py-2 mt-4"
                      >
                        Go To Login
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
      </HelmetProvider>
    </>
  );
}
