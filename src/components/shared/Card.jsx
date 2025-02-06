import { useNavigate } from 'react-router-dom';
const Card = ({ title, description, id, img, type, grade }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/student/courses/${id}`);
  };
  return (
    <div className="card shadow-sm" style={{ width: '17rem' }}>
      <img
        src={img}
        className="card-img-top"
        alt="img"
        style={{ objectFit: 'contain' }}
        width={'100px'}
        height={'150px'}
      />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text"> Description: {description}</p>
        <p className="card-text">Type: {type}</p>
        {grade && <p className="card-text">Grade: {grade}</p>}
        <button onClick={handleClick} className="btn btn-outline-purple w-50">
          View
        </button>
      </div>
    </div>
  );
};

export default Card;
