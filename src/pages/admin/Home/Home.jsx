import React, { useEffect, useState } from "react";
import axios from "axios";

const Homedashboard = () => {
  const [statistics, setStatistics] = useState({});

  useEffect(() => {
    // Fetch statistics
    axios.get("http://localhost:5000/api/statistics").then((response) => {
      setStatistics(response.data);
                  });

    // updates
    axios.get("http://localhost:5000/api/activities").then((response) => {
      setActivities(response.data);                                      });
                                                                       
  }, []);

  return (
    <div className="container-fluid">
              <div className="row">
                {/* Main Content */}
                <div className="col-md-10">
                    <div className="p-4">
                    <h2> Dashboard</h2>
                    <div className="row">

                {/*statistics */}
                <div className="col-md-3">
                <div className="card text-white bg-primary mb-3">
                <div className="card-body">
                <h5 className="card-title">Total Students</h5>
                <p className="card-text">{statistics.totalStudents}</p>
                </div>
                </div>
                </div>

                <div className="col-md-3">
                <div className="card text-white bg-success mb-3">
                <div className="card-body">
                <h5 className="card-title">Total Instructors</h5>
                <p className="card-text">{statistics.totalInstructors}</p>
                </div>
                </div>
                </div>

                <div className="col-md-3">
                    <div className="card text-white bg-warning mb-3">
                         <div className="card-body">
                         <h5 className="card-title">Courses</h5>
                         <p className="card-text">{statistics.courses}</p>
                         </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card text-white bg-danger mb-3">
                         <div className="card-body">
                         <h5 className="card-title">Pending Requests</h5>
                         <p className="card-text">{statistics.pendingRequests}</p>
                         </div>
                    </div>
               </div>
              
              </div>

                  </div>
                </div>
              </div>
            </div>
  );
};

export default Homedashboard;
