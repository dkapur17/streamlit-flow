import streamlit as st
from streamlit_flow import streamlit_flow
from streamlit_flow.elements import StreamlitFlowNode, StreamlitFlowEdge
import random

st.set_page_config(page_title="Hackable State Demo - Streamlit Flow", layout="wide")

st.title("Hackable State Demo")

st.markdown("""Since the internal state of the `streamlit_flow` component is exposed through the session state, it is possible to manipulate the flow diagram from the Python side.
While this is not the recommended way of using this component, as the complex state management may cause unexpected behavior. Nevertheless, it is possible and 
below is an example of how to do this.""")

if 'nodes' not in st.session_state:
    st.session_state['nodes'] = []
    st.session_state['edges'] = []
    st.session_state['flow_key'] = f'hackable_flow_{random.randint(0, 1000)}'


streamlit_flow(st.session_state['flow_key'],
                st.session_state['nodes'],
                st.session_state['edges'],
                fit_view=True,
                allow_new_edges=True)

if st.button("Add Node"):
    new_node = StreamlitFlowNode(id=str(len(st.session_state['nodes']) + 1), pos=(100, 100), data={'label': f'Node {len(st.session_state["nodes"]) + 1}'}, connectable=True)
    flow_key = st.session_state['flow_key']
    if flow_key in st.session_state and flow_key:
        new_nodes = [StreamlitFlowNode.from_dict(node) for node in st.session_state[flow_key]['nodes']]
        new_nodes.append(new_node)
        new_edges = [StreamlitFlowEdge.from_dict(edge) for edge in st.session_state[flow_key]['edges']]
        st.session_state['nodes'] = new_nodes
        st.session_state['edges'] = new_edges
        del st.session_state[flow_key]
        st.session_state['flow_key'] = f'hackable_flow_{random.randint(0, 1000)}'
        st.rerun()

with st.expander("Spolier"):

    st.code("""
import streamlit as st
from streamlit_flow import streamlit_flow
from streamlit_flow.elements import StreamlitFlowNode, StreamlitFlowEdge
import random

if 'nodes' not in st.session_state:
    st.session_state['nodes'] = []
    st.session_state['edges'] = []
    st.session_state['flow_key'] = f'hackable_flow_{random.randint(0, 1000)}'


streamlit_flow(st.session_state['flow_key'],
                st.session_state['nodes'],
                st.session_state['edges'],
                fit_view=True,
                allow_new_edges=True)

if st.button("Add Node"):
    new_node = StreamlitFlowNode(id=str(len(st.session_state['nodes']) + 1), pos=(100, 100), data={'label': f'Node {len(st.session_state["nodes"]) + 1}'}, connectable=True)
    flow_key = st.session_state['flow_key']
    if flow_key in st.session_state and flow_key:
        new_nodes = [StreamlitFlowNode.from_dict(node) for node in st.session_state[flow_key]['nodes']]
        new_nodes.append(new_node)
        new_edges = [StreamlitFlowEdge.from_dict(edge) for edge in st.session_state[flow_key]['edges']]
        st.session_state['nodes'] = new_nodes
        st.session_state['edges'] = new_edges
            
        # Delete the old key from the state and make a new key so that streamlit is 
        # forced to re-render the component with the updated node list
        del st.session_state[flow_key]
        st.session_state['flow_key'] = f'hackable_flow_{random.randint(0, 1000)}'
        
        st.rerun()

""")