import React from "react";

export const AppContext = React.createContext();

const AppProvider = ({children}) => {

    //LOADING, ERROR
    const [loading, setLoading] = React.useState(null);


    
    // Screen Width
    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
    React.useEffect(() => {
        function handleResize() {
          setWindowWidth(window.innerWidth);
        }
    
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);

    return (
        <AppContext.Provider
            value={{
                loading,
                setLoading,

                //Tamaño de la pantalla
                windowWidth,
                setWindowWidth,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export { AppProvider }