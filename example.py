import streamlit as st
from streamlit_flow import streamlit_flow
from streamlit_flow.interfaces import StreamlitFlowNode, StreamlitFlowEdge


st.title("Streamlit Flow")
element = streamlit_flow(
    nodes=[
        StreamlitFlowNode(  id="1", 
                            pos=(100, 100), 
                            data={"label": "Node 1"},
                            node_type="input",
                            source_position='right'),
        StreamlitFlowNode(  id="2", 
                            pos=(200, 200), 
                            data={"label": "Node 2"},
                            node_type="default",
                            source_position='right',
                            target_position='left'),
        StreamlitFlowNode(  id="3", 
                            pos=(200, 200), 
                            data={"label": "Node 3"},
                            node_type="default",
                            source_position='right',
                            target_position='left'),
        StreamlitFlowNode(  id="4", 
                            pos=(200, 200), 
                            data={"label": "Node 4"},
                            node_type="output",
                            target_position='left'),
        
    ],
    edges=[
        StreamlitFlowEdge(
            id='1-2',
            source='1',
            target='2',
            animated=True,
        ),
        StreamlitFlowEdge(
            id='1-3',
            source='1',
            target='3',
            animated=True,
        ),
        StreamlitFlowEdge(
            id='2-4',
            source='2',
            target='4',
            animated=True,
        ),
        StreamlitFlowEdge(
            id='3-4',
            source='3',
            target='4',
            animated=True,
        ),
    ],
    fit_view=True,
    direction='right',
    show_minimap=True,
    get_node_on_click=True,
    get_edge_on_click=True
)

if element:
    st.write(f"Currently selected {element['elementType']} {element['id']}")