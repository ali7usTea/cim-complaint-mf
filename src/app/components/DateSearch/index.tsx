import React from 'react';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { addMonths, calculateLastDateOf6thMonth } from '../../../utils/dateCalculation';

interface DateSearchProps {
    onSearch: (startDate: string, endDate: string) => void;
    initialStartDate?: Date;
    initialEndDate?: Date;
    startDateProps?: any;
    endDateProps?: any;
    className?: string;
}

const DateSearch: React.FunctionComponent<DateSearchProps> = ({ onSearch, initialStartDate, initialEndDate, startDateProps = {}, endDateProps = {}, className }) => {
    const [startDate, setStartDate] = React.useState<any>(initialStartDate || new Date());
    const [endDate, setEndDate] = React.useState<any>(initialEndDate || addMonths(new Date()));
    const [isSearchBttnEnabled, setISearchBttnEnabled] = React.useState(false);
    className = className || 'm-2 w-[10%]';

    const handleDateChange = (e: any) => {
        const date = e.target.value;
        setStartDate(date);
        setEndDate(calculateLastDateOf6thMonth(date));
    };

    React.useEffect(() => {
        if (startDate && endDate) {
            setISearchBttnEnabled(true);
        }
    }, [startDate, endDate]);

    const handleSearchClick = () => {
        onSearch(startDate, endDate);
    };

    return (

        <div className="flex justify-start items-center"  title="cim-datesearch">
            <label>Start Date:</label>
            <Calendar
                {...(startDateProps.maxDate && { maxDate: startDateProps.maxDate(startDate, endDate) })}
                {...(startDateProps.minDate && { minDate: startDateProps.minDate(startDate, endDate) })}
                value={startDate}
                onChange={handleDateChange}
                dateFormat="yy-mm-dd"
                showIcon
                id="sdate"
                className={className}
                placeholder="YYYY-MM-DD"
            />
            <label>End Date:</label>
            <Calendar
                maxDate={endDateProps.maxDate(startDate, endDate)}
                minDate={endDateProps.minDate(startDate, endDate)}
                value={endDate}
                onChange={handleDateChange}
                dateFormat="yy-mm-dd"
                showIcon
                id="edate"
                className={className}
                placeholder="YYYY-MM-DD"
            />
            <Button onClick={handleSearchClick} disabled={!isSearchBttnEnabled}>
                Search
            </Button>
        </div>
    );
};

export default DateSearch;
