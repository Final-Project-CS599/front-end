import React from 'react';
import styles from './NotFound.module.css';
// import { Helmet } from 'react-helmet';
import { HelmetProvider, Helmet } from 'react-helmet-async';

export default function NotFound() {
    return <>
    <HelmetProvider>
    <Helmet>
        <meta name='description' content='' />
        <title>Not Found</title>
    </Helmet>
    <div className=" container">
        <div className="row">
            <div className="col-md-12">
                <div>
                    <div className='p-5'>
                        <h2>Not Found</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </HelmetProvider>
</>
}
