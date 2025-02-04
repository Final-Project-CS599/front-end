import React, { useContext, useState } from 'react';
import styles from './ForgetPassword.module.css';
import {  Formik, useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Bars } from  'react-loader-spinner';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { UserContext } from '../../../../Context/UserContext.jsx';



export default function ForgetPassword() { 
  let {setUserToken , setUserData} = useContext(UserContext);
  let navigate = useNavigate();
  const [error , setError]= useState(null);
  const [isLoading , setIsLoading] = useState(false);

    async function getForgetPassword(values){
      setIsLoading(true);
      let {data} = await axios.patch(`http://localhost:3000/api/v1/auth/forgotPassword` , values)
      .catch (
        (err)=> {
          setIsLoading(false);
          console.log("Error ", err);
          setError(err.response?.data?.message || 'An error occurred ');
          // setError(err)
        }
      )
      navigate('/ForgetPasswordVerifyCode');
    }

    let validateScheme =yup.object({
      email: yup.string().email('Email is invalid').required('Email is required'),
    })

    let formik = useFormik({
      initialValues :{
        email:'',
      }, validationSchema:validateScheme,  
      onSubmit:getForgetPassword 
    })

  return <> 
  <HelmetProvider>
    <Helmet>
      <meta name='description' content='' />
      <title>ForgetPassword</title>
    </Helmet>
    <div className=" container w-100 mx-auto py-5">
      <div className="row">
        <div className="col-md-12">
          <div className={styles.marginAuth}>
            {error!==null? <div className="alert alert-danger">{error}</div>:''}
            <form onSubmit={formik.handleSubmit}>
                <h1 className=' fw-bolder'>please enter your verification code</h1>
                <input type='email' placeholder="Email" id='email' onBlur={formik.handleBlur} onChange={formik.handleChange} className=' form-control' 
                      value={formik.values.email} name='email' autoComplete="username"
                />
                {formik.errors.email && formik.touched.email? <div className="alert alert-danger mt-2 p-2">{formik.errors.email}</div>:''}
                {isLoading? <button  type=' button' className='btn bg-main text-white mt-2'>
                    <Bars
                        height="20"
                        width="80"
                        color="white"
                        ariaLabel="bars-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                    />
                    </button> : <> 
                      <div className=' d-flex align-items-center'>
                      <button type='submit' className='btn buttoncolor shadow mt-3 px-3 py-3'>Verify</button>
                      </div>
                    </>
                }
            </form>
          </div>
        </div>
      </div>
    </div>
    </HelmetProvider>
  </>
}
