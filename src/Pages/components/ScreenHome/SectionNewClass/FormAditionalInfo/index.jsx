import { SubTitle } from "../../../SubTitle";
import { TextCard } from "../../../TextComponents";
import { WrapperContainer2 } from "../../../WrapperContainers";

const FormAditionalInfo = () => {
    return (
        <WrapperContainer2 justifyContent="center" alignItems="center" flexDirection="column" gap={10} height="auto">
            <SubTitle fontSize={26} textAlign="center">Asamblea General Ordianria de Asociacion Mixta 2025</SubTitle>

            <TextCard fontSize={14} textAlign="center" className="italic">
                Por favor responda las siguientes preguntas de acuerdo al orden del dia.
            </TextCard>
            <TextCard fontSize={10} textAlign="center" className="italic">
                Los campos con el simbolo (*) son olbigatorios.
            </TextCard>
        </WrapperContainer2>
    );
}

export { FormAditionalInfo };