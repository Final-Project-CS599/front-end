import React from 'react';
import Style from './AddAdmin.module.css';
// import { Helmet } from 'react-helmet';
import { HelmetProvider, Helmet } from 'react-helmet-async';

export default function AddAdmin() {
    return <>
        <HelmetProvider>
        <Helmet>
            <meta name='description' content='' />
            <title>Add Admin</title>
        </Helmet>
            <div className=' container'>
                <div className='row'>
                    <div className=' col-md-6 p-2'>
                        <div className=''>
                            <h2>Add Admin</h2>
                        </div>
                    </div>
                </div>
            </div>
            </HelmetProvider>
    </>
};
