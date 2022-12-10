import React, { useRef, useState } from 'react'
import { Row, Carousel, Button, Card, Col } from 'antd';
import { CloseCircleOutlined, RightOutlined, LeftOutlined, CaretDownOutlined } from '@ant-design/icons';
import Image from 'next/image';

import styleODB from '@/assets/ODBSlider.module.css';
import data from '@/configs/obd_slider';

const DeskOBDSlider = ({ handleCloseSlide }) => {
  let sliderRef = useRef(null);
  const [current, setCurrent] = useState(0);

  const setSliderRef = (ref) => {
    sliderRef = ref;
  }

  const handleNextSllide = () => {
    sliderRef.next();
  }

  const handlePrevSllide = () => {
    sliderRef.prev();
  }

  const setCurrentSlide = (current) => {
    setCurrent(current);
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        left: 0,
        bottom: 0,
        right: 0,
        backgroundImage: `
		linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
		radial-gradient(123.18% 99.53% at 130.47% 0%, #FD4363 0%, #2D229B 100%)`,
        paddingLeft: '32px',
        paddingRight: '32px',
        zIndex: 10
      }}
      id="obd_slider"
    >

      {/* CLOSE BUTTON */}
      <div className={styleODB.close_button} onClick={() => handleCloseSlide()}>
        <CloseCircleOutlined
          style={{
            fontSize: "21px",
            lineHeight: 1
          }}
        />
        <span
          style={{
            fontSize: "16px",
            fontWeight: 400
          }}
        >
          Đóng
        </span>
      </div>

      {/* CONTENT */}
      <Carousel
        ref={setSliderRef}
        afterChange={(current) => setCurrentSlide(current)}
        autoplay
        adaptiveHeight={true}
        speed={400}
        autoplaySpeed={5000}
        infinite={true}
      >
        {/* Slide 1 */}
        <div>
          <div style={{ maxWidth: 688 }} className={styleODB.slide_item_wrapper}>
            <h2 className={styleODB.slide_main_heading}>{data.partner.heading}</h2>
            <Row gutter={[16, 16]} >
              {data.partner.logo.map((item, index) => (
                <Col key={index} span={6} >
                  <Card className={styleODB.partner_item}>
                    <Image src={item.src} width={128} height={50} alt="Credit.vn" />
                  </Card>
                </Col>
              ))}
            </Row>
            <Button type="primary" style={{ minWidth: 117, width: 117, marginTop: 32 }} size="large">{data.partner.more}</Button>
          </div>
        </div>

        {/* Slide 2 */}
        <div>
          <div className={styleODB.slide_item_wrapper}>
            <h2 className={styleODB.slide_main_heading}>{data.safety_security.heading}</h2>
            <Row gutter={16}>
              {data.safety_security.items.map((item, index) => (
                <Col key={index} span={6}>
                  <div style={{ minHeight: 400, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div className={styleODB.safety_security_item_icon} >
                      {item.icon}
                    </div>
                    <h4 className={styleODB.safety_security_item_description}>{item.description}</h4>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </div>

        {/* Slide 3 */}
        <div>
          <div className={styleODB.slide_item_wrapper} style={{ maxWidth: '770px' }}>
            <h2 className={styleODB.slide_main_heading}>{data.system.heading}</h2>
            <div className={styleODB.system_heading}>
              {data.system.top_heading}
            </div>
            <div className={styleODB.system_items_wrapper} >
              {data.system.items.map((item, index) => (
                <div key={index} className={styleODB.system_items_item}>
                  {item.icon}
                  <h4 style={{ color: '#FFFFFF', fontSize: '20px', fontWeight: 500 }}>{item.heading}</h4>
                </div>
              ))}
              <CaretDownOutlined className={styleODB.caret_down} style={{ color: '#FFFFFF' }} />
            </div>
            <div style={{ marginTop: '45px' }} className={styleODB.system_heading}>
              {data.system.bottom_heading}
            </div>
          </div>
        </div>

        {/* Slide 4 and Slide 5*/}
        {data.general.map((item, index) => (
          <div key={index}>
            <div className={styleODB.slide_item_wrapper} style={{ maxWidth: '770px' }}>
              <h2 className={styleODB.slide_main_heading}>{item.heading}</h2>
              <Image src={item.icon.src} width={256} height={256} alt="Credit.vn" />
              <h4 className={styleODB.safety_security_item_description}>{item.description}</h4>
            </div>
          </div>

        ))}

      </Carousel>

      {current !== 4 && <Button className={`${styleODB.arrow_button} ${styleODB.arrow_button__next}`} shape='circle' icon={<RightOutlined />} onClick={handleNextSllide} />}
      {current !== 0 && <Button className={`${styleODB.arrow_button} ${styleODB.arrow_button__prev}`} shape='circle' icon={<LeftOutlined />} onClick={handlePrevSllide} />}
    </div>
  )
}

export default DeskOBDSlider