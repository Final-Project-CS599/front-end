// import CourseCard from "../../../components/courseCard";
import './courses.css'
// const coursesData = [
//   {  title: "CS Courses", description: "Learn the basics of Computer science field." },
//   { title: "IT Courses", description: "Learn the basics of Information tech field."},
//   {  title: "Front-End courses ", description: "Master Bootstrap for responsive designs."},
//   {  title: "Back-End courses ", description: "Master Bootstrap for responsive designs." },
//   {  title: "DB courses ", description: "Master Bootstrap for responsive designs." },
//   {  title: "MS courses ", description: "Master Bootstrap for responsive designs." },
// ];
import { useNavigate } from 'react-router-dom';
function MyCourses() {
  const navigate = useNavigate();

  return (
    <>
      <div className="container my-1">
        <h1 className="mb-4 fs-1" style={{ color: "#6f42c1" }}>
          Courses
        </h1>

        <div className="row g-3">
          {/* Card 1 */}
          <div className="col-lg-4 col-md-6">
            <div className='card p-1'>
            <div className="card p-2">
              <div className="card-body">
                <h5 className="card-title">CS500</h5>
                <p className="card-text">Learn the basics of Computer science field.</p>
                <button
                   onClick={() => navigate("/UploadCourse")}
                  className="card-btn rounded-pill border border-5 text-center ms-4"
                >
                  Upload Course Now
                </button>
              </div>
            </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="col-lg-4 col-md-6">
          <div className='card p-1'>
            <div className="card p-2">
              <div className="card-body">
                <h5 className="card-title">cs503</h5>
                <p className="card-text">Learn the basics of Information tech field.</p>
                <button
                  onClick={() => navigate("/UploadCourse")}
                  className="card-btn rounded-pill border border-5 text-center ms-4"
                >
                  Upload Course Now
                </button>
              </div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="col-lg-4 col-md-6">
          <div className='card p-1'>
            <div className="card p-2">
              <div className="card-body">
                <h5 className="card-title">Cs510</h5>
                <p className="card-text">Master MS for Math Science.</p>
                <button
                   onClick={() => navigate("/UploadCourse")}
                  className="card-btn rounded-pill border border-5  text-center ms-4"
                >
                  Upload Course Now
                </button>
              </div>
            </div>
            </div>
          </div>
        </div>
        {/*row 2*/}
        <div className="row g-3 mt-1">
          {/* Card 1 */}
          <div className="col-lg-4 col-md-6">
          <div className='card p-1'>
            <div className="card p-2">
              <div className="card-body">
                <h5 className="card-title">MS500</h5>
                <p className="card-text">Master Front-End for responsive designs.</p>
                <button
                   onClick={() => navigate("/UploadCourse")}
                  className="card-btn rounded-pill border border-5  text-center ms-4"
                >
                  Upload Course Now
                </button>
              </div>
              </div>
            </div>
          </div>
          
          {/* Card 2 */}
          <div className="col-lg-4 col-md-6">
          <div className='card p-1'>
            <div className="card p-2">
              <div className="card-body">
                <h5 className="card-title">MS507</h5>
                <p className="card-text">Master Back-End for responsive designs.</p>
                <button
                  onClick={()=>navigate('/UploadCourse')}
                  className="card-btn rounded-pill border border-5  text-center ms-4"
                >
                  Upload Course Now
                </button>
              </div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="col-lg-4 col-md-6">
          <div className='card p-1'>
            <div className="card p-2">
              <div className="card-body">
                <h5 className="card-title">MS527</h5>
                <p className="card-text">This is DB Courses description.</p>
                <button
                  onClick={()=>navigate('/UploadCourse')}
                  className="card-btn rounded-pill border border-5  text-center ms-4"
                >
                  Upload Course Now
                </button>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}



export default MyCourses;