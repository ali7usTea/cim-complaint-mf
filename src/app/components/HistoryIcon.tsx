import { imageURL } from '../../utils/lib/proxyAPI';

interface HistoryIconProps {
    onClick: () => void;
}
const HistoryIcon = ({ onClick }: HistoryIconProps) => {
    return <img alt="history-icon" style={{ height: '20px' }} onClick={onClick} src={`${imageURL}/history_icon.png`} />;
};
export default HistoryIcon;
