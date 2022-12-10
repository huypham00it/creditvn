import React from 'react';
import { Row, Col, Button, Grid } from 'antd';
import Image from 'next/image';

import style from './style.module.css';

const { useBreakpoint } = Grid;

const Partner = ({ float_box, data, test }) => {
    const screen = useBreakpoint();

    return (
        <section id='partner' className={style.partner} >
            <div className={style.partner_inner}>
                <h2>{data.heading}</h2>
                <Row gutter={screen.md ? [16, 16] : [12, 12]}>
                    {data.items.map((item, i) => (
                        <Col md={6} xs={12} key={i}>
                            <div className={style.partner_item}>
                                <Image src={item.src} width={200} height={110} alt="Credit.vn partner" />
                            </div>
                        </Col>
                    ))}
                </Row>
                <div className={style.float_box}>
                    <h2>{float_box.heading}</h2>
                    <Button className={style.test_button} href={test.href}>{test.label}</Button>
                </div>
            </div>
        </section>
    )
}

export default Partner