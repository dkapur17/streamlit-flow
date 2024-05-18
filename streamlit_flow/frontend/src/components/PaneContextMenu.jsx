import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { nanoid } from 'nanoid';

const CreateNodeModal = ({show, handleClose, theme, setPaneContextMenu, setModalClosing, clickPosition, setNodes }) => {
    
    // const [nodeName, setNodeName] = useState('');
    // const [nodeType, setNodeType] = useState('default');

    const [newNode, setNewNode] = useState({
        nodeName: '',
        nodeType: 'default',
        sourcePosition: 'right',
        targetPosition: 'left',
        draggable: true,
        connectable: true,
        deletable: true
    });

    const onNodeNameChange = (e) => {
        // setNodeName(e.target.value);
        setNewNode((newNode) => ({...newNode, nodeName: e.target.value}));
    }

    const onNodeTypeChange = (e) => {
        // setNodeType(e.target.value);
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
        setNodes((nodes) => [...nodes, {
            id: `${newNode.nodeName.replace(' ','_')}_${nanoid()}`,
            type: newNode.nodeType,
            position: clickPosition,
            data: {label: newNode.nodeName},
            sourcePosition: newNode.sourcePosition,
            targetPosition: newNode.targetPosition,
            draggable: newNode.draggable,
            connectable: newNode.connectable,
            deletable: newNode.deletable
        }]);

        setNewNode({
            nodeName: '',
            nodeType: 'default',
            sourcePosition: 'right',
            targetPosition: 'left',
            draggable: true,
            connectable: true,
            deletable: true
        });
        handleClose();
    }

    return (
        <Modal show={show} onHide={handleClose} data-bs-theme={theme} onExited={onExited}>
        <Modal.Header closeButton>
            <Modal.Title>Create New Node</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row className='g=2'>
                <Col md>
                    <FloatingLabel controlId="floatingInput" label="Node Name" className="mb-3">
                        <Form.Control type="text" placeholder="nodeName" autoFocus onChange={onNodeNameChange}/>
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
            <Row className="g-2">
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
            <Button variant="primary" disabled={!newNode.nodeName.trim().length} onClick={handleCreateNode}>
                Create Node
            </Button>
        </Modal.Footer>
</Modal>
    );
}

const PaneConextMenu = ({paneContextMenu, setPaneContextMenu, setNodes, theme}) => {
    
    const [showModal, setShowModal] = useState(false);
    const [modalClosing, setModalClosing] = useState(false);

    const handleClose = () => {
        setShowModal(false);
        setModalClosing(true);
    };
    const handleShow = () => setShowModal(true);

    const handleAddNode = (e) => {
        handleShow();
    }

    return (
        <>
        <div style={{position: 'absolute', 
                        top: paneContextMenu.top, 
                        left: paneContextMenu.left, 
                        right: paneContextMenu.right, 
                        bottom: paneContextMenu.bottom, 
                        zIndex: 10}}>
            {(!showModal && !modalClosing) && <ButtonGroup vertical>
                <Button variant="light" onClick={handleAddNode}>Create New Node</Button>
                <Button variant="secondary" disabled>Reset Layout</Button>
            </ButtonGroup>}
        </div>
        <CreateNodeModal show={showModal} 
            handleClose={handleClose} 
            theme={theme.base} 
            setPaneContextMenu={setPaneContextMenu} 
            setModalClosing={setModalClosing}
            clickPosition={paneContextMenu.clickPos}
            setNodes={setNodes}
        />
        </>
    );
};

export default PaneConextMenu;