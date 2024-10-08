import Elk from 'elkjs/lib/elk.bundled.js';


const createElkGraphLayout = async (graphNodes, graphEdges, options) => {

    const elk = new Elk({
        defaultLayoutOptions: options.elkOptions
    })

    const nodes = [...graphNodes]
    console.log(nodes);
    
    const edges = [...graphEdges]


    const newGraph = await elk.layout({
    id: 'root',
    children: nodes,
    edges: edges
    })

    return {nodes: nodes.map(node => {
        const n = newGraph.children.find(n => n.id === node.id)
        if (n?.x && n?.y && n?.width && n?.height) {
            node.position = {
            x: n.x - n.width / 2,
            y: n.y - n.height / 2
            }
        }
        return node
    }), edges}
}

export default createElkGraphLayout;