"use client";

import { Provider } from "react-redux";
import "./globals.css";
import { persistor, store } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Auth0Provider } from "@auth0/auth0-react";
import { Kanit } from "next/font/google";

const kanit = Kanit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-kanit",
  weight: ["200", "300", "400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const redirectUri =
    typeof window !== "undefined" ? window.location.origin : "";
  return (
    <html lang="en" className={kanit.variable}>
      <body>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Auth0Provider
              domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN!}
              clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!}
              authorizationParams={{
                redirect_uri: redirectUri,
                audiente: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
                scope:
                  process.env.NEXT_PUBLIC_AUTH0_SCOPE ||
                  "openid profile email offline_access",
              }}
              cacheLocation="localstorage"
            >
              {children}
            </Auth0Provider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
