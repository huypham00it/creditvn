import React from 'react';
import Image from 'next/image';

import creditLogo from '@/assets/img/credit.svg';
import styleDesktopHeader from '@/assets/FormHeader.module.css';

const Header = ({ logo, banner = false, title, bg, icon, paddingTop = 42.6 }) => {
    return (
        <header>
            <div className={styleDesktopHeader.header_top} style={{ background: bg }}>
                <div className={styleDesktopHeader.header_logo_wrap}>
                    <Image src={logo.src} width={102} height={30} className={styleDesktopHeader.logo} alt="Credit.vn" />
                    <div className={styleDesktopHeader.space_line}></div>
                    <Image src={creditLogo.src} width={102} height={30} className={styleDesktopHeader.logo} alt="Credit.vn" />
                </div>
            </div>
            {banner && <div style={{
                backgroundImage: `url('${banner.src}')`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
                maxWidth: '600px',
                width: '100%',
                margin: '17px auto 32px',
                position: 'relative'
            }}>
                <div style={{ paddingTop: paddingTop + '%' }}></div>
                {title &&
                    <h1 className={styleDesktopHeader.slogan}>
                        {title}
                    </h1>
                }
                {icon && <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}
                >
                    <Image src={icon.src} width={187.2} height={188.43} alt="Credit.vn" />
                </div>}
            </div>}
        </header>
    )
}

export default Header