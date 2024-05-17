const NodeContextMenu = ({nodeContextMenu}) => {
    
    return (
        <div style={{position: 'absolute', 
                        top: nodeContextMenu.top, 
                        left: nodeContextMenu.left, 
                        right: nodeContextMenu.right, 
                        bottom: nodeContextMenu.bottom, 
                        background: 'white',
                        color: 'black', 
                        border: '1px solid black', 
                        zIndex: 10}}>
            Node Context Menu {nodeContextMenu.id}
        </div>
    );
};

export default NodeContextMenu;