import React, { useState } from 'react';
import { IonInput, IonButton } from '@ionic/react';

const LoginForm: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [smsCode, setSmsCode] = useState('');

  const handlePhoneNumberChange = (event: CustomEvent) => {
    setPhoneNumber(event.detail.value);
  };

  const handleSmsCodeChange = (event: CustomEvent) => {
    setSmsCode(event.detail.value);
  };

  const handleSubmit = () => {
    // Обработка отправки формы
    console.log('Номер телефона:', phoneNumber);
    console.log('Код SMS:', smsCode);
  };

  return (
    <form onSubmit={handleSubmit}>
      <IonInput
        type='tel'
        placeholder='Введите номер телефона'
        value={phoneNumber}
        onIonChange={handlePhoneNumberChange}
      ></IonInput>
      <IonInput
        type='text'
        placeholder='Введите код SMS'
        value={smsCode}
        onIonChange={handleSmsCodeChange}
      ></IonInput>
      <IonButton expand='full' type='submit'>
        Войти
      </IonButton>
    </form>
  );
};

export default LoginForm;
