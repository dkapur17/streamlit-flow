import os
import streamlit.components.v1 as components
import streamlit as st

from typing import List

from .interfaces import StreamlitFlowNode, StreamlitFlowEdge

_RELEASE = False

if not _RELEASE:
    _component_func = components.declare_component(
        "streamlit_flow",
        url="http://localhost:3001",
    )
else:
    parent_dir = os.path.dirname(os.path.abspath(__file__))
    build_dir = os.path.join(parent_dir, "frontend/build")
    _component_func = components.declare_component("streamlit_flow", path=build_dir)


def streamlit_flow(key:str,
                    init_nodes:List[StreamlitFlowNode], 
                    init_edges:List[StreamlitFlowEdge], 
                    height:int=500, 
                    fit_view:bool=False,
                    show_controls:bool=True,
                    show_minimap:bool=False,
                    allow_new_edges:bool=False,
                    animate_new_edges:bool=False,
                    style:dict={},
                    direction:str="manual",
                    layout_vertical_spacing:int=75,
                    layout_horizontal_spacing:int=150,
                    get_node_on_click:bool=False,
                    get_edge_on_click:bool=False):
    
    assert direction in ["manual", "up", "down", "left", "right"], f"direction must be one of ['manual', 'up', 'down', 'left', 'right']. Got {direction}"


    if key not in st.session_state:
        nodes = [node.__to_dict__() for node in init_nodes]
        edges = [edge.__to_dict__() for edge in init_edges]
    else:
        nodes = st.session_state[key]['nodes']
        edges = st.session_state[key]['edges']

    component_value = _component_func(  nodes=nodes, 
                                        edges=edges, 
                                        height=height, 
                                        showControls=show_controls,
                                        fitView=fit_view,
                                        showMiniMap=show_minimap,
                                        style=style,
                                        animateNewEdges=animate_new_edges,
                                        allowNewEdges=allow_new_edges,
                                        layoutOptions={"direction": direction.upper(), "defaultHeight": layout_vertical_spacing, "defaultWidth": layout_horizontal_spacing},
                                        getNodeOnClick=get_node_on_click,
                                        getEdgeOnClick=get_edge_on_click,
                                        key=key)
    if component_value:
        return (component_value['selectedID'])