import { SubTitle } from "../../../SubTitle";
import { TextCard } from "../../../TextComponents";
import { WrapperContainer2 } from "../../../WrapperContainers";

const FormAditionalInfo = () => {
    return (
        <WrapperContainer2 justifyContent="center" alignItems="center" flexDirection="column" gap={10} height="auto">
            <SubTitle fontSize={26} textAlign="center">TITULO</SubTitle>

            <TextCard fontSize={14} textAlign="center" className="italic">
                ¡Hola, por favor responda las siguientes preguntas!
            </TextCard>
            <TextCard fontSize={10} textAlign="center" className="italic">
                Los campos con el simbolo (*) son olbigatorios.
            </TextCard>
        </WrapperContainer2>
    );
}

export { FormAditionalInfo };