import React, { useState, useRef, useEffect } from 'react';
import { Form, Input } from 'antd';
import { EditOutlined, DownOutlined } from '@ant-design/icons';

import provinces from '@/utils/provinces';
import toNonAccentVietnamese from '@/utils/nonAccentVietnamese';
import filterProvince from '@/utils/filterProvince';
import styleAccountInfo from '@/assets/AccountInfo.module.css';
import signupStyle from '@/assets/Signup.module.css';
import styleAutocomplete from '@/assets/AutoComplete.module.css';
import provinces_data from '@/utils/provinces';
import useClickOutside from '@/hooks/useClickOutside';

const LocationInput = ({ form, onChange = undefined, handleIconClick, handleAddressSelect, initialValue = "", required = true, editable = false, ...props }) => {
    const [filteredProvinces, setFilteredProvinces] = useState(provinces);
    const [openSuggestions, setOpenSuggestions] = useState(false);
    const [hasProvince, setHasProvince] = useState(true);
    const [value, setValue] = useState(initialValue);
    const inputRef = useRef(null);
    const cityRef = useRef(null);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue])

    const handleChange = (value) => {
        if (!value.startsWith(' ')) {
            filterOptions(value);
            setValue(value);
            if (onChange) {
                onChange(value)
            }
        }
        setOpenSuggestions(true);
    }

    const filterOptions = (province) => {
        let filteredValues = filterProvince(province);

        if (!filteredValues.length > 0) {
            setHasProvince(false);
            setFilteredProvinces(provinces_data);
            return;
        }

        setHasProvince(true);
        setFilteredProvinces(filteredValues);
    }

    const handleBlur = () => {
        const currentValue = inputRef.current.input.value;
        let filteredValues = filterProvince(currentValue);

        setOpenSuggestions(false);

        if (currentValue != "") {
            const suggestOption = filteredValues.find((option) => {
                return (toNonAccentVietnamese(option.value.toLowerCase()).indexOf(toNonAccentVietnamese(currentValue.toLowerCase())) !== -1);
            })

            if (!suggestOption) {
                setHasProvince(false)
                return;
            }
            setHasProvince(true);
            setValue(suggestOption.value);
            form.setFieldValue(props.name, suggestOption.value);
            return;
        }
    }

    const handleClick = () => {
        setOpenSuggestions(!openSuggestions);
        window.scrollTo(0, document.body.scrollHeight);
    }

    const handleSelect = (value) => {
        inputRef.current.focus();
        handleChange(value);
        form.setFieldValue(props.name, value);
        setOpenSuggestions(false);
        setHasProvince(true);
        handleAddressSelect(value);
        form.validateFields(['address'])
        .then()
        .catch(err => console.log(err))
    }

    useClickOutside(cityRef, () => {
        handleBlur();
    })

    return (
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
            <div
                className={[props.disabled ? styleAccountInfo.field_disabled : ''].join(' ')}
                style={{ flex: 1 }}
            >
                <Form.Item
                    className={styleAccountInfo.custom_selectbox}
                    name={props.name}
                    rules={[
                        {
                            required: required,
                            message: "Bạn chưa chọn Tỉnh/Thành phố"
                        },
                        () => ({
                            validator(_, value) {
                                if (!value || hasProvince) {
                                    return Promise.resolve();
                                }
                                return Promise.reject("Vui lòng chọn Tỉnh/Thành phố");
                            },
                        }),
                    ]}
                >
                    <div style={{
                        position: 'relative',
                    }}

                        ref={cityRef}
                    >
                        <div className={openSuggestions ? styleAutocomplete.suggestions_wrapper : styleAutocomplete.suggestions_hide}>
                            {filteredProvinces.length > 0 && hasProvince && filteredProvinces.map((option, i) => (
                                <div key={i} className={signupStyle.province_suggestion__item} onClick={() => handleSelect(option.value)}>
                                    {option.label}
                                </div>
                            ))}

                            {!hasProvince && (
                                <div className={signupStyle.province_suggestion__item} style={{ color: "#00000073" }}>
                                    Không tìm thấy
                                </div>
                            )}
                        </div>

                        <Input
                            autoComplete='off'
                            ref={inputRef}
                            value={value}
                            placeholder="Chọn Tỉnh/Thành phố"
                            onChange={(e) => handleChange(e.target.value)}
                            onClick={handleClick}
                            disabled={props.disabled}
                            onPressEnter={handleBlur}
                            {...props}
                            addonAfter={editable ?
                                <EditOutlined style={{ color: !props.disabled ? '#594DC9' : "" }}
                                    onClick={() => {
                                        if (editable) {
                                            setOpenSuggestions(false);
                                        }
                                        handleIconClick();
                                    }}
                                />
                                : <></>}
                        />

                        <DownOutlined
                            style={{
                                position: 'absolute',
                                right: editable ? 50 : 11,
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: "#d9d9d9"
                            }}
                        />

                    </div>
                </Form.Item>
            </div>
        </div>
    )
}

export default LocationInput