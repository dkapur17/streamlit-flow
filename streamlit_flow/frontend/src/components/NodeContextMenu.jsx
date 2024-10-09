import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/esm/ButtonGroup';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const EditNodeModal = ({show, node, handleClose, theme, setNodeContextMenu, setModalClosing, setNodes, nodes, edges, handleDataReturnToStreamlit}) => {

    const [editedNode, setEditedNode] = useState(node);
    const allowTypeChange = edges.filter(edge => edge.source === editedNode.id || edge.target === editedNode.id).length === 0;
    
    const onExited = (e) => {
        setModalClosing(true);
        setNodeContextMenu(null);
    }

    const onNodeContentChange = (e) => {
        setEditedNode((editedNode) => ({...editedNode, data: {...editedNode.data, content: e.target.value}}));
    };

    const onNodeWidthChange = (e) => {
        const currStyle = editedNode.data.style;
        setEditedNode((editedNode) => ({...editedNode, width: e.target.value, style: {...currStyle, width: e.target.value + 'px'}}));
    };

    const onNodeTypeChange = (e) => {
        setEditedNode((editedNode) => ({...editedNode, type: e.target.value}));
    };

    const onNodeSourcePositionChange = (e) => {
        setEditedNode((editedNode) => ({...editedNode, sourcePosition: e.target.value}));
    };

    const onNodeTargetPositionChange = (e) => {
        setEditedNode((editedNode) => ({...editedNode, targetPosition: e.target.value}));
    };

    const onNodeDraggableChange = (e) => {
        setEditedNode((editedNode) => ({...editedNode, draggable: e.target.checked}));
    };

    const onNodeConnectableChange = (e) => {
        setEditedNode((editedNode) => ({...editedNode, connectable: e.target.checked}));
    };

    const onNodeDeletableChange = (e) => {
        setEditedNode((editedNode) => ({...editedNode, deletable: e.target.checked}));
    };


    const handleSaveChanges = (e) => {
        const updatedNodes = nodes.map(n => n.id === editedNode.id ? editedNode : n);
        setNodes(updatedNodes);
        handleDataReturnToStreamlit(updatedNodes, edges, null);
        setNodeContextMenu(null);
    };

    return (
    <Modal show={show} onHide={handleClose} data-bs-theme={theme} onExited={onExited}>
        <Modal.Header closeButton>
            <Modal.Title>Edit Node</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row className='g-2'>
            <Col md>
                <FloatingLabel controlId="floatingInput" label="Node Content">
                    <Form.Control type="text" as="textarea" style={{ height: '100px' }} placeholder="nodeContent" value={editedNode.data.content} autoFocus onChange={onNodeContentChange}/>
                </FloatingLabel>
            </Col>
        </Row>
        <Row className='g-2 mt-1 mt-md-0'>
            <Col md>
                <FloatingLabel controlId="floatingInput" label="Node Width">
                    <Form.Control type="number" placeholder="nodeWidth" value={editedNode.width} autoFocus onChange={onNodeWidthChange}/>
                </FloatingLabel>
            </Col>
            <Col md>
                <FloatingLabel controlId="floatingSelect" label="Node Type" onChange={onNodeTypeChange}>
                    <Form.Select defaultValue={editedNode.type} disabled={!allowTypeChange}>
                        <option value="default">Default</option>
                        <option value="input">Input</option>
                        <option value="output">Output</option>
                    </Form.Select>
                </FloatingLabel>
            </Col>
        </Row>
            <Row className="g-2 mt-1 mt-md-0">
                <Col md>
                    <FloatingLabel controlId="floatingSelect" label="Source Position" onChange={onNodeSourcePositionChange}>
                        <Form.Select defaultValue={editedNode.sourcePosition}>
                            <option value="right">Right</option>
                            <option value="bottom">Bottom</option>
                            <option value="top">Top</option>
                            <option value="left">Left</option>
                        </Form.Select>
                    </FloatingLabel>
                </Col>
                <Col md>
                    <FloatingLabel controlId="floatingSelect" label="Target Position" onChange={onNodeTargetPositionChange}>
                        <Form.Select defaultValue={editedNode.targetPosition}>
                            <option value="left">Left</option>
                            <option value="top">Top</option>
                            <option value="right">Right</option>
                            <option value="bottom">Bottom</option>
                        </Form.Select>
                    </FloatingLabel>
                </Col>
            </Row>
            <Row className="g-2 mt-2">
                <Col md>
                    <Form.Check type="switch" id="node-draggable-switch" label="Draggable" defaultChecked={editedNode.draggable} onChange={onNodeDraggableChange}/>
                </Col>
                <Col md>
                    <Form.Check type="switch" id="node-connectable-switch" label="Connectable" defaultChecked={editedNode.connectable} onChange={onNodeConnectableChange}/>
                </Col>
                <Col md>
                    <Form.Check type="switch" id="node-deletable-switch" label="Deletable" defaultChecked={editedNode.deletable} onChange={onNodeDeletableChange}/>
                </Col>
            </Row>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleSaveChanges}>
                Save Changes
            </Button>
        </Modal.Footer>
    </Modal>);
};

const NodeContextMenu = ({nodeContextMenu, nodes, edges, setNodeContextMenu, setNodes, setEdges, theme, handleDataReturnToStreamlit}) => {
    
    const [showModal, setShowModal] = useState(false);
    const [modalClosing, setModalClosing] = useState(false);

    const handleClose = () => {
        setShowModal(false);
        setModalClosing(true);
    };

    const handleShow = () => setShowModal(true);

    const handleEditNode = (e) => {
        handleShow();
    }

    const handleDeleteNode = (e) => {
        if(nodeContextMenu.node.deletable)
        {
            const updatedNodes = nodes.filter(node => node.id !== nodeContextMenu.node.id)
            const updatedEdges = edges.filter(edge => edge.source !== nodeContextMenu.node.id && edge.target !== nodeContextMenu.node.id)
            setNodes(updatedNodes);
            setEdges(updatedEdges);
            handleDataReturnToStreamlit(updatedNodes, updatedEdges, null);
        }
        setNodeContextMenu(null);
    }

    return (
        <>
            <div style={{position: 'absolute', 
                            top: nodeContextMenu.top, 
                            left: nodeContextMenu.left, 
                            right: nodeContextMenu.right, 
                            bottom: nodeContextMenu.bottom,
                            backgroundColor: 'white',
                            borderRadius: '8px',
                            zIndex: 10}}>
                {(!showModal && !modalClosing) && <ButtonGroup vertical>
                    <Button variant="outline-primary" onClick={handleEditNode}><i className="bi bi-tools"></i> Edit Node</Button>
                    <Button variant={nodeContextMenu.node.deletable ? "outline-danger" : "secondary"} onClick={handleDeleteNode} disabled={!nodeContextMenu.node.deletable}><i className="bi bi-trash3"></i> Delete Node</Button>
                </ButtonGroup>}
            </div>
            <EditNodeModal show={showModal}
                node={nodeContextMenu.node}
                nodes={nodes}
                edges={edges}
                handleClose={handleClose}
                theme={theme.base}
                setNodeContextMenu={setNodeContextMenu}
                setModalClosing={setModalClosing}
                setNodes={setNodes}
                handleDataReturnToStreamlit={handleDataReturnToStreamlit}
                />    
        </>
    );
};

export default NodeContextMenu;