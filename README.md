![Streamlit Flow Logo](https://raw.githubusercontent.com/dkapur17/streamlit-flow/master/assets/streamlit-flow-banner-bg.svg)

# Streamlit Flow
[![Streamlit App](https://static.streamlit.io/badges/streamlit_badge_black_white.svg)](https://stflow.streamlit.app)


**Build beautiful, interactive flow diagrams: Powered by React Flow, Simplified by Streamlit.**

![Markdown Support in Node](assets/MarkdownNode.png)

### 🎉 Version 1.6.0 is out now! 🎉

This version of StreamlitFlow fixes 2 major issues:

1. Memory leak when interacting with the component (thanks @yyahav for bringing this up).
2. Component not reflecting state changes made in Python.

## Features

- Create, edit and visualize beautiful flow diagrams.
- Add nodes and edges, move them around, pan and zoom.
- Edit node and edge properties.
- Easy to use Layouts - Layered, Tree, Force, Stress, Radial, Random, and Manual.
- Markdown Support in Nodes.
- Interactions with Streamlit - clicks on nodes and edges can be captured in Streamlit.
- Synchronized state management - changes to the state of the flow can be made seamlessly from the UI through user interactions as well as programmatically in Python, and the changes reflect on the UI without any state modification wizardry.


A demo for all these features can be found [here](https://stflow.streamlit.app).

## Installation

```bash
pip install streamlit-flow-component
```

## Running the example


#### Install the dependencies
```bash
git clone https://github.com/dkapur17/streamlit-flow.git
cd streamlit-flow
npm install --prefix streamlit_flow/frontend
```

#### Run the frontent
On the first terminal, run from the root of the repository
```bash
cd streamlit_flow/frontend
npm start
```

#### Run this Example Streamlit App
On the second terminal, run from the root of the repository
```bash
streamlit run example.py
```

## Change log

### Version 1.5.0

> [!WARNING] 
>
> StreamlitFlow v1.5.0 has breaking changes. Please read on to understand how to migrate your code to the new version.


Say hello to the new and improved state management system that syncs the states between changes in the frontend and the backend. This means that you can now modify the state of the flow diagram from Python and see the changes reflected in the frontend without having to hack into the component's state.

**Note**: The updated state management uses a new `StreamlitFlowState` class to manage the state within streamlit. Instead of taking `nodes` and `edges` as arguments, the `streamlit_flow` function now takes a single `StreamlitFlowState` object. This means that code using earlier versions of this library will need to be tweaked slightly to work with the new version.

**Old**
```python
from streamlit_flow import streamlit_flow
from streamlit_flow.elements import StreamlitFlowNode, StreamlitFlowEdge

nodes = [...]
edges = [...]

streamlit_flow('flow', nodes, edges)
```

**New**
```python
from streamlit_flow import streamlit_flow
from streamlit_flow.elements import StreamlitFlowNode, StreamlitFlowEdge
from streamlit_flow.state import StreamlitFlowState

nodes = [...]
edges = [...]
state = StreamlitFlowState(nodes, edges)

streamlit_flow('flow', state)
```

The benefits we get from this are significant, as the `StreamlitFlowState` class makes sure that the states in the frontend and the backend are synced wth the latest changes from either side.

**Example**
```python
from streamlit_flow import streamlit_flow
from streamlit_flow.elements import StreamlitFlowNode, StreamlitFlowEdge
from streamlit_flow.state import StreamlitFlowState
from uuid import uuid4

# Initialize the state if it doesn't exist
if 'flow_state' not in st.session_state:
    nodes = [...]
    edges = [...]
    st.session_state.flow_state = StreamlitFlowState(key="flow", nodes, edges)

# Use any operation that alters the state, for example add node, and then rerun
if st.button("Add node"):
    new_node = StreamlitFlowNode(id=str(f"st-flow-node_{uuid4()}"), 
                                pos=(0, 0), 
                                data={'content': f'Node {len(st.session_state.flow_state.nodes) + 1}'}, 
                                node_type='default', 
                                source_position='right', 
                                target_position='left')
    st.session_state.flow_state.nodes.append(new_node)
    st.rerun()

# Use the state as the argument, as well as to store the return value
st.session_state.flow_state = streamlit_flow('flow', st.session_state.flow_state)
```
#### Minor Updates
- **More Robust Returns**: The `streamlit_flow` component now returns the updated state on several user interactions, such as creating/deleting/editing/moving a node or an edge, to make sure the states stay synced.
- **Edge Markers**: Ends of the edges can now be set to `arrow` or `arrowclosed` to represent directed edges, as well as further styled. Check out the style options [here](https://reactflow.dev/api-reference/types/edge-marker).
- **Unified node dimensions**: Streamlit flow now only sets the dimensions of the nodes in the `style` dictionary, and let Reactflow handle computing the dimensions. This means that the `width` and `height` attributes of the nodes are now deprecated.


### Version 1.2.9

* **Markdown Nodes**: Use Markdown and HTML in the nodes to make them more expressive.

### Version 1.0.0

* **Overhauled State Management**: The component now manages the state of the flow diagram automatically. As such, it keeps track of changes to node positions, connections, and more.

* **Pane Context Menu**: Right-clicking on the canvas now opens a context menu, allowing you to add new nodes or reset the layout.

* **Node Context Menu**: Right-clicking on a node now opens a context menu, allowing you to edit or delete the node.

* **Edge Context Menu**: Right-clicking on an edge now opens a context menu, allowing you to edit or delete the edge.

* **Way more Layouts**: The layouts are now more extensive, including Tree, Layered, Force, Stress, Radial, Random and Manual. One can also make a custom layout by inheriting from the `Layout` class.

* **Hackable Python State**: The primary state management is done within the component, and the state can be read by Python. This is the intended usage. However, while not recommended, it is possible to modify the state from Python as well if the user wishes to.

### Version 0.6.0

* The initial release of the library, with the ability to visualize flow diagrams.
* Create nodes and edges, move them around, pan and zoom.
* Automatic Layered Layout Supported
* Interactions sent to Streamlit - The component returns the ID of the element that was clicked on.
