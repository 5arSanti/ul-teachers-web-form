import React from "react";
import { FadeWrapper } from "../../FadeWrapper";
import { GridContainer } from "../../GridContainer";
import { WrapperContainer2 } from "../../WrapperContainers";
import { Form } from "./Form";
import { SendedCardInfo } from "./SendedInfoCard";

import "./styles.css"
import { Loader } from "../../Loader";
import { AppContext } from "../../../../Context";

const SectionNewClass = () => {
    const { loading } = React.useContext(AppContext);
    const [showForm, setShowForm] = React.useState(true);

    React.useEffect(() => {
        if (localStorage.getItem("sended")) { setShowForm(false); }
    }, []);


    return (
        <FadeWrapper>
            <GridContainer padding={0} className="grid-1 main-form-container" gap={0}>
                <WrapperContainer2 padding={0} justifyContent="center" alignItems="center">
                    <img src="https://www.unilibre.edu.co/bogota/images/2020/agosto/POST-INFO-formulario.jpg" alt="Banner image" />
                </WrapperContainer2>

                {!showForm ? <SendedCardInfo /> : <Form showForm={showForm} />}
                {loading && <Loader message="Enviado la informacion, por favor espere un momento"/>}

            </GridContainer>
        </FadeWrapper>
    );
}

export { SectionNewClass };