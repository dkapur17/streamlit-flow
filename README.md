![Streamlit Flow Logo](https://raw.githubusercontent.com/dkapur17/streamlit-flow/master/assets/streamlit-flow-banner-bg.svg)

# Streamlit Flow
[![Streamlit App](https://static.streamlit.io/badges/streamlit_badge_black_white.svg)](https://stflow.streamlit.app)


**Build beautiful, interactive flow diagrams: Powered by React Flow, Simplified by Streamlit.**

### 🎉 Version 1.0.0 is out now! 🎉

While originally, Streamlit Flow was intended to be a way to visualize static flow diagrams, with limited interactivity (like moving nodes around, panning and zooming), it seemed like a wasted opportunity. 

Streamlit Flow Version 1.0.0 introduces a significant re-engineering of the library, which allows state management within the component itself, allowing you to not just visualize flows, but create them from within the canvas itself! Added features include:

* **Overhauled State Management**: The component now manages the state of the flow diagram automatically. As such, it keeps track of changes to node positions, connections, and more.

* **Pane Context Menu**: Right-clicking on the canvas now opens a context menu, allowing you to add new nodes or reset the layout.

* **Node Context Menu**: Right-clicking on a node now opens a context menu, allowing you to edit or delete the node.

* **Edge Context Menu**: Right-clicking on an edge now opens a context menu, allowing you to edit or delete the edge.

* **Way more Layouts**: The layouts are now more extensive, including Tree, Layered, Force, Stress, Radial, Random and Manual. One can also make a custom layout by inheriting from the `Layout` class.

* **Hackable Python State**: The primary state management is done within the component, and the state can be read by Python. This is the intended usage. However, while not recommended, it is possible to modify the state from Python as well if the user wishes to.

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