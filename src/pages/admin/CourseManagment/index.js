export const buttonStyle = {
  backgroundColor: '#ffffff',
  color: '#7F55E0',
  border: '2px solid #7F55E0',
  borderRadius: '15px',
  padding: '10px 20px',
  fontSize: '20px',
  fontWeight: 'bold',
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  transition: 'background-color 0.3s, color 0.3s',
};

export const handleMouseEnter = (e) => {
  e.target.style.backgroundColor = '#7F55E0';
  e.target.style.color = '#ffffff';
};

export const handleMouseLeave = (e) => {
  e.target.style.backgroundColor = '#ffffff';
  e.target.style.color = '#7F55E0';
};
