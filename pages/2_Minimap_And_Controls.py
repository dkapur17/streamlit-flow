import streamlit as st
from streamlit_flow import streamlit_flow
from streamlit_flow.elements import StreamlitFlowNode, StreamlitFlowEdge

st.set_page_config(page_title="Minimap and Controls Demo - Streamlit Flow", layout="wide")

st.title("Minimap and Controls Demo")
st.markdown("""The `streamlit_flow` component comes with a few features that can be enabled or disabled as needed.
Take for example the Controls Bar and Mini-map - they make navigating the flow canvas much simpler.
Here is a minimally interactive flow diagram with both the Controls Bar and Mini-map enabled.""")


nodes = [StreamlitFlowNode(id='1', pos=(100, 100), data={'label': 'Node 1'}, node_type='input', source_position='right'),
        StreamlitFlowNode('2', (275, 50), {'label': 'Node 2'}, 'default', 'right', 'left'),
        StreamlitFlowNode('3', (275, 150), {'label': 'Node 3'}, 'default', 'right', 'left'),
        StreamlitFlowNode('4', (450, 100), {'label': 'Node 4'}, 'output', target_position='left')]

edges = [StreamlitFlowEdge('1-2', '1', '2', animated=True),
        StreamlitFlowEdge('1-3', '1', '3', animated=True),
        StreamlitFlowEdge('2-4', '2', '4', animated=True),
        StreamlitFlowEdge('3-4', '3', '4', animated=True)]

streamlit_flow('static_flow',
                nodes,
                edges,
                fit_view=True,
                show_minimap=True,
                show_controls=True)

st.divider()

with st.expander("Spolier"):
    st.code("""
from streamlit_flow import streamlit_flow
from streamlit_flow.elements import StreamlitFlowNode, StreamlitFlowEdge
        
nodes = [StreamlitFlowNode(id='1', pos=(100, 100), data={'label': 'Node 1'}, node_type='input', source_position='right'),
        StreamlitFlowNode('2', (275, 50), {'label': 'Node 2'}, 'default', 'right', 'left'),
        StreamlitFlowNode('3', (275, 150), {'label': 'Node 3'}, 'default', 'right', 'left'),
        StreamlitFlowNode('4', (450, 100), {'label': 'Node 4'}, 'output', target_position='left')]

edges = [StreamlitFlowEdge('1-2', '1', '2', animated=True),
        StreamlitFlowEdge('1-3', '1', '3', animated=True),
        StreamlitFlowEdge('2-4', '2', '4', animated=True),
        StreamlitFlowEdge('3-4', '3', '4', animated=True)]

streamlit_flow('static_flow',
                nodes,
                edges,
                fit_view=True,
                show_minimap=True,
                show_controls=True)
""")  
