import { imageURL } from '../../../utils/lib/proxyAPI';

interface PCPrecolumnProps {
    onClick: () => void;
}

const PCPrecolumn: React.FC<PCPrecolumnProps> = ({ onClick }) => {
    return (
        <button className="attributes-button" onClick={onClick}>
            <img src={`${imageURL}/btn-view.png`} alt="View" />
        </button>
    );
};

export default PCPrecolumn;
