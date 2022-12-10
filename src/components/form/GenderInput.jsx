import React from 'react';
import { Form, Radio } from 'antd';
import { EditOutlined } from '@ant-design/icons';

import styleForm from '@/assets/FormLdp.module.css';

const GenderInput = ({ initialValue = "", handleIconClick, onBlur, ...props }) => {
    return (
        <div
            style={{
                height: props.size === 'large' ? '40px' : '32px',
                display: 'flex',
                justifyContent: 'space-between',
                border: '1px solid #D9D9D9',
                alignItems: 'center',
                flex: '1 1',
                marginBottom: 24,
                paddingRight: props.editable ? 0 : "",
                position: 'relative',
                backgroundColor: props.disabled ? '#f5f5f5' : ""
            }}
            onBlur={onBlur}
        >
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: props.editable ? 'calc(100% - 38px)' : '100%',
                padding: ' 0 9px 0 12px'
            }}>
                <label style={{ color: 'rgba(0, 0, 0, 0.33)', fontSize: '16px' }}>Giới tính</label>
                <Form.Item
                    name="gender"
                    style={{ marginBottom: '0px', marginLeft: 'auto' }}
                    initialValue={initialValue}
                >
                    <Radio.Group
                        name={props.name}
                        label="Giới tính"
                        {...props}
                    >
                        <Radio value="Nam"> Nam </Radio>
                        <Radio value="Nữ"> Nữ </Radio>
                    </Radio.Group>
                </Form.Item>
            </div>
            {props.editable &&
                <div className={styleForm.field_edit_icon}>
                    <EditOutlined style={props.iconStyle} onClick={handleIconClick} />
                </div>
            }
        </div>
    )
}

export default GenderInput