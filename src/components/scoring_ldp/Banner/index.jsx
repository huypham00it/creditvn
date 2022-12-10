import React from 'react';
import { Row, Col, Grid } from 'antd';
import Image from 'next/image';

import style from './style.module.css';

const { useBreakpoint } = Grid;

const Banner = ({ data }) => {
    const screen = useBreakpoint();

    return (
        <section
            className={style.banner}
            style={{
                backgroundColor: '#FAFAFA',
            }}
        >
            <div className={style.banner_inner}>
                <Row style={{ height: '100%' }}>
                    <Col md={12} xs={24} className={style.content}>
                        <h1 className={style.heading}>{data.heading}</h1>
                        <h4 className={style.description}>{data.description}</h4>
                        <div className={style.items_wrap}>
                            {data.items.map((item, i) => (
                                <div key={i}>
                                    <div>
                                        <Image src={item.icon.src} width={screen.md ? 32 : 24} height={screen.md ? 32 : 24} alt="Credit.vn" />
                                    </div>
                                    <span>{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </Col>

                    {screen.md && (
                        <Col 
                            span={12} 
                            style={{
                                backgroundImage: 'url(' + data.decor.src + ')',
                                backgroundSize: '80% auto',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'top right'
                            }}>
                        
                        </Col>
                    )}

                </Row>

            </div>
        </section>
    )
}

export default Banner