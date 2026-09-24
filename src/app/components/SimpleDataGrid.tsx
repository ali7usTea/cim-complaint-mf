import { InputText } from 'primereact/inputtext';

interface GridProps {
    keys: string[];
    values: string[];
    isVisible?: boolean;
}
const SimpleDataGrid = ({ keys, values }: GridProps) => {
    return (
        // className="p-datatable"
        <div >
            <div className='flex flex-column w-full'>
                {keys?.map((key, index) => {
                    return (
                        <div
                            key={key}
                            className='flex justify-content-evenly align-items-center w-full'
                            >
                            {!!values[index] && <label htmlFor={key} >{key}:</label>}
                            {!!values[index] && <InputText id={key} value={values[index]} style={{ width: '50%' }} readOnly />}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SimpleDataGrid;
