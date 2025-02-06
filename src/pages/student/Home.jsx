import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetRecommendedCourses, useSearchCourses } from '../../api/student/courses';
import Card from '../../components/shared/Card';
import img from '../../assets/images/student/7040859.jpg';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState();

  const navigate = useNavigate();
  const {
    data: searchResults,
    isLoading: isSearchLoading,
    error: searchError,
  } = useSearchCourses(searchQuery);

  const { data: recommendedCourses, isLoading, error } = useGetRecommendedCourses();

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle search form submission
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
  };

  // Handle clicking on a course
  const handleCourseClick = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  return (
    <div className="">
      <h1 className="mb-4">Welcome to Your Dashboard</h1>

      {/* Search Input */}
      <form onSubmit={handleSearchSubmit} className="mb-5">
        <div className="input-group w-50">
          <input
            type="text"
            className="form-control"
            placeholder="Search for courses..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button type="submit" className="btn btn-outline-purple" disabled={isSearchLoading}>
            {isSearchLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {/* Display Search Results */}
      {searchResults?.length > 0 && (
        <div className="mb-5">
          <h3>Search Results</h3>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {searchResults?.map((course) => (
              <div className="col" key={course?.c_id}>
                <Card
                  title={course?.c_name}
                  description={course?.c_description}
                  img={course?.image || img} // Fallback image if course.image is not provided
                  id={course?.c_id}
                  type={course?.c_type}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mb-5">
        <h3>Recommended Courses</h3>
        {isLoading ? (
          <p>Loading recommended courses...</p>
        ) : error ? (
          <p className="text-danger">Error: {error}</p>
        ) : recommendedCourses?.length > 0 ? (
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {recommendedCourses?.map((course) => (
              <div className="col" key={course?.c_id}>
                <Card
                  title={course?.c_name}
                  description={course?.c_description}
                  img={course?.image || img} // Fallback image if course.image is not provided
                  id={course?.c_id}
                  type={course?.c_type}
                />
              </div>
            ))}
          </div>
        ) : (
          <p>No recommended courses found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
