import { StrictMode } from 'react';
import Singup from './page';

export default function SignUp({ setUserData }: { setUserData: (data: any) => void }) {
  return (
    <StrictMode>
      <Singup setUserData={setUserData} />
    </StrictMode>
  );
}