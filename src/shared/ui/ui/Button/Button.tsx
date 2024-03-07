import { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';

import styles from './Button.module.css';

export type Button = {
    onClick?: () => void;
    className?: string;
    type?: HTMLButtonElement['type'];
    disabled?: boolean;
};

export const Button: FC<PropsWithChildren<Button>> = (props) => {
    const { children, className, type = 'button', onClick, disabled } = props;

    return (
        <button
            type={type}
            className={clsx(styles.button, className)}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};
