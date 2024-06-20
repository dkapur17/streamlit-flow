import streamlit as st
from streamlit_flow import streamlit_flow
from streamlit_flow.elements import StreamlitFlowNode, StreamlitFlowEdge
from streamlit_flow.layouts import TreeLayout, RadialLayout

st.set_page_config("Streamlit Flow Example", layout="wide")

st.title("Streamlit Flow Example")

# nodes = [StreamlitFlowNode("1", (0, 0), {'content': 'Node 1'}, 'input', 'right'),
#         StreamlitFlowNode("2", (1, 0), {'content': 'Node 2'}, 'default', 'right', 'left'),
#         StreamlitFlowNode("3", (2, 0), {'content': 'Node 3'}, 'default', 'right', 'left'),
#         StreamlitFlowNode("4", (2, 1), {'content': 'Node 4'}, 'output', target_position='left'),
#         StreamlitFlowNode("5", (3, 0), {'content': 'Node 5'}, 'output', target_position='left'),
#         StreamlitFlowNode("6", (3, 1), {'content': 'Node 6'}, 'output', target_position='left'),
#         StreamlitFlowNode("7", (4, 0), {'content': 'Node 7'}, 'output', target_position='left'),]

# edges = [StreamlitFlowEdge("1-2", "1", "2", animated=True),
#         StreamlitFlowEdge("1-3", "1", "3", animated=True),
#         StreamlitFlowEdge("2-4", "2", "4", animated=True),
#         StreamlitFlowEdge("2-5", "2", "5", animated=True),
#         StreamlitFlowEdge("3-6", "3", "6", animated=True),
#         StreamlitFlowEdge("3-7", "3", "7", animated=True)]


nodes = [StreamlitFlowNode("main", (0, 0), {'content':"# Markdown Support in Nodes"}, 'input', 'bottom', style={'width': '400px'}, width=400),
        StreamlitFlowNode("text", (0, 0), {'content': 
"""### Text
Can support markdown text styles: **bold**, *italic*, `code` and $\\text{math}$"""}, 'output', 'bottom', 'top'),

        StreamlitFlowNode("code", (0, 0), {'content': 
"""### Code Block 
```python
print('Hello World')
```"""},'output', 'bottom', 'top'),

        StreamlitFlowNode("list", (0, 0), {'content':
"""### List
1. Ordered
2. And
- Unordered
- Lists
"""}, 'output', 'bottom', 'top'),

        StreamlitFlowNode("math", (0, 0), {'content':
"""### Math
$\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}$
"""}, 'output', 'bottom', 'top'),

        StreamlitFlowNode("github", (0, 0), {'content': '## Github Flavor Support'}, 'default', 'top', 'bottom'),

        StreamlitFlowNode("strikethrough", (0, 0), {'content':
"""
### ~Strike through~
"""}, 'output', 'bottom', 'top'),

        StreamlitFlowNode("table", (0, 0), {'content':
"""### Table

| a | b  |  c |  d  |
| - | :- | -: | :-: |
| 1 | 2 | 3 | 4 |
| 5 | 6 | 7 | 8 |

"""}, 'output', 'top', 'right', style={'width': '160px'}, width=160),

        StreamlitFlowNode("tasks", (0, 0), {'content':
"""## Tasklist

* [ ] to do
* [x] done
"""}, 'output', 'top', 'bottom'),

        StreamlitFlowNode("html", (0, 0), {'content':
"""## Raw HTML"""}, 'default', 'top', 'bottom'),
    
        StreamlitFlowNode("link", (0, 0), {'content':
"""### Link
<a href="https://github.com/dkapur17/streamlit-flow" target="_blank">Streamlit Flow</a>"""}, 'output', 'top', 'bottom'),

        StreamlitFlowNode("expander", (0, 0), {'content':
"""### Expander
<details>
<summary>Click to expand</summary>

This is hidden content
</details>
"""}, 'output', 'top', 'bottom'),

        StreamlitFlowNode("image",(0, 0), {'content':
"""### Image
<img src="https://raw.githubusercontent.com/dkapur17/streamlit-flow/master/assets/streamlit-flow-logo.svg" alt="Streamlit Flow Logo" width="100">
"""}, 'output', 'top', 'bottom', width=120),

        StreamlitFlowNode("video", (0, 0), {'content':
"""### Video
<video width="256" controls>
    <source src="https://github.com/dkapur17/streamlit-flow/raw/master/assets/FastBuild.mp4" type="video/mp4">
</video>

"""}, 'output', 'bottom', 'top', style={'width': '300px'}, width=300)]

edges = [StreamlitFlowEdge("main-text", "main", "text", animated=True),
            StreamlitFlowEdge("main-code", "main", "code", animated=True),
            StreamlitFlowEdge("main-list", "main", "list", animated=True),
            StreamlitFlowEdge("main-math", "main", "math", animated=True),
            StreamlitFlowEdge("main-github", "main", "github", animated=True),
            StreamlitFlowEdge("github-strikethrough", "github", "strikethrough", animated=True),
            StreamlitFlowEdge("github-table", "github", "table", animated=True),
            StreamlitFlowEdge("github-tasks", "github", "tasks", animated=True),
            StreamlitFlowEdge("main-html", "main", "html", animated=True),
            StreamlitFlowEdge("html-link", "html", "link", animated=True),
            StreamlitFlowEdge("html-expander", "html", "expander", animated=True),
            StreamlitFlowEdge("html-image", "html", "image", animated=True),
            StreamlitFlowEdge("html-video", "html", "video", animated=True)]

streamlit_flow('example_flow', nodes, edges, layout=RadialLayout(), fit_view=True, height=1000, enable_node_menu=True, hide_watermark=True)