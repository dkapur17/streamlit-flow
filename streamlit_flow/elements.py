from typing import Dict, Tuple, Union, Type, TypeVar

T_StreamlitFlowNode = TypeVar('T_StreamlitFlowNode', bound='StreamlitFlowNode')
T_StreamlitFlowEdge = TypeVar('T_StreamlitFlowEdge', bound='StreamlitFlowEdge')

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
                    connectable:bool=False,
                    resizing:bool=False,
                    deletable:bool=False,
                    z_index:float=0,
                    focusable:bool=True,
                    style:Dict[str, any]={},
                    **kwargs) -> None:

        if 'width' not in style:
            style['width'] = 'auto'
        if 'height' not in style:
            style['height'] = 'auto'

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
        self.z_index = z_index
        self.focusable = focusable
        self.style = style
        self.kwargs = kwargs

        # Remove post V1.3.0
        if 'label' in self.data:
            content = self.data.pop('label')
            self.data['content'] = content

        self.__validate__()

    @classmethod
    def from_dict(cls: Type[T_StreamlitFlowNode], node_dict:Dict[str, any]) -> T_StreamlitFlowNode:

        # other_attributes_dict = {key: value for key, value in node_dict.items() if key not in ['id', 'position', 'data', 'type', 'sourcePosition', 'targetPosition', 'hidden', 'selected', 'dragging', 'draggable', 'selectable', 'connectable', 'resizing', 'deletable', 'width', 'height', 'zIndex', 'focusable', 'style']}

        return cls( id=node_dict.get('id', ''),
                    pos=(node_dict['position'].get('x', 0), node_dict['position'].get('y', 0)),
                    data=node_dict.get('data', {}),
                    node_type=node_dict.get('type', 'default'),
                    source_position=node_dict.get('sourcePosition', 'bottom'),
                    target_position=node_dict.get('targetPosition', 'top'),
                    hidden=node_dict.get('hidden', False),
                    selected=node_dict.get('selected', False),
                    dragging=node_dict.get('dragging', False),
                    draggable=node_dict.get('draggable', True),
                    selectable=node_dict.get('selectable', False),
                    connectable=node_dict.get('connectable', True),
                    resizing=node_dict.get('resizing', False),
                    deletable=node_dict.get('deletable', False),
                    z_index=node_dict.get('zIndex', 0),
                    focusable=node_dict.get('focusable', True),
                    style=node_dict.get('style', {}))


    def __validate__(self):
        assert self.type in ['default', 'input', 'output'], f"Node type must be one of ['default', 'input', 'output']. Got {self.type}"
        assert self.source_position in ['top', 'bottom', 'left', 'right'], f"Source position must be one of ['top', 'bottom', 'left', 'right']. Got {self.source_position}"
        assert self.target_position in ['top', 'bottom', 'left', 'right'], f"Target position must be one of ['top', 'bottom', 'left', 'right']. Got {self.target_position}"


    def asdict(self) -> Dict[str, any]:
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
            "zIndex": self.z_index,
            "focusable": self.focusable,
            "style": self.style,
        }
        node_dict.update(self.kwargs)
        return node_dict

    def __repr__(self):
        return f"StreamlitFlowNode({self.id}, ({round(self.position['x'], 2)}, {round(self.position['y'],2)}), '{self.data.get('content', '')}')"


class StreamlitFlowEdge:


    def __init__(self,
                    id:str,
                    source:str,
                    target:str,
                    edge_type:str="default",
                    marker_start:dict={},
                    marker_end:dict={},
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
        self.marker_start = marker_start
        self.marker_end = marker_end
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

    @classmethod
    def from_dict(cls: Type[T_StreamlitFlowEdge], edge_dict:Dict[str, any]) -> T_StreamlitFlowEdge:

        # other_attributes_dict = {key: value for key, value in edge_dict.items() if key not in ['id', 'source', 'target', 'type', 'hidden', 'animated', 'selected', 'deletable', 'focusable', 'zIndex', 'label', 'labelStyle', 'labelShowBg', 'labelBgStyle', 'style']}
        return cls( id=edge_dict.get('id', ''),
                    source=edge_dict.get('source', ''),
                    target=edge_dict.get('target', ''),
                    edge_type=edge_dict.get('type', 'default'),
                    marker_start=edge_dict.get('markerStart', {}),
                    marker_end=edge_dict.get('markerEnd', {}),
                    hidden=edge_dict.get('hidden', False),
                    animated=edge_dict.get('animated', False),
                    selected=edge_dict.get('selected', False),
                    deletable=edge_dict.get('deletable', False),
                    focusable=edge_dict.get('focusable', False),
                    z_index=edge_dict.get('zIndex', 0),
                    label=edge_dict.get('label', ''),
                    label_style=edge_dict.get('labelStyle', {}),
                    label_show_bg=edge_dict.get('labelShowBg', False),
                    label_bg_style=edge_dict.get('labelBgStyle', {}),
                    style=edge_dict.get('style', {}))


    def __validate__(self) -> None:
        assert self.type in ['default', 'straight', 'step', "smoothstep", "simplebezier"], f"Edge type must be one of ['default', 'straight', 'step', 'smoothstep', 'simplebezier']. Got {self.type}"


    def asdict(self) -> Dict[str, any]:
        edge_dict = {
            "id": self.id,
            "source": self.source,
            "target": self.target,
            "type": self.type,
            "markerStart": self.marker_start,
            "markerEnd": self.marker_end,
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

    def __repr__(self):
        return f"StreamlitFlowEdge({self.id}, {self.source}->{self.target}, '{self.label}')"