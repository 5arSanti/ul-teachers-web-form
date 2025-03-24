import { InputCard, OptionInputCard } from "../../../InputsCards";
import { WrapperContainer2 } from "../../../WrapperContainers";

import { GridContainer } from "../../../GridContainer";
import { FormAditionalInfo } from "../FormAditionalInfo";
import { ButtonCard } from "../../../ButtonCard";

import { IoIosSend } from "react-icons/io";

import "./styles.css"
import React from "react";
import { handleNotifications } from "../../../../../utils/handleNotifications";
import { AppContext } from "../../../../../Context";
import { reloadLocation } from "../../../../../utils/realoadLocation";

const Form = ({ showForm }) => {
    const { setLoading, loading } = React.useContext(AppContext);

    const booleanValues = ["SI", "NO"];

    const initialValues = JSON.parse(localStorage.getItem("form")) || {
        Cedula: null,
        Nombres: null,
        Apellidos: null,
        Facultad: null,
        Programa: null,
        Fecha: new Date().toISOString(),
    };

    const [values, setValues] = React.useState(initialValues);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        localStorage.setItem("form", JSON.stringify(values));

        try {
            const response = await fetch(import.meta.env.VITE_API_GOOGLE_APP_SHEET, {
                redirect: "follow",
                method: "POST",
                body: JSON.stringify(values),
                headers: {
                    "Content-Type": "text/plain;charset=utf-8",
                },
            });

            const data = await response.json();

            if (data.success) {
                localStorage.setItem("sended", true);
                handleNotifications("success", data.message);
            }
            reloadLocation(1000)

        }
        catch (error) {
            handleNotifications("error", "Error al enviar la información, intentelo de nuevo");
            reloadLocation(2000)
        }

        setLoading(false);
    }

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <WrapperContainer2 className="form-inputs-container" justifyContent="start" alignItems="center" padding={40} gap={30} flexDirection="column">
                <FormAditionalInfo />

                <InputCard
                    id={"id"}
                    label={"Cedula"}
                    type="number"
                    placeholder="Ingrese su numero de cedula"
                    onChange={(event) => setValues({ ...values, Cedula: event })}
                    defaultValue={values.Cedula || ""}
                />
                <GridContainer className="grid-1-1" padding={0}>
                    <InputCard
                        id={"name"}
                        label={"Nombres"}
                        placeholder="Ingrese sus nombres"
                        onChange={(event) => setValues({ ...values, Nombres: event.toUpperCase().trim() })}
                        defaultValue={values.Nombres || ""}
                    />
                    <InputCard
                        id={"lastname"}
                        label={"Apellidos"}
                        placeholder="Ingrese sus apellidos"
                        onChange={(event) => setValues({ ...values, Apellidos: event.toUpperCase().trim() })}
                        defaultValue={values.Apellidos || ""}
                    />
                </GridContainer>

                <OptionInputCard
                    none={true}
                    id={"faculty"}
                    label={"Facultad"}
                    placeholder="Seleccione su facultad"
                    array={["Ingenieria", "Derecho"]}
                    onChange={(event) => setValues({ ...values, Facultad: event })}
                    defaultValue={values.Facultad}
                />

                <OptionInputCard
                    none={true}
                    id={"program"}
                    label={"Programa"}
                    array={["Ingenieria de sistemas", "Ingenieria ambiental", "Derecho"]}
                    placeholder="Seleccione su programa"
                    onChange={(event) => setValues({ ...values, Programa: event })}
                    defaultValue={values.Programa}
                />

                <InputCard
                    id={"lastname"}
                    label={"Pregunta 1"}
                    required={false}
                />

                <OptionInputCard
                    none={true}
                    id={"2"}
                    label={"Pregunta 2"}
                    array={booleanValues}
                    required={false}
                />

                <ButtonCard
                    title="Enviar información del curso"
                    type="submit"
                    disabled={loading || !showForm}

                >
                    {loading ? "Cargando..." : "Enviar información"} <IoIosSend />
                </ButtonCard>
            </WrapperContainer2>
        </form>
    );
}

export { Form };