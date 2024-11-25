# example.py
import random
from uuid import uuid4

import streamlit as st

from streamlit_flow import streamlit_flow
from streamlit_flow.elements import StreamlitFlowEdge, StreamlitFlowNode
from streamlit_flow.layouts import RadialLayout, TreeLayout
from streamlit_flow.state import StreamlitFlowState

st.set_page_config("Myth demo", layout="wide")
st.title("Myth demo")

if "curr_state" not in st.session_state:
    nodes = [
        StreamlitFlowNode("1", (0, 0), {"content": "Input Node"}, "input", "right"),
        StreamlitFlowNode(
            "2", (1, 0), {"content": "Default Node"}, "default", "right", "left"
        ),
        # StreamlitFlowNode(
        #     "3", (2, 0), {"content": "Image Fetch Node", "filters": "123"}, "imageFetch", "right", "left"
        # ),  # <-- Custom Node
        StreamlitFlowNode(
            "4", (5, 0), {"content": "Another Image Fetch Node", "vizId": "0447edee-433b-4751-ada3-0160dd715aee"}, "vizNode", "right", "left"
        ),  # <-- Custom Node
    ]

    edges = [
        StreamlitFlowEdge(
            "1-2",
            "1",
            "2",
            animated=True,
            marker_start={},
            marker_end={"type": "arrow"},
        )
    ]

    st.session_state.curr_state = StreamlitFlowState(nodes, edges)

# Control Buttons
# col1, col2, col3, col4 = st.columns(4)

if st.button("Add Node"):
    new_node_id = str(f"st-flow-node_{uuid4()}")
    new_node = StreamlitFlowNode(
        new_node_id,
        (random.uniform(-100, 100), random.uniform(-100, 100)),
        {"content": f"Node {len(st.session_state.curr_state.nodes) + 1}"},
        "routerNode",
        "right",
        "left",
    )
    st.session_state.curr_state.nodes.append(new_node)
    st.rerun()

print(st.session_state.curr_state.nodes[-1])

# with col1:
#     if st.button("Add Node"):
#         new_node_id = str(f"st-flow-node_{uuid4()}")
#         new_node = StreamlitFlowNode(
#             new_node_id,
#             (random.uniform(-100, 100), random.uniform(-100, 100)),
#             {"content": f"Node {len(st.session_state.curr_state.nodes) + 1}"},
#             "default",
#             "right",
#             "left",
#         )
#         st.session_state.curr_state.nodes.append(new_node)
#         st.experimental_rerun()

# with col2:
#     if st.button("Delete Random Node"):
#         if len(st.session_state.curr_state.nodes) > 0:
#             node_to_delete = random.choice(st.session_state.curr_state.nodes)
#             st.session_state.curr_state.nodes = [
#                 node
#                 for node in st.session_state.curr_state.nodes
#                 if node.id != node_to_delete.id
#             ]
#             st.session_state.curr_state.edges = [
#                 edge
#                 for edge in st.session_state.curr_state.edges
#                 if edge.source != node_to_delete.id and edge.target != node_to_delete.id
#             ]
#             st.experimental_rerun()

# with col3:
#     if st.button("Add Edge"):
#         if len(st.session_state.curr_state.nodes) > 1:
#             source = random.choice(st.session_state.curr_state.nodes)
#             target = random.choice(
#                 [
#                     node
#                     for node in st.session_state.curr_state.nodes
#                     if node.id != source.id
#                 ]
#             )
#             new_edge = StreamlitFlowEdge(
#                 f"{source.id}-{target.id}", source.id, target.id, animated=True
#             )
#             st.session_state.curr_state.edges.append(new_edge)
#             st.experimental_rerun()

# with col4:
#     if st.button("Delete Random Edge"):
#         if len(st.session_state.curr_state.edges) > 0:
#             edge_to_delete = random.choice(st.session_state.curr_state.edges)
#             st.session_state.curr_state.edges = [
#                 edge
#                 for edge in st.session_state.curr_state.edges
#                 if edge.id != edge_to_delete.id
#             ]
#             st.experimental_rerun()

# Render the Flowchart
st.session_state.curr_state = streamlit_flow(
    "example_flow",
    st.session_state.curr_state,
    layout=TreeLayout(direction="right"),
    fit_view=True,
    height="75rem",
    enable_node_menu=True,
    enable_edge_menu=True,
    enable_pane_menu=True,
    get_edge_on_click=True,
    get_node_on_click=True,
    show_minimap=True,
    hide_watermark=True,
    allow_new_edges=True,
    min_zoom=0.1,
)

print(st.session_state.curr_state.selected_id)

# Display Current State
# col1, col2, col3 = st.columns(3)

# with col1:
#     st.subheader("Nodes")
#     for node in st.session_state.curr_state.nodes:
#         st.write(node)

# with col2:
#     st.subheader("Edges")
#     for edge in st.session_state.curr_state.edges:
#         st.write(edge)

# with col3:
#     st.subheader("Selected ID")
#     st.write(st.session_state.curr_state.selected_id)

# Handle component value returned from the ImageFetchNode
# component_value = st.experimental_get_query_params().get("component_value", None)

# if component_value:
#     import json

#     try:
#         data = json.loads(component_value[0])
#         selected_node_id = data.get("nodeId")
#         image_data = data.get("imageData")  # This is a base64 string
#         st.write(f"Node ID: {selected_node_id} fetched image data:")
#         st.image(image_data)  # Streamlit can render base64 image data directly
#     except json.JSONDecodeError:
#         st.write("Received data is not valid JSON.")
