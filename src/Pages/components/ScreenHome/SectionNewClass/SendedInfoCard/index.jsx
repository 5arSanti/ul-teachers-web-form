import { SubTitle } from "../../../SubTitle";
import { TextCard } from "../../../TextComponents";
import { WrapperContainer2 } from "../../../WrapperContainers";

const SendedCardInfo = () => {
    return (
        <WrapperContainer2 justifyContent="center" alignItems="center" padding={40} flexDirection="column">
            <SubTitle fontSize={30} textAlign="start">
                Informacion enviada
            </SubTitle>

            <TextCard fontSize={18}>Su informacion se ha enviado correctamente</TextCard>
            <TextCard fontSize={18}>Puede cerrar esta ventana</TextCard>
        </WrapperContainer2>
    );
}

export { SendedCardInfo } 