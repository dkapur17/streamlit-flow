import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { nanoid } from 'nanoid';


const CreateNodeModal = ({show, handleClose, nodes, edges, theme, setPaneContextMenu, setModalClosing, clickPosition, setNodes, handleDataReturnToStreamlit }) => {

    const [newNode, setNewNode] = useState({
        nodeName: '',
        nodeType: 'default',
        sourcePosition: 'right',
        targetPosition: 'left',
        draggable: true,
        connectable: true,
        deletable: true,
        nodeWidth: 200
    });

    const onNodeContentChange = (e) => {
        setNewNode((newNode) => ({...newNode, nodeContent: e.target.value}));
    }

    const onNodeWidthChange = (e) => {
        setNewNode((newNode) => ({...newNode, nodeWidth: e.target.value}));
    }

    const onNodeTypeChange = (e) => {
        setNewNode((newNode) => ({...newNode, nodeType: e.target.value}));
    }

    const onNodeSourcePositionChange = (e) => {
        setNewNode((newNode) => ({...newNode, sourcePosition: e.target.value}));
    }

    const onNodeTargetPositionChange = (e) => {
        setNewNode((newNode) => ({...newNode, targetPosition: e.target.value}));
    }

    const onNodeDraggableChange = (e) => { 
        setNewNode((newNode) => ({...newNode, draggable: e.target.checked}));
    }

    const onNodeConnectableChange = (e) => {
        setNewNode((newNode) => ({...newNode, connectable: e.target.checked}));
    }

    const onNodeDeletableChange = (e) => {
        setNewNode((newNode) => ({...newNode, deletable: e.target.checked}));
    }

    const onExited = (e) => {
        setModalClosing(true);
        setPaneContextMenu(null);
    }

    const handleCreateNode = (e) => {

        const newNodeId = `st-flow-node_${nanoid()}`;
        const updatedNodes = [...nodes, {
            id: newNodeId,
            type: newNode.nodeType,
            position: clickPosition,
            data: {content: newNode.nodeContent},
            sourcePosition: newNode.sourcePosition,
            targetPosition: newNode.targetPosition,
            draggable: newNode.draggable,
            connectable: newNode.connectable,
            deletable: newNode.deletable,
            style: {
                width: newNode.nodeWidth + "px"
            },
            width: newNode.width
        }]
        setNodes(updatedNodes);
        handleDataReturnToStreamlit(updatedNodes, edges, newNodeId);

        setNewNode({
            nodeContent: '',
            nodeType: 'default',
            sourcePosition: 'right',
            targetPosition: 'left',
            draggable: true,
            connectable: true,
            deletable: true,
            nodeWidth: 200
        });
        handleClose();
    }

    return (
        <Modal show={show} onHide={handleClose} data-bs-theme={theme} onExited={onExited}>
        <Modal.Header closeButton>
            <Modal.Title>Create New Node</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row className='g-2'>
                <Col md>
                    <FloatingLabel controlId="floatingInput" label="Node Content">
                        <Form.Control type="text" as="textarea" style={{height: '100px'}} placeholder="nodeContent" autoFocus onChange={onNodeContentChange}/>
                    </FloatingLabel>
                </Col>
            </Row>
            <Row className='g-2 mt-1 mt-md-0'>
                <Col md>
                    <FloatingLabel controlId="floatingInput" label="Node Width">
                        <Form.Control type="number" value={newNode.nodeWidth} placeholder="nodeWidth" autoFocus onChange={onNodeWidthChange}/>
                    </FloatingLabel>
                </Col>
                <Col md>
                    <FloatingLabel controlId="floatingSelect" label="Node Type" onChange={onNodeTypeChange}>
                        <Form.Select>
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
                        <Form.Select>
                            <option value="right">Right</option>
                            <option value="bottom">Bottom</option>
                            <option value="top">Top</option>
                            <option value="left">Left</option>
                        </Form.Select>
                    </FloatingLabel>
                </Col>
                <Col md>
                    <FloatingLabel controlId="floatingSelect" label="Target Position" onChange={onNodeTargetPositionChange}>
                        <Form.Select>
                            <option value="left">Left</option>
                            <option value="top">Top</option>
                            <option value="right">Right</option>
                            <option value="bottom">Bottom</option>
                        </Form.Select>
                    </FloatingLabel>
                </Col>
            </Row>
            <Row className="g-3 mt-2">
                <Col md>
                    <Form.Check type="switch" id="node-draggable-switch" label="Draggable" defaultChecked onChange={onNodeDraggableChange}/>
                </Col>
                <Col md>
                    <Form.Check type="switch" id="node-connectable-switch" label="Connectable" defaultChecked onChange={onNodeConnectableChange}/>
                </Col>
                <Col md>
                    <Form.Check type="switch" id="node-deletable-switch" label="Deletable" defaultChecked onChange={onNodeDeletableChange}/>
                </Col>
            </Row>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleCreateNode}>
                Create Node
            </Button>
        </Modal.Footer>
</Modal>
    );
}

const PaneConextMenu = ({paneContextMenu, setPaneContextMenu, nodes, edges, layoutOptions, setNodes, handleDataReturnToStreamlit, setLayoutCalculated, theme}) => {
    
    const [showModal, setShowModal] = useState(false);
    const [modalClosing, setModalClosing] = useState(false);

    const handleClose = () => {
        setShowModal(false);
        setModalClosing(true);
    };
    const handleShow = () => setShowModal(true);

    const handleAddNode = (e) => {
        handleShow();
    };

    const handleLayoutReset = (e) => {
        setPaneContextMenu(null);
        setLayoutCalculated(false);
    };

    return (
        <>
        <div style={{position: 'absolute', 
                        top: paneContextMenu.top, 
                        left: paneContextMenu.left, 
                        right: paneContextMenu.right, 
                        bottom: paneContextMenu.bottom,
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        zIndex: 10}}>
            {(!showModal && !modalClosing) && <ButtonGroup vertical>
                <Button variant="outline-primary" onClick={handleAddNode}><i className='bi bi-pencil'></i> Create New Node</Button>
                <Button variant="outline-success" onClick={handleLayoutReset}><i className='bi bi-arrow-clockwise'></i> Reset Layout</Button>
            </ButtonGroup>}
        </div>
        <CreateNodeModal show={showModal} 
            handleClose={handleClose} 
            theme={theme.base} 
            nodes={nodes}
            edges={edges}
            setPaneContextMenu={setPaneContextMenu} 
            setModalClosing={setModalClosing}
            clickPosition={paneContextMenu.clickPos}
            setNodes={setNodes}
            handleDataReturnToStreamlit={handleDataReturnToStreamlit}
        />
        </>
    );
};

export default PaneConextMenu;