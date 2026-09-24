export const getLastDateOfLastMonth = () => {
    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    return lastMonth;
};
export const getFirstDateOfThreeMonthsAgo = () => {
    const now = new Date();
    const threeMonthAgo = new Date(now.getFullYear(), now.getMonth() - 3, 1);
    return threeMonthAgo;
};

export function addMonths(date: Date, numberOfMonths?: number | string) {
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth() + (numberOfMonths ? Number(numberOfMonths) : 3));
    newDate.setDate(0);
    return newDate;
}

export function addMonthsWithProps(date: Date, months: number) {
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth() + months);
    newDate.setDate(0);
    return newDate;
}

export function addDays(date: Date, days: number) {
    let date2 = new Date(date);
    return new Date(date2.setDate(date2.getDate() + days));
}

export function addDaysToDate(date: any, numberOfDays: any) {
    var result = new Date(date); // Create a new Date object to avoid modifying the original date
    result.setDate(result.getDate() + numberOfDays); // Increment the date by the number of days
    return result;
}

export const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return new Date(`${year}-${month}-${day}`);
};

export const generateYearList = (startYear: number): number[] => {
    const currentYear = new Date().getFullYear();
    const years: number[] = [];
    for (let year = startYear; year <= currentYear; year++) {
        years.push(year);
    }
    return years;
};

export interface IMonths {
    monthName: string;
    lastDate: string;
}

export const generateMonths = (): IMonths[] => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'August', 'Sep', 'Oct', 'Nov', 'Dec'];

    const listOfMonths: IMonths[] = months?.map((month, index) => {
        const year = new Date().getFullYear();
        const lastDay = new Date(year, index + 1, 0); // 0 gives the last day of the previous month
        return {
            monthName: month,
            lastDate: lastDay.toISOString()?.split('T')[0]
        };
    });
    return listOfMonths;
};

export function getLastDateOfCurrentMonth() {
    const now = new Date();
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    return lastDay;
}

export function calculateLastDateOf6thMonth(startDate: string | Date): Date {
    const start = new Date(startDate); // Convert the input to a Date object
    const lastDayOfCurrentMonth = new Date(start.getFullYear(), start.getMonth() + 1, 0); // Last date of the current month
    const endDate = new Date(lastDayOfCurrentMonth); // Copy the last date of the current month

    // Add 6 months to the last date of the current month
    endDate.setMonth(endDate.getMonth() + 6);

    // Handle edge cases where adding months can skip to the next month (e.g., adding 6 months to 31st of a month)
    if (endDate.getDate() !== lastDayOfCurrentMonth.getDate()) {
        endDate.setDate(0); // Set to the last day of the new month
    }

    return endDate;
}


export function getMonthRange(input: string): string {
    // Parse the string to get day, month, year
    const [datePart] = input?.split(' ');
    const [day, month, year] = datePart?.split('-').map(Number);

    // Create a Date object (month is 0-based, so subtract 1)
    const date = new Date(year, month - 1, day);

    // Get first and last day of the month
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    // Format as "01 February 2019"
    const formatDate = (d: Date) =>
        d.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });

    return `${formatDate(firstDay)} to ${formatDate(lastDay)}`;
}

export function getMonthYearCode(input: string): string {
    // Parse the string to get day, month, year
    const [datePart] = input?.split(' ');
    const [day, month, year] = datePart?.split('-').map(Number);

    // Return as MMYYYY (with leading zero for month)
    return `${month.toString().padStart(2, '0')}${year}`;
}