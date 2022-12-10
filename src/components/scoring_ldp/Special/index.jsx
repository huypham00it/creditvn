import React from 'react';
import { Row, Col, Grid } from 'antd';

import style from './style.module.css';
import Image from 'next/image';

const { useBreakpoint } = Grid;

const Special = ({ data }) => {
    const screen = useBreakpoint();

    return (
        <section id="special" className={style.special}>
            <div className={style.special_inner}>
                <Row gutter={screen.md ? [24, 24] : [16, 16]}>
                    <Col md={8} xs={24} >
                        <h2>{data.heading}</h2>
                        <h3>{data.description}</h3>
                    </Col>

                    {data.items.map((item, i) => (
                        <Col md={8} xs={24} key={i}>
                            <div className={style.item_wrap} style={{ backgroundColor: item.color }}>
                                <Image src={item.icon.src} width={screen.md ? 80 : 40} height={screen.md ? 80 : 40} alt="Credit.vn" />
                                <h4>{item.description}</h4>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>
        </section>
    )
}

export default Special