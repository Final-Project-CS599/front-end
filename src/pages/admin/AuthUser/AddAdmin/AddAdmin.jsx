import React, { useState } from 'react';
import Style from './AddAdmin.module.css';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Formik, useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { Audio } from  'react-loader-spinner';


export default function AddAdmin() {

    let navigate = useNavigate();
    const [error , setError]= useState(null);
    const [isLoading , setIsLoading] = useState(false);

    async function RegisterSubmit(values){
        setIsLoading(true);
        try {
            let { data } = await axios.post(`http://localhost:3000/api/v1/auth/addUser/insertAddAdmin?ln=en`, values);
            navigate('/admin/home');    // path to redirect

        } catch (err) {
            setIsLoading(false);
            console.log("Error ", err);
            setError(err.response.data.message || 'An error occurred');
        }
    };

    let phoneRegExp = /^(002|\+2)?01[0125][0-9]{8}$/
    
    let validateScheme = yup.object({
        adminNationalID: yup.string().matches(/^[0-9]{14}$/, 'AdminNational ID is invalid (example: 01234567890123)').required('AdminNational ID is required'),
        firstName: yup.string().min(2, 'Name minlength is 2').max(100, 'Name maxlength is 100').required('Name is required'),
        lastName: yup.string().min(2, 'lastName minlength is 2').max(100, 'lastName maxlength is 100').required('lastName is required'),
        sAdminNationalID: yup.string().matches(/^[0-9]{14,}$/, 'AdminNational ID is invalid (example: 01234567890123)').required('AdminNational ID is required'),
        email: yup.string().email('Email is invalid').required('Email is required'),
        phone1: yup.string().matches(phoneRegExp, 'Phone number is invalid ex: (+201234567810 , 00201234567810 , 01234567810)').required('At least one phone number is required'),
        phone2: yup.string().matches(phoneRegExp, 'Phone number is invalid ex: (+201234567810 , 00201234567810 , 01234567810)').notRequired(),
        adminRole: yup.string().min(1, 'Name minlength is 2').max(100, 'Name maxlength is 100').required('adminRole is required'),
        password: yup.string().matches(/^[0-9]{14,}$/, 'Password National ID 14 digits (example: 12345678910145) ').required('Password is required'),
        confirmPassword: yup.string().oneOf([yup.ref("password")], 'Password and confirmPassword must match').required('RePassword is required')
    });

    let formik = useFormik({
        initialValues: {
            adminNationalID: '',
            firstName: '',
            lastName: '',
            sAdminNationalID: '',
            email: '',
            phone1: '',
            phone2: '',
            adminRole: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: validateScheme,
        onSubmit: RegisterSubmit
    });

return <>
    <HelmetProvider>
        <Helmet>
            <meta name='description' content='' />
            <title>Add Admin</title>
        </Helmet>
        <div className="w-75 mx-auto py-5">
            {error!==null? <div className="alert alert-danger">{error}</div>:''}

            <h3 className='pb-4'>Add Admin </h3>
            <form onSubmit={formik.handleSubmit}>

                <label htmlFor='adminNationalID' className=' pt-3'>Admin_NationalID <span className='text-danger'>*</span> :</label>
                <input type='text' id='adminNationalID' onBlur={formik.handleBlur} onChange={formik.handleChange} className=' form-control' value={formik.values.adminNationalID} name='adminNationalID'/>
                {formik.errors.adminNationalID && formik.touched.adminNationalID? <div className="alert alert-danger mt-2 p-2">{formik.errors.adminNationalID}</div>:''}


                <label htmlFor="firstName" className=' pt-3' >First Name <span className='text-danger'>*</span> :</label>
                <input type='text' id='firstName' onBlur={formik.handleBlur} onChange={formik.handleChange} className=' form-control' value={formik.values.firstName} name='firstName'/>
                {formik.errors.firstName && formik.touched.firstName?<div className="alert alert-danger mt-2 p-2 ">{formik.errors.firstName}</div>:''}

                <label htmlFor="lastName" className=' pt-3'>Last Name <span className='text-danger'>*</span> :</label>
                <input type='text' id='lastName' onBlur={formik.handleBlur} onChange={formik.handleChange} className=' form-control' value={formik.values.lastName} name='lastName'/>
                {formik.errors.lastName && formik.touched.lastName?<div className="alert alert-danger mt-2 p-2 ">{formik.errors.lastName}</div>:''}
                
                <label htmlFor='sAdminNationalID' className=' pt-3'>Super Admin_NationalID <span className='text-danger'>*</span> :</label>
                <input type='text' id='sAdminNationalID' onBlur={formik.handleBlur} onChange={formik.handleChange} className=' form-control' value={formik.values.sAdminNationalID} name='sAdminNationalID'/>
                {formik.errors.sAdminNationalID && formik.touched.sAdminNationalID? <div className="alert alert-danger mt-2 p-2">{formik.errors.sAdminNationalID}</div>:''}

                <label htmlFor="email" className=' pt-3'>Email <span className='text-danger'>*</span> :</label>
                <input type='email' id='email' onBlur={formik.handleBlur} onChange={formik.handleChange} className=' form-control' 
                    value={formik.values.email} name='email' autoComplete="username"
                />
                {formik.errors.email && formik.touched.email? <div className="alert alert-danger mt-3 p-2">{formik.errors.email}</div>:''}
                
                
                <label htmlFor="phone1" className=' pt-3'>Phone1 <span className='text-danger'>*</span> :</label>
                <input type='tel' id='phone1' onBlur={formik.handleBlur} onChange={formik.handleChange} className=' form-control' value={formik.values.phone1} name='phone1'/>
                {formik.errors.phone1 && formik.touched.phone1? <div className="alert alert-danger mt-2 p-2">{formik.errors.phone1}</div>:''}
                
                <label htmlFor="phone2" className=' pt-3'>Phone2 : </label>
                <input type='tel' id='phone2' onBlur={formik.handleBlur} onChange={formik.handleChange} className=' form-control' value={formik.values.phone2} name='phone2'/>
                {/* {formik.errors.phone2 && formik.touched.phone2? <div className="alert alert-danger mt-2 p-2">{formik.errors.phone2}</div>:''} */}
                
                <label htmlFor='adminRole' className=' pt-3'> Admin Role <span className='text-danger'>*</span> :</label>
                <input type='text' id='adminRole' onBlur={formik.handleBlur} onChange={formik.handleChange} className=' form-control' value={formik.values.adminRole} name='adminRole'/>
                {formik.errors.adminRole && formik.touched.adminRole? <div className="alert alert-danger mt-2 p-2">{formik.errors.adminRole}</div>:''}


                <label htmlFor="password" className=' pt-3'>Password (NID) <span className='text-danger'>*</span> :</label>
                <input type='password' id='password' onBlur={formik.handleBlur} onChange={formik.handleChange} className=' form-control' 
                    value={formik.values.password} name='password' autoComplete="new-password"
                />
                {formik.errors.password && formik.touched.password?<div className="alert alert-danger mt-2 p-2 ">{formik.errors.password}</div>:''}
                

                <label htmlFor="confirmPassword" className=' pt-3'> confirm-Password (NID) <span className='text-danger'>*</span> :</label>
                <input type='password' id='confirmPassword' onBlur={formik.handleBlur} onChange={formik.handleChange} className=' form-control' 
                        value={formik.values.confirmPassword} name='confirmPassword'  autoComplete="new-password"
                />
                {formik.errors.confirmPassword && formik.touched.confirmPassword?<div className="alert alert-danger mt-2 p-2 ">{formik.errors.confirmPassword}</div>:''}
                
                {isLoading? <button  type=' buttom' className='btn bg-main text-white mt-2'>
                        <Audio
                            height="20"
                            width="80"
                            color="white"
                            ariaLabel="audio-loading"
                            wrapperStyle={{}}
                            wrapperClass="wrapper-class"
                            visible={true}
                        />
                        </button> :<button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn buttoncolor shadow  mt-2 mt-4'>Add Admin</button>
                }
            </form>
        </div>
    </HelmetProvider>
</>
};


