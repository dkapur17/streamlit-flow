from typing import Dict
import streamlit as st
from streamlit_flow import streamlit_flow
from streamlit_flow.elements import StreamlitFlowNode, StreamlitFlowEdge
from streamlit_flow.layouts import *

st.set_page_config(page_title="Layouts - Streamlit Flow", layout="wide")

nodes = [StreamlitFlowNode(id='1', pos=(0, 0), data={'label': 'Node 1'}, node_type='input', source_position='right'),
        StreamlitFlowNode('2', (0, 0), {'label': 'Node 2'}, 'default', 'right', 'left'),
        StreamlitFlowNode('3', (0, 0), {'label': 'Node 3'}, 'default', 'right', 'left'),
        StreamlitFlowNode('4', (0, 0), {'label': 'Node 4'}, 'output', target_position='left'),
        StreamlitFlowNode('5', (0, 0), {'label': 'Node 5'}, 'output', target_position='left'),
        StreamlitFlowNode('6', (0, 0), {'label': 'Node 6'}, 'output', target_position='left'),
        StreamlitFlowNode('7', (0, 0), {'label': 'Node 7'}, 'output', target_position='left'),]

edges = [StreamlitFlowEdge('1-2', '1', '2', animated=True),
        StreamlitFlowEdge('1-3', '1', '3', animated=True),
        StreamlitFlowEdge('2-4', '2', '4', animated=True),
        StreamlitFlowEdge('2-5', '2', '5', animated=True),
        StreamlitFlowEdge('3-6', '3', '6', animated=True),
        StreamlitFlowEdge('3-7', '3', '7', animated=True),
        ]

st.title("Layouts")

st.markdown("Streamlit flow provides easy to use layouts to automatically arrange the nodes in the flow diagram.")

st.header("Tree Layout")

st.markdown("Tree-based algorithm provided by the Eclipse Layout Kernel. Computes a spanning tree of the input graph and arranges all nodes according to the resulting parent-children hierarchy. I pity the fool who doesn't use Mr. Tree Layout.")
st.link_button("Read More", "https://eclipse.dev/elk/reference/algorithms/org-eclipse-elk-mrtree.html")
col1, col2 = st.columns(2)
with col1:
    streamlit_flow('tree_layout', nodes, edges, layout=TreeLayout(direction='right'), fit_view=True)


with col2:
    st.code("""
from streamlit_flow import streamlit_flow
from streamlit_flow.elements import StreamlitFlowNode, StreamlitFlowEdge 
from streamlit_flow.layouts import TreeLayout
        
nodes = [StreamlitFlowNode(id='1', pos=(0, 0), data={'label': 'Node 1'}, node_type='input', source_position='right'),
        StreamlitFlowNode('2', (0, 0), {'label': 'Node 2'}, 'default', 'right', 'left'),
        StreamlitFlowNode('3', (0, 0), {'label': 'Node 3'}, 'default', 'right', 'left'),
        StreamlitFlowNode('4', (0, 0), {'label': 'Node 4'}, 'output', target_position='left'),
        StreamlitFlowNode('5', (0, 0), {'label': 'Node 5'}, 'output', target_position='left'),
        StreamlitFlowNode('6', (0, 0), {'label': 'Node 6'}, 'output', target_position='left'),
        StreamlitFlowNode('7', (0, 0), {'label': 'Node 7'}, 'output', target_position='left'),]

edges = [StreamlitFlowEdge('1-2', '1', '2', animated=True),
        StreamlitFlowEdge('1-3', '1', '3', animated=True),
        StreamlitFlowEdge('2-4', '2', '4', animated=True),
        StreamlitFlowEdge('2-5', '2', '5', animated=True),
        StreamlitFlowEdge('3-6', '3', '6', animated=True),
        StreamlitFlowEdge('3-7', '3', '7', animated=True),
        ]

streamlit_flow('tree_layout', nodes, edges, layout=TreeLayout(direction='right'), fit_view=True)""")
    
st.header("Layered Layout")

st.markdown("Layer-based algorithm provided by the Eclipse Layout Kernel. Arranges as many edges as possible into one direction by placing nodes into subsequent layers. This implementation supports different routing styles (straight, orthogonal, splines); if orthogonal routing is selected, arbitrary port constraints are respected, thus enabling the layout of block diagrams such as actor-oriented models or circuit schematics. Furthermore, full layout of compound graphs with cross-hierarchy edges is supported when the respective option is activated on the top level.")
st.link_button("Read More", "https://eclipse.dev/elk/reference/algorithms/org-eclipse-elk-layered.html")
col1, col2 = st.columns(2)

with col1:
    streamlit_flow('layered_layout', nodes, edges, layout=LayeredLayout(direction='right'), fit_view=True)


with col2:
    st.code("""
from streamlit_flow import streamlit_flow
from streamlit_flow.elements import StreamlitFlowNode, StreamlitFlowEdge 
from streamlit_flow.layouts import LayeredLayout
        
nodes = [StreamlitFlowNode(id='1', pos=(0, 0), data={'label': 'Node 1'}, node_type='input', source_position='right'),
        StreamlitFlowNode('2', (0, 0), {'label': 'Node 2'}, 'default', 'right', 'left'),
        StreamlitFlowNode('3', (0, 0), {'label': 'Node 3'}, 'default', 'right', 'left'),
        StreamlitFlowNode('4', (0, 0), {'label': 'Node 4'}, 'output', target_position='left'),
        StreamlitFlowNode('5', (0, 0), {'label': 'Node 5'}, 'output', target_position='left'),
        StreamlitFlowNode('6', (0, 0), {'label': 'Node 6'}, 'output', target_position='left'),
        StreamlitFlowNode('7', (0, 0), {'label': 'Node 7'}, 'output', target_position='left'),]

edges = [StreamlitFlowEdge('1-2', '1', '2', animated=True),
        StreamlitFlowEdge('1-3', '1', '3', animated=True),
        StreamlitFlowEdge('2-4', '2', '4', animated=True),
        StreamlitFlowEdge('2-5', '2', '5', animated=True),
        StreamlitFlowEdge('3-6', '3', '6', animated=True),
        StreamlitFlowEdge('3-7', '3', '7', animated=True),
        ]

streamlit_flow('tree_layout', nodes, edges, layout=LayeredLayout(direction='right'), fit_view=True)""")
    
st.header("Radial Layout")

st.markdown("A radial layout provider which is based on the algorithm of Peter Eades published in “Drawing free trees.”, published by International Institute for Advanced Study of Social Information Science, Fujitsu Limited in 1991. The radial layouter takes a tree and places the nodes in radial order around the root. The nodes of the same tree level are placed on the same radius.")
st.link_button("Read More", "https://eclipse.dev/elk/reference/algorithms/org-eclipse-elk-radial.html")

col1, col2 = st.columns(2)

with col1:
    streamlit_flow('radial_layout', nodes, edges, layout=RadialLayout(), fit_view=True)


with col2:
    st.code("""
from streamlit_flow import streamlit_flow
from streamlit_flow.elements import StreamlitFlowNode, StreamlitFlowEdge
from streamlit_flow.layouts import RadialLayout
            
nodes = [StreamlitFlowNode(id='1', pos=(0, 0), data={'label': 'Node 1'}, node_type='input', source_position='right'),
        StreamlitFlowNode('2', (0, 0), {'label': 'Node 2'}, 'default', 'right', 'left'),
        StreamlitFlowNode('3', (0, 0), {'label': 'Node 3'}, 'default', 'right', 'left'),
        StreamlitFlowNode('4', (0, 0), {'label': 'Node 4'}, 'output', target_position='left'),
        StreamlitFlowNode('5', (0, 0), {'label': 'Node 5'}, 'output', target_position='left'),
        StreamlitFlowNode('6', (0, 0), {'label': 'Node 6'}, 'output', target_position='left'),
        StreamlitFlowNode('7', (0, 0), {'label': 'Node 7'}, 'output', target_position='left'),]
        
edges = [StreamlitFlowEdge('1-2', '1', '2', animated=True),
        StreamlitFlowEdge('1-3', '1', '3', animated=True),
        StreamlitFlowEdge('2-4', '2', '4', animated=True),
        StreamlitFlowEdge('2-5', '2', '5', animated=True),
        StreamlitFlowEdge('3-6', '3', '6', animated=True),
        StreamlitFlowEdge('3-7', '3', '7', animated=True),
        ]
            
streamlit_flow('radial_layout', nodes, edges, layout=RadialLayout(), fit_view=True)""")


st.header("Force Layout")

st.markdown("Force-based algorithm provided by the Eclipse Layout Kernel. Implements methods that follow physical analogies by simulating forces that move the nodes into a balanced distribution. Currently the original Eades model and the Fruchterman - Reingold model are supported.")
st.link_button("Read More", "https://eclipse.dev/elk/reference/algorithms/org-eclipse-elk-force.html")
col1, col2 = st.columns(2)

with col1:
    streamlit_flow('force_layout', nodes, edges, layout=ForceLayout(), fit_view=True)


with col2:
    st.code("""
from streamlit_flow import streamlit_flow
from streamlit_flow.elements import StreamlitFlowNode, StreamlitFlowEdge
from streamlit_flow.layouts import ForceLayout
            
nodes = [StreamlitFlowNode(id='1', pos=(0, 0), data={'label': 'Node 1'}, node_type='input', source_position='right'),
        StreamlitFlowNode('2', (0, 0), {'label': 'Node 2'}, 'default', 'right', 'left'),
        StreamlitFlowNode('3', (0, 0), {'label': 'Node 3'}, 'default', 'right', 'left'),
        StreamlitFlowNode('4', (0, 0), {'label': 'Node 4'}, 'output', target_position='left'),
        StreamlitFlowNode('5', (0, 0), {'label': 'Node 5'}, 'output', target_position='left'),
        StreamlitFlowNode('6', (0, 0), {'label': 'Node 6'}, 'output', target_position='left'),
        StreamlitFlowNode('7', (0, 0), {'label': 'Node 7'}, 'output', target_position='left'),]
        
edges = [StreamlitFlowEdge('1-2', '1', '2', animated=True),
        StreamlitFlowEdge('1-3', '1', '3', animated=True),
        StreamlitFlowEdge('2-4', '2', '4', animated=True),
        StreamlitFlowEdge('2-5', '2', '5', animated=True),
        StreamlitFlowEdge('3-6', '3', '6', animated=True),
        StreamlitFlowEdge('3-7', '3', '7', animated=True),
        ]
            
streamlit_flow('radial_layout', nodes, edges, layout=ForceLayout(), fit_view=True)""")
    
st.header("Stress Layout")

st.markdown("Minimizes the stress within a layout using stress majorization. Stress exists if the euclidean distance between a pair of nodes doesn’t match their graph theoretic distance, that is, the shortest path between the two nodes. The method allows to specify individual edge lengths.")
st.link_button("Read More", "https://eclipse.dev/elk/reference/algorithms/org-eclipse-elk-stress.html")

col1, col2 = st.columns(2)

with col1:
    streamlit_flow('stress_layout', nodes, edges, layout=StressLayout(), fit_view=True)

with col2:
    st.code("""
from streamlit_flow import streamlit_flow
from streamlit_flow.elements import StreamlitFlowNode, StreamlitFlowEdge
from streamlit_flow.layouts import StressLayout
            
nodes = [StreamlitFlowNode(id='1', pos=(0, 0), data={'label': 'Node 1'}, node_type='input', source_position='right'),
        StreamlitFlowNode('2', (0, 0), {'label': 'Node 2'}, 'default', 'right', 'left'),
        StreamlitFlowNode('3', (0, 0), {'label': 'Node 3'}, 'default', 'right', 'left'),
        StreamlitFlowNode('4', (0, 0), {'label': 'Node 4'}, 'output', target_position='left'),
        StreamlitFlowNode('5', (0, 0), {'label': 'Node 5'}, 'output', target_position='left'),
        StreamlitFlowNode('6', (0, 0), {'label': 'Node 6'}, 'output', target_position='left'),
        StreamlitFlowNode('7', (0, 0), {'label': 'Node 7'}, 'output', target_position='left'),]
        
edges = [StreamlitFlowEdge('1-2', '1', '2', animated=True),
        StreamlitFlowEdge('1-3', '1', '3', animated=True),
        StreamlitFlowEdge('2-4', '2', '4', animated=True),
        StreamlitFlowEdge('2-5', '2', '5', animated=True),
        StreamlitFlowEdge('3-6', '3', '6', animated=True),
        StreamlitFlowEdge('3-7', '3', '7', animated=True),
        ]
            
streamlit_flow('radial_layout', nodes, edges, layout=StressLayout(), fit_view=True)""")
    

st.header("Random Layout")

st.markdown("Distributes the nodes randomly on the plane, leading to very obfuscating layouts. Can be useful to demonstrate the power of “real” layout algorithms.")
st.link_button("Read More", "https://eclipse.dev/elk/reference/algorithms/org-eclipse-elk-random.html")

col1, col2 = st.columns(2)

with col1:
    streamlit_flow('random_layout', nodes, edges, layout=RandomLayout(), fit_view=True)

with col2:
    st.code("""
from streamlit_flow import streamlit_flow
from streamlit_flow.elements import StreamlitFlowNode, StreamlitFlowEdge
from streamlit_flow.layouts import RandomLayout
            
nodes = [StreamlitFlowNode(id='1', pos=(0, 0), data={'label': 'Node 1'}, node_type='input', source_position='right'),
        StreamlitFlowNode('2', (0, 0), {'label': 'Node 2'}, 'default', 'right', 'left'),
        StreamlitFlowNode('3', (0, 0), {'label': 'Node 3'}, 'default', 'right', 'left'),
        StreamlitFlowNode('4', (0, 0), {'label': 'Node 4'}, 'output', target_position='left'),
        StreamlitFlowNode('5', (0, 0), {'label': 'Node 5'}, 'output', target_position='left'),
        StreamlitFlowNode('6', (0, 0), {'label': 'Node 6'}, 'output', target_position='left'),
        StreamlitFlowNode('7', (0, 0), {'label': 'Node 7'}, 'output', target_position='left'),]
        
edges = [StreamlitFlowEdge('1-2', '1', '2', animated=True),
        StreamlitFlowEdge('1-3', '1', '3', animated=True),
        StreamlitFlowEdge('2-4', '2', '4', animated=True),
        StreamlitFlowEdge('2-5', '2', '5', animated=True),
        StreamlitFlowEdge('3-6', '3', '6', animated=True),
        StreamlitFlowEdge('3-7', '3', '7', animated=True),
        ]
            
streamlit_flow('radial_layout', nodes, edges, layout=RandomLayout(), fit_view=True)""")
    

st.header("Manual Layout")

st.markdown("Keeps the current layout as it is, provided in the nodes, without any automatic modification.")

col1, col2 = st.columns(2)

with col1:
    streamlit_flow('manual_layout', nodes, edges, layout=ManualLayout(), fit_view=True)

with col2:
    st.code("""
from streamlit_flow import streamlit_flow
from streamlit_flow.elements import StreamlitFlowNode, StreamlitFlowEdge
from streamlit_flow.layouts import ManualLayout
            
nodes = [StreamlitFlowNode(id='1', pos=(0, 0), data={'label': 'Node 1'}, node_type='input', source_position='right'),
        StreamlitFlowNode('2', (0, 0), {'label': 'Node 2'}, 'default', 'right', 'left'),
        StreamlitFlowNode('3', (0, 0), {'label': 'Node 3'}, 'default', 'right', 'left'),
        StreamlitFlowNode('4', (0, 0), {'label': 'Node 4'}, 'output', target_position='left'),
        StreamlitFlowNode('5', (0, 0), {'label': 'Node 5'}, 'output', target_position='left'),
        StreamlitFlowNode('6', (0, 0), {'label': 'Node 6'}, 'output', target_position='left'),
        StreamlitFlowNode('7', (0, 0), {'label': 'Node 7'}, 'output', target_position='left'),]
        
edges = [StreamlitFlowEdge('1-2', '1', '2', animated=True),
        StreamlitFlowEdge('1-3', '1', '3', animated=True),
        StreamlitFlowEdge('2-4', '2', '4', animated=True),
        StreamlitFlowEdge('2-5', '2', '5', animated=True),
        StreamlitFlowEdge('3-6', '3', '6', animated=True),
        StreamlitFlowEdge('3-7', '3', '7', animated=True),
        ]
            
streamlit_flow('radial_layout', nodes, edges, layout=ManualLayout(), fit_view=True)""")
    