import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

interface WaiverWarningModalProps {
    visible: boolean;
    onHide: () => void;
    onProceed: () => void;
}

const WaiverWarningModal: React.FC<WaiverWarningModalProps> = ({ visible, onHide, onProceed }) => {
    return (
        <Dialog
            header="Waiver check information"
            visible={visible}
            style={{ width: '450px' }}
            modal
            onHide={onHide}
            footer={
                <div>
                    <Button
                        label="Proceed"
                        icon="pi pi-check"
                        onClick={onProceed}
                        className="p-button-success"
                        autoFocus
                    />
                    <Button
                        label="Abort"
                        icon="pi pi-times"
                        onClick={onHide}
                        className="p-button-danger"
                    />
                </div>
            }
        >
            <div className="confirmation-content">
                <span style={{ color: '#FFA500', fontWeight: 'bold', backgroundColor: '#FFFFE0', padding: '8px', display: 'block' }}>
                    Customer has previous waiver requests. Do you want to proceed and create a waiver request?
                </span>
            </div>
        </Dialog>
    );
};

export default WaiverWarningModal;
