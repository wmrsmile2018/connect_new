import axios from 'axios';
import { createEffect } from 'effector';

const baseUrl = 'http://localhost:3000';

export const signUpApi = createEffect(
  async ({ number, password }: { number: string; password: string }) => {
    const res = await axios.post(`${baseUrl}/auth/sign-up`, {
      number,
      password,
    });

    console.log('res-1', res);
  }
);

export const sendOtpCode = createEffect(async (code: string) => {
  const res = await axios.post(`${baseUrl}/sms/verify-code`, { code });
  console.log('res-2', res);
});
