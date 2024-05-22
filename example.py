import streamlit as st
from streamlit_flow import streamlit_flow
from streamlit_flow.interfaces import StreamlitFlowNode, StreamlitFlowEdge
from streamlit_flow.layouts import *


st.title("Streamlit Flow")

if 'count' not in st.session_state:
    st.session_state.count = 0

if 'init_nodes' not in st.session_state:
    st.session_state.init_nodes = [
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
            
        ]

    st.session_state.init_edges = [
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
            # StreamlitFlowEdge(
            #     id='3-4',
            #     source='3',
            #     target='4',
            #     animated=True,
            # ),
        ]
    
# if st.button("Add Node"):

#     st.session_state.init_nodes = [StreamlitFlowNode.from_dict(node) for node in st.session_state['my_flow']['nodes']]
#     st.session_state.init_edges = [StreamlitFlowEdge.from_dict(edge) for edge in st.session_state['my_flow']['edges']]

#     st.session_state.init_nodes.append(
#         StreamlitFlowNode(  id=str(len(st.session_state.init_nodes)+1), 
#                             pos=(200, 200), 
#                             data={"label": f"Node {len(st.session_state.init_nodes)+1}"},
#                             node_type="default",
#                             source_position='right',
#                             target_position='left'))
    
#     del st.session_state['my_flow']
    

ret = streamlit_flow(
    key="my_flow",
    init_nodes=st.session_state.init_nodes,
    init_edges=st.session_state.init_edges,
    fit_view=True,
    layout=TreeLayout(direction='right'),
    show_minimap=True,
    get_node_on_click=True,
    get_edge_on_click=True,
    animate_new_edges=True,
    allow_new_edges=True,
    enable_pane_menu=True,
    enable_node_menu=True,
    enable_edge_menu=True,
)

if ret:
    st.write(ret)


if st.button("Count Up"):
    st.session_state.count += 1

st.write(st.session_state.count)

with st.form("my_form"):
    val = st.text_input("Enter a value")
    if st.form_submit_button("Submit"):
        st.write(val)