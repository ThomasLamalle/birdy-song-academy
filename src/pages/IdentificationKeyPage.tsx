
import React from 'react';
import Layout from '@/components/layout/Layout';
import Header from '@/components/layout/Header';
import IdentificationKey from '@/components/identification/IdentificationKey';

const IdentificationKeyPage = () => {
  return (
    <Layout>
      <Header 
        title="Clef de détermination" 
        subtitle="Identifiez les oiseaux par leurs caractéristiques"
      />
      <IdentificationKey />
    </Layout>
  );
};

export default IdentificationKeyPage;
