import React from 'react';
import { Row, Col, Button, Grid } from 'antd';
import Image from 'next/image';

import style from './style.module.css';

const { useBreakpoint } = Grid;

const Banner = ({ signup, data }) => {
    const screen = useBreakpoint();

    return (
        <section
            className={style.banner}
            style={{
                backgroundImage: 'url(' + data.backgroundImage.src + ')',
            }}
        >
            <div className={style.banner_inner}>
                <Row style={{ height: '100%' }}>
                    {/* Left */}
                    <Col md={16} xs={12} style={{position: 'relative'}}>
                        <h1 className={style.heading}>{data.heading}</h1>
                        <h2 className={style.sub_heading}>{data.sub_heading}</h2>
                        <Button className={style.signup_btn} href={signup.href} type='primary' danger>{signup.label}</Button>
                    </Col>

                    {/* Right */}
                    <Col md={8} xs={12}>
                        <div className={style.box_right}>
                            <div className={style.box_right_inner}>
                                <Image src={data.imgs.img_01.src} width={screen.md ? 70 : 40} height={screen.md ? 70 : 40} alt="Credit.vn" />
                                <div>
                                    <p>{data.buy_now}</p>
                                    <p style={{ color: '#FFFFFF' }}>{data.pay_later}</p>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>

            </div>
            <div className={style.banner_inner__decord} >
                <div className={style.decord_inner} style={{ backgroundImage: 'url(' + data.imgs.img_02.src + ')' }}></div>
            </div>
        </section>
    )
}

export default Banner