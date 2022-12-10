import { Grid, Row, Col, Layout } from 'antd';
import Image from 'next/image';

import styleODB from '@/assets/ODBSlider.module.css';
import DesktopPageLayout from '@/layouts/DesktopPage.layout';
import RouterGuard from '@/layouts/components/RouterGuard';
import slides from '@/configs/obd_slider';
import Header from '@/layouts/components/Header';


const { useBreakpoint } = Grid;

const About = () => {
    const screen = useBreakpoint();

    if (screen.md) {
        return (
            <RouterGuard>
                <Layout>
                    <DesktopPageLayout>
                        <Row 
                            style={{
                                position: 'absolute',
                                top: '0',
                                width: '100%',
                                left: '0', 
                                height: 'calc(100vh - 64px)', 
                                backgroundImage: `
                                linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
                                radial-gradient(123.18% 99.53% at 130.47% 0%, #FD4363 0%, #2D229B 100%)`,
                                paddingLeft: '32px',
                                paddingRight: '32px'
                            }}>
                            {slides.map((slide, index) => (
                                <Col span={6} key={index}>
                                    <div
                                        key={index}
                                        className={styleODB.slide_content_wrapper}
                                    >
                                        <Image src={slide.icon.src} width={150} height={150} alt="Credit.vn" />
                                        <h4 className={styleODB.slide_heading} >
                                            {slide.heading}
                                        </h4>
                                        {slide.sub_heading &&
                                            <h4 className={styleODB.slide_heading}>
                                                {slide.sub_heading}
                                            </h4>}
                                        {
                                            slide.description.map((des, i) => (
                                                <p
                                                    style={{
                                                        marginBottom: 0,
                                                        fontFamily: "Montserrat",
                                                        fontWeight: 400
                                                    }}
                                                    key={i}
                                                >{des}</p>
                                            ))
                                        }
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </DesktopPageLayout>
                </Layout>
            </RouterGuard>
        );
    }
}

export default About;