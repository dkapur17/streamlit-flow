import React, { useCallback, useEffect } from "react"
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
    ReactFlowProvider
} from 'reactflow';

import 'reactflow/dist/style.css';
import createElkGraphLayout from "./layouts/ElkLayout"


const ReactFlowComponent = (props) => {

    const [nodes, setNodes, onNodesChange] = useNodesState()
    const [edges, setEdges, onEdgesChange] = useEdgesState()
    
    useEffect(() => Streamlit.setFrameHeight());

    useEffect(() => {
    createElkGraphLayout(props.args["nodes"], props.args["edges"], props.args["layoutOptions"])
        .then(({nodes, edges}) => {
        setNodes(nodes);
        setEdges(edges);
        })
        .catch(err => console.log(err))
    }, []);

    const onConnect = useCallback(
    params => setEdges(eds => addEdge({...params, animated:props.args["animateNewEdges"]}, eds)),
    []
    )

    const onNodeClick = (e, node) => {
    if (props.args['getNodeOnClick'])
        Streamlit.setComponentValue({elementType: 'node', ...node})
    }

    const onEdgeClick = (e, edge) => {
    if (props.args['getEdgeOnClick'])
        Streamlit.setComponentValue({elementType: 'edge', ...edge})
    }

    return (
    <div style={{height: props.args["height"]}}>
        <ReactFlowProvider>
            <ReactFlow
                nodes={nodes}
                onNodesChange={onNodesChange}
                edges={edges}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView={props.args["fitView"]}
                style={props.args["style"]}
                onNodeClick={onNodeClick}
                onEdgeClick={onEdgeClick}
            >
                <Background/>
                {props.args["showControls"] && <Controls/>}
                {props.args["showMiniMap"] && <MiniMap/>}
            </ReactFlow>
        </ReactFlowProvider>
    </div>
    );
}

export default withStreamlitConnection(ReactFlowComponent);