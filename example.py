import streamlit as st
from streamlit_flow import streamlit_flow
from streamlit_flow.elements import StreamlitFlowNode, StreamlitFlowEdge
from streamlit_flow.layouts import TreeLayout

st.title("Streamlit Flow Example")

nodes = [StreamlitFlowNode("1", (0, 0), {'label': 'Node 1'}, 'input', 'right'),
        StreamlitFlowNode("2", (1, 0), {'label': 'Node 2'}, 'default', 'right', 'left'),
        StreamlitFlowNode("3", (2, 0), {'label': 'Node 3'}, 'default', 'right', 'left'),
        StreamlitFlowNode("4", (2, 1), {'label': 'Node 4'}, 'output', target_position='left'),
        StreamlitFlowNode("5", (3, 0), {'label': 'Node 5'}, 'output', target_position='left'),
        StreamlitFlowNode("6", (3, 1), {'label': 'Node 6'}, 'output', target_position='left'),
        StreamlitFlowNode("7", (4, 0), {'label': 'Node 7'}, 'output', target_position='left'),]

edges = [StreamlitFlowEdge("1-2", "1", "2", animated=True),
        StreamlitFlowEdge("1-3", "1", "3", animated=True),
        StreamlitFlowEdge("2-4", "2", "4", animated=True),
        StreamlitFlowEdge("2-5", "2", "5", animated=True),
        StreamlitFlowEdge("3-6", "3", "6", animated=True),
        StreamlitFlowEdge("3-7", "3", "7", animated=True)]

streamlit_flow('example_flow', nodes, edges, layout=TreeLayout(direction='right'), fit_view=True)