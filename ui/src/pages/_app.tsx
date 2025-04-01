import { useState } from "react";
import Layout from "../components/Layout";
import "../styles/globals.css";
import { FileProvider } from "@/lib/FileContext";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const [userData, setUserData] = useState({
    isLoggedIn: false,
    name: undefined,
    email: undefined,
    password: undefined,
    userType: undefined,
  });

  return (
    <FileProvider>
      <Layout userData={userData}>
        <Component {...pageProps} setUserData={setUserData} />
        {(() => {
          console.log(
            "name: " + userData.name,
            "email: " + userData.email,
            "password: " + userData.password,
            "userType: " + userData.userType
          );
          return null;
        })()}
      </Layout>
    </FileProvider>
  );
}
