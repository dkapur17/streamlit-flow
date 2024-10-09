import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import ButtonGroup from "react-bootstrap/esm/ButtonGroup";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const EditEdgeModal = ({show, edge, nodes, edges, handleClose, theme, setEdgeContextMenu, setModalClosing, setEdges, handleDataReturnToStreamlit}) => {

    const [editedEdge, setEditedEdge] = useState(edge);
    
    const onExited = (e) => {
        setModalClosing(true);
        setEdgeContextMenu(null);
    }

    const onEdgeLabelChange = (e) => {
        setEditedEdge((editedEdge) => ({...editedEdge, label: e.target.value}));
    }

    const onEdgeTypeChange = (e) => {
        setEditedEdge((editedEdge) => ({...editedEdge, type: e.target.value}));
    }

    const onEdgeAnimatedChange = (e) => {
        setEditedEdge((editedEdge) => ({...editedEdge, animated: e.target.checked}));
    }

    const onEdgeDeletableChange = (e) => {
        setEditedEdge((editedEdge) => ({...editedEdge, deletable: e.target.checked}));
    }

    const onEdgeLabelShowBgChange = (e) => {
        setEditedEdge((editedEdge) => ({...editedEdge, labelShowBg: e.target.checked}));
    }

    const handleSaveChanges = (e) => {
        const updatedEdges = edges.map(ed => ed.id === editedEdge.id ? editedEdge : ed);
        setEdges(updatedEdges);
        handleDataReturnToStreamlit(nodes, updatedEdges, null);
        setEdgeContextMenu(null);
    };

    return (
        <Modal show={show} onHide={handleClose} data-bs-theme={theme} onExited={onExited}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Edge</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row className="g-2">
                    <Col md>
                        <FloatingLabel controlId="floatingInput" label="Edge Label">
                            <Form.Control type="text" placeholder="edgeLabel" value={editedEdge.label} autoFocus onChange={onEdgeLabelChange}/>
                        </FloatingLabel>
                    </Col>
                    <Col md>
                        <FloatingLabel controlId="floatingSelect" label="Edge Type">
                            <Form.Select aria-label="Edge Type" defaultValue={editedEdge.type} onChange={onEdgeTypeChange}>
                                <option value="default">Default</option>
                                <option value="straight">Straight</option>
                                <option value="step">Step</option>
                                <option value="smoothstep">Smooth Step</option>
                                <option value="simplebezier">Simple Bezier</option>
                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                </Row>
                <Row className="g-2 mt-1 mt-md-0">
                    <Col md>
                        <Form.Check type="switch" id="edgeAnimated" label="Animated" defaultChecked={editedEdge.animated} onChange={onEdgeAnimatedChange}/>
                    </Col>
                    <Col md>
                        <Form.Check type="switch" id="edgeDeletable" label="Deletable" defaultChecked={editedEdge.deletable} onChange={onEdgeDeletableChange}/>
                    </Col>
                    <Col md>
                        <Form.Check type="switch" id="edgeLabelShowBg" label="Label BG" defaultChecked={editedEdge.labelShowBg} onChange={onEdgeLabelShowBgChange}/>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={handleSaveChanges}>Save Changes</Button>
            </Modal.Footer>
        </Modal>
    );

}

const EdgeContextMenu = ({edgeContextMenu, nodes, edges, setEdgeContextMenu, setEdges, handleDataReturnToStreamlit, theme}) => {

    const [showModal, setShowModal] = useState(false);
    const [modalClosing, setModalClosing] = useState(false);

    const handleClose = () => {
        setShowModal(false);
        setModalClosing(true);
    };

    const handleShow = () => setShowModal(true);

    const handleEditEdge = (e) => {
        handleShow();
    }

    const handleDeleteEdge = (e) => {
        if(edgeContextMenu.edge.deletable)
        {
            const updatedEdges = edges.filter(edge => edge.id !== edgeContextMenu.edge.id);
            setEdges(updatedEdges);
            handleDataReturnToStreamlit(nodes, updatedEdges, null);
        }
        setEdgeContextMenu(null);
    }

    return (
        <>
        <div style={{position:'absolute',
                        top: edgeContextMenu.top,
                        left: edgeContextMenu.left,
                        right: edgeContextMenu.right,
                        bottom: edgeContextMenu.bottom,
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        zIndex: 10}}>
            {(!showModal && !modalClosing) && <ButtonGroup vertical>
                <Button variant="outline-primary" onClick={handleEditEdge}><i className="bi bi-tools"></i> Edit Edge</Button>
                <Button variant={edgeContextMenu.edge.deletable ? "outline-danger" : "secondary"} onClick={handleDeleteEdge} disabled={!edgeContextMenu.edge.deletable}><i className="bi bi-trash3"></i> Delete Edge</Button>
            </ButtonGroup>}
        </div>
        <EditEdgeModal show={showModal}
            edge={edgeContextMenu.edge}
            nodes={nodes}
            edges={edges}
            handleClose={handleClose}
            theme={theme.base}
            setEdgeContextMenu={setEdgeContextMenu}
            setModalClosing={setModalClosing}
            setEdges={setEdges}
            handleDataReturnToStreamlit={handleDataReturnToStreamlit}/>
        </>
    );
};

export default EdgeContextMenu;