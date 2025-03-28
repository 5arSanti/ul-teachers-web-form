import { InputCard, MultiSelectCard, OptionInputCard } from "../../../InputsCards";
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
        Fecha: new Date().toISOString(),
        Cedula: null,
        Nombre: null,
        Apellido: null,

        "1_Existe_Quorum": null,
        "3_Aprueba_Orden_Dia": null,
        "4_Aprueba_Reglamento_Interno_Asamblea": null,
        "5_Eleccion_Presidente": null,
        "5_Eleccion_Secretario": null,
        "6_Delegados_Comision": null,
        "8_Informe_Junta_Directiva": null,
        "9_Informe_Gerencia": null,
        "10_Informe_Comite_Control": null,
        "11_Dictamen_Revisor_Fiscal": null,
        "12_Aprueba_Estados_Financieros": null,
        "13_Aprueba_Proyecto_Aplicacion_Excedentes": null,
        "15_Aprueba_Proyecto_Reforma_Estatutos": null,
        "16_Junta_Directiva": null,
        "17_Revisor_Fiscal": null,
        "17_Revisor_Fiscal_Suplente": null,
        "17_Revisor_Fiscal_Suplente_Honorarios": null,
        "18_Comite_Control_Social": null,
    };

    const [values, setValues] = React.useState(initialValues);

    console.log(values);

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
            <WrapperContainer2 className="form-inputs-container" justifyContent="start" alignItems="center" padding={40} gap={40} flexDirection="column">
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
                    id={"1_Existe_Quorum"}
                    label={"1. ¿Existe Quorum?"}
                    placeholder="Seleccione su respuesta"
                    array={booleanValues}
                    onChange={(event) => setValues({ ...values, "1_Existe_Quorum": event })}
                    defaultValue={values["1_Existe_Quorum"]}
                />

                <OptionInputCard
                    none={true}
                    id={"3_Aprueba_Orden_Dia"}
                    label={"3. ¿Aprueba Orden del Día?"}
                    placeholder="Seleccione su respuesta"
                    array={booleanValues}
                    onChange={(event) => setValues({ ...values, "3_Aprueba_Orden_Dia": event })}
                    defaultValue={values["3_Aprueba_Orden_Dia"]}
                />

                <OptionInputCard
                    none={true}
                    id={"4_Aprueba_Reglamento_Interno_Asamblea"}
                    label={"4. ¿Aprueba el reglamento interno de asamblea?"}
                    placeholder="Seleccione su respuesta"
                    array={booleanValues}
                    onChange={(event) => setValues({ ...values, "4_Aprueba_Reglamento_Interno_Asamblea": event })}
                    defaultValue={values["4_Aprueba_Reglamento_Interno_Asamblea"]}
                />


                <GridContainer>
                    <OptionInputCard
                        none={true}
                        id={"5_Eleccion_Presidente"}
                        label={"5. Eleccion de Presidente de la Asamblea"}
                        placeholder="Seleccione su respuesta"
                        array={["Candidato 1", "Candidato 2", "Candidato 3", "Candidato 4", "Candidato 5", "Candidato 6", "Candidato 7", "Candidato 8", "Candidato 9", "Candidato 10"]}
                        onChange={(event) => setValues({ ...values, "5_Eleccion_Presidente": event })}
                        defaultValue={values["5_Eleccion_Presidente"]}
                    />
                    <OptionInputCard
                        none={true}
                        id={"5_Eleccion_Secretario"}
                        label={"5. Eleccion de Secretario de la Asamblea"}
                        placeholder="Seleccione su respuesta"
                        array={["Candidato 1", "Candidato 2", "Candidato 3", "Candidato 4", "Candidato 5", "Candidato 6", "Candidato 7", "Candidato 8", "Candidato 9", "Candidato 10"]}
                        onChange={(event) => setValues({ ...values, "5_Eleccion_Secretario": event })}
                        defaultValue={values["5_Eleccion_Secretario"]}
                    />

                </GridContainer>

                <MultiSelectCard
                    id={"6_Delegados_Comision"}
                    label={"6. Eleccion de dos (2) delegados para la Comisión de Revision y Aprobacion Del Acta de la Asamblea"}
                    placeholder="Seleccione su respuesta"
                    array={["Delegado 1", "Delegado 2", "Delegado 3", "Delegado 4", "Delegado 5", "Delegado 6", "Delegado 7", "Delegado 8", "Delegado 9", "Delegado 10"]}
                    onChange={(event) => setValues({ ...values, "6_Delegados_Comision": event })}
                    defaultValue={values["6_Delegados_Comision"]}
                    maxSelection={2}
                />

                <MultiSelectCard
                    id={"8_Informe_Junta_Directiva"}
                    label={"8. Presentacion del informe de la Junta Directiva del año 2025"}
                    placeholder="Seleccione su respuesta"
                    array={[]}
                    onChange={(event) => setValues({ ...values, "8_Informe_Junta_Directiva": event })}
                    defaultValue={values["8_Informe_Junta_Directiva"]}
                />

                <MultiSelectCard
                    id={"9_Informe_Gerencia"}
                    label={"9. Presentacion del informe de Gerencia del año 2025"}
                    placeholder="Seleccione su respuesta"
                    array={[]}
                    onChange={(event) => setValues({ ...values, "9_Informe_Gerencia": event })}
                    defaultValue={values["9_Informe_Gerencia"]}
                />

                <MultiSelectCard
                    id={"10_Informe_Comite_Control"}
                    label={"10. Informe Comité de Control"}
                    placeholder="Seleccione su respuesta"
                    array={[]}
                    onChange={(event) => setValues({ ...values, "10_Informe_Comite_Control": event })}
                    defaultValue={values["10_Informe_Comite_Control"]}
                />

                <MultiSelectCard
                    id={"11_Dictamen_Revisor_Fiscal"}
                    label={"11. Dictamen Revisor Fiscal"}
                    placeholder="Seleccione su respuesta"
                    array={[]}
                    onChange={(event) => setValues({ ...values, "11_Dictamen_Revisor_Fiscal": event })}
                    defaultValue={values["11_Dictamen_Revisor_Fiscal"]}
                />

                <OptionInputCard
                    none={true}
                    id={"12_Aprueba_Estados_Financieros"}
                    label={"12. ¿Aprueba los Estados Financieros a diciembre de 2025?"}
                    placeholder="Seleccione su respuesta"
                    array={booleanValues}
                    onChange={(event) => setValues({ ...values, "12_Aprueba_Estados_Financieros": event })}
                    defaultValue={values["12_Aprueba_Estados_Financieros"]}
                />

                <OptionInputCard
                    none={true}
                    id={"13_Aprueba_Proyecto_Aplicacion_Excedentes"}
                    label={"13. ¿Aprueba el proyecto de Aplicacion de Excedentes del año 2025?"}
                    placeholder="Seleccione su respuesta"
                    array={booleanValues}
                    onChange={(event) => setValues({ ...values, "13_Aprueba_Proyecto_Aplicacion_Excedentes": event })}
                    defaultValue={values["13_Aprueba_Proyecto_Aplicacion_Excedentes"]}
                />

                <OptionInputCard
                    none={true}
                    id={"15_Aprueba_Proyecto_Reforma_Estatutos"}
                    label={"15. ¿Aprueba el Proyecto de Reforma de Estatutos Art. 12?"}
                    placeholder="Seleccione su respuesta"
                    array={booleanValues}
                    onChange={(event) => setValues({ ...values, "15_Aprueba_Proyecto_Reforma_Estatutos": event })}
                    defaultValue={values["15_Aprueba_Proyecto_Reforma_Estatutos"]}
                />

                <MultiSelectCard
                    id={"16_Junta_Directiva"}
                    label={"16. Eleccion de Junta Directiva"}
                    placeholder="Seleccione su respuesta"
                    array={[]}
                    onChange={(event) => setValues({ ...values, "16_Junta_Directiva": event })}
                    defaultValue={values["16_Junta_Directiva"]}
                />

                <GridContainer>
                    <OptionInputCard
                        none={true}
                        id={"17_Revisor_Fiscal"}
                        label={"17. Eleccion de Revisor Fiscal"}
                        placeholder="Seleccione su respuesta"
                        array={["Candidato 1", "Candidato 2", "Candidato 3", "Candidato 4", "Candidato 5", "Candidato 6", "Candidato 7", "Candidato 8", "Candidato 9", "Candidato 10"]}
                        onChange={(event) => setValues({ ...values, "17_Revisor_Fiscal": event })}
                        defaultValue={values["17_Revisor_Fiscal"]}
                    />
                    <OptionInputCard
                        none={true}
                        id={"17_Revisor_Fiscal_Suplente"}
                        label={"17. Eleccion de Revisor Fiscal Suplente"}
                        placeholder="Seleccione su respuesta"
                        array={["Candidato 1", "Candidato 2", "Candidato 3", "Candidato 4", "Candidato 5", "Candidato 6", "Candidato 7", "Candidato 8", "Candidato 9", "Candidato 10"]}
                        onChange={(event) => setValues({ ...values, "17_Revisor_Fiscal_Suplente": event })}
                        defaultValue={values["17_Revisor_Fiscal_Suplente"]}
                    />
                    <InputCard
                        id={"17_Revisor_Fiscal_Suplente_Honorarios"}
                        label={"17. Honorarios del Revisor Fiscal"}
                        type="number"
                        placeholder="Ingrese el valor de los honorarios"
                        onChange={(event) => setValues({ ...values, "17_Revisor_Fiscal_Suplente_Honorarios": event })}
                        defaultValue={values["17_Revisor_Fiscal_Suplente_Honorarios"] || ""}
                    />
                </GridContainer>



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