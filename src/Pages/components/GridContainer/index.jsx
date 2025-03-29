import "./styles.css"

const GridContainer = ({ children, padding = 0, className = "grid-1-1", gap = 20, background = false }) => {
    const backgroudStyles = {
        background: background ? "#f0f0f0" : "none",
        borderRadius:  background ? "10px" : "0px",
    }

    return (
        <div className={`grid-container ${className}`} style={{
            gap: gap,
            padding: padding,
            ...backgroudStyles,
        }}>
            {children}
        </div>
    )
}

export { GridContainer };