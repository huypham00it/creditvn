import { Layout, Row, Col, Grid } from "antd";
import Image from 'next/image';

import styleLdp from '@/assets/LandingPage.module.css';

const { useBreakpoint } = Grid;
const { Footer } = Layout;

const Foot = ({ data }) => {
    const screen = useBreakpoint();

    return (
        <>
            <Footer
                className={styleLdp.footer}
            >
                {screen.md && <Image
                    src={data.logo.src}
                    width={262}
                    height={44}
                    alt="Credit.vn"
                />}

                <Row style={{ marginTop: screen.md ? '32px' : 0, color: data.primaryColor }}>
                    {data.support.map((item, index) => (
                        <Col xs={24} md={8} key={index} className={styleLdp.support_info}>
                            <h3 style={{ fontWeight: 600 }}>{item.heading}</h3>
                            <div className={styleLdp.info_item}>
                                <span className={styleLdp.footer_icon}>{item.phone.icon}</span>
                                <span
                                    style={{
                                        fontSize: '20px',
                                        fontWeight: 700
                                    }}
                                >
                                    {item.phone.text}
                                </span>
                            </div>

                            <div className={styleLdp.info_item}>
                                <span className={styleLdp.footer_icon}>{item.mail.icon}</span>
                                <span>{item.mail.text}</span>
                            </div>
                        </Col>
                    ))}

                    <Col xs={24} md={8} className={styleLdp.support_info}>
                        <div className={styleLdp.info_item}>
                            <span className={styleLdp.footer_icon}>{data.worktime.icon}</span>
                            <div>
                                <p style={{ marginBottom: 0 }}>{data.worktime.heading}</p>
                                {data.worktime.content.map((item, i) => (
                                    <p key={i}>{item}</p>
                                ))}
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row className={styleLdp.description}>
                    <p style={{ fontSize: 14 }}>{data.description}</p>
                </Row>
            </Footer>
            <div style={{
                textAlign: 'center',
                padding: '8.5px',
                backgroundColor: data.copyright.background,
                color: data.copyright.color,
                fontSize: 14
            }}>
                {data.copyright.text}
            </div>
        </>
    );
}

export default Foot;