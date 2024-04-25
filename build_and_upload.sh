#!/bin/bash

sed -i 's/_RELEASE = False/_RELEASE = True/g' streamlit_flow/__init__.py
python setup.py sdist bdist_wheel
python -m twine upload --repository pypi dist/*