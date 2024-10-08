import {
    withStreamlitConnection
} from "streamlit-component-lib"

import StreamlitFlowComponent from "./StreamlitFlowComponent";
import {createBrowserRouter, RouterProvider} from 'react-router-dom';



const StreamlitFlowApp = (props) => {

    // For potential to add new components
    const router = createBrowserRouter([
        {
            path: '/',
            element: <StreamlitFlowComponent {...props} />
        }
    ]);

    return <RouterProvider router={router} />;
} 

export default withStreamlitConnection(StreamlitFlowApp);