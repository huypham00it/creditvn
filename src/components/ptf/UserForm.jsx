import { useState } from 'react';
import { Form, Button, ConfigProvider, Modal } from 'antd';
import locale from 'antd/lib/locale/vi_VN';
import 'moment/locale/vi';
import { useRouter } from 'next/router';

import * as SLUGID from '@/configs/slugId';
import request from '@/utils/request';
import { useLoading } from '@/contexts/loading';
import Cookies from 'universal-cookie';
import { ptf_tracking } from '@/configs/tracking';
import { PrefillInfo } from '@/components/ldp';
import { EmailInput, SelectInput } from '@/components/form';
import logStep from '@/utils/log';
import data from '@/configs/ptf_page';

export default function UserForm() {
	const offer_id = data.offer_id;
	const router = useRouter();
	const cookies = new Cookies();
	const click_id = cookies.get('click_id');
	const { showLoading, hideLoading } = useLoading();
	const [trackingTime, setTrackingTime] = useState(ptf_tracking);
	const [form] = Form.useForm();

	const handleSubmit = () => {
		const data = { ...form.getFieldsValue() };
		data.offer_id = offer_id;
		data.click_id = click_id;
		showLoading();
		request.post("/lead", data).then(function (response) {
			hideLoading();
			console.log(response.data);
			Modal.success({
				title: 'Đăng ký thành công',
				content: data.thanks,
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
			<h2 style={{ fontWeight: '700' }}>Thông tin cá nhân</h2>

			<ConfigProvider locale={locale}>

				<Form form={form} name="ptf_form" onSubmitCapture={handleSubmit}>
					<PrefillInfo form={form} handleTrackingStart={handleTrackingStart} handleTrackingEnd={handleTrackingEnd} />

					<p style={{ fontSize: '14px' }}>Vui lòng nhập đúng thông tin sau để tiếp tục</p>

					<SelectInput
						name="loan_amount"
						size="large"
						placeholder={data.loan_amounts.placeholder}
						options={data.loan_amounts.options}
						onBlur={() => handleTrackingEnd("loan_amount", form.getFieldValue('loan_amount'))}
						onFocus={() => handleTrackingStart("loan_amount")}
						onSelect={(value) => handleTrackingEnd("loan_amount", value)}
					/>

					<SelectInput
						name="borrow_time"
						size="large"
						placeholder={data.borrow_times.placeholder}
						options={data.borrow_times.options}
						onBlur={() => handleTrackingEnd("borrow_time", form.getFieldValue('borrow_time'))}
						onFocus={() => handleTrackingStart("borrow_time")}
						onSelect={(value) => handleTrackingEnd("borrow_time", value)}
					/>

					<SelectInput
						name="asset"
						size="large"
						placeholder={data.assets.placeholder}
						options={data.assets.options}
						onBlur={() => handleTrackingEnd("asset", form.getFieldValue('asset'))}
						onFocus={() => handleTrackingStart("asset")}
						onSelect={(value) => handleTrackingEnd("asset", value)}
					/>

					<EmailInput
						name="email"
						size="large"
						placeholder="Email"
						onFocus={() => handleTrackingStart("email")}
						onBlur={(e) => handleTrackingEnd("email", e.target.value)}
					/>

					<Form.Item shouldUpdate>
						{() => {
							return (
								<Button
									type="primary" htmlType='submit' size='large'
									style={{ width: '100%' }}
									disabled={
										!(
											form.getFieldValue("name") &&
											form.getFieldValue("gender") &&
											form.getFieldValue("phone") &&
											form.getFieldValue("id_card") &&
											form.getFieldValue("address") &&
											form.getFieldValue("email") &&
											form.getFieldValue("borrow_time") &&
											form.getFieldValue("asset") &&
											form.getFieldValue("loan_amount")
										) ||
										form.getFieldsError().filter(({ errors }) => errors.length).length
									}
								>
									Gửi thông tin
								</Button>
							)
						}}
					</Form.Item>
				</Form >
			</ConfigProvider>
		</>
	)
}