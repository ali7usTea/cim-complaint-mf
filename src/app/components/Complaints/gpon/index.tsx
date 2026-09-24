import { Accordion, AccordionTab } from 'primereact/accordion';
import Form from './Form';

const renderHeader = () => {
    return (
        <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
                <span>GPON Information</span>
            </div>
            <i className="pi pi-plus"></i>
        </div>
    );
};

interface GponFormProps {
    fields?: any;
    errors?: any;
    touched?: any;
    handleChange?: any;
    setFieldValue?: any;
}

function GponForm({ fields, errors, handleChange, setFieldValue, touched }: GponFormProps) {
    return (
        <Accordion activeIndex={0}>
            <AccordionTab header={renderHeader()}>
                <Form errors={errors} fields={fields} handleChange={handleChange} setFieldValue={setFieldValue} touched={touched} />
            </AccordionTab>
        </Accordion>
    );
}

export default GponForm;
