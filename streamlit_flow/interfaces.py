from typing import Dict, Tuple, Union

class StreamlitFlowNode:
    def __init__(self, 
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
                    **kwargs) -> None:
        
        self.id = id
        self.position = {"x": pos[0], "y": pos[1]}
        self.data = data
        self.type = node_type
        self.source_position = source_position
        self.target_position = target_position
        self.hidden = hidden
        self.selected = selected
        self.dragging = dragging
        self.draggable = draggable
        self.selectable = selectable
        self.connectable = connectable
        self.resizing = resizing
        self.deletable = deletable
        self.width = width
        self.height = height
        self.z_index = z_index
        self.focusable = focusable
        self.style = style
        self.kwargs = kwargs


        self.__validate__()

    def __validate__(self):
        assert self.type in ['default', 'input', 'output'], f"Node type must be one of ['default', 'input', 'output']. Got {self.type}"
        assert self.source_position in ['top', 'bottom', 'left', 'right'], f"Source position must be one of ['top', 'bottom', 'left', 'right']. Got {self.source_position}"
        assert self.target_position in ['top', 'bottom', 'left', 'right'], f"Target position must be one of ['top', 'bottom', 'left', 'right']. Got {self.target_position}"


    def __to_dict__(self) -> Dict[str, any]:
        node_dict = {
            "id": self.id,
            "position": self.position,
            "data": self.data,
            "type": self.type,
            "sourcePosition": self.source_position,
            "targetPosition": self.target_position,
            "hidden": self.hidden,
            "selected": self.selected,
            "dragging": self.dragging,
            "draggable": self.draggable,
            "selectable": self.selectable,
            "connectable": self.connectable,
            "resizing": self.resizing,
            "deletable": self.deletable,
            "width": self.width,
            "height": self.height,
            "zIndex": self.z_index,
            "focusable": self.focusable,
            "style": self.style,
        }
        node_dict.update(self.kwargs)
        return node_dict


class StreamlitFlowEdge:

    def __init__(self,
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
                    **kwargs) -> None:
        
        self.id = id
        self.source = source
        self.target = target
        self.type = edge_type
        self.hidden = hidden
        self.animated = animated
        self.selected = selected
        self.deletable = deletable
        self.focusable = focusable
        self.z_index = z_index
        self.label = label
        self.label_style = label_style
        self.label_show_bg = label_show_bg
        self.label_bg_style = label_bg_style
        self.style = style
        self.kwargs = kwargs

        self.__validate__()

    def __validate__(self) -> None:
        assert self.type in ['default', 'straight', 'step', "smoothstep", "simplebezier"], f"Edge type must be one of ['default', 'straight', 'step', 'smoothstep', 'simplebezier']. Got {self.type}"


    def __to_dict__(self) -> Dict[str, any]:
        edge_dict = {
            "id": self.id,
            "source": self.source,
            "target": self.target,
            "type": self.type,
            "hidden": self.hidden,
            "animated": self.animated,
            "selected": self.selected,
            "deletable": self.deletable,
            "focusable": self.focusable,
            "zIndex": self.z_index,
            "label": self.label,
            "labelStyle": self.label_style,
            "labelShowBg": self.label_show_bg,
            "labelBgStyle": self.label_bg_style,
            "style": self.style
        }

        edge_dict.update(self.kwargs)
        return edge_dict