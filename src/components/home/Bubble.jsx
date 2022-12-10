import Image from 'next/image';
import { CloseCircleOutlined } from '@ant-design/icons';

import GiftIcon from '@/assets/img/gift_icon.gif';
import GiftText from '@/assets/img/gift_text.svg';
import styleBubble from '@/assets/Bubble.module.css';

const surveyLink = "https://docs.google.com/forms/d/e/1FAIpQLScqnzyk1txuf-QorK-UFaa-7XhpbANeEYP82uJ-epUoPaKh4Q/viewform?usp=send_form";

const Bubble = ({iconSize, textSize, handleClose, style}) => {
    return (
        <div className={styleBubble.gift_wrapper} style={style} id="bubble">
            <a target="_blank" rel="noreferrer" href={surveyLink}>

                <Image
                    priority
                    src={GiftIcon.src}
                    width={iconSize.width}
                    height={iconSize.height}
                    alt="Credit.vn"
                />
                <div className={styleBubble.gift_text}>
                    <Image
                        src={GiftText.src}
                        width={textSize.width}
                        height={textSize.height}
                        alt="Credit.vn"
                    />

                </div>
            </a>

            <CloseCircleOutlined onClick={() => {handleClose()}} className={styleBubble.close} />
        </div>
    )
}

export default Bubble;