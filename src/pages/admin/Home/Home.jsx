import React, { useEffect, useState } from "react";
import axios from "axios";

const AcademicDashboard = () => {
  const [statistics, setStatistics] = useState({});
  const [activities, setActivities] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch statistics
    axios.get("http://localhost:5000/api/statistics").then((response) => {
      setStatistics(response.data);
    });

    // Fetch recent activities
    axios.get("http://localhost:5000/api/activities").then((response) => {
      setActivities(response.data);
    });

    // Fetch notifications
    axios.get("http://localhost:5000/api/notifications").then((response) => {
      setNotifications(response.data);
    });
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Main Content */}
        <div className="col-md-10">
          <div className="p-4">
            <h2> Dashboard</h2>
            <div className="row">
              {/* Cards for statistics */}
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

            {/* Table for recent activity */}
            <div className="mt-4">
              <h3>Recent Activities</h3>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Activity</th>
                    <th>By</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((activity, index) => (
                    <tr key={activity.id}>
                      <td>{index + 1}</td>
                      <td>{activity.activity}</td>
                      <td>{activity.performed_by}</td>
                      <td>{activity.activity_date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Notification Section */}
            <div className="mt-4">
              <h3>Notifications</h3>
              <div className="list-group">
                {notifications.map((notification) => (
                  <a
                    href="#!"
                    className="list-group-item list-group-item-action"
                    key={notification.id}
                  >
                    {notification.message}
                    
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicDashboard;
