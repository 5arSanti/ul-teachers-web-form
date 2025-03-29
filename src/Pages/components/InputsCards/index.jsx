/* eslint-disable react/prop-types */
import { AiOutlineCloudUpload } from "react-icons/ai";
import "./styles.css";
import React from "react";
import { GridContainer } from "../GridContainer";
import { WrapperContainer2 } from "../WrapperContainers";
import { SpanCard, TextCard } from "../TextComponents";

// eslint-disable-next-line react/prop-types
const InputCard = ({
    type = "text",
    id,
    label,
    placeholder,
    onChange,
    required = true,
    defaultValue = "",
    className = "input-container",
    haveLabel = true,
    pattern = ".*",
}) => {

    return (
        <div className={`${className}`}>
            {haveLabel && <label htmlFor={id}>{label} {required && "*"}</label>}

            <input
                type={type}
                placeholder={placeholder ? placeholder : label}
                name={id}
                id={id}
                onChange={(event) => { onChange(event.target.value) }}
                required={required}
                defaultValue={defaultValue}
                pattern={pattern}
            />
        </div>
    );
}

const OptionInputCard = ({ id, label, array = [], onChange, defaultValue = 0, none = false, padding = 15, required = true }) => {
    return (
        <div className="input-container">
            <label htmlFor={id}>{label} {required && "*"}</label>
            <select
                name={id}
                id={id}
                onChange={(event) => { onChange(event.target.value) }}
                value={defaultValue}
                style={{ padding: padding }}
                required={required}
            >
                {none &&
                    <option value="">Seleccionar</option>
                }
                {array?.map((item, index) => (
                    <option
                        key={index}
                        value={item}
                    >
                        {item}
                    </option>
                ))}
            </select>
        </div>
    );
}

const TextAreaCard = ({ id, label, placeholder = "placeholder", onChange, required = true, defaultValue = "" }) => {
    return (
        <div className="input-container">
            <label htmlFor={id}>{label} {required && "*"}</label>
            <textarea
                placeholder={placeholder}
                name={id}
                id={id}
                onChange={(event) => { onChange(event.target.value) }}
                required
                defaultValue={defaultValue}
            />
        </div>
    );
}

const UploadFileCard = ({ id, label = "Cargar Archivo", onChange, filesArray, multiple = true, info = "Archivos PDF (.pdf) o Excel (.xlsx)", accept = ".pdf, .xlsx" }) => {
    const array = filesArray ? [...filesArray] : null;

    return (
        <label htmlFor={id} className="upload-file-container">
            <input
                id={id}
                name={id}
                type="file"
                accept={accept}
                onChange={(event) => { onChange(event) }}
                onClick={(event) => event.target.value = null}
                multiple={multiple}
            />
            <span>
                <AiOutlineCloudUpload />
            </span>
            <div className="upload-file-info-container">
                <p>{label}</p>
                {array && array?.length !== 0 ? [...filesArray]?.map((item, index) => (
                    <p className="info-text" key={index}>{`(${index + 1})`} {item.name}</p>
                ))
                    :
                    <p>{info}</p>
                }
            </div>

        </label>
    );
}

const MultiSelectCard = ({ id, label, array = [], onChange, required = true, maxSelection = 12 }) => {
    const [selectedOptions, setSelectedOptions] = React.useState([]);
    const [isOpen, setIsOpen] = React.useState(false);

    const handleChange = (event) => {
        const { value, checked } = event.target;
        let updatedOptions;

        if (checked) {
            if (selectedOptions.length < maxSelection) {
                updatedOptions = [...selectedOptions, value];
            } else {
                return;
            }
        } else {
            updatedOptions = selectedOptions.filter((item) => item !== value);
        }

        setSelectedOptions(updatedOptions);
        onChange(updatedOptions.join(", "));
    };

    return (
        <div className="input-container" style={{
            backgroundColor: isOpen ? "#f0f0f0" : "white",
            borderRadius: 10,
            padding: 10,
        }}>
            <label htmlFor={id}>{label} {required && "*"}</label>
            <div className="multi-select" onClick={() => setIsOpen(!isOpen)}>
                <input
                    style={{ width: "100%", cursor: "pointer" }}
                    type="text"
                    id={id}
                    name={id}
                    value={selectedOptions.length > 0 ? selectedOptions.join(", ") : "Seleccione sus respuestas"}
                    readOnly
                    required={required}
                />
            </div>
            {isOpen && (
                <div className="multi-select-dropdown">
                    <GridContainer className="grid-1-1" padding={10} gap={0}>
                        {array && array.length > 0 ? array.map((option, index) => (
                            <WrapperContainer2 key={index} flexDirection="row" justifyContent="start" alignItems="center" padding={5} gap={10}>
                                <input
                                    style={{ cursor: "pointer", height: "15px", width: "15px" }}
                                    type="checkbox"
                                    value={option}
                                    checked={selectedOptions.includes(option)}
                                    onChange={handleChange}
                                    disabled={selectedOptions.length >= maxSelection && !selectedOptions.includes(option)}
                                />
                                {option}
                            </WrapperContainer2>
                        )) :
                            <TextCard className="bold italic" fontSize={16}>
                                <SpanCard>No hay opciones disponibles</SpanCard>
                            </TextCard>
                        }
                    </GridContainer>
                </div>
            )}
        </div>
    );
};


export { InputCard, OptionInputCard, TextAreaCard, UploadFileCard, MultiSelectCard };