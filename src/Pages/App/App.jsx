//Dependencies
import { HashRouter, Navigate, useRoutes } from "react-router-dom";

// CSS
import './App.css'
import './App.css'

import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

//Context
import { AppProvider } from "../../Context";

//Screens
import { Home } from "../Screens/Home";

// Componentes
import { NavBar } from "../components/NavBar";
import { WrapperContainer2 } from "../components/WrapperContainers";
import { ToastContainer } from "react-toastify";

const AppRoutes = () => {

    let routes = useRoutes([
        {path: "/home", element: <Home/>},
        {path: "/*", element: <Navigate replace to={"/home"}/>},


    ]);
    
    return routes;
}

const App = () => {
    return (
        <AppProvider>
            <HashRouter>
                <WrapperContainer2 className="main-container relative" padding={0} gap={0} flexDirection="column" justifyContent="center" alignItems="center">
                    
                    <NavBar/>
                    <AppRoutes/>

                    <ToastContainer/>

                </WrapperContainer2>
            </HashRouter>
        </AppProvider>
    );
}

export default App;

