import React, { useEffect, useState } from 'react';
import { Grid } from 'antd';
import { useRouter } from 'next/router';

import { Header, Banner, Introduce, Solution, Benefit, Experience, Footer } from '@/components/welcome_ldp';
import data, { navigation, banner, introduce, solution, benefit, experience } from '@/configs/welcome_ldp'
import DesktopLayout from '@/layouts/Desktop.layout';
import MobileLayout from '@/layouts/Mobile.layout';

const { useBreakpoint } = Grid;

// eslint-disable-next-line import/no-anonymous-default-export, react/display-name
export default function () {
    const screen = useBreakpoint();
    const router = useRouter();
    const [current, setCurrent] = useState("");

    useEffect(() => {
        setCurrent(router.asPath.slice(router.asPath.indexOf("#")));

        document.body.addEventListener('scroll', navHighlighter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const navHighlighter = () => {
        const sections = document.querySelectorAll("section[id]");
        let scrollY = document.documentElement.scrollTop || document.body.scrollTop;

        if (!scrollY > 0) {
            setCurrent("#introduce");
        } else {
            sections.forEach(current => {
                const sectionHeight = current.offsetHeight;
                const sectionTop = current.offsetTop - 100;
                const sectionId = current.getAttribute("id");
                if (
                    scrollY > sectionTop &&
                    scrollY <= sectionTop + sectionHeight
                ) {
                    setCurrent("#" + sectionId);
                }
            });
        }
    }

    return screen.md ?
        (
            <DesktopLayout>
                <Header setCurrent={setCurrent} current={current} start={data.start} logo={data.logo_white} navs={navigation} />
                <Banner signup={data.signup} data={banner} />
                <Introduce data={introduce} />
                <Solution logo={data.logo} data={solution} />
                <Benefit data={benefit} />
                <Experience signup={data.signup} data={experience} />
                <Footer data={data} navs={navigation} setCurrent={setCurrent} />
            </DesktopLayout>
        )
        :
        (
            <MobileLayout>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Header start={data.start} logo={data.logo_white} navs={navigation} />
                    <Banner signup={data.signup} data={banner} />
                    <Introduce data={introduce} />
                    <Solution logo={data.logo} data={solution} />
                    <Benefit data={benefit} />
                    <Experience signup={data.signup} data={experience} />
                    <Footer data={data} navs={navigation} setCurrent={setCurrent} />
                </div>
            </MobileLayout>
        )
}
