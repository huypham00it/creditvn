import React from 'react';
import { Row, Col, Grid } from 'antd';

import style from './style.module.css';

const { useBreakpoint } = Grid;

const Benefit = ({ data }) => {
    const screen = useBreakpoint();

    return (
        <section id="benefit" className={style.benefit}>
            <div className={style.benefit__inner}>
                <h2 className={style.heading}>{data.heading}</h2>
                {screen.md ? (
                    <Row gutter={20}>
                        {data.items.map((item, i) => (
                            <Col span={6} key={i}>
                                <div className={style.card_item}>
                                    <div className={style.card_item__icon}>
                                        {item.icon}
                                    </div>
                                    <h4>{item.description}</h4>
                                </div>
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <Row gutter={[16, 20]}>
                        {data.items.map((item, i) => (
                            <Col span={12} key={i}>
                                <div className={style.card_item}>
                                    <div className={style.card_item__icon}>
                                        {item.icon}
                                    </div>
                                    <h4>{item.description}</h4>
                                </div>
                            </Col>
                        ))}
                    </Row>
                )}
            </div>
        </section>
    )
}

export default Benefit