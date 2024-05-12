const PaneConextMenu = (paneContextMenu) => {
    
    return (
        <div style={{position: 'absolute', 
                        top: paneContextMenu.top, 
                        left: paneContextMenu.left, 
                        right: paneContextMenu.right, 
                        bottom: paneContextMenu.bottom, 
                        background: 'white',
                        color: 'black', 
                        border: '1px solid black', 
                        zIndex: 10}}>
            Pane Context Menu
        </div>
    );
};

export default PaneConextMenu;