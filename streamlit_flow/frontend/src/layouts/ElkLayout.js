import Elk from 'elkjs/lib/elk.bundled.js';


const createElkGraphLayout = async (graphNodes, graphEdges, options) => {
    
    const {defaultHeight, defaultWidth} = options;

    const elk = new Elk({
        defaultLayoutOptions: options.elkOptions
    })

    const nodes = []
    
    graphNodes.forEach(node => {
        nodes.push({
            ...node,
            width: node.width || defaultWidth,
            height: node.height || defaultHeight
        })
    })
    
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
            x: n.x - n.width / 2 + Math.random() / 1000,
            y: n.y - n.height / 2
            }
        }
        return node
    }), edges}
}

export default createElkGraphLayout;