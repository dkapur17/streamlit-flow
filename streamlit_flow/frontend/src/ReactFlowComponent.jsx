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


const ReactFlowComponent = (props) => {

    const [nodes, setNodes, onNodesChange] = useNodesState(props.args['nodes'])
    const [edges, setEdges, onEdgesChange] = useEdgesState(props.args['edges'])
    

    const handleDataReturnToStreamlit = (selectedID, nodes, edges) => {
        Streamlit.setComponentValue({selectedID, nodes, edges})
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
    if (props.args['getNodeOnClick'])
        handleDataReturnToStreamlit(node.id, nodes, edges);
    }

    const onEdgeClick = (e, edge) => {
    if (props.args['getEdgeOnClick'])
        handleDataReturnToStreamlit(edge.id, nodes, edges);
    }

    const onNodeDragStop = (event, node) => {
        handleDataReturnToStreamlit(null, nodes, edges);
    }


    return (
    <div style={{height: props.args["height"]}}>
        <ReactFlowProvider>
            <ReactFlow
                nodes={nodes}
                onNodesChange={onNodesChange}
                edges={edges}
                onEdgesChange={onEdgesChange}
                onConnect={props.args.allowNewEdges ? onConnect: null}
                fitView={props.args["fitView"]}
                style={props.args["style"]}
                onNodeClick={onNodeClick}
                onEdgeClick={onEdgeClick}
                onNodeDragStop={onNodeDragStop}
                panOnDrag={props.args.panOnDrag}
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