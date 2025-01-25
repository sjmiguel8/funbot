import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import AmplifyProvider from "./providers";
import MainLayout from "../components/Layout/MainLayout";
import AuthWrapper from '../components/AuthWrapper';
import React from "react";

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
    <html lang="en" className="h-full">
      <head />
      <body className={`${inter.variable} font-sans antialiased h-full`}>
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
