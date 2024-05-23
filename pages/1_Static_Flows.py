import streamlit as st
from streamlit_flow import streamlit_flow
from streamlit_flow.elements import StreamlitFlowNode, StreamlitFlowEdge


st.set_page_config(page_title="Static Flow Demo - Streamlit Flow", layout="wide")

st.title("Static Flow Demo")
st.markdown("""The default behavior of the `streamlit_flow` component is to behave only as means to render a flow diagram. 
This means the viewport can be adjusted and the nodes can be moved around, but no alterations to the contents of the flow can be made.
If you choose to, you can even disable the ability to move the nodes around or adjust the viewport. Below is an example of a fully static flow diagram.""")



nodes = [StreamlitFlowNode(id='1', pos=(100, 100), data={'label': 'Node 1'}, node_type='input', source_position='right', draggable=False),
        StreamlitFlowNode('2', (275, 50), {'label': 'Node 2'}, 'default', 'right', 'left', draggable=False),
        StreamlitFlowNode('3', (275, 150), {'label': 'Node 3'}, 'default', 'right', 'left', draggable=False),
        StreamlitFlowNode('4', (450, 100), {'label': 'Node 4'}, 'output', target_position='left', draggable=False)]

edges = [StreamlitFlowEdge('1-2', '1', '2', animated=True),
        StreamlitFlowEdge('1-3', '1', '3', animated=True),
        StreamlitFlowEdge('2-4', '2', '4', animated=True),
        StreamlitFlowEdge('3-4', '3', '4', animated=True)]

streamlit_flow('static_flow',
                nodes,
                edges,
                fit_view=True,
                show_minimap=False,
                show_controls=False,
                pan_on_drag=False,
                allow_zoom=False)

st.divider()

with st.expander("Spolier"):
    st.code("""
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

streamlit_flow('static_flow',
                nodes,
                edges,
                fit_view=True,
                show_minimap=False,
                show_controls=False,
                pan_on_drag=False,
                allow_zoom=False)
""")