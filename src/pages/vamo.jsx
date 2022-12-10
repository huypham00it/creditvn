import { Grid, Col, Row } from 'antd';
import { useState, useEffect } from 'react';

import { locationService } from '@/utils/provinces';
import MobileHeader from '@/layouts/components/FormMobileHeader';
import DesktopHeader from '@/layouts/components/FormDesktopHeader';
import DesktopAdvPageLayout from '@/layouts/DesktopAdvPage.layout';
import Footer from '@/layouts/components/Footer';
import MobileAdvPageLayout from '@/layouts/MobileAdvPage.layout';
import RouterGuard from '@/layouts/components/RouterGuard';
import { UserInfo } from '@/contexts/user';
import UserForm from '@/components/vamo/UserForm';
import AddressCareer from '@/components/vamo/AddressCareer';
import FamilyInfo from '@/components/vamo/FamiLyInfo';
import vamo from '@/configs/vamo';

const { useBreakpoint } = Grid;

export async function getServerSideProps() {
	const res = await locationService.get('/province')
	const banks = await fetch('https://api.vietqr.io/v2/banks');
	let resultBanks = await banks.json();
	resultBanks = resultBanks.data.map((item) => ({ value: item.short_name, label: item.short_name + " - " + item.name.replace("Ngân hàng", "NH") }))
	return { props: { provinces: res.data.results, banks: resultBanks } }
}

export default function InfoPage({ provinces, banks }) {
	const { user, setUser } = UserInfo();
	const screen = useBreakpoint();
	const [currentStep, setCurentStep] = useState(0);
	const [customer, setCustomer] = useState(null);
	const [province, setProvince] = useState({ value: "", isChanged: false });

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
			setProvince({ ...province, value: user.address });
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	const next = (data) => {
		if (customer !== null) {
			setCustomer({ ...customer, ...data });

			if (currentStep === 0 && data.address !== province.value) {
				setProvince({ value: data.address, isChanged: true });
			} else if (currentStep === 0){
				setProvince({ value: data.address, isChanged: false });
			}
		} else {
			setCustomer(data);
		}
		setCurentStep(currentStep + 1);
	}

	const prev = () => {
		setProvince({...province, isChanged: false});
		setCurentStep(currentStep - 1);
	}

	const handleSubmit = (data) => {
		console.log(data)
	}

	const steps = [
		<UserForm style={{ margin: '12px 0' }} key={1} nextStep={next} customer={customer} setCustomer={setCustomer} />,
		<AddressCareer key={2} customer={customer} setCustomer={setCustomer} vamo={vamo} isProvinceChanged={province.isChanged} provinces={provinces} nextStep={next} prevStep={prev} />,
		<FamilyInfo key={3} customer={customer} setCustomer={setCustomer} vamo={vamo} banks={banks} submit={handleSubmit} prevStep={prev} />
	]

	return screen.md ? (
		<RouterGuard>
			<DesktopAdvPageLayout bg={vamo.background.src}>
				<DesktopHeader logo={vamo.logo} banner={vamo.banner} bg="#063A51" />

				<Row style={{ maxWidth: '375px', margin: '0 auto', width: '100%' }}>
					<Col span={24} style={{ padding: '0 16px 16px 16px' }}>
						{steps[currentStep]}
					</Col>
				</Row>
				<Footer style={{ marginTop: 'auto' }} />
			</DesktopAdvPageLayout>
		</RouterGuard>
	) : (
		<RouterGuard>
			<MobileAdvPageLayout>
				<MobileHeader logo={vamo.logo} banner={vamo.banner} />
				<Row style={{ backgroundColor: '#ffffff' }} id="vamo_mobile">
					<Col span={24} style={{ padding: '0 16px 16px 16px' }}>
						{steps[currentStep]}
					</Col>
				</Row>
			</MobileAdvPageLayout>
		</RouterGuard>
	);
}