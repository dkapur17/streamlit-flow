import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

const CreateNodeModal = ({show, handleClose, theme, setPaneContextMenu, setModalClosing, clickPosition}) => {
    
    const [nodeName, setNodeName] = useState('');
    const [nodeType, setNodeType] = useState('default');

    const onNodeNameChange = (e) => {
        setNodeName(e.target.value);
    }

    const onNodeTypeChange = (e) => {
        setNodeType(e.target.value);
    }

    const onExited = (e) => {
        setModalClosing(true);
        setPaneContextMenu(null);
    }

    const handleCreateNode = (e) => {
        console.log(`Creating node with name: ${nodeName} and type: ${nodeType} at position: ${clickPosition.x}, ${clickPosition.y}`);
        setNodeName('');
        setNodeType('default');
        handleClose();
    }

    return (
        <Modal show={show} onHide={handleClose} data-bs-theme={theme} onExited={onExited}>
        <Modal.Header closeButton>
            <Modal.Title>Create New Node</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <FloatingLabel
                controlId="floatingInput"
                label="Node Name"
                className="mb-3"
            >
                <Form.Control type="text" placeholder="nodeName" autoFocus onChange={onNodeNameChange}/>
            </FloatingLabel>
            <FloatingLabel controlId="floatingSelect" label="Node Type" onChange={onNodeTypeChange}>
                <Form.Select>
                    <option value="default">Default</option>
                    <option value="input">Input</option>
                    <option value="output">Output</option>
                </Form.Select>
            </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" disabled={!nodeName.trim().length} onClick={handleCreateNode}>
                Create Node
            </Button>
        </Modal.Footer>
</Modal>
    );
}

const PaneConextMenu = ({paneContextMenu, setPaneContextMenu, theme}) => {
    
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
        />
        </>
    );
};

export default PaneConextMenu;