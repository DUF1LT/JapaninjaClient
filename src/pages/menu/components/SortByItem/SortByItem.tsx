import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { SortByDirection, SortByField } from "models/domain/SortBy";
import { localization } from "resources";

import styles from './SortByItem.module.scss';

const sortByFieldToString: Record<SortByField, () => string> = {
    [SortByField.Name]: () => localization.name,
    [SortByField.Price]: () => localization.price,
};

interface Props {
    sortField: SortByField;
    sortDirection?: SortByDirection;
    onClick: () => void;
}

export function SortByItem({
    sortField,
    sortDirection,
    onClick
}: Props) {
    const renderSortDirection = () => {
        if (!sortDirection) {
            return null;
        }

        if (sortDirection === SortByDirection.Ascending) {
            return <KeyboardArrowUpIcon />;
        }

        return <KeyboardArrowDownIcon />;
    };

    return (
        <div
            className={styles['sort-by-item']}
            onClick={onClick}
        >
            <span className={styles['sort-by-item-label']}>
                {sortByFieldToString[sortField]()}
            </span>
            <span className={styles['sort-by-item-icon']} >
                {renderSortDirection()}
            </span>
        </div >
    );
}