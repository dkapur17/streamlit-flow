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
    const renderData = props;

    const [nodes, setNodes, onNodesChange] = useNodesState()
    const [edges, setEdges, onEdgesChange] = useEdgesState()
    
    useEffect(() => Streamlit.setFrameHeight());

    useEffect(() => {
    createElkGraphLayout(renderData.args["nodes"], renderData.args["edges"], renderData.args["layoutOptions"])
        .then(({nodes, edges}) => {
        setNodes(nodes);
        setEdges(edges);
        })
        .catch(err => console.log(err))
    }, []);

    const onConnect = useCallback(
    params => setEdges(eds => addEdge({...params, animated:renderData.args["animateNewEdges"]}, eds)),
    []
    )

    const onNodeClick = (e, node) => {
    if (renderData.args['getNodeOnClick'])
        Streamlit.setComponentValue({elementType: 'node', ...node})
    }

    const onEdgeClick = (e, edge) => {
    if (renderData.args['getEdgeOnClick'])
        Streamlit.setComponentValue({elementType: 'edge', ...edge})
    }

    return (
    <div style={{height: renderData.args["height"]}}>
        <ReactFlowProvider>
            <ReactFlow
                nodes={nodes}
                onNodesChange={onNodesChange}
                edges={edges}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView={renderData.args["fitView"]}
                style={renderData.args["style"]}
                onNodeClick={onNodeClick}
                onEdgeClick={onEdgeClick}
            >
                <Background/>
                {renderData.args["showControls"] && <Controls/>}
                {renderData.args["showMiniMap"] && <MiniMap/>}
            </ReactFlow>
        </ReactFlowProvider>
    </div>
    );
}

export default withStreamlitConnection(ReactFlowComponent);