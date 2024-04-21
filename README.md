![Streamlit Flow Logo](./assets/streamlit-flow-banner-bg.svg)

# Streamlit Flow

The power of React Flow, with the simplicity of Streamlit.


## Running the example


#### Install the dependencies
```bash
git clone https://github.com/dkapur17/streamlit-flow.git
cd streamlit-flow
npm install --prefix streamlit_flow/frontend
```

#### Run the frontent
On the first terminal, run, from the root of the repository
```bash
cd streamlit_flow/frontend
npm start
```

#### Run the Example Streamlit App
On the second terminal, run, from the root of the repository
```bash
streamlit run example.py
```

## Installation

> Still working on making the library available on pypi.

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