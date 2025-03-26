import { StrictMode } from 'react';
import Page from './page';
import TranscriptionLoadingBuffer from './gen-loader';

export default function Transcript() {
  return (
    <StrictMode>
      <Page />
      {/* <TranscriptionLoadingBuffer /> */}
    </StrictMode>
  );
}