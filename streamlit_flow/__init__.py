import os
import streamlit.components.v1 as components


from .elements import StreamlitFlowNode, StreamlitFlowEdge
from .layouts import Layout, ManualLayout
from .state import StreamlitFlowState

_RELEASE = False

if not _RELEASE:
    _st_flow_func = components.declare_component(
        "streamlit_flow",
        url="http://localhost:3001/",
    )

else:
    parent_dir = os.path.dirname(os.path.abspath(__file__))
    build_dir = os.path.join(parent_dir, "frontend/build")
    _st_flow_func = components.declare_component("streamlit_flow", path=build_dir)



def streamlit_flow(key:str,
                    state:StreamlitFlowState,
                    height:int=500,
                    fit_view:bool=False,
                    show_controls:bool=True,
                    show_minimap:bool=False,
                    allow_new_edges:bool=False,
                    animate_new_edges:bool=False,
                    style:dict={},
                    layout:Layout=ManualLayout(),
                    get_node_on_click:bool=False,
                    get_edge_on_click:bool=False,
                    pan_on_drag:bool=True,
                    allow_zoom:bool=True,
                    min_zoom:float=0.5,
                    enable_pane_menu:bool=False,
                    enable_node_menu:bool=False,
                    enable_edge_menu:bool=False,
                    hide_watermark:bool=False):
    
    """
    The main function to render the flowchart component in Streamlit.
    
    Arguments
    - **key** : str : A unique identifier for the component.
    - **state** : StreamlitFlowState : The current state of the flowchart component.
    - **height** : int : The height of the component in pixels.
    - **fit_view** : bool : Whether to fit the view of the component.
    - **show_controls** : bool : Whether to show the controls of the component.
    - **show_minimap** : bool : Whether to show the minimap of the component.
    - **allow_new_edges** : bool : Whether to allow new edges to be created.
    - **animate_new_edges** : bool : Whether to animate new edges created on the canvas.
    - **style** : dict : CSS style of the component.
    - **layout** : Layout : The layout of the nodes in the component.
    - **get_node_on_click** : bool : Whether to get the node on click.
    - **get_edge_on_click** : bool : Whether to get the edge on click.
    - **pan_on_drag** : bool : Whether to pan on drag.
    - **allow_zoom** : bool : Whether to allow zoom.
    - **min_zoom** : float : The minimum zoom level.
    - **enable_pane_menu** : bool : Whether to enable the pane menu.
    - **enable_node_menu** : bool : Whether to enable the node menu.
    - **enable_edge_menu** : bool : Whether to enable the edge menu.
    - **hide_watermark** : bool : Whether to hide the watermark.
    """

    nodes = [node.asdict() for node in state.nodes]
    edges = [edge.asdict() for edge  in state.edges]

    component_value = _st_flow_func(  nodes=nodes,
                                        edges=edges,
                                        height=height,
                                        showControls=show_controls,
                                        fitView=fit_view,
                                        showMiniMap=show_minimap,
                                        style=style,
                                        animateNewEdges=animate_new_edges,
                                        allowNewEdges=allow_new_edges,
                                        layoutOptions=layout.__to_dict__(),
                                        getNodeOnClick=get_node_on_click,
                                        getEdgeOnClick=get_edge_on_click,
                                        panOnDrag=pan_on_drag,
                                        allowZoom=allow_zoom,
                                        minZoom=min_zoom,
                                        enableNodeMenu=enable_node_menu,
                                        enablePaneMenu=enable_pane_menu,
                                        enableEdgeMenu=enable_edge_menu,
                                        hideWatermark=hide_watermark,
                                        key=key,
                                        timestamp=state.timestamp,
                                        component='streamlit_flow')
    
    
    if component_value is None:
        return state

    new_state = StreamlitFlowState(
        nodes=[StreamlitFlowNode.from_dict(node) for node in component_value['nodes']],
        edges=[StreamlitFlowEdge.from_dict(edge) for edge in component_value['edges']],
        selected_id=component_value['selectedId'],
        timestamp=component_value['timestamp']
    )

    return new_state
