import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/esm/ButtonGroup';


const NodeContextMenu = ({nodeContextMenu, setNodeContextMenu, setNodes, theme}) => {
    

    const handleDeleteNode = (e) => {
        console.log("Deleting node");
        console.log(nodeContextMenu);
        setNodes((nodes) => nodes.filter(node => node.id !== nodeContextMenu.id));
        setNodeContextMenu(null);
    }

    return (
        <div style={{position: 'absolute', 
                        top: nodeContextMenu.top, 
                        left: nodeContextMenu.left, 
                        right: nodeContextMenu.right, 
                        bottom: nodeContextMenu.bottom,
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        zIndex: 10}}>
            <ButtonGroup vertical>
                <Button variant="outline-primary"><i className="bi bi-tools"></i> Edit Node</Button>
                <Button variant="outline-danger" onClick={handleDeleteNode}><i className="bi bi-trash3"></i> Delete Node</Button>
            </ButtonGroup>
        </div>
    );
};

export default NodeContextMenu;