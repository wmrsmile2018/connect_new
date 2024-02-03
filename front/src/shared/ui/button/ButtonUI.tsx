import { FC, memo } from 'react';
import { Styled } from './styles';
import clsx from 'clsx';
import { ElementBaseCssProps } from '../../lib/types';

export type ButtonUIProps = ElementBaseCssProps & {
  leftSlot?: JSX.Element;
  rightSlot?: JSX.Element;
  onClick?: VoidFunction;
  buttonText?: string;
  disabled?: boolean;
  size?: 'small' | 'default' | 'large';
  fill?: 'clear' | 'default' | 'outline' | 'solid';
  expand?: 'block' | 'full';
  id?: string;
  color?:
    | 'danger'
    | 'dark'
    | 'light'
    | 'medium'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'tertiary'
    | 'warning';
};

export const ButtonUI: FC<ButtonUIProps> = memo(
  ({
    leftSlot,
    rightSlot,
    buttonText,
    disabled,
    size,
    onClick,
    className,
    color,
    ...restProps
  }) => {
    const classes = clsx('buttonUI', className);
    return (
      <Styled.Button
        className={classes}
        disabled={disabled}
        size={size}
        onClick={onClick}
        type='submit'
        color={color}
        {...restProps}
      >
        {leftSlot && <div className='left-container'>{leftSlot}</div>}
        {buttonText && <span className='button-text'>{buttonText}</span>}
        {rightSlot && <div className='right-container'>{rightSlot}</div>}
      </Styled.Button>
    );
  }
);
