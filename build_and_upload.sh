#!/bin/bash

npm run build --prefix streamlit_flow/frontend
sed -i 's/_RELEASE = False/_RELEASE = True/g' streamlit_flow/__init__.py
python setup.py sdist bdist_wheel
python -m twine upload --repository pypi dist/*