import {
  InputChangeEventDetail,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonList,
  IonModal,
  IonPage,
  IonTitle,
} from '@ionic/react';
import { FC, FormEventHandler, useCallback, useState } from 'react';
import { ButtonUI } from '../../../../../shared/ui';
import { Styled } from './styles';
import { InputUI } from '../../../../../shared/ui/input';
import { closeOutline } from 'ionicons/icons';
import { useUserAuthData } from '../../model/hooks/useUserAuthData';
import { signUpApi } from '../../../../entities/user/model/api';
// console.log(import.meta.env);

export type AuthFormProps = {
  title: string;
};
// AuthData
export const AuthForm: FC<AuthFormProps> = ({ title }) => {
  const {
    data: { password, number },
    onChange,
  } = useUserAuthData();

  const onSumit = useCallback(() => {
    signUpApi({ number, password });
  }, [number, password]);

  return (
    <IonModal trigger='auth-form'>
      <IonHeader>
        <IonItem>
          <IonTitle>{title}</IonTitle>
          <IonButtons>
            <ButtonUI
              leftSlot={
                <IonIcon icon={closeOutline} color='primary' size='large' />
              }
            />
          </IonButtons>
        </IonItem>
      </IonHeader>
      <IonContent>
        <IonList>
          <InputUI
            label='Enter your phone'
            placeholder='8(999) 999 99 99'
            value={number}
            name='number'
            onChange={onChange}
          />
          <InputUI
            label='Enter your password'
            placeholder='test@gmail.com'
            value={password}
            name='password'
            onChange={onChange}
          />
        </IonList>
        <ButtonUI buttonText='Войти' onClick={onSumit} />
      </IonContent>
    </IonModal>
  );
};
