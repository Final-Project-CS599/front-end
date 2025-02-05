import React, { useContext, useState } from 'react';
import styles from './Login.module.css';
import {  Formik, useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Bars } from  'react-loader-spinner';
// import { Helmet } from 'react-helmet';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { UserContext } from '../../../../Context/UserContext.jsx';
import { FaRegEyeSlash , FaRegEye } from "react-icons/fa";


export default function Login() {
    let {setUserToken , setUserData} = useContext(UserContext); 
    
    let navigate = useNavigate();
    const [error , setError]= useState(null);
    const [isLoading , setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false)

    async function loginSubmit(values) {
        setIsLoading(true);
        try {
            let { data } = await axios.post(`http://localhost:3000/api/v1/auth/login?ln=en`, values);
    
            const token = data.token || data.data.token;
            if (!token) {
                throw new Error("Token not found in response");
            }
    
            localStorage.setItem('userToken', token);
            setUserToken(token);
    
            const userData = {
                fullName: data.fullName || data.data.fullName,
                role: data.role || data.data.role
            };
            setUserData(userData);


            localStorage.setItem('userData', JSON.stringify(userData));

            if (userData.role === "admin" || userData.role === "sAdmin") {
                navigate("/admin/home");
            } 
            else if (userData.role === "instructor") {
                navigate("/instructor/courses/mycourses");
            }
            else if (userData.role === "student" || userData.role === "user") {
                navigate("/student/home");
            } 
    
        } catch (err) {
            setIsLoading(false);
            setError(err.response?.data?.message || 'An error occurred');
        }
    }

    
    let validateScheme =yup.object({
        email: yup.string().email('Email is invalid').required('Email is required'),
        password: yup.string().matches(/^(?=.*\d)(?=.*[a-zA-Z]?)[a-zA-Z0-9@#$%^&*-_]{8,}$/, 'password (example: 12345678 , A.s12345 , a1234567)').required('Password is required'),
    });
    let formik = useFormik({
        initialValues :{
            email:'',
            password:'',
        }, validationSchema:validateScheme,  
        onSubmit:loginSubmit 
    });

return <>
<HelmetProvider>
    <Helmet>
        <meta name='description' content='' />
        <title>Login</title>
    </Helmet>
    <div className=" container w-100 mx-auto py-5">
        <div className="row">
            <div className="col-md-12">
                <div className={styles.marginAuth}>
                    {error!==null? <div className="alert alert-danger">{error}</div>:''}
                    <h3 className=' pb-5'>Login Now</h3>
                    <form onSubmit={formik.handleSubmit}>
                        
                        <label htmlFor="email">Email :</label>
                        <input type='email' id='email' placeholder="Email" onBlur={formik.handleBlur} 
                            onChange={formik.handleChange} className=' form-control' 
                            value={formik.values.email} name='email'  autoComplete="username"
                        />
                        {formik.errors.email && formik.touched.email? <div className="alert alert-danger mt-2 p-2">{formik.errors.email}</div>:''}
                        
                        <label htmlFor="password" className='pt-3'>Password :</label>
                        <div className="input-group">
                            <input type={showPassword? 'text' : 'password' } id='password' placeholder="Password" 
                                onBlur={formik.handleBlur} onChange={formik.handleChange} className=' form-control' 
                                value={formik.values.password} name='password' autoComplete="new-password"
                            />
                            <span className="input-group-text" onClick={() => setShowPassword(!showPassword)} style={{ cursor: 'pointer' }}>
                                {showPassword? <FaRegEye /> : <FaRegEyeSlash />}
                            </span>
                        </div>
                        {formik.errors.password && formik.touched.password?<div className="alert alert-danger mt-2 p-2 ">{formik.errors.password}</div>:''}
                        
                        <div className=' d-flex justify-content-between align-items-center pt-5'>
                            <div >
                                <Link to={'/forgetPassword'} className='fw-bold fs-5 h5 ' style={{ color:"#7F55E0"}}>Forget Your Password ?</Link>
                            </div>
                        
                            {isLoading? <button  type='button' className='btn bg-main text-white mt-2 '>
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
                                    <div className='  '>
                                        <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn buttoncolor shadow  px-4'>Login</button>
                                    </div>
                                </>
                            }
                        </div>
                    </form>
                </div>
            </div>
        <div>

        </div>
    </div>
    </div>
</HelmetProvider>
</>
}
