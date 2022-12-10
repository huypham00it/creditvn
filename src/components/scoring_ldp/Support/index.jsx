import React from 'react';
import { Row, Col, Button, Grid } from 'antd';
import Image from 'next/image';

import style from './style.module.css';

const { useBreakpoint } = Grid;

const Support = ({ support, data }) => {
  const screen = useBreakpoint();

  return (
    <section id='support' className={style.support}>
      <div className={style.support_inner}>
        <h2>{data.heading}</h2>
        <Row gutter={screen.md ? 70 : 12}>
          {data.items.map((item, i) => (
            <Col md={12} xs={12} key={i}>
              <div className={style.item_wrap}>
                <div className={style.item_icon}>
                  <Image src={item.icon.src} width={screen.md ? 45 : 24} height={screen.md ? 45 : 24} alt="Credit.vn" />
                </div>
                <h3>{item.description}</h3>
              </div>
            </Col>
          ))}
        </Row>
        <Button size='large' className={style.support_button} type="primary" href={support.href} danger>{support.label}</Button>
      </div>
    </section>
  )
}

export default Support