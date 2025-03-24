import ReactDOM from "react-dom";
import "./styles.css";
import { TextCard } from "../TextComponents";

const Loader = ({ message = "Cargando...", size = "medium" }) => {
    return ReactDOM.createPortal(
        <div className="loader-overlay">
            <div className={`loader ${size}`}></div>
            <TextCard fontSize={18} textAlign="center" className="loader-message">{message}</TextCard>
        </div>,
        document.body
    );
};

export { Loader };