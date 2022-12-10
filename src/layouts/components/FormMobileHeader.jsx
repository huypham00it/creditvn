import React from 'react';
import Image from 'next/image';

import creditLogo from '@/assets/img/credit.svg';
import styleMobileHeader from '@/assets/FormHeader.module.css';

const Header = ({ logo, banner, paddingTop = 42.6, icon, showCaption = false, caption, styleCaption }) => {
  return (
    <header>
      <div className={styleMobileHeader.header_top}>
        <Image src={logo.src} width={100} height={30} alt="Credit.vn" />
        <Image src={creditLogo.src} width={100} height={30} alt="Credit.vn" />
      </div>
      <div style={{
        paddingTop: paddingTop + '%',
        backgroundImage: `url('${banner.src}')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        position: 'relative',
      }}>
        {icon && <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <Image src={icon.src} width={117} height={117.77} alt="Credit.vn" />
        </div>}
        {showCaption && <p style={{ ...styleCaption, whiteSpace: 'break-spaces' }}>{caption}</p>}
      </div>
    </header>
  )
}

export default Header