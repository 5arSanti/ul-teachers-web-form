import "./styles.css";

const ButtonCard = ({children, className="button-card-container", title="", onClick=()=>{}, type="button", padding=20, borderWidth=1, disabled=false}) => {
    return(
        <button
            className={className}
            title={title}
            onClick={(event) => onClick(event)}
            type={type}
            style={{
                padding: padding,
                borderWidth: borderWidth
            }}
            disabled={disabled}
        >
            {children}
        </button>
    );
}

export { ButtonCard };