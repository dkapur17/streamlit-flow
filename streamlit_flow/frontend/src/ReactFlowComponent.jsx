import React, { useRef, useEffect, useState, useCallback } from "react"
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
    useReactFlow,
    Panel
} from 'reactflow';

import 'reactflow/dist/style.css';
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap-icons/font/bootstrap-icons.css";

import './style.css';
import PaneConextMenu from "./components/PaneContextMenu";
import NodeContextMenu from "./components/NodeContextMenu";
import EdgeContextMenu from "./components/EdgeContextMenu";

import createElkGraphLayout from "./layouts/ElkLayout";

const ReactFlowComponent = (props) => {


    const [viewFitAfterLayout, setViewFitAfterLayout] = useState(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(props.args['nodes']);
    const [edges, setEdges, onEdgesChange] = useEdgesState(props.args['edges']);
    
    const [paneContextMenu, setPaneContextMenu] = useState(null);
    const [nodeContextMenu, setNodeContextMenu] = useState(null);
    const [edgeContextMenu, setEdgeContextMenu] = useState(null);

    const ref = useRef(null);
    const reactFlowInstance = useReactFlow();
    const {fitView} = useReactFlow();

    useEffect(() => Streamlit.setFrameHeight());

    useEffect(() => {
        console.log(props.args['layoutOptions'])
        createElkGraphLayout(props.args["nodes"], props.args["edges"], props.args["layoutOptions"])
            .then(({nodes, edges}) => {
                setNodes(nodes);
                setEdges(edges);
                setViewFitAfterLayout(false);
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        setNodes(props.args['nodes']); 
        setEdges(props.args['edges']);
    }, [props.args])

    useEffect(() => {
        if (!viewFitAfterLayout && props.args["fitView"])
            {
                fitView();
                setViewFitAfterLayout(true);
            }
        }, [viewFitAfterLayout, props.args["fitView"]]);

    const onPaneContextMenu = (event) => {
        setNodeContextMenu(null);
        setEdgeContextMenu(null);
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
        setNodeContextMenu(null);
        event.preventDefault();
        const pane = ref.current.getBoundingClientRect();

        setNodeContextMenu({
            node: node,
            top: event.clientY < pane.height - 200 && event.clientY,
            left: event.clientX < pane.width - 200 && event.clientX,
            right: event.clientX >= pane.width - 200 && pane.width - event.clientX,
            bottom: event.clientY >= pane.height - 200 && pane.height - event.clientY,

        });
    }

    const onEdgeContextMenu = (event, edge) => {
        setPaneContextMenu(null);
        setNodeContextMenu(null);
        event.preventDefault();
        const pane = ref.current.getBoundingClientRect();

        setEdgeContextMenu({
            edge: edge,
            top: event.clientY < pane.height - 200 && event.clientY,
            left: event.clientX < pane.width - 200 && event.clientX,
            right: event.clientX >= pane.width - 200 && pane.width - event.clientX,
            bottom: event.clientY >= pane.height - 200 && pane.height - event.clientY
        });
    }

    const onPaneClick = (event) => {
        setPaneContextMenu(null);
        setNodeContextMenu(null);
        setEdgeContextMenu(null);
        handleDataReturnToStreamlit(null, nodes, edges);
    }

    const handleDataReturnToStreamlit = (selectedID, _nodes=null, _edges=null) => {
        Streamlit.setComponentValue({selectedID, nodes: _nodes ? _nodes : nodes, edges: edges? _edges : edges});
    }

    const onConnect = (params) => {
        const newEdges = addEdge({...params, animated:props.args["animateNewEdges"]}, edges);
        handleDataReturnToStreamlit(null, nodes, newEdges);
        setEdges(newEdges);
    }

    const onNodeClick = (e, node) => {
        setPaneContextMenu(null);
        setNodeContextMenu(null);
        setEdgeContextMenu(null);
        if (props.args['getNodeOnClick'])
            handleDataReturnToStreamlit(node.id, nodes, edges);
    }

    const onEdgeClick = (e, edge) => {
        setPaneContextMenu(null);
        setNodeContextMenu(null);
        setEdgeContextMenu(null);
        if (props.args['getEdgeOnClick'])
            handleDataReturnToStreamlit(edge.id, nodes, edges);
    }
    
    const onNodeDragStart = (event, node) => {
        setPaneContextMenu(null);
        setNodeContextMenu(null);
        setEdgeContextMenu(null);
    }

    const onNodeDragStop = (event, node) => {
        handleDataReturnToStreamlit(null, nodes, edges);
    }

    const onMoveStart = (event, data) => {
        setPaneContextMenu(null);
        setNodeContextMenu(null);
        setEdgeContextMenu(null);
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
                onEdgeContextMenu={props.args.enableEdgeMenu ? onEdgeContextMenu: (event, edge) => {}}
                onMoveStart={onMoveStart}
            >
                <Background/>
                {paneContextMenu && <PaneConextMenu paneContextMenu={paneContextMenu} setPaneContextMenu={setPaneContextMenu} nodes={nodes} edges={edges} setNodes={setNodes} layoutOptions={props.args['layoutOptions']} theme={props.theme}/>}
                {nodeContextMenu && <NodeContextMenu nodeContextMenu={nodeContextMenu} setNodeContextMenu={setNodeContextMenu} setNodes={setNodes} theme={props.theme} edges={edges}/>}
                {edgeContextMenu && <EdgeContextMenu edgeContextMenu={edgeContextMenu} setEdgeContextMenu={setEdgeContextMenu} setEdges={setEdges} theme={props.theme}/>}
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