import React from 'react';
import { Layout, Button, Col, Row } from 'antd';
import { useRouter } from 'next/router';
import Image from 'next/image';

import menus from '@/configs/navigation';
import CreditLogo from '@/assets/img/credit.svg';
import menuStyle from '@/assets/Menu.module.css';
const { Header } = Layout;

const DesktopNavigation = ({ handleOpenSlider }) => {
    const router = useRouter();

    return (
        <Layout>
            <Header
                style={{
                    width: '100%',
                    backgroundColor: '#FFFFFF',
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingLeft: '128px',
                    paddingRight: '128px',
                    boxShadow: '0 2px 8px #f0f1f2',
                    position: "sticky",
                    top: 0
                }}
            >
                <Image src={CreditLogo.src} height={64} width={109.26} alt="Credit.vn" />
                <Row style={{ width: "390px" }}>
                    {menus.map((menu, index) => (
                        <Col span={8} key={index}>
                            <Button type="link"
                                className={`${menuStyle.menu_button} ${ router.pathname == menu.key && menuStyle.menu_active}`}
                                icon={menu.icon}
                                onClick={() => {
                                    if(menu.key === 'slider') {
                                        handleOpenSlider();
                                    } else {
                                        router.push(menu.key)
                                    }
                                }}
                            >
                                {menu.label}
                            </Button>
                        </Col>
                    ))}
                </Row>


                {/* <Menu
                    selectedKeys={router.pathname}
                    items={menus}
                    mode='horizontal'
                    style={{ flex: 1, justifyContent: 'flex-end' }}
                    onClick={({ key }) => {
                        if(key === 'slider') {
                            handleOpenSlider();
                            return;
                        }
                        router.push(key)}
                    }
                /> */}
            </Header>
        </Layout>
    )
}

export default DesktopNavigation