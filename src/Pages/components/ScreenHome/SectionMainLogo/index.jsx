import { FadeWrapper } from "../../FadeWrapper";
import { WrapperContainer2 } from "../../WrapperContainers";

import "./styles.css"

const SectionMainLogo = () => {
    return (
        <FadeWrapper>
            <WrapperContainer2 justifyContent="start" alignItems="center" padding={0} className="main-logo-container">
                <img src="https://www.unilibre.edu.co/bogota/images/logos/Unilibre-bogota.png" alt="Main Icon image"/>
            </WrapperContainer2>
        </FadeWrapper>
    )
}

export { SectionMainLogo };