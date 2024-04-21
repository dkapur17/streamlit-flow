import os
import streamlit.components.v1 as components

from typing import List

_RELEASE = False

if not _RELEASE:
    _component_func = components.declare_component(
        "streamlit_flow",
        url="http://localhost:3001",
    )
else:
    parent_dir = os.path.dirname(os.path.abspath(__file__))
    build_dir = os.path.join(parent_dir, "frontend/build")
    _component_func = components.declare_component("streamlit_flow", path=build_dir)

def streamlit_flow(key=None):
    return _component_func(key=key, default=None)