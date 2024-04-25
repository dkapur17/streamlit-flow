#!/bin/bash

rm -rf build dist streamlit_flow_component.egg-info
sed -i 's/_RELEASE = True/_RELEASE = False/g' streamlit_flow/__init__.py