import { Link } from "react-router-dom";
import classNames from "classnames";

import { NavigationLinkSize } from "./NavigationLinkSize";
import { NavigationLinkType } from "./NavigationLinkType";

import styles from './NavigationLink.module.scss';

export type NavigationLinkProps = {
    link: string;
    label: string;
    size?: NavigationLinkSize;
    type?: NavigationLinkType;
    className?: string;
};

const navigationLinkSizeToClassName: Record<NavigationLinkSize, string> = {
    [NavigationLinkSize.Medium]: styles['navigation-link'],
    [NavigationLinkSize.Small]: styles['navigation-link__small'],
}

export function NavigationLink({
    label,
    link,
    className,
    size = NavigationLinkSize.Medium,
    type = NavigationLinkType.Default
}: NavigationLinkProps) {
    return (
        <Link
            className={classNames(
                {
                    [styles['navigation-link-highlighted']]: type === NavigationLinkType.Hightlighted,
                },
                navigationLinkSizeToClassName[size],
                className,
            )}
            to={link}
        >
            {label}
        </Link>
    );
}