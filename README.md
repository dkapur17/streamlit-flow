![Streamlit Flow Logo](https://raw.githubusercontent.com/dkapur17/streamlit-flow/master/assets/streamlit-flow-banner-bg.svg)

# Streamlit Flow

**The power of React Flow, with the simplicity of Streamlit.**

### Build beautiful interactive flows, fast!

Streamlit Flow exposes a simple API to quickly build an interactive flow using the `streamlit_flow`, `StreamlitFlowNode` and `StreamliFlowEdge` interfaces. A lot of the configuration options provided by React Flow for configuring nodes and edges are exposed as arguments in Python, with more on the way.

https://github.com/dkapur17/streamlit-flow/assets/37783178/7217b733-2ecc-4d2a-a9a2-e92904d1b22a

<details>
  <summary>Demo Code</summary>
  
  ```python
from streamlit_flow import streamlit_flow
from streamlit_flow.interfaces import StreamlitFlowEdge, StreamlitFlowNode

streamlit_flow(
    nodes=[
        StreamlitFlowNode(
            id="1",
            data={'label': 'Node 1'},
            pos=(100, 100),
            type='input'   
        ),
        StreamlitFlowNode(
            id="2",
            data={'label': 'Node 2'},
            pos=(200, 200),
            type='default'   
        ),
        StreamlitFlowNode(
            id="3",
            data={'label': 'Node 3'},
            pos=(300, 300),
            type='output'   
        ),
    ],
    edges=[
        StreamlitFlowEdge(
            id='1-2',
            source='1',
            target='2',
            animated=True
        )
    ],
    animate_new_edges=True
)
  ```
</details>

### Don't worry about the Layout

Node layouts are one of the most important, and yet one of the most complicated parts of creating a beautiful flow. Streamlit Flow makes it super easy for you to layout the graph, either by manually entering node positions, or by simply specifying a flow direction. Behind the scenes, the React Flow component is hooked to an ElkJS layout engine that computes the relevant node positions.


https://github.com/dkapur17/streamlit-flow/assets/37783178/6d9a347b-99b6-4855-a60f-f0fe4ae1d7bd


<details>
  <summary>Demo Code</summary>
  
  ```python
from streamlit_flow import streamlit_flow
from streamlit_flow.interfaces import StreamlitFlowEdge, StreamlitFlowNode

streamlit_flow(
    nodes=[
        StreamlitFlowNode(
            id="1",
            data={'label': 'Node 1'},
            pos=(100, 100),
            type='input',
            source_position='right',
            target_position='left' 
        ),
        StreamlitFlowNode(
            id="2",
            data={'label': 'Node 2'},
            pos=(100, 110),
            type='default',
            source_position='right',
            target_position='left'
        ),
        StreamlitFlowNode(
            id="3",
            data={'label': 'Node 3'},
            pos=(100, 120),
            type='output',
            source_position='right',
            target_position='left' 
        ),
        StreamlitFlowNode(
            id="4",
            data={'label': 'Node 4'},
            pos=(100, 130),
            type='output',
            source_position='right',
            target_position='left'  
        ),
        StreamlitFlowNode(
            id="5",
            data={'label': 'Node 5'},
            pos=(100, 140),
            type='output',
            source_position='right',
            target_position='left'
        ),
    ],
    edges=[
        StreamlitFlowEdge(
            id='1-2',
            source='1',
            target='2',
            animated=True
        ),
        StreamlitFlowEdge(
            id='1-3',
            source='1',
            target='3',
            animated=True
        ),
        StreamlitFlowEdge(
            id='2-4',
            source='2',
            target='4',
            animated=True
        ),
        StreamlitFlowEdge(
            id='2-5',
            source='2',
            target='5',
            animated=True
        ),
    ],
    fit_view=True,
    direction='right'
)
  ```
</details>

### Easy Control over the Canvas

The `streamlit_flow` component makes it easy to add or remove meta components, and control the zoom behavior of the canvas - its as simple as toggling a flag.


https://github.com/dkapur17/streamlit-flow/assets/37783178/0dfad2c9-64b1-449c-a30e-501fe6a726a5

<details>
  <summary>Demo Code</summary>
  
  ```python
from streamlit_flow import streamlit_flow
from streamlit_flow.interfaces import StreamlitFlowEdge, StreamlitFlowNode

streamlit_flow(
    nodes=[
        StreamlitFlowNode(
            id="1",
            data={'label': 'Node 1'},
            pos=(100, 100),
            type='input',
            source_position='right',
            target_position='left' 
        ),
        StreamlitFlowNode(
            id="2",
            data={'label': 'Node 2'},
            pos=(100, 110),
            type='default',
            source_position='right',
            target_position='left'
        ),
        StreamlitFlowNode(
            id="3",
            data={'label': 'Node 3'},
            pos=(100, 120),
            type='output',
            source_position='right',
            target_position='left' 
        ),
        StreamlitFlowNode(
            id="4",
            data={'label': 'Node 4'},
            pos=(100, 130),
            type='output',
            source_position='right',
            target_position='left'  
        ),
        StreamlitFlowNode(
            id="5",
            data={'label': 'Node 5'},
            pos=(100, 140),
            type='output',
            source_position='right',
            target_position='left'
        ),
    ],
    edges=[
        StreamlitFlowEdge(
            id='1-2',
            source='1',
            target='2',
            animated=True
        ),
        StreamlitFlowEdge(
            id='1-3',
            source='1',
            target='3',
            animated=True
        ),
        StreamlitFlowEdge(
            id='2-4',
            source='2',
            target='4',
            animated=True
        ),
        StreamlitFlowEdge(
            id='2-5',
            source='2',
            target='5',
            animated=True
        ),
    ],
    direction='right',
    show_controls=True,
    fit_view=True,
    show_minimap=True
)
  ```
</details>

### Use component interactions within Python

The `streamlit_flow` component can optionally return the node, or edge, that the user clicks on, and that information can be used within Streamlit to perform any tasks that require that element information.


https://github.com/dkapur17/streamlit-flow/assets/37783178/86804550-a68b-4f78-a13f-d593fe302bc7

<details>
  <summary>Demo Code</summary>
  
  ```python
import streamlit as st
from streamlit_flow import streamlit_flow
from streamlit_flow.interfaces import StreamlitFlowEdge, StreamlitFlowNode

element = streamlit_flow(
    nodes=[
        StreamlitFlowNode(
            id="1",
            data={'label': 'Node 1'},
            pos=(100, 100),
            type='input',
            source_position='right',
            target_position='left' 
        ),
        StreamlitFlowNode(
            id="2",
            data={'label': 'Node 2'},
            pos=(100, 110),
            type='output',
            source_position='right',
            target_position='left'
        ),
        StreamlitFlowNode(
            id="3",
            data={'label': 'Node 3'},
            pos=(100, 120),
            type='output',
            source_position='right',
            target_position='left' 
        )
    ],
    edges=[
        StreamlitFlowEdge(
            id='1-2',
            source='1',
            target='2',
            animated=True
        ),
        StreamlitFlowEdge(
            id='1-3',
            source='1',
            target='3',
            animated=True
        )
    ],
    direction='right',
    fit_view=True,
    get_node_on_click=True,
    get_edge_on_click=True
)

if element:
    st.write(f"Clicked on {element['elementType']} {element['id']}")
  ```
</details>


## Installation

```bash
pip install streamlit_flow
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

## API

The library provides an interface over the React Flow library to create flow diagrams in Streamlit. This is done by exposing three main interfaces:

### 1. `streamlit_flow.streamlit_flow`

This is the main component interface, that creates a React Flow Object. It's call signature is as follows:

```python
streamlit_flow(
    nodes:List[StreamlitFlowNode], 
    edges:List[StreamlitFlowEdge], 
    height:int=500, 
    fit_view:bool=False,
    show_controls:bool=True,
    show_minimap:bool=False,
    animate_new_edges:bool=False,
    style:dict={},
    direction:str="manual"
    layout_vertical_spacing:int=75,
    layout_horizontal_spacing:int=150,
    get_node_on_click:bool=False,
    get_edge_on_click:bool=False,
    key=None
)
```

- `style` is the CSS style dictionary for styling the flow canvas.
- `direction` must be one of `manual`, `down`, `right`, `left` or `up`. In case of `manual`, the positions of the nodes are used to layout the graphs. In other cases, the Elk algorithm is used to layout the graph based on the given direction.
-  `layout_vertical_spacing` and `layout_horizontal_spacing` are only effective when using `direction` other than `manual`.
- `get_node_on_click` and `get_edge_on_click` are flags that determine whether the node or edge clicked should be returned to the streamlit script. If set to `True`, the `on_click` event will return the node or edge clicked.

### 2. `streamlit_flow.interfaces.StreamlitFlowNode`

This is the interface for a node in the flow diagram, with the following properties:

```python
StreamlitFlowNode( 
    id:str, 
    pos: Tuple[float, float],
    data:Dict[str, any],
    node_type:str="default",
    source_position:str='bottom',
    target_position:str='top',
    hidden:bool=False,
    selected:bool=False,
    dragging:bool=False,
    draggable:bool=True,
    selectable:bool=False,
    connectable:bool=True,
    resizing:bool=False,
    deletable:bool=False,
    width:Union[float, None]=None,
    height:Union[float, None]=None,
    z_index:float=0,
    focusable:bool=True,
    style:Dict[str, any]={},
    **kwargs
)
```

- `data` is an arbitrary dictionary that can be used to store information about the node. The most important key in this dictionary would be `label`, that is used to specify the text to be displayed on the node. Example `data = {'label': 'Node 1'}`.
- `style` is the CSS style dictionary for styling the node.
- `kwargs` can accept other keyword arguments that will directly be fed into the React Flow Node object. This is not recommended, but can be used if you need to pass specific arguments to the React Flow Node that are not yet covered by the interface.

### 3. `streamlit_flow.interfaces.StreamlitFlowEdge`

This is the interface for an edge in the flow diagram, with the following properties:

```python
StreamlitFlowEdge(
    id:str,
    source:str,
    target:str,
    edge_type:str="default",
    hidden:bool=False,
    animated:bool=False,
    selected:bool=False,
    deletable:bool=False,
    focusable:bool=False,
    z_index:float=0,
    label:str="",
    label_style:Dict[str, any]={},
    label_show_bg:bool=False,
    label_bg_style:Dict[str, any]={},
    style:Dict[str, any]={},
    **kwargs
)
```
- `kwargs` can accept other keyword arguments that will directly be fed into the React Flow Edge object. This is not recommended, but can be used if you need to pass specific arguments to the React Flow Edge that are not yet covered by the interface.

## Roadmap

Features I'm looking to implement, in no particular order:

- Add other layout engines like Dagre. Allow use to choose which engine to use, as well as pass configuration options to the engine (either use a dict, or create a new interface).
- Add on-hover tooltip to nodes (using react-tippy probably).
- Add more customization for edges, such as the edge end type.
- Add support for grouped nodes and sub-flows.

Porting the full (or almost full) fuctionality of React Flow into Streamlit Flow is a huge undertaking, and contributions are welcome!
