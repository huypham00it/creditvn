/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Row, Col } from 'antd';

import style from './style.module.css';

const Introduce = ({data}) => {
  return (
    <section id='introduce' className={style.introduce} style={{backgroundImage: 'url(' + data.backgroundImage.src + ')'}}>
        <div className={style.introduce_inner}>
            <Row>
              <Col md={12} xs={24}>
                <div className={style.box_left}>
                  <h2>{data.heading}</h2>
                  <p>{data.description}</p>
                </div>
              </Col>
              <Col md={12} xs={24}>
                <div className={style.box_right}>
                  <img src={data.imgs.img_03.src} alt="growth" />
                </div>
              </Col>
            </Row>
        </div>
    </section>
  )
}

export default Introduce