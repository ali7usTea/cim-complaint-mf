import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

interface UpdateComplaintModalProps {
    status?: string;
    isUpdate?: boolean;
}

const UpdateComplaintModal: React.FC<UpdateComplaintModalProps> = ({
    status,
    isUpdate,
}) => {
    // If isUpdate is true and status is not 'OPENED', show the update restriction dialog
    if (isUpdate && status !== 'OPENED') {
        return (
            <Dialog
                header="Update Not Allowed"
                visible={true}
                style={{ width: '400px' }}
                modal
                closable={false}
                onHide={() => {}}
                className="blur-dialog"
            >
                <div>
                    The complaint must be in <b>OPENED</b> state to be updated.
                </div>
            </Dialog>
        );
    }
};

export default UpdateComplaintModal;
