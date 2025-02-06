import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { HelmetProvider, Helmet } from 'react-helmet-async';


export default function HelpDesk() {
    const [helpDeskDetails, setHelpDeskDetails] = useState([]);
    const [error, setError] = useState(null);


    const getHelpDesk = async () => {
        try {
            const { data } = await axios.get(`http://localhost:3000/api/v1/admin/helpDesk/viewHelpDesk`);
            // setHelpDeskDetails(data.data);
            setHelpDeskDetails(Array.isArray(data.data) ? data.data : []);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch helpDesk data");
        }
    };
    
    const deleteHelpDesk = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/v1/admin/helpDesk/deleteHelpDesk/${id}`);
            setHelpDeskDetails((prev) => prev.filter((data) => data.id !== id));
        } catch (err) {
            console.error("Error deleting helpDesk:", err);
            setError(err.response?.data?.message || "Failed to delete helpDesk");
        }
    };

    const handleDone = (id) => {
        if (id) {
            deleteHelpDesk(id);
        }
    };

    useEffect(() => {
        getHelpDesk();
    }, []);

    return (
        <HelmetProvider>
            <Helmet>
                <meta name='description' content='' />
                <title>HelpDesk</title>
            </Helmet>
            <div className='row'>
                <div className='col-md-12'>
                    <div className='w-100 mx-auto p-4 bg-main-light my-3'>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <div className='mb-5'>
                            <h2 className='text_color fs-2 fw-bold'>HelpDesk</h2>
                        </div>

                        {helpDeskDetails.length > 0 ? (
                            helpDeskDetails.map((data, index) => (
                                <div className='row' key={data.id || index}>
                                    <div className='col-md-12 bg-light d-flex justify-content-between'>
                                        <div className='p-5'>
                                            <h5>{data.name}</h5> 
                                            <h4>{data.email}</h4>
                                            <p>{data.title}</p>
                                            <p>{data.description}</p>
                                        </div>
                                            <div className='d-flex align-items-center pe-4'>
                                                <button className='btn buttoncolor px-3' onClick={() => handleDone(data.id)}>Done</button>
                                            </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className='row'>
                                <div className='col-md-12 bg-light'>
                                    <div className='p-5 text-center'>
                                        <h2 className='fs-3'>No Messages in HelpDesk</h2>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </HelmetProvider>
    );
}