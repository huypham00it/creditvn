import React, { useState } from 'react';
import { EditOutlined } from '@ant-design/icons';

import { NameInput, GenderInput, IDInput, PhoneNumberInput, LocationInput } from '@/components/form';
import { UserInfo } from '@/contexts/user';

const PrefillInfo = ({ form, handleTrackingStart, handleTrackingEnd }) => {
	const { user } = UserInfo();

    const [disabledStatus, setDisabledStatus] = useState({
        name: true,
        address: true,
        gender: true,
        phone: true,
        id_card: true
    });

    return (
        <>
            <NameInput
                name="name"
                placeholder="Họ và tên"
                size="large"
                initialValue={user?.name}
                disabled={disabledStatus.name}
                addonAfter={<EditOutlined style={{ color: disabledStatus.name ? '' : '#594DC9' }} onClick={() => setDisabledStatus({ ...disabledStatus, name: !disabledStatus.name })} />}
                onFocus={() => handleTrackingStart("name")}
				onBlur={(e) => handleTrackingEnd("name", e.target.value)}
            />

            <GenderInput
                initialValue={user?.gender}
                name="gender"
                size="large"
                disabled={disabledStatus.gender}
                editable={true}
                iconStyle={{ color: disabledStatus.gender ? '' : '#594DC9' }}
                onChange={() => handleTrackingStart("gender")}
                handleIconClick={() => {
                    handleTrackingStart("gender");
                    setDisabledStatus({ ...disabledStatus, gender: !disabledStatus.gender })
                }}
                onBlur={() => handleTrackingEnd("gender", form.getFieldValue('gender'))}
            />

            <IDInput
                initialValue={user?.id_card}
                name="id_card"
                placeholder="Số CMND/CCCD"
                size="large"
                disabled={disabledStatus.id_card}
                addonAfter={<EditOutlined style={{ color: disabledStatus.id_card ? '' : '#594DC9' }} onClick={() => setDisabledStatus({ ...disabledStatus, id_card: !disabledStatus.id_card })} />}
                onFocus={() => handleTrackingStart("id_card")}
				onBlur={(e) => handleTrackingEnd("id_card", e.target.value)}
            />

            <PhoneNumberInput
                initialValue={user?.phone}
                name="phone"
                placeholder="Số điện thoại"
                size="large"
                disabled={disabledStatus.phone}
                addonAfter={<EditOutlined style={{ color: disabledStatus.phone ? '' : '#594DC9' }} onClick={() => setDisabledStatus({ ...disabledStatus, phone: !disabledStatus.phone })} />}
                onFocus={() => handleTrackingStart("phone")}
				onBlur={(e) => handleTrackingEnd("phone", e.target.value)}
            />

            <LocationInput
                name="address"
                size="large"
                editable={true}
                initialValue={user?.address}
                disabled={disabledStatus.address}
                handleIconClick={() => setDisabledStatus({ ...disabledStatus, address: !disabledStatus.address })}
                handleAddressSelect={(value) => handleTrackingEnd('address', value)}
                form={form}
                onFocus={() => handleTrackingStart("address")}
				onBlur={(e) => handleTrackingEnd("address", e.target.value)}
            />
        </>
    )
}

export default PrefillInfo