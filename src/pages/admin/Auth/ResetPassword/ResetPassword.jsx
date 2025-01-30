import React, { useContext, useState } from 'react';
import styles from './ResetPassword.module.css';
import {  Formik, useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Bars } from  'react-loader-spinner';
import { Helmet } from 'react-helmet';
import { UserContext } from './../../../../Context/UserContext';


export default function ResetPassword() {
  let {strUserToken , setUserData} = useContext(UserContext); 
  let navigate = useNavigate();
  const [error , setError]= useState(null);
  const [isLoading , setIsLoading] = useState(false);

    async function getResetPassword(values){
        setIsLoading(true);
        let {data} = await axios.patch(`http://localhost:3000/auth/resetPassword` , values)
        .catch (
          (err)=> {
            setIsLoading(false);
            setError(err.response?.data?.message);
          }
        )
        navigate('/login');
    }

    let validateScheme =yup.object({
      email: yup.string().email('Email is invalid').required('Email is required'),
      newPassword: yup.string().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[^a-zA-Z]).{8,}$/ , 'Password start with uppercase').required('Password is required'),
      confirmPassword: yup.string().oneOf([yup.ref('newPassword')] , 'newPassword not match confirmPassword').required('confirmPassword is required')
    })

    let formik = useFormik({
      initialValues :{
        email:'',
        newPassword:'',
        confirmPassword:'',
      }, validationSchema:validateScheme,  
      onSubmit:getResetPassword 
    })

  return <>
    <Helmet>
        <meta name='description' content='' />
        <title>ResetPassword</title>
    </Helmet>
    <div className=" container w-100 mx-auto py-5">
      <div className="row">
        <div className="col-md-12">
          <div className={styles.marginAuth}>
            {error!==null? <div className="alert alert-danger">{error}</div>:''}

            <form onSubmit={formik.handleSubmit}>

              <label htmlFor="email" className=' my-3'>Email :</label>
              <input type='email' id='email' onBlur={formik.handleBlur} onChange={formik.handleChange} className=' form-control' 
                  value={formik.values.email} name='email' autoComplete="username"
              />
              {formik.errors.email && formik.touched.email? <div className="alert alert-danger mt-2 p-2">{formik.errors.email}</div>:''}
              
              {/* <label htmlFor="newPassword" className=' my-3'>newPassword :</label>
              <input type='password' id='newPassword' onBlur={formik.handleBlur} onChange={formik.handleChange} className=' form-control' value={formik.values.newPassword} name='newPassword'/>
              {formik.errors.newPassword && formik.touched.newPassword?<div className="alert alert-danger mt-2 p-2 ">{formik.errors.newPassword}</div>:''}
              
              <label htmlFor="confirmPassword" className=' my-3'>confirmPassword :</label>
              <input type='password' id='confirmPassword' onBlur={formik.handleBlur} onChange={formik.handleChange} className=' form-control' value={formik.values.confirmPassword} name='confirmPassword'/>
              {formik.errors.confirmPassword && formik.touched.confirmPassword?<div className="alert alert-danger mt-2 p-2 ">{formik.errors.confirmPassword}</div>:''} */}

              <label htmlFor="newPassword" className='my-3'>newPassword :</label>
              <input type='password' id='newPassword' onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control' 
                    value={formik.values.newPassword} name='newPassword' autoComplete="new-password"
              />
              {formik.errors.newPassword && formik.touched.newPassword ? <div className="alert alert-danger mt-2 p-2">{formik.errors.newPassword}</div> : ''}

              <label htmlFor="confirmPassword" className='my-3'>confirmPassword :</label>
              <input type='password' id='confirmPassword' onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control' 
                    value={formik.values.confirmPassword} name='confirmPassword' autoComplete="new-password" // تجنب تحذيرات console ومش بيظهر اى قيم متخزية فى chrome

              />
              {formik.errors.confirmPassword && formik.touched.confirmPassword ? <div className="alert alert-danger mt-2 p-2">{formik.errors.confirmPassword}</div> : ''}


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
                          <button type='submit' className='btn buttoncolor shadow mt-3 px-3 py-3'>Get Password</button>
                      </div>
                  </>
                }
            </form>
          </div>
        </div>
      </div>
    </div>
  </>
}
