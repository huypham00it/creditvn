import { useState } from 'react';
import { Card, Row, Col, Button, Slider, Grid } from 'antd';

import styleLdp from '@/assets/LandingPage.module.css';
import currencyFormat from '@/utils/currencyFormat';

const { useBreakpoint } = Grid;

const Welcome = ({ data, next, user, setUser }) => {
    const [currentTab, setCurrentTab] = useState(0);
    const [loan, setLoan] = useState(user?.loan ? user.loan : 4000000);
    const [payment, setPayment] = useState(user?.loan ? data.signup.calcPayment(user.loan) : (4000000 * (1 + 0.495)));
    const screen = useBreakpoint();

    const handleLoanChange = (value) => {
        setLoan(value);
        setPayment(data.signup.calcPayment(value));
    }

    const handleNext = () => {
        next({ loan: loan })
    }

    return (
        <div
            style={{
                backgroundImage: `url('${data.bannerImage?.src}')`
            }}
            className={styleLdp.signup_wrap}
        >
            <Card
                style={{ maxWidth: '375px', width: '100%' }}
                bodyStyle={{ padding: screen.md ? '4px 0 0' : 0 }}
                className={styleLdp.signup_card}
            >
                <Row className={styleLdp.signup_card_head} gutter={0}>
                    {data.signup.tabs.map((tab, index) => (
                        <Col span={12} key={index}
                            style={{
                                fontSize: 14,
                                fontWeight: 500,
                                padding: 12,
                                textAlign: 'center',
                                backgroundColor: currentTab === index ? '#00B3B2' : "#ffffff",
                                color: currentTab === index ? '#ffffff' : "#000000",
                                cursor: 'pointer',
                            }}
                            onClick={() => setCurrentTab(index)}
                        >
                            {tab}
                        </Col>
                    ))}
                </Row>

                <Row className={styleLdp.signup_card_body}>
                    <div>
                        <span>T??i mu???n vay</span>
                        <span>{currencyFormat(loan, ",")} <u style={{ fontWeight: 400 }}>??</u></span>
                    </div>

                    <div id='signup_slider'>
                        <Slider
                            marks={{
                                [data.signup.min.value]: data.signup.min.label,
                                [data.signup.max.value]: data.signup.max.label,
                            }}
                            defaultValue={user?.loan ? user.loan : data.signup.defaultValue}
                            min={data.signup.min.value}
                            max={data.signup.max.value}
                            step={data.signup.step}
                            className={styleLdp.slider}
                            trackStyle={{
                                backgroundColor: "#00B3B2"
                            }}
                            tooltip={{ formatter: (value) => currencyFormat(value, " ") }}
                            handleStyle={{
                                borderColor: "#00B3B2",
                                border: '7px solid #00B3B2',
                                height: 20,
                                width: 20,
                                marginTop: '-8px'
                            }}
                            onChange={(value) => handleLoanChange(value)}
                        />
                    </div>

                    <div>
                        <span>Ng??y thanh to??n ?????u ti??n</span>
                        <span>{data.signup.first_pay()}</span>
                    </div>

                    <div>
                        <span>Kho???n vay</span>
                        <span>{currencyFormat(loan, ",")} <u style={{ fontWeight: 400 }}>??</u></span>
                    </div>

                    <div style={{ alignItems: 'flex-start' }}>
                        <span>T???ng s??? ti???n c???n tr???<br />
                            <small>bao g???m ph?? v?? l??i vay</small>
                        </span>
                        <span>{currencyFormat(payment, ",")} <u style={{ fontWeight: 400 }}>??</u></span>
                    </div>

                    {currentTab === 0 ?
                        (
                            <Button
                                className={styleLdp.borrow_now_btn}
                                style={{
                                    backgroundColor: "#FFCF10",
                                    color: "#000000",
                                    fontWeight: 700
                                }}
                                onClick={handleNext}
                            >
                                ????ng k?? vay ngay
                            </Button>
                        )
                        : (
                            <Button
                                className={styleLdp.borrow_now_btn}
                                style={{
                                    backgroundColor: "#00B3B2",
                                    color: "#FFFFFF",
                                    fontWeight: 700
                                }}
                            >
                                ????ng nh???p ngay
                            </Button>
                        )
                    }

                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    <p className={styleLdp.policy}>B???ng vi???c nh???n v??o "????ng k?? vay ngay" b??n tr??n, b???n ???? ?????ng ?? v???i <a style={{ fontSize: 14, textDecoration: 'underline' }} href={data.signup.terms_conditions}>??i???u kho???n v?? ??i???u ki???n</a>, & <a style={{ fontSize: 14, textDecoration: 'underline' }} href={data.signup.pivacy_policy}>Ch??nh s??ch quy???n ri??ng t??</a> c???a c??ng ty.</p>
                </Row>
            </Card>
        </div>
    )
}

export default Welcome