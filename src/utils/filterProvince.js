import provinces from './provinces';
import toNonAccentVietnamese from './nonAccentVietnamese';

const filterProvince = (province) => {
    let filteredValues = provinces.filter(option => option.value.toLowerCase().startsWith(province.toLowerCase()))
    const restValuesStartsWithoutAccent = provinces.filter(option => toNonAccentVietnamese(option.value.toLowerCase()).startsWith(toNonAccentVietnamese(province.toLowerCase()))
        && !filteredValues.find(filteredValue => filteredValue.value === option.value))
    filteredValues = [...filteredValues, ...restValuesStartsWithoutAccent];
    const restValuesContainsAccent = provinces.filter(option => option.value.toLowerCase().indexOf(province.toLowerCase()) !== -1
        && !filteredValues.find(filteredValue => filteredValue.value === option.value))
    filteredValues = [...filteredValues, ...restValuesContainsAccent];
    const restValuesContainsWithoutAccent = provinces.filter(option => toNonAccentVietnamese(option.value.toLowerCase()).indexOf(toNonAccentVietnamese(province.toLowerCase())) !== -1
        && !filteredValues.find(filteredValue => filteredValue.value === option.value))
    filteredValues = [...filteredValues, ...restValuesContainsWithoutAccent];
    return filteredValues;
}

export default filterProvince;