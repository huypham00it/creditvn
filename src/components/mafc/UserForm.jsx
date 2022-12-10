import { useState, useEffect } from 'react';
import { Form, Input, Button, ConfigProvider, Modal } from 'antd';
import locale from 'antd/lib/locale/vi_VN';
import 'moment/locale/vi';
import { useRouter } from 'next/router';

import * as SLUGID from '@/configs/slugId';
import styleAccountInfo from '@/assets/AccountInfo.module.css';
import validSalary from '@/utils/validSalary';
import { UserInfo } from '@/contexts/user';
import request from '@/utils/request';
import { useLoading } from '@/contexts/loading';
import Cookies from 'universal-cookie';
import AccountInfo from '@/components/form/AccountInfo';
import logStep from '@/utils/log';
import { mafc_tracking } from '@/configs/tracking';

export default function UserForm() {
	const offer_id = "mafc2";
	const router = useRouter();
	const cookies = new Cookies();
	const click_id = cookies.get('click_id');
	const { showLoading, hideLoading } = useLoading();
	const { user } = UserInfo();
	const [form] = Form.useForm();

	const [trackingTime, setTrackingTime] = useState(mafc_tracking);

	const [customer, setCustomer] = useState({
		name: "",
		gender: "",
		id_card: "",
		phone: "",
		address: ""
	})

	useEffect(() => {
		if (user) {
			setCustomer({
				name: user.name,
				gender: user.gender,
				id_card: user.id_card,
				phone: user.phone,
				address: user.address
			});
		}
	}, [user]);

	const handleSubmit = () => {
		const data = { ...form.getFieldsValue(), income: Number.parseInt(form.getFieldValue('income')) };
		data.offer_id = offer_id;
		data.click_id = click_id;
		showLoading();
		request.post("/lead", data).then(function (response) {
			hideLoading();
			console.log(response.data);
			Modal.success({
				title: 'Đăng ký thành công',
				content: 'Cảm ơn bạn đã đăng ký hồ sơ tại MCredit. Chúng tôi sẽ liên hệ để tư vấn trong thời gian sớm nhất',
				okText: 'Xác nhận & Quay lại',
				onOk: () => {
					router.push("/");
				},
				okButtonProps: { id: SLUGID.CONFIRM_SUCCESS + offer_id }
			})
		}).catch(function (error) {
			console.log(error);
			hideLoading();
			Modal.error({
				title: 'Đăng ký thất bại',
				content: 'Có lỗi xảy ra, xin vui lòng thử lại sau ít phút',
				okText: 'Xác nhận',
				okButtonProps: { id: SLUGID.CONFIRM_ERROR + offer_id }
			})
		});
	}

	const handleIncomeChange = (e) => {
		const value = e.target.value;
		if (value.startsWith(0) || !/[1-9]/.test(value)) {
			form.setFieldValue('income', "");
		}
	}

	const handleTrackingStart = (name) => {
		setTrackingTime({ ...trackingTime, [name]: { ...trackingTime[name], start: new Date().getTime() } })

	}

	const handleTrackingEnd = (name, value) => {
		const fieldTime = new Date().getTime() - trackingTime[name].start;

		logStep({
			[name]: value,
			offer_id: offer_id,
			total_input: fieldTime
		})
	}

	return (
		<>
			<h2 className={styleAccountInfo.text_bold}>Thông tin cá nhân</h2>

			<ConfigProvider locale={locale}>

				<Form form={form} className={styleAccountInfo.mcredit_form} name="mcredit_form" onSubmitCapture={handleSubmit}>

					<AccountInfo user={user} form={form} handleTrackingStart={handleTrackingStart} handleTrackingEnd={handleTrackingEnd} />

					<p style={{ fontSize: '14px' }}>Vui lòng nhập đúng thông tin sau để tiếp tục</p>

					<Form.Item
						name="income"
						rules={[
							() => ({
								validator(_, value) {
									if (validSalary(value)) {
										return Promise.resolve();
									}
									return Promise.reject(new Error('Bạn chỉ cần nhập 1 đến 3 số'));
								},
							}),

						]}
						initialValue={customer.id_card}
					>
						<Input
							placeholder="Thu nhập"
							suffix="triệu đồng"
							maxLength={3}
							onChange={handleIncomeChange}
							autoComplete="off"
							onFocus={() => handleTrackingStart("income")}
							onBlur={(e) => handleTrackingEnd("income", e.target.value)}
							size="large"
						/>
					</Form.Item>

					<Form.Item shouldUpdate>
						{() => {
							return (
								<Button
									type="primary" htmlType='submit' size='large'
									style={{ width: '100%' }}
									disabled={
										!form.isFieldsTouched(['income'], true) ||
										!!form.getFieldsError().filter(({ errors }) => errors.length).length
									}
								>
									Hoàn tất
								</Button>
							)
						}}
					</Form.Item>
				</Form >
			</ConfigProvider>
		</>
	)
}