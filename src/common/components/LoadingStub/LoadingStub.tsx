import { localization } from "resources";

import styles from './LoadingStub.module.scss';

export function LoadingStub() {
    return (
        <div className={styles['loading-stub']}>
            {localization.loading}
        </div>
    )
}