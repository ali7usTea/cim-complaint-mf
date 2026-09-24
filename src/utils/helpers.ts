import { DEFAULT_INTERVAL_BETWEEN_DATES } from './const';
import { addDaysToDate } from './dateCalculation';

export const isEqual = (value: any, other: any) => {
    if (typeof value !== 'object' && typeof other !== 'object') {
        return Object.is(value, other);
    }

    if (value === null && other === null) {
        return true;
    }

    if (typeof value !== typeof other) {
        return false;
    }

    if (value === other) {
        return true;
    }

    if (Array.isArray(value) && Array.isArray(other)) {
        if (value.length !== other.length) {
            return false;
        }

        for (let i = 0; i < value.length; i++) {
            if (!isEqual(value[i], other[i])) {
                return false;
            }
        }

        return true;
    }

    if (Array.isArray(value) || Array.isArray(other)) {
        return false;
    }

    if (Object.keys(value).length !== Object.keys(other).length) {
        return false;
    }

    for (const [k, v] of Object.entries(value)) {
        if (!(k in other)) {
            return false;
        }

        if (!isEqual(v, other[k])) {
            return false;
        }
    }

    return true;
};

export const getLastSixMonths = () => {
    const months = [];
    const now = new Date();
    for (let i = 1; i <= 6; i++) {
        const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const formattedMonth = `${month.getMonth() + 1}/${month.getFullYear()}`;
        months.push({ name: month.toLocaleString('default', { month: 'short', year: 'numeric' }), code: formattedMonth });
    }
    return months;
};

export const getMinStartDate = () => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 2);
    return date;
};

export const getMaxStartDate = () => {
    const date = new Date();
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0); // 0 will get the last day of the current month
    return lastDayOfMonth;
};

export const getMaxEndDate = (startDate: string, maxPeriod = 12) => {
    let date = new Date(startDate);

    // Add the specified number of months (maxPeriod - 1 because default should be 13 months minus 1)
    date.setMonth(date.getMonth() + maxPeriod - 1);

    // Move to the first day of the next month
    date.setMonth(date.getMonth() + 1, 1);

    // Subtract one day to get the last day of the intended month
    date.setDate(date.getDate() - 1);

    return date;
};

export const formatDateForParams = (date: any): string => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = `0${d.getMonth() + 1}`.slice(-2); // getMonth() returns 0-11
    const day = `0${d.getDate()}`.slice(-2); // getDate() returns 1-31
    return `${year}-${month}-${day}`;
};

export const getDates = () => {
    const currentDate = new Date();

    // Get the last date of the current month
    let endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    // Get the first date of 7 months ago
    let startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 6, 1);

    return {
        startDate: startDate,
        endDate: endDate
    };
};

export function containsIgnoreCase(str: string, searchStr: string) {
    return str.toLowerCase().includes(searchStr.toLowerCase());
}

export function startsWithIgnoreCase(value: string, prefix: string) {
    return value.toLowerCase().startsWith(prefix.toLowerCase());
}

export const getDefaultStartDateSUI = (minusMonths: number) => {
    let date = new Date(); // equivalent to new LocalDate()
    date.setMonth(date.getMonth() - minusMonths); // minusMonths from current month
    date.setDate(1); // set to the first day of the month
    return date;
};

export const getDefaultEndDateSUI = () => {
    return new Date(); // directly returns the current date
};

export const getEndDateSUI = (startDateSUI: any) => {
    return addDaysToDate(startDateSUI, DEFAULT_INTERVAL_BETWEEN_DATES);
};

export const evaluateContactType = (contactNumber: string): string => {
    let targetType = 'MOBILE';
    if (contactNumber && !contactNumber.startsWith('05') && !contactNumber.startsWith('009715') && !contactNumber.startsWith('+9715')) {
        targetType = 'PHONE';
    }
    return targetType;
};
