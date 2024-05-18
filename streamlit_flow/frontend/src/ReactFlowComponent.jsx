import React, { useRef, useEffect, useState } from "react"
import { 
    Streamlit, 
    withStreamlitConnection
} from "streamlit-component-lib"

import ReactFlow, {
    Controls,
    Background,
    MiniMap,
    useNodesState,
    useEdgesState,
    addEdge,
    ReactFlowProvider,
    useReactFlow
} from 'reactflow';

import 'reactflow/dist/style.css';
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap-icons/font/bootstrap-icons.css";

import './style.css';
import PaneConextMenu from "./components/PaneContextMenu";
import NodeContextMenu from "./components/NodeContextMenu";


const ReactFlowComponent = (props) => {

    const [nodes, setNodes, onNodesChange] = useNodesState(props.args['nodes'])
    const [edges, setEdges, onEdgesChange] = useEdgesState(props.args['edges'])
    
    const [paneContextMenu, setPaneContextMenu] = useState(null);
    const [nodeContextMenu, setNodeContextMenu] = useState(null);

    const ref = useRef(null);
    const reactFlowInstance = useReactFlow();

    const onPaneContextMenu = (event) => {
        setNodeContextMenu(null);
        event.preventDefault();

        const pane = ref.current.getBoundingClientRect();
        setPaneContextMenu({
            top: event.clientY < pane.height - 200 && event.clientY,
            left: event.clientX < pane.width - 200 && event.clientX,
            right: event.clientX >= pane.width - 200 && pane.width - event.clientX,
            bottom: event.clientY >= pane.height - 200 && pane.height - event.clientY,
            clickPos: reactFlowInstance.screenToFlowPosition({
                x: event.clientX,
                y: event.clientY
            })
        });
    }

    const onNodeContextMenu = (event, node) => {
        setPaneContextMenu(null);
        event.preventDefault();
        const pane = ref.current.getBoundingClientRect();

        setNodeContextMenu({
            id: node.id,
            top: event.clientY < pane.height - 200 && event.clientY,
            left: event.clientX < pane.width - 200 && event.clientX,
            right: event.clientX >= pane.width - 200 && pane.width - event.clientX,
            bottom: event.clientY >= pane.height - 200 && pane.height - event.clientY,

        });
    }

    const onPaneClick = (event) => {
        setPaneContextMenu(null);
        setNodeContextMenu(null);
        handleDataReturnToStreamlit(null, nodes, edges);
    }

    const handleDataReturnToStreamlit = (selectedID, _nodes=null, _edges=null) => {
        Streamlit.setComponentValue({selectedID, nodes: _nodes ? _nodes : nodes, edges: edges? _edges : edges});
    }

    useEffect(() => Streamlit.setFrameHeight());

    useEffect(() => {
        setNodes(props.args['nodes']); 
        setEdges(props.args['edges']);
    }, [props.args])

    
    const onConnect = (params) => {
        const newEdges = addEdge({...params, animated:props.args["animateNewEdges"]}, edges);
        handleDataReturnToStreamlit(null, nodes, newEdges);
        setEdges(newEdges);
    }

    const onNodeClick = (e, node) => {
        setPaneContextMenu(null);
        setNodeContextMenu(null);
        if (props.args['getNodeOnClick'])
            handleDataReturnToStreamlit(node.id, nodes, edges);
    }

    const onEdgeClick = (e, edge) => {
        setPaneContextMenu(null);
        setNodeContextMenu(null);
        if (props.args['getEdgeOnClick'])
            handleDataReturnToStreamlit(edge.id, nodes, edges);
    }
    
    const onNodeDragStart = (event, node) => {
        setPaneContextMenu(null);
        setNodeContextMenu(null);
    }

    const onNodeDragStop = (event, node) => {
        handleDataReturnToStreamlit(null, nodes, edges);
    }

    const onMoveStart = (event, data) => {
        setPaneContextMenu(null);
        setNodeContextMenu(null);
    }


    return (
    <div style={{height: props.args["height"]}}>
        <ReactFlow
                ref={ref}
                nodes={nodes}
                onNodesChange={onNodesChange}
                edges={edges}
                onEdgesChange={onEdgesChange}
                onConnect={props.args.allowNewEdges ? onConnect: null}
                fitView={props.args["fitView"]}
                style={props.args["style"]}
                onNodeClick={onNodeClick}
                onEdgeClick={onEdgeClick}
                onNodeDragStart={onNodeDragStart}
                onNodeDragStop={onNodeDragStop}
                onNodeContextMenu={props.args.enableNodeMenu ? onNodeContextMenu: (event, node) => {}}
                panOnDrag={props.args.panOnDrag}
                onPaneContextMenu={props.args.enablePaneMenu ? onPaneContextMenu: (event) => {}}
                onPaneClick={onPaneClick}
                onMoveStart={onMoveStart}
            >
                <Background/>
                {paneContextMenu && <PaneConextMenu paneContextMenu={paneContextMenu} setPaneContextMenu={setPaneContextMenu} setNodes={setNodes} theme={props.theme} handleDataReturnToStreamlit={handleDataReturnToStreamlit}/>}
                {nodeContextMenu && <NodeContextMenu nodeContextMenu={nodeContextMenu} setNodeContextMenu={setNodeContextMenu} setNodes={setNodes} theme={props.theme} handleDataReturnToStreamlit={handleDataReturnToStreamlit}/>}
                {props.args["showControls"] && <Controls/>}
                {props.args["showMiniMap"] && <MiniMap/>}
        </ReactFlow>
    </div>
    );
}

const ContextualReactFlowComponent = (props) => {
    return (
        <ReactFlowProvider>
            <ReactFlowComponent {...props}/>
        </ReactFlowProvider>
    );
}

export default withStreamlitConnection(ContextualReactFlowComponent);