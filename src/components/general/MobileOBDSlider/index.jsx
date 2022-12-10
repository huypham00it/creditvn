import React, { useRef, useState } from 'react';
import { Carousel, Row, Button, Card, Col } from 'antd';
import { RightOutlined, LeftOutlined, CaretDownOutlined } from '@ant-design/icons';
import Image from 'next/image';

import style from './style.module.css';
import data from '@/configs/obd_slider';

const MobileOBDSlider = ({ carouselStyle, size = 'large', dots, dotItems, onCancel, onOk }) => {
    let sliderRef = useRef(null);
    const [current, setCurrent] = useState(0);

    const setSliderRef = (ref) => {
        sliderRef = ref;
    }

    const handleNextSlide = () => {
        sliderRef.next();
        setCurrent(current + 1);
    }

    const handlePrevSlide = () => {
        sliderRef.prev();
        setCurrent(current - 1);
    }

    const setCurrentSlide = (current) => {
        setCurrent(current);
    }

    const handleCancel = () => {
        onCancel();
    }

    const handleSubmit = () => {
        onOk();
    }

    const handleSwipe = (direction) => {
        // swipe left
        if (direction === 'left') {
            setCurrent( current < (dotItems - 1) ? (current + 1) : 0)
        }

        // swipe right
        if (direction === 'right'){
            setCurrent( current > 0 ? (current - 1) : (dotItems - 1))
        }
    }

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                justifyContent: 'space-between',
                padding: size === 'small' ? '12px 0 0' : 0,
                overflow: 'hidden',
            }}
            id="mb_obd_slider"
        >
            <Carousel
                autoplay
                speed={400}
                autoplaySpeed={5000}
                infinite={true}
                dots={dots}
                style={{ ...carouselStyle }}
                ref={setSliderRef}
                afterChange={(current) => setCurrentSlide(current)}
                className={style.slide_inner}
                onSwipe={(direction) => handleSwipe(direction)}
            >

                {/* Slide 1 */}
                <div>
                    <div className={style.slide}>
                        <h2>{data.partner.heading}</h2>
                        <div style={{ maxWidth: '60%', textAlign: 'center', width: '100%' }}>
                            <div className={style.partner_wrap} >
                                {data.partner.logo.map((item, index) => (
                                    <div key={index} span={12} >
                                        <div className={style.partner_item} style={{backgroundImage: `url(${item.src})`, paddingTop: '100%'}}>
                                            {/* <Image src={item.src} width={size === 'small' ? 80 : 120} height={size === 'small' ? 50 : 70} alt="Credit.vn" /> */}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* <Button className={style.partner_more} type="primary" style={{ minWidth: 117, width: 117, marginTop: 32 }} size="large">
                                {data.partner.more}
                            </Button> */}
                        </div>

                    </div>
                </div>

                {/* Slide 2 */}
                <div>
                    <div className={style.slide}>
                        <h2 style={{ marginBottom: '20%' }}>{data.safety_security.heading}</h2>
                        <div style={{ maxWidth: '65%' }}>
                            <Row gutter={[12, 12]}>
                                {data.safety_security.items.map((item, index) => (
                                    <Col key={index} span={12}>
                                        <div className={style.safety_security_item}>
                                            <div>
                                                {item.icon}
                                            </div>
                                            <h4>{item.description}</h4>
                                        </div>
                                    </Col>
                                ))}
                            </Row>

                        </div>
                    </div>
                </div>

                {/* Slide 3 */}
                <div>
                    <div className={style.slide} style={{
                        // paddingBottom: size === 'small' ? 72 : 0
                    }}>
                        <h2>{data.system.heading}</h2>
                        <div style={{ maxWidth: '60%' }}>
                            <div className={style.system_sub}>
                                {data.system.top_heading}
                            </div>
                            <div className={style.system_items}>
                                {data.system.items.map((item, index) => (
                                    <div key={index}>
                                        {item.icon}
                                        <h4>{item.heading}</h4>
                                    </div>
                                ))}
                            </div>
                            <div style={{ textAlign: 'center' }} className={style.system_more}>
                                <CaretDownOutlined style={{ color: '#FFFFFF' }} />
                            </div>
                            <div className={style.system_sub}>
                                {data.system.bottom_heading}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Slide 4 and Slide 5*/}
                {data.general.map((item, index) => (
                    <div key={index}>
                        <div className={style.slide}>
                            <div style={{ maxWidth: '68%' }} className={style.general}>
                                <h2>{item.heading}</h2>
                                <Image src={item.icon.src} width={150} height={150} alt="Credit.vn" />
                                <h4>{item.description}</h4>
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>

            {/* Navigation menu */}
            {current !== 4 && size !== 'small' && <Button className={`${style.arrow_button} ${style.arrow_button__next}`} shape='circle' icon={<RightOutlined />} onClick={handleNextSlide} />}
            {current !== 0 && size !== 'small' && <Button className={`${style.arrow_button} ${style.arrow_button__prev}`} shape='circle' icon={<LeftOutlined />} onClick={handlePrevSlide} />}

            {/* Move button */}
            {size === 'small' &&
                <div className={style.move_btn}>
                    <Button type="text" onClick={handleCancel}>Bỏ Qua</Button>
                    <Button type="primary" size='large' onClick={current === (dotItems - 1) ? handleSubmit : handleNextSlide}>{current === (dotItems - 1) ? 'Xong' : 'Tiếp theo'}</Button>

                    <div className={style.dots} >
                        {[...Array(dotItems)].map((i, index) => (
                            <span key={index} className={current == index ? style.active : ''}></span>
                        ))}
                    </div>
                </div>
            }
        </div>
    )
}

export default MobileOBDSlider