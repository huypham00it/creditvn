import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Button, Grid } from 'antd';

import style from './style.module.css';

const { useBreakpoint } = Grid;

const Header = ({ logo, navs, start, current, setCurrent }) => {
    const screen = useBreakpoint();
    const [active, setActive] = useState(false);
    const headerRef = useRef(null);

    return (
        <header ref={headerRef} className={style.header}>
            <div>
                <Image src={logo.src} width={screen.md ? 141 : 107.43} height={screen.md ? 42 : 32} alt="Credit.vn" />

                <nav>
                    {screen.md && navs.map((nav, i) => (
                        <Button
                            className={style.nav_item + ' ' + (current === nav.href ? style.active : '')}
                            type='text'
                            href={nav.href}
                            key={i}
                            onClick={(e) => {
                                if (nav.href.startsWith("#")) {
                                    setCurrent(nav.href)
                                    e.preventDefault();
                                    const offsetTop = document.querySelector(nav.href)?.offsetTop;
                                    document.body.scrollTo(0, offsetTop - headerRef.current?.clientHeight);
                                }
                            }}
                        >
                            {nav.label}
                        </Button>
                    ))}

                    <Button
                        type='primary' danger size={screen.md ? 'large' : 'middle'}
                        style={{ width: screen.md ? 160 : 96, marginLeft: 55, height: !screen.md && 34 }}
                        onClick={() => window.location.href = start.href}
                    >
                        {start.label}
                    </Button>

                    {!screen.md &&
                        <div className={style.hamburger + ' ' + (active ? style.active : '')} onClick={() => setActive(!active)}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>}
                </nav>

            </div>

            {/* MENU MOBILE */}
            {!screen.md && <ul className={style.menu + ' ' + (active ? style.active : '')}>
                {navs.map((nav, i) => (
                    <li style={{ width: '100%' }} key={i}>
                        <Button
                            size='large'
                            className={style.nav_item + ' ' + (current === nav.href ? style.active : '')}
                            type='text'
                            href={nav.href}
                            key={i}
                            onClick={(e) => {
                                if (nav.href.startsWith("#")) {
                                    setCurrent && setCurrent(nav.href)
                                    e.preventDefault();
                                    const offsetTop = document.querySelector(nav.href)?.offsetTop;
                                    document.body.scrollTo(0, offsetTop - headerRef.current?.clientHeight);
                                    setActive(false);
                                }
                            }}
                        >{nav.label}</Button>
                    </li>
                ))}
            </ul>}
        </header>
    )
}

export default Header