import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

interface SubOrderWarningModalProps {
    visible: boolean;
    onHide: () => void;
    onProceed: () => void;
}

const SubOrderWarningModal: React.FC<SubOrderWarningModalProps> = ({ visible, onHide, onProceed }) => {
    return (
        <Dialog header="Warning" visible={visible} style={{ width: '400px' }} onHide={onHide} modal>
            <div style={{ marginBottom: 16 }}>
                The selected sub order issued before 48 hours. Do you want to proceed complaint creation?
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                <Button label="Cancel" onClick={onHide} className="p-button-secondary" />
                <Button label="Proceed" onClick={onProceed} autoFocus />
            </div>
        </Dialog>
    );
};

export default SubOrderWarningModal;
