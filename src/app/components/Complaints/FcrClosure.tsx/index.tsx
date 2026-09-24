import FormFCR from './FormFCR';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { CheckCircle, Plus } from 'lucide-react';

const renderHeader = () => {
    return (
        <div className="flex items-center justify-between w-full">
            <div className="flex items-center justify-between w-full">
                <div className='flex items-center gap-2 font-normal text-sm!'>
                    <div className="w-10 h-10 rounded-[10px] bg-[#F0E9ED] text-mauves flex items-center justify-center">
                        <CheckCircle className="h-7 w-7" strokeWidth={1.25} />
                    </div>
                    FCR Closure
                </div>
                <div>
                    <button
                        type="button"
                        className="flex items-center justify-center cursor-pointer"
                        style={{ }}
                        title="FCR Info"
                    >
                        <Plus className="h-6 w-6" strokeWidth={1.25} />
                    </button>
                </div>
            </div>
        </div>
    );
};

interface FcrClosureFormProps {
    fields?: any;
    errors?: any;
    touched?: any;
    handleChange?: any;
    setFieldValue?: any;
    isClosureOpen?: boolean;
}

function FcrClosure({ fields, errors, handleChange, setFieldValue, touched, isClosureOpen }: FcrClosureFormProps = {}) {
    return (
        <>
            <style>{`
                .fcr-accordion .p-accordion-header-link {
                    flex-direction: row-reverse;
                }
                .fcr-accordion .p-accordion-toggle-icon {
                    position: absolute;
                    left: 200px;
                    rotation: -180deg;

                }
            `}</style>
            <Accordion activeIndex={0} className="fcr-accordion mt-2!">
                <AccordionTab header={renderHeader()}>
                    <FormFCR errors={errors} fields={fields} handleChange={handleChange} setFieldValue={setFieldValue} touched={touched} isClosureOpen={isClosureOpen} />
                </AccordionTab>
            </Accordion>
        </>
    );
}

export default FcrClosure;
