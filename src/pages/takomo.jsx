import { Grid } from 'antd';
import { useState, useEffect } from 'react';

import { UserInfo } from '@/contexts/user';
import MobileHeader from '@/layouts/components/FormMobileHeader';
import DesktopHeader from '@/layouts/components/FormDesktopHeader';
import DesktopAdvPageLayout from '@/layouts/DesktopAdvPage.layout';
import MobileAdvPageLayout from '@/layouts/MobileAdvPage.layout';
import RouterGuard from '@/layouts/components/RouterGuard';
import { FormSteps } from '@/components/ldp';
import takomoData from '@/configs/takomo';
import PersonalInfomation from '@/components/takomo/PersonalInfomation';
import AddressWork from '@/components/takomo/AddressWork';
import Relatives from '@/components/takomo/Relatives';

const { useBreakpoint } = Grid;

export default function InfoPage() {
    const { user, setUser } = UserInfo();
    const screen = useBreakpoint();
    const [step, setStep] = useState(0)
    const [customer, setCustomer] = useState(null);

    useEffect(() => {
        if (user) {
            setCustomer({
                ...customer,
                name: user.name,
                gender: user.gender,
                id_card: user.id_card,
                phone: user.phone,
                address: user.address
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const next = (data) => {
        document.body.scrollTo(0, 0);
        if (customer !== null) {
            setCustomer({ ...customer, ...data });
        } else {
            setCustomer(data)
        }
        setStep(step + 1);
    }

    const prev = () => {
        document.body.scrollTo(0, 0);
        setStep(step - 1);
    }

    const handleSubmit = (data) => {
        console.log(data)
    }

    const steps = [
        <PersonalInfomation key={1} data={takomoData} next={next} user={customer} />,
        <AddressWork key={2} data={takomoData} prev={prev} next={next} user={customer} setUser={setCustomer} />,
        <Relatives key={3} data={takomoData} prev={prev} next={next} user={customer} setUser={setCustomer} />
    ]

    return screen.md ? (
        <RouterGuard>
            <DesktopAdvPageLayout>
                <DesktopHeader logo={takomoData.logo} bg="linear-gradient(to right, #6F3893, #F7358E)" />
                <main
                    style={{
                        marginTop: 49,
                        backgroundImage: 'url(' + takomoData.backgroundForm.src + ')',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center -49px'
                    }}
                >
                    <FormSteps id="takomo_steps" steps={takomoData.steps} current={step} />
                    {steps[step]}
                </main>
            </DesktopAdvPageLayout>
        </RouterGuard>
    ) : (
        <RouterGuard>
            <MobileAdvPageLayout>
                <MobileHeader 
                    logo={takomoData.logo} 
                    banner={takomoData.bannerMobile} 
                    paddingTop={62.3} 
                    showCaption={true}
                    caption={"Tin được không?\n Lãi suất 0%"}
                    styleCaption={{
                        color: '#ffffff',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        position: 'absolute',
                        top: '12%',
                        right: '23.7%'
                    }}
                />
                <main style={{ padding: 16, backgroundColor: '#ffffff' }}>
                    <FormSteps id="takomo_steps" steps={takomoData.steps} current={step} />
                    {steps[step]}
                </main>
            </MobileAdvPageLayout>
        </RouterGuard>
    );
}

