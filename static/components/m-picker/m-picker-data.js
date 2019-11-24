//ref:https://github.com/MPComponent/mpvue-picker/blob/master/src/utils/index.js

const MIN_DATE = new Date(1900, 0, 1); // ��С֧������ 1990-01-01
const NOW_DATE = new Date(); // ��ǰ����

const transformDateToIndex = (ARG_DATE = NOW_DATE) => {
    let defaultDateIndex = [];
    defaultDateIndex.push(ARG_DATE.getFullYear() - MIN_DATE.getFullYear()); // ��
    defaultDateIndex.push(ARG_DATE.getMonth()); // ��
    defaultDateIndex.push(ARG_DATE.getDate() - 1); // ��
    return defaultDateIndex;
};

const getDatePickerIndex = pickerIndex => {
    let tempPickerIndex = [];
    // ֧�ִ��� Date ����
    /* eslint-disable-next-line */
    if (Object.prototype.toString.call(pickerIndex) === '[object Date]' && !isNaN(pickerIndex.getTime())) {
        tempPickerIndex = transformDateToIndex(pickerIndex);
    } else {
        if (isNaN(new Date(`${pickerIndex[0]}/${pickerIndex[1]}/${pickerIndex[2]}`).getTime())) {
            tempPickerIndex = transformDateToIndex(); // ���ݴ�������
        } else {
            tempPickerIndex = transformDateToIndex(new Date(`${pickerIndex[0]}/${pickerIndex[1]}/${pickerIndex[2]}`));
        }
    }
    if (tempPickerIndex[0] > 199) {
        console.warn('������ڷ�Χ֧�֣�1990-01-01 ~ 2099-12-31');
        tempPickerIndex[0] = 199;
    }
    return tempPickerIndex;
};

const getDays = (year, month) => {
    if (month > 12 || month < 0) {
        return -1;
    }
    month = parseInt(month, 10);
    var date = new Date(year, month, 0);
    return date.getDate();
};

/**
 * ���� pickerValueArray ֵ
 * @param {*} pickerValue ����ֵ
 * @param {*} mode ģʽֵ
 * @param {*} pickerValueArray picker ����
 */
const fixPickerValueDefault = (pickerValue, mode, pickerValueArray) => {
    let fixPickerValue = pickerValue;
    // TODO
    if (mode === 'selector') {
        // ����
        fixPickerValue[0] = Math.min(fixPickerValue[0], pickerValueArray.length - 1);
    } else if (mode === 'multiSelector') {
        // ����
        fixPickerValue = fixPickerValue.map((item, index) => {
            return Math.min(item, pickerValueArray[index].length - 1);
        });
    } else if (mode === 'timeSelector') {
        // ʱ��ѡ����
        fixPickerValue = fixPickerValue.map((item, index) => {
            return index > 0 ? Math.min(item, 59) : Math.min(item, 23);
        });
    } else if (mode === 'multiLinkageSelector') {
        let tempIndexFirst, tempIndexSecond;
        fixPickerValue = fixPickerValue.map((item, index) => {
            if (index === 0) {
                tempIndexFirst = Math.min(item, pickerValueArray.length - 1);
                return tempIndexFirst;
            } else if (index === 1) {
                tempIndexSecond = Math.min(item, pickerValueArray[tempIndexFirst].children.length - 1);
                return tempIndexSecond;
            } else if (index === 2) {
                return Math.min(item, pickerValueArray[tempIndexFirst].children[tempIndexSecond].children.length - 1);
            }
        });
    }
    return fixPickerValue;
};
export { transformDateToIndex, getDatePickerIndex, getDays, fixPickerValueDefault };