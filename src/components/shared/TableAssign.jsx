import React from 'react';

const TableAssign = () => {
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Assignments</th>
            <th scope="col">Start date</th>
            <th scope="col">End date</th>
            <th scope="col">Degree</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          <tr>
            <th scope="row">1</th>
            <td>Ch1 </td>
            <td>1-1-2024</td>
            <td>5-1-2024</td>
            <td>5</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Ch2</td>
            <td>25-2-2024</td>
            <td>30-3-2024</td>
            <td>4</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableAssign;
