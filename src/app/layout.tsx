import type { Metadata } from "next";
import { Inter } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';
import AmplifyProvider from "./providers";
import MainLayout from "../components/MainLayout";
import AuthWrapper from '../components/AuthWrapper';
import React from "react";
import '/src/components/styles/globals.css';


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Wavelength",
  description: "Social platform",
};

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head />
      <body className={inter.variable}>
        <AmplifyProvider>
          <AuthWrapper>
            <MainLayout>{children}</MainLayout>
          </AuthWrapper>
        </AmplifyProvider>
      </body>
    </html>
  );
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientLayout>{children}</ClientLayout>;
}
