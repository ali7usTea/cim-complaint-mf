import { ComplaintType } from '..';
import Form from './Form';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { DollarSign, Plus } from 'lucide-react';

interface RefundRecordFormProps {
    fields?: any;
    errors?: any;
    touched?: any;
    handleChange?: any;
    setFieldValue?: any;
    selectedType?: ComplaintType | null
}

const renderHeader = () => {
    return (
        <div className="flex items-center justify-between w-full">
            <div className="flex items-center justify-between w-full">
                <div className='flex items-center gap-2 font-normal text-sm!'>
                    <div className="w-10 h-10 rounded-[10px] bg-[#F0E9ED] text-mauves flex items-center justify-center">
                        <DollarSign className="h-7 w-7" strokeWidth={1.25} />
                    </div>
                    Refund Record
                </div>
                <div>
                    <button
                        type="button"
                        className="flex items-center justify-center cursor-pointer"
                        style={{ }}
                        title="Add Refund"
                    >
                        <Plus className="h-6 w-6" strokeWidth={1.25} />
                    </button>
                </div>
            </div>
        </div>
    );
};

function RefundRecord({ fields, errors, handleChange, setFieldValue, touched, selectedType }: RefundRecordFormProps = {}) {
    return (
        <>
            <style>{`
                .refund-accordion .p-accordion-header-link {
                    flex-direction: row-reverse;
                }
                .refund-accordion .p-accordion-toggle-icon {
                    position: absolute;
                    left: 200px;
                    transition: transform 0.3s ease;
                }
                .refund-accordion .p-accordion-header-link[aria-expanded="true"] .p-accordion-toggle-icon {
                    transform: rotate(180deg);
                }
            `}</style>
            <Accordion activeIndex={0} className="refund-accordion mt-2!">
                <AccordionTab header={renderHeader()}>
                    <Form fields={fields} errors={errors} touched={touched} handleChange={handleChange} setFieldValue={setFieldValue} selectedType={selectedType}/>
                </AccordionTab>
            </Accordion>
        </>
    );
}

export default RefundRecord;
