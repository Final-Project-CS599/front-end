import React, { useContext, useState } from 'react';
import styles from './ForgetPasswordDetalis.module.css';
import {  Formik, useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Bars } from  'react-loader-spinner';
import { HelmetProvider, Helmet } from 'react-helmet-async';



export default function ForgetPasswordDetalis() {
  let navigate = useNavigate();
  const [error , setError]= useState(null);
  const [isLoading , setIsLoading] = useState(false);

  // axios.defaults.withCredentials = true;
  
    async function verifyResetCode(values){
      setIsLoading(true);
      setError(null); 
      try {
        let {data} = await axios.patch(`http://localhost:3000/auth/verifyCode`, values 
        );
      console.log("Verification code is valid:", data);
        navigate('/ResetPassword');

    }catch (err) {
      setIsLoading(false);
      if (err.response) {
          setError(err.response.data.message || "An error occurred");
      } else if (err.request) {
          setError("Network error. Please check your connection.");
      } else {
          setError("An unexpected error occurred.");
      }

      console.log("Error:", err);
  }
      // }catch (err){
      //     setIsLoading(false);
      //     console.log("Error ", err);
      //     setError(err.response?.data?.message  || "An error occurred");
      // }
    }

      // let {data} = await axios.post(`http://localhost:3000/auth/verifyCode` , values)
      // .catch (
      //   (err)=> {
      //     setIsLoading(false);
      //     console.log(err);
      //     setError(err.response.data.message);
      //   }
      // )
      // navigate('/ResetPassword');

  let validateScheme =yup.object({
    email: yup.string().email('Email is invalid').required('Email is required'),
    code: yup.string().matches(/^[A-Za-z0-9\-+_$!%*#?&]{6}$/ , 'number start with uppercase').required('number is required'),
  })

  let formik = useFormik({
    initialValues :{
      code:'',
    }, validationSchema:validateScheme,  
    onSubmit:verifyResetCode 
  })

return <>
<HelmetProvider>
    <Helmet>
        <meta name='description' content='' />
        <title>verifyResetCode</title>
    </Helmet>
    <div className=" container w-100 mx-auto py-5">
      <div className="row">
        <div className="col-md-12">
          <div className={styles.marginAuth}>
            {error!==null? <div className="alert alert-danger">{error}</div>:''}

            <form onSubmit={formik.handleSubmit}>

                <input type='email' placeholder="Email" id='email' onBlur={formik.handleBlur} onChange={formik.handleChange} className=' form-control' 
                    value={formik.values.email} name='email'
                />
                {formik.errors.email && formik.touched.email? <div className="alert alert-danger mt-2 p-2">{formik.errors.email}</div>:''}

                <input type='code' placeholder="Number of Code" id='code' onBlur={formik.handleBlur} onChange={formik.handleChange} className=' form-control mt-4' value={formik.values.code} name='code'/>
                {formik.errors.code && formik.touched.code?<div className="alert alert-danger mt-2 p-2 ">{formik.errors.code}</div>:''}
                        
                {isLoading? <button  type=' buttom' className='btn bg-main text-white mt-2'>
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
                        <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn buttoncolor shadow  px-4 py-2 mt-4'>Verify</button>
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
};