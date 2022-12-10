import React from 'react';
import { Button } from 'antd';

import style from './style.module.css';

const Experience = ({ signup, data }) => {
    return (
        <section id="experience" className={style.experience} style={{ backgroundImage: 'url(' + data.backgroundImage.src + ')' }}>
            <div className={style.experience_inner}>
                <h2>{data.heading}</h2>
                <p>{data.description}</p>
                <Button type="primary" size="large" href={signup.href} danger className={style.signup_btn}>{signup.label}</Button>
            </div>
        </section>
    )
}

export default Experience