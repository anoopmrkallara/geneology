import React, { useEffect, useState } from 'react';
import Tree from 'react-d3-tree';
import httpInstance from '../../../header/HttpInstance';
import CustomNode from './CustomNode';
import { useNavigate } from 'react-router-dom';

const Genealogy = () => {
  const [treeData, setTreeData] = useState(null);
  const [tooltip, setTooltip] = useState({
    visible: false,
    content: null,
    position: { x: 0, y: 0 },
  });
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTreeData() {
      try {
        const response = await httpInstance.get('/get-tree-data');
        setTreeData(response.data);
      } catch (error) {
        console.error('Error fetching tree data:', error);
      }
    }

    fetchTreeData();
  }, []);

  if (!treeData) {
    return <div>Loading tree data...</div>;
  }

  const handleClick = (nodeData) => {
    if (nodeData.children) {
      nodeData._collapsed = !nodeData._collapsed;
      setTreeData({ ...treeData });
    }
  };

  const handleMouseOver = (nodeData, evt) => {
    const boundingRect = evt.target.getBoundingClientRect();
    setTooltip({
      visible: true,
      content: nodeData,
      position: {
        x: boundingRect.right + 10, // Add offset to the right
        y: boundingRect.top + window.scrollY,
      },
    });
  };

  const handleMouseOut = () => {
    setTooltip({ visible: false, content: null, position: { x: 0, y: 0 } });
  };

  const addChild = (nodeDatum, side) => {
    console.log('dsd');
    navigate('/pages/enrollment', { state: { data: nodeDatum, position: side } });
  };

  const treeConfig = {
    orientation: 'vertical',
    translate: { x: 250, y: 100 },
    separation: { siblings: 1, nonSiblings: 2 },
    nodeSize: { x: 140, y: 80 },
    pathFunc: 'dotted',
    zoom: 0.8,
    collapsible: true,
    onClick: handleClick,
  };

  return (
    <div style={{ display: 'flex', height: '800px', width: '100%' }}>
      <div style={{ flex: 1, position: 'relative' }}>
        <Tree
          data={treeData}
          {...treeConfig}
          renderCustomNodeElement={(rd3tProps) => (
            <CustomNode
              {...rd3tProps}
              addChild={addChild}
              handleMouseOver={handleMouseOver}
              handleMouseOut={handleMouseOut}
            />
          )}
        />
        {tooltip.visible && (
          <div
            style={{
              position: 'absolute',
              top: tooltip.position.y,
              left: tooltip.position.x,
              backgroundColor: 'white',
              border: '1px solid black',
              padding: '5px',
              borderRadius: '5px',
              pointerEvents: 'none',
              zIndex: 1000,
            }}
          >
            <p>
              <strong>ID:</strong> {tooltip?.content.id}
            </p>
            <p>
              <strong>Name:</strong> {tooltip?.content.name}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Genealogy;
