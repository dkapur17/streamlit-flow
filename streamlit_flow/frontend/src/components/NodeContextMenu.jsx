import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/esm/ButtonGroup';


const NodeContextMenu = ({nodeContextMenu}) => {
    
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
                <Button variant="light"><i className="bi bi-tools"></i> Edit Node</Button>
                <Button variant="outline-danger"><i className="bi bi-trash3"></i> Delete Node</Button>
            </ButtonGroup>
        </div>
    );
};

export default NodeContextMenu;