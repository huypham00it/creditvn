import { Grid, Layout } from 'antd';
import { useState } from 'react';

import MobileHeader from '@/layouts/components/FormMobileHeader';
import DesktopHeader from '@/layouts/components/FormDesktopHeader';
import DesktopAdvPageLayout from '@/layouts/DesktopAdvPage.layout';
import MobileAdvPageLayout from '@/layouts/MobileAdvPage.layout';
import TamoLogo from '@/assets/img/tamo.svg';
import RouterGuard from '@/layouts/components/RouterGuard';
import { Foot, FormSteps } from '@/components/ldp';
import tamoData from '@/configs/tamo';
import PersonalInfomation from '@/components/tamo/PersonalInfomation';
import OccupationIncome from '@/components/tamo/OccupationIncome';
import Welcome from '@/components/tamo/Welcome';

const { useBreakpoint } = Grid;

export default function InfoPage() {
    const screen = useBreakpoint();
    const [step, setStep] = useState(0)
    const [customer, setCustomer] = useState(null);

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
        <Welcome key={1} data={tamoData} next={next} user={customer} setUser={setCustomer} />,
        <PersonalInfomation key={2} prev={prev} next={next} user={customer} setUser={setCustomer} />,
        <OccupationIncome key={3} data={tamoData} prev={prev} user={customer} setUser={setCustomer} submit={handleSubmit} />
    ]

    return screen.md ? (
        <RouterGuard>
            <DesktopAdvPageLayout>
                <DesktopHeader logo={tamoData.logo} bg="#60AEB2" />
                <main
                    style={{
                        marginTop: step !== 0 ? 49 : 0,
                        backgroundImage: step !== 0 ? 'url(' + tamoData.backgroundImage.src + ')' : "",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center -49px'
                    }}
                >
                    {step !== 0 && <FormSteps id="tamo_steps" steps={tamoData.steps} current={step} />}
                    {steps[step]}
                </main>
                <Foot data={tamoData} />
            </DesktopAdvPageLayout>
        </RouterGuard>
    ) : (
        <RouterGuard>
            <MobileAdvPageLayout>
                <MobileHeader logo={tamoData.logo} banner={tamoData.bannerMobile} paddingTop={62.3} />
                <main style={{ padding: step !== 0 ? 16 : 0, backgroundColor: '#ffffff' }}>
                    {step !== 0 && <FormSteps id="tamo_steps" steps={tamoData.steps} current={step} />}
                    {steps[step]}
                </main>
                <Foot data={tamoData} />
            </MobileAdvPageLayout>
        </RouterGuard>
    );
}

