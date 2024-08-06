from abc import ABC, abstractmethod
from typing import Dict

class Layout(ABC):

    @abstractmethod
    def __to_dict__(self) -> Dict[str, any]:
        raise NotImplementedError("Subclasses must implement this method")

class ManualLayout(Layout):
    def __init__(self):
        pass

    def __to_dict__(self) -> Dict[str, any]:
        return {
            "elkOptions": {
                'elk.algorithm': "org.eclipse.elk.fixed",
            }
        }

class LayeredLayout(Layout):
    def __init__(self, direction:str, horizontal_spacing:float=150, vertical_spacing:float=75, node_node_spacing:float=75, node_layer_spacing:float=75) -> None:

        assert direction in ["up", "down", "left", "right"], f"direction must be one of ['up', 'down', 'left', 'right']. Got {direction}"
        self.direction = direction

        self.node_node_spacing = node_node_spacing
        self.node_layer_spacing = node_layer_spacing

        self.horizontal_spacing = horizontal_spacing
        self.vertical_spacing = vertical_spacing

    def __to_dict__(self) -> Dict[str, any]:
        return {
            "defaultWidth": self.horizontal_spacing,
            "defaultHeight": self.vertical_spacing,
            "elkOptions": {
                    'elk.algorithm': "layered",
                    'elk.direction': self.direction.upper(),
                    'elk.spacing.nodeNode': self.node_node_spacing,
                    'elk.layered.spacing.nodeNodeBetweenLayers': self.node_layer_spacing
                }
        }

class TreeLayout(Layout):

    def __init__(self, direction:str, horizontal_spacing:float=150, vertical_spacing:float=75, node_node_spacing:float=75) -> None:
        assert direction in ["up", "down", "left", "right"], f"direction must be one of ['up', 'down', 'left', 'right']. Got {direction}"
        self.direction = direction
        self.horizontal_spacing = horizontal_spacing
        self.vertical_spacing = vertical_spacing
        self.node_node_spacing = node_node_spacing

    def __to_dict__(self) -> Dict[str, any]:
        return {
            "defaultWidth": self.horizontal_spacing,
            "defaultHeight": self.vertical_spacing,
            "elkOptions": {
                    'elk.algorithm': "org.eclipse.elk.mrtree",
                    'elk.direction': self.direction.upper(),
                    'elk.spacing.nodeNode': self.node_node_spacing
                }
        }

class RadialLayout(Layout):

    def __init__(self, horizontal_spacing:float=150, vertical_spacing:float=75, node_node_spacing:float=75) -> None:
        self.horizontal_spacing = horizontal_spacing
        self.vertical_spacing = vertical_spacing
        self.node_node_spacing = node_node_spacing

    def __to_dict__(self) -> Dict[str, any]:
        return {
            "defaultWidth": self.horizontal_spacing,
            "defaultHeight": self.vertical_spacing,
            "elkOptions": {
                    'elk.algorithm': "org.eclipse.elk.radial",
                    'elk.spacing.nodeNode': self.node_node_spacing,
                }
        }

class ForceLayout(Layout):

    def __init__(self, horizontal_spacing:float=150, vertical_spacing:float=75, node_node_spacing:float=75) -> None:
        self.horizontal_spacing = horizontal_spacing
        self.vertical_spacing = vertical_spacing
        self.node_node_spacing = node_node_spacing

    def __to_dict__(self) -> Dict[str, any]:
        return {
            "defaultWidth": self.horizontal_spacing,
            "defaultHeight": self.vertical_spacing,
            "elkOptions": {
                    'elk.algorithm': "org.eclipse.elk.force",
                    'elk.spacing.nodeNode': self.node_node_spacing,
                }
        }


class StressLayout(Layout):

    def __init__(self, horizontal_spacing:float=150, vertical_spacing:float=75, node_node_spacing:float=75) -> None:
        self.horizontal_spacing = horizontal_spacing
        self.vertical_spacing = vertical_spacing
        self.node_node_spacing = node_node_spacing

    def __to_dict__(self) -> Dict[str, any]:
        return {
            "defaultWidth": self.horizontal_spacing,
            "defaultHeight": self.vertical_spacing,
            "elkOptions": {
                    'elk.algorithm': "org.eclipse.elk.stress",
                    'elk.spacing.nodeNode': self.node_node_spacing,
                }
        }

class RandomLayout(Layout):

    def __init__(self, horizontal_spacing:float=150, vertical_spacing:float=75, node_node_spacing:float=75) -> None:
        self.horizontal_spacing = horizontal_spacing
        self.vertical_spacing = vertical_spacing
        self.node_node_spacing = node_node_spacing

    def __to_dict__(self) -> Dict[str, any]:
        return {
            "defaultWidth": self.horizontal_spacing,
            "defaultHeight": self.vertical_spacing,
            "elkOptions": {
                    'elk.algorithm': "org.eclipse.elk.random",
                    'elk.spacing.nodeNode': self.node_node_spacing,
                }
        }
