import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { Footer, Header, Banner, Special, Partner, Support } from '@/components/scoring_ldp';
import Layout from '@/layouts/Desktop.layout';
import data, { navigation, banner, special, partners, float_box, support } from '@/configs/scoring_test_ldp';

// eslint-disable-next-line import/no-anonymous-default-export, react/display-name
export default function () {
    const router = useRouter();
    const [current, setCurrent] = useState("");
    const [scrollReached, setScrollReached] = useState(false);

    useEffect(() => {
        setCurrent(router.asPath.slice(router.asPath.indexOf("#")));

        document.body.addEventListener('scroll', (e) => {
            navHighlighter();
            if (e.target.scrollTop > 80) {
                setScrollReached(true);
            } else {
                setScrollReached(false);
            }
        });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

    return (
        <Layout >
            <Header setCurrent={setCurrent} current={current} test={data.test} logo={data.header_logo} navs={navigation} fixed={scrollReached} />
            <Banner data={banner} />
            <Special data={special} />
            <Partner float_box={float_box} test={data.test} data={partners} />
            <Support data={support} support={data.support} />
            <Footer data={data} navs={navigation} setCurrent={setCurrent} />
        </Layout>
    )
}