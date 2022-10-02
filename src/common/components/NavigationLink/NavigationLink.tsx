import { Link } from "react-router-dom";
import { NavigationLinkType } from "./NavigationLinkType";

import styles from './NavigationLink.module.scss';

export type NavigationLinkProps = {
    link: string;
    label: string;
    type?: NavigationLinkType;
};

const navigationLinkTypeToClassName: Record<NavigationLinkType, string> = {
    [NavigationLinkType.Medium]: styles['navigation-link'],
    [NavigationLinkType.Small]: styles['navigation-link__small'],
}

export function NavigationLink({
    label,
    link,
    type = NavigationLinkType.Medium,
}: NavigationLinkProps) {
    return (
        <Link to={link} className={navigationLinkTypeToClassName[type]}>
            {label}
        </Link>
    );
}