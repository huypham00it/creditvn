import React from 'react';
import { Row, Col } from 'antd';
import Image from 'next/image';

import style from './style.module.css';

const Solution = ({ logo, data }) => {
    return (
        <section id='solution' className={style.solution} >
            <div className={style.solution__inner}>
                <Row>
                    <Col xs={24} md={12}>
                        <div className={style.box_left}>
                            <h2 className={style.heading}>{data.heading}</h2>
                            <Image src={logo.src} width={255} height={75} alt="Credit.vn" />
                            <p>{data.description}</p>
                        </div>
                    </Col>

                    <Col xs={24} md={12}>
                        <div className={style.box_right}>
                            {data.items.map((item, index) => (
                                <div className={style.box_right__item} key={index}>
                                    <div className={style.box_right__item_icon}>
                                        {item.icon}
                                    </div>
                                    <p>{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </Col>
                </Row>
            </div>
        </section>
    )
}

export default Solution