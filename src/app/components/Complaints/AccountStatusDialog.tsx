import { Dialog } from 'primereact/dialog';

interface AccountStatusDialogProps {
    visible: boolean;
    accountStatus: string;
    onHide: () => void;
}

const AccountStatusDialog: React.FC<AccountStatusDialogProps> = ({ visible, accountStatus, onHide }) => {
    return (
        <Dialog header="Customer account is not active." visible={visible} style={{ width: '450px' }} modal onHide={onHide}>
            <div className="confirmation-content flex items-center">
                <i className="pi pi-exclamation-triangle" style={{ fontSize: '2rem', marginRight: '1rem', color: '#FFA726' }}></i>
                <span>
                    Customer account status is <strong>{accountStatus || 'N/A'}</strong>
                </span>
            </div>
        </Dialog>
    );
};

export default AccountStatusDialog;
