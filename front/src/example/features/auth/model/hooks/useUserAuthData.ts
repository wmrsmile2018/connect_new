import { InputChangeEventDetail } from '@ionic/react';
import { useCallback, useState } from 'react';

export type UseUserAuthData = () => {
  // AuthData from types
  data: { number: string; password: string };
  onChange: (e: CustomEvent<InputChangeEventDetail>) => void;
};

export const useUserAuthData: UseUserAuthData = () => {
  const [data, setData] = useState<{ number: string; password: string }>({
    password: '',
    number: '',
  });

  const onChange = useCallback(
    ({ detail }: CustomEvent<InputChangeEventDetail>) => {
      //@ts-ignore
      const name = detail.event?.target?.name;

      setData((prev) => ({
        ...prev,
        [name]: detail.value ?? '',
      }));
    },
    []
  );

  return {
    data,
    onChange,
  };
};
