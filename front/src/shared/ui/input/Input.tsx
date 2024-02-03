import { FC, ReactElement, memo } from 'react';
import { InputChangeEventDetail, IonInput } from '@ionic/react';
import { ElementBaseCssProps } from '../../lib/types';
import clsx from 'clsx';

export type InputUIProps = ElementBaseCssProps & {
  value: string;
  onChange: (event: CustomEvent<InputChangeEventDetail>) => void;
  placeholder?: string;
  icon?: ReactElement;
  label?: string;
  iconPosition?: 'left' | 'right';
  name?: string;
};

export const InputUI: FC<InputUIProps> = memo(
  ({
    value,
    onChange,
    placeholder,
    icon,
    label,
    iconPosition = 'left',
    name,
    className,
    ...restProps
  }) => {
    const classes = clsx('InputUI', className);
    return (
      <IonInput
        value={value}
        placeholder={placeholder}
        // onIonChange={onChange}
        onIonChange={onChange}
        className={classes}
        label={label}
        name={name}
        {...restProps}
      >
        {icon}
      </IonInput>
    );
  }
);
