import React from 'react'
import { Link } from 'react-router-dom';
// import { Helmet } from 'react-helmet';
import { HelmetProvider, Helmet } from 'react-helmet-async';

export default function Instructors() {
return <>
    <HelmetProvider>
    <Helmet>
        <meta name='description' content='' />
        <title>Instructors</title>
    </Helmet>
    <div className=' container'>
        <div className='row'>
            <div className=' col-md-6 p-2'>
                <div className=''>
                    <h2>Instructors</h2>
                </div>
            </div>
            <div  className=' col-md-6 p-3'>
                <div className='d-flex justify-content-end'>
                    <Link className='btn buttoncolor shadow'  to={'/admin/registerInstructor'}>Add New Instructor</Link>
                </div>
            </div>
        </div>
    </div>
    </HelmetProvider>
</>
}
