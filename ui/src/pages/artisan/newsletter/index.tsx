import { StrictMode } from 'react';
import Page from './page';
import NewsletterLoadingBuffer from './gen-loader';

export default function Newsletter() {
  return (
    <StrictMode>
      <Page />
      {/* <LoadingBuffer /> */}
    </StrictMode>
  );
}