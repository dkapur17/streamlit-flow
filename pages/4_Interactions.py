import streamlit as st
from streamlit_flow import streamlit_flow
from streamlit_flow.elements import StreamlitFlowNode, StreamlitFlowEdge
from streamlit_flow.layouts import TreeLayout

st.set_page_config(page_title="Interactions - Streamlit Flow", layout="wide")

st.title("Interactions")


st.markdown("This example demonstrates how the two types of interactions supported by Streamlit Flow.")

st.markdown("### 1. Getting Interaction Element")

st.markdown("We can set the `get_node_on_click` and the `get_edge_on_click` parameters to `True` to get the id of the element that was clicked on.")

nodes = [StreamlitFlowNode(id='1', pos=(100, 100), data={'label': 'Node 1'}, node_type='input', source_position='right', draggable=False),
        StreamlitFlowNode('2', (275, 50), {'label': 'Node 2'}, 'default', 'right', 'left', draggable=False),
        StreamlitFlowNode('3', (275, 150), {'label': 'Node 3'}, 'default', 'right', 'left', draggable=False),
        StreamlitFlowNode('4', (450, 100), {'label': 'Node 4'}, 'output', target_position='left', draggable=False)]

edges = [StreamlitFlowEdge('1-2', '1', '2', animated=True),
        StreamlitFlowEdge('1-3', '1', '3', animated=True),
        StreamlitFlowEdge('2-4', '2', '4', animated=True),
        StreamlitFlowEdge('3-4', '3', '4', animated=True)]

selected_id = streamlit_flow('ret_val_flow',
                nodes,
                edges,
                fit_view=True,
                get_node_on_click=True,
                get_edge_on_click=True)

st.write(f"Clicked on: {selected_id}")

with st.expander("Spoiler"):
    st.code("""
import streamlit as st
from streamlit_flow import streamlit_flow
from streamlit_flow.elements import StreamlitFlowNode, StreamlitFlowEdge
    
nodes = [StreamlitFlowNode(id='1', pos=(100, 100), data={'label': 'Node 1'}, node_type='input', source_position='right', draggable=False),
        StreamlitFlowNode('2', (275, 50), {'label': 'Node 2'}, 'default', 'right', 'left', draggable=False),
        StreamlitFlowNode('3', (275, 150), {'label': 'Node 3'}, 'default', 'right', 'left', draggable=False),
        StreamlitFlowNode('4', (450, 100), {'label': 'Node 4'}, 'output', target_position='left', draggable=False)]

edges = [StreamlitFlowEdge('1-2', '1', '2', animated=True),
        StreamlitFlowEdge('1-3', '1', '3', animated=True),
        StreamlitFlowEdge('2-4', '2', '4', animated=True),
        StreamlitFlowEdge('3-4', '3', '4', animated=True)]

selected_id = streamlit_flow('ret_val_flow',
                nodes,
                edges,
                fit_view=True,
                get_node_on_click=True,
                get_edge_on_click=True)

st.write(f"Clicked on: {selected_id}")
""")

st.markdown("### 2. Creating flows within the Canvas")

st.markdown("""The Streamlit Flow component can be set to become a fully interactive flow diagram builder. 
Right click either on the pane, a node or an edge to see the relevant context-aware menu. 
New edges can be created by dragging from one node's source to another node's target.
Further you get access to all the items in the flow by using the `key` of the component as a key in the `st.session_state`.
Try it yourself!""")

streamlit_flow('fully_interactive_flow', 
               [], 
               [],
               fit_view=True,
               show_controls=True,
               allow_new_edges=True,
               animate_new_edges=True,
               layout=TreeLayout("right"),
                enable_pane_menu=True,
                enable_edge_menu=True,
                enable_node_menu=True,
)

if 'fully_interactive_flow' in st.session_state and st.session_state['fully_interactive_flow']:
    col1, col2 = st.columns(2)
    col1.metric("Nodes", len(st.session_state['fully_interactive_flow']['nodes']))
    col2.metric("Edges", len(st.session_state['fully_interactive_flow']['edges']))
else:
    st.write("No elements in the flow")

with st.expander("Spoiler"):
    st.code("""
from streamlit_flow import streamlit_flow

streamlit_flow('fully_interactive_flow', 
                [], 
                [],
                fit_view=True,
                show_controls=True,
                allow_new_edges=True,
                animate_new_edges=True,
                layout=TreeLayout("right"),
                enable_pane_menu=True,
                enable_edge_menu=True,
                enable_node_menu=True,
)

if 'fully_interactive_flow' in st.session_state and st.session_state['fully_interactive_flow']:
    col1, col2 = st.columns(2)
    col1.metric("Nodes", len(st.session_state['fully_interactive_flow']['nodes']))
    col2.metric("Edges", len(st.session_state['fully_interactive_flow']['edges']))
""")
