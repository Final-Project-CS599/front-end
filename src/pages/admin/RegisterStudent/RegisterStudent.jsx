import React, { useState } from 'react';
import {  Formik, useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Audio } from  'react-loader-spinner';
import { HelmetProvider, Helmet } from 'react-helmet-async';

export default function RegisterStudents() {
    let navigate = useNavigate();
    const [error , seterror]= useState(null);
    const [isLoading , setisLoading] = useState(false);
    async function RegisterSubmit(values){
        setisLoading(true);
        let {data} = await axios.post(`https:` , values).catch(
            (err)=> {
            setisLoading(false);
            seterror(err)
            }
        )
        // navigate('/l'); // path to redirect
    };

    let phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/ 
    let validateScheme =yup.object({
        name: yup.string().min(3 , 'Name minlength is 3').max(10 , 'Name maxlength is 10').required('Name is required'),
        email: yup.string().email('Email is invalid').required('Email is required'),
        phone: yup.string().matches(phoneRegExp , 'Phone is invalid').required('Phone is required'),
        password: yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/ , 'Password start with uppercase').required('Password is required'),
        rePassword: yup.string().oneOf([yup.ref("password")] , 'Password and repassword').required('RePassword is required')
    });

    let formik = useFormik({
        initialValues :{
            name:'',
            phone:'',
            email:'',
            password:'',
            rePassword:''
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

        <label htmlFor="name" >First Name <span className='text-danger'>*</span> :</label>
        <input type='text' id='name' onBlur={formik.handleBlur} onChange={formik.handleChange} className=' form-control' value={formik.values.name} name='name'/>
        {formik.errors.name && formik.touched.name?<div className="alert alert-danger mt-2 p-2 ">{formik.errors.name}</div>:''}
        
        <label htmlFor="name" className=' pt-3'>Middle Name <span className='text-danger'>*</span> :</label>
        <input type='text' id='name' onBlur={formik.handleBlur} onChange={formik.handleChange} className=' form-control' value={formik.values.name} name='name'/>
        {formik.errors.name && formik.touched.name?<div className="alert alert-danger mt-2 p-2 ">{formik.errors.name}</div>:''}
        
        <label htmlFor="name" className=' pt-3'>Last Name <span className='text-danger'>*</span> :</label>
        <input type='text' id='name' onBlur={formik.handleBlur} onChange={formik.handleChange} className=' form-control' value={formik.values.name} name='name'/>
        {formik.errors.name && formik.touched.name?<div className="alert alert-danger mt-2 p-2 ">{formik.errors.name}</div>:''}
        
        <label htmlFor="email" className=' pt-3'>Email <span className='text-danger'>*</span> :</label>
        <input type='email' id='email' onBlur={formik.handleBlur} onChange={formik.handleChange} className=' form-control' value={formik.values.email} name='email'/>
        {formik.errors.email && formik.touched.email? <div className="alert alert-danger mt-3 p-2">{formik.errors.email}</div>:''}
        
        <label htmlFor="phone" className=' pt-3'>Phone<span className='text-danger'>*</span> :</label>
        <input type='tel' id='phone' onBlur={formik.handleBlur} onChange={formik.handleChange} className=' form-control' value={formik.values.phone} name='phone'/>
        {formik.errors.phone && formik.touched.phone? <div className="alert alert-danger mt-2 p-2">{formik.errors.phone}</div>:''}
        
        <label htmlFor="phone2" className=' pt-3'>Phone: </label>
        <input type='tel' id='phone2' onBlur={formik.handleBlur} onChange={formik.handleChange} className=' form-control' value={formik.values.phone2} name='phone2'/>
        {/* {formik.errors.phone && formik.touched.phone? <div className="alert alert-danger mt-2 p-2">{formik.errors.phone}</div>:''} */}
        
        <label htmlFor="national" className=' pt-3'>Namebr National <span className='text-danger'>*</span> :</label>
        <input type='number' id='national' onBlur={formik.handleBlur} onChange={formik.handleChange} className=' form-control' name='national'/>
        {/* {formik.errors.phone && formik.touched.phone? <div className="alert alert-danger mt-2 p-2">{formik.errors.phone}</div>:''} */}
        
        <label htmlFor="gender" className=' pt-3'>Select Gender :</label>
        <select  className="form-select mt-3"  aria-label="Default select example"  name="gender"  value={formik.values.gender}  onChange={formik.handleChange}  onBlur={formik.handleBlur} >
            <option value="">Select Gender</option>
            <option value="1">Male</option>
            <option value="2">Female</option>
        </select>
        {/* {formik.errors.gender && formik.touched.gender ? <div className="alert alert-danger mt-2">{formik.errors.gender}</div>: ''} */}


        <label htmlFor="department" className=' pt-3'>Department <span className='text-danger'>*</span> :</label>
        <select  name="department"  id="department"  className="form-select mt-2"  aria-label="Default select example" value={formik.values.department}  onChange={formik.handleChange}  onBlur={formik.handleBlur}>
            <option value="">Open this select department</option>
            <option value="1">Department 1</option>
            <option value="2">Department 2</option>
            <option value="3">Department 3</option>
        </select>
        {formik.errors.department && formik.touched.department ? <div className="alert alert-danger mt-2 p-2">{formik.errors.department}</div>:''}



        <label htmlFor="date_pirth" className=' pt-3 pb-2'>Date_Pirth : </label>
        <input type='date' id='date_pirth' onBlur={formik.handleBlur} onChange={formik.handleChange} className=' form-control' value={formik.values.date_pirth} name='date_pirth'/>
        {/* {formik.errors.phone && formik.touched.phone? <div className="alert alert-danger mt-2 p-2">{formik.errors.phone}</div>:''} */}
        

        <label htmlFor="password" className=' pt-3'>Password <span className='text-danger'>*</span> :</label>
        <input type='password' id='password' onBlur={formik.handleBlur} onChange={formik.handleChange} className=' form-control' value={formik.values.password} name='password'/>
        {formik.errors.password && formik.touched.password?<div className="alert alert-danger mt-2 p-2 ">{formik.errors.password}</div>:''}
        

        <label htmlFor="rePassword" className=' pt-3'>Re-Password <span className='text-danger'>*</span> :</label>
        <input type='Password' id='rePassword' onBlur={formik.handleBlur} onChange={formik.handleChange} className=' form-control' value={formik.values.rePassword} name='rePassword'/>
        {formik.errors.rePassword && formik.touched.rePassword?<div className="alert alert-danger mt-2 p-2 ">{formik.errors.rePassword}</div>:''}
        
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
        </button> :<button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn buttoncolor shadow  mt-2 mt-4'>Add</button>
        }
    </form>
</div>
</HelmetProvider>
</>
};
