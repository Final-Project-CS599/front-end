import React, { useState } from 'react';
import {  Formik, useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Audio } from  'react-loader-spinner';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';


export default function RegisterStudents() {
    let navigate = useNavigate();
    const [error , setError]= useState(null);
    const [isLoading , setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    async function RegisterSubmit(values){
        setIsLoading(true);
        try {
            let { data } = await axios.post(`http://localhost:3000/api/v1/auth/addUser/addStudent?ln=en`, values);
            navigate('/admin/home');  // path to redirect

        } catch (err) {
            setIsLoading(false);
            console.log("Error ", err);
            setError(err.response.data.message || 'An error occurred');
        }
    
    };

    let phoneRegExp = /^(002|\+2)?01[0125][0-9]{8}$/
    let validateScheme =yup.object({
        admin_nationalID:  yup.string().matches(/^[0-9]{14}$/ , 'National ID is invalid (example: 01234567890123)').required('National ID is required'),
        firstName: yup.string().min(2 , 'Name minlength is 2').max(100 , 'Name maxlength is 100').required('Name is required'),
        lastName: yup.string().min(2 , 'lastName minlength is 2').max(100 , 'lastName maxlength is 100').required('lastName is required'),
        middleName: yup.string().min(2 , 'middleName minlength is 2').max(100 , 'middleName maxlength is 100').required('middleName is required'),
        email: yup.string().email('Email is invalid').required('Email is required'),
        phone1: yup.string().matches(phoneRegExp, 'Phone number is invalid ex: (+201234567810 , 00201234567810 , 01234567810)').required('At least one phone number is required'),
        phone2: yup.string().matches(phoneRegExp, 'Phone number is invalid ex: (+201234567810 , 00201234567810 , 01234567810)').optional(),
        numberNational: yup.string().matches(/^[0-9]{14}$/ , 'numberNational ID is invalid (example: 01234567890123)').required('numberNational ID is required'),
        department: yup.string().min(1, 'department minlength is 1').max(100 , 'department maxlength is 100').required('department is required'),
        gander: yup.string().oneOf(['Male', 'Female'], 'Gender must be either Male or Female').default('Female').required('Gander is required'),
        DOB: yup.string().max(new Date(), 'Date of Birth must be less than today').required('Date of Birth is required'),
        password: yup.string().oneOf([yup.ref("numberNational")], 'numberNational and Password must match').required('Password is required'),
        
    });

    let formik = useFormik({
        initialValues :{
            admin_nationalID:'',
            firstName:'',
            lastName:'',
            middleName:'',
            email:'',
            phone1: '',
            phone2: '',
            numberNational:'',
            department:'',
            gander:'',
            DOB:'',
            password:'',
        }, validationSchema:validateScheme,  
        onSubmit:RegisterSubmit
    });

return <>
<HelmetProvider>
    <Helmet>
        <meta name='description' content='' />
        <title>Add Student</title>
    </Helmet>

    <div className="w-75 mx-auto py-5">
        {error!==null? <div className="alert alert-danger">{error}</div>:''}

        <h3 className='pb-4'>Add Student </h3>
        <form onSubmit={formik.handleSubmit}>

            <label htmlFor='admin_nationalID' className=' pt-3'>Admin_NationalID <span className='text-danger'>*</span> :</label>
            <input type='text' id='admin_nationalID' onBlur={formik.handleBlur} onChange={formik.handleChange} className=' form-control' value={formik.values.admin_nationalID} name='admin_nationalID'/>
            {formik.errors.admin_nationalID && formik.touched.admin_nationalID? <div className="alert alert-danger mt-2 p-2">{formik.errors.admin_nationalID}</div>:''}

            <label htmlFor="firstName" className=' pt-3' >First Name <span className='text-danger'>*</span> :</label>
            <input type='text' id='firstName' onBlur={formik.handleBlur} onChange={formik.handleChange} className=' form-control' value={formik.values.firstName} name='firstName'/>
            {formik.errors.firstName && formik.touched.firstName?<div className="alert alert-danger mt-2 p-2 ">{formik.errors.firstName}</div>:''}
            
            <label htmlFor="middleName" className=' pt-3'>Middle Name <span className='text-danger'>*</span> :</label>
            <input type='text' id='middleName' onBlur={formik.handleBlur} onChange={formik.handleChange} className=' form-control' value={formik.values.middleName} name='middleName'/>
            {formik.errors.middleName && formik.touched.middleName?<div className="alert alert-danger mt-2 p-2 ">{formik.errors.middleName}</div>:''}
            
            <label htmlFor="lastName" className=' pt-3'>Last Name <span className='text-danger'>*</span> :</label>
            <input type='text' id='lastName' onBlur={formik.handleBlur} onChange={formik.handleChange} className=' form-control' value={formik.values.lastName} name='lastName'/>
            {formik.errors.lastName && formik.touched.lastName?<div className="alert alert-danger mt-2 p-2 ">{formik.errors.lastName}</div>:''}
            
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
            
            
            <label htmlFor="numberNational" className=' pt-3'>Number National <span className='text-danger'>*</span> :</label>
            <input type='text' id="numberNational" onBlur={formik.handleBlur} onChange={formik.handleChange} className=' form-control' value={formik.values.numberNational} name="numberNational"/>
            {formik.errors.numberNational && formik.touched.numberNational? <div className="alert alert-danger mt-2 p-2">{formik.errors.numberNational}</div>:''}
            
            
            <label htmlFor="department" className=' pt-3'>Department <span className='text-danger'>*</span> :</label>
            <select  name="department"  id="department"  className="form-select mt-2"  aria-label="Default select example" value={formik.values.department}  onChange={formik.handleChange}  onBlur={formik.handleBlur}>
                <option value="">Open this select department</option>
                <option value="Statistical Methods">Statistical Methods</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Information Systems">Information Systems</option>
                <option value="Mathematical Methods">Mathematical Methods</option>
                <option value="Operation Research">Operation Research</option>
            </select>
            {formik.errors.department && formik.touched.department ? <div className="alert alert-danger mt-2 p-2">{formik.errors.department}</div>:''}


            <label htmlFor="gander" className=' pt-3'>Select Gender :</label>
            <select  className="form-select mt-3" aria-label="Default select example" name="gander" value={formik.values.gander} onChange={formik.handleChange}  onBlur={formik.handleBlur} >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
            {formik.errors.gander && formik.touched.gander ? <div className="alert alert-danger mt-2">{formik.errors.gander}</div>: ''}


            <label htmlFor="DOB" className=' pt-3 pb-2'>Date_Pith : </label>
            <input type='date' id='DOB' onBlur={formik.handleBlur} onChange={formik.handleChange} className=' form-control' value={formik.values.DOB} name='DOB'/>
            {formik.errors.DOB && formik.touched.DOB? <div className="alert alert-danger mt-2 p-2">{formik.errors.DOB}</div>:''}
            

            <label htmlFor="password" className=' pt-3'>Password (Number National NID User) <span className='text-danger'>*</span> :</label>
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
                </button> :<button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn buttoncolor shadow  mt-2 mt-4'>Add Student</button>
            }
        </form>
    </div>
</HelmetProvider>
</>
};
