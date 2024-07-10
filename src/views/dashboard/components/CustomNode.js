import React from 'react';

const CustomNode = ({ nodeDatum, addChild, handleMouseOver, handleMouseOut }) => {
  const hasLeftChild = nodeDatum.children && nodeDatum.children[0];
  const hasRightChild = nodeDatum.children && nodeDatum.children[1];
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found in local storage');

  //   const userDetails = JSON.parse(token);
  return (
    <g onMouseOver={(e) => handleMouseOver(nodeDatum, e)} onMouseOut={handleMouseOut}>
      <circle r="15" fill="lightblue"></circle>
      <text fill="black" x="20">
        {nodeDatum.name}
      </text>
      {!hasLeftChild && nodeDatum.id === 28 && (
        <g transform="translate(-40, 20)">
          <rect
            width="30"
            height="20"
            fill="lightgreen"
            style={{ cursor: 'pointer' }}
            onClick={() => addChild(nodeDatum, 'left')}
          />
          <text x="5" y="15" fill="black">
            +
          </text>
        </g>
      )}
      {!hasRightChild && nodeDatum.id === 28 && (
        <g transform="translate(10, 20)">
          <rect
            width="30"
            height="20"
            fill="lightgreen"
            style={{ cursor: 'pointer' }}
            onClick={() => addChild(nodeDatum, 'right')}
          />
          <text x="5" y="15" fill="black" onClick={() => addChild(nodeDatum, 'right')}>
            +
          </text>
        </g>
      )}
    </g>
  );
};

export default CustomNode;
