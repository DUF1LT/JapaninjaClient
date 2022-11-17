import { Link } from "react-router-dom";
import { NavigationLinkType } from "./NavigationLinkType";

import styles from './NavigationLink.module.scss';
import classNames from "classnames";

export type NavigationLinkProps = {
    link: string;
    label: string;
    type?: NavigationLinkType;
    className?: string;
};

const navigationLinkTypeToClassName: Record<NavigationLinkType, string> = {
    [NavigationLinkType.Medium]: styles['navigation-link'],
    [NavigationLinkType.Small]: styles['navigation-link__small'],
}

export function NavigationLink({
    label,
    link,
    className,
    type = NavigationLinkType.Medium,
}: NavigationLinkProps) {
    return (
        <Link
            className={classNames(navigationLinkTypeToClassName[type], className)}
            to={link}
        >
            {label}
        </Link>
    );
}