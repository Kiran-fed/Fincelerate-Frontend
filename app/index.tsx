
import React from 'react';
import { useRouter } from 'expo-router';
import LandingPage from '../screens/Landingpage'; 
import CuratedBasket from '../screens/CuratedBasket.js'
const Index = () => {
  const router = useRouter();

  return (
  // <LandingPage />
  <CuratedBasket/>
)};

export default Index;
