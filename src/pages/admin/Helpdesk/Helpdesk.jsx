import React, { useState } from 'react';
import Style from './Helpdesk.module.css';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { HelpdeskData } from './HelpdeskDetails.jsx';


export default function Helpdesk() {
    const [helpdeskDetails , sethelpdeskDetails] = useState(HelpdeskData);

    const handleDone = (id) => {
        if(id){
            const updataDetails = helpdeskDetails.filter((data) => data.id !== id);
            sethelpdeskDetails(updataDetails);
        }
        else{
            sethelpdeskDetails([]);
        }
    }    
    return <>
        <HelmetProvider>
            <Helmet>
                <meta name='description' content='' />
                <title>Helpdesk</title>
            </Helmet>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className=' w-100 mx-auto p-4 bg-main-light my-3'> 
                            <div className=' mb-5'> 
                                <h2 className='text_color fs-1 fw-bold'>Helpdesk</h2>
                            </div>
                            {
                                helpdeskDetails.length > 0 ? (
                                    helpdeskDetails.map((data , index)=>{
                                        return(
                                            <div className='row' key={data.id || index}>
                                                <div className='col-md-12 bg-light  d-flex justify-content-between '>
                                                    <div className='p-5'>
                                                        <h3 className='text_color fw-light'>{data.name}</h3>
                                                        <h4>{data.email}</h4>
                                                        <p> {data.title}Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita,</p>
                                                    </div>
                                                    <div className='d-flex align-items-center pe-4'>
                                                        <button className='btn buttoncolor px-3 ' onClick={() => handleDone(data.id)} >Done</button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                ) : (
                                <div className='row'>
                                    <div className='col-md-12 bg-light '>
                                        <div className='p-5 text-center'>
                                            <h2 className=' fs-1'>No Massages Helpdesk</h2>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
        </HelmetProvider>
    </>
};