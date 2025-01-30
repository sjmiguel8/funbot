'use client'
import MainLayout from '@/components/MainLayout';
import HomeView from '@/components/HomeView';
import '/src/styles/MainLayout.module.css'
import '/src/styles/HomeView.module.css'
import '/src/styles/global.css' 



export default function HomePage() {
  return (
    <MainLayout>
      <HomeView />
    </MainLayout>
  );
}
