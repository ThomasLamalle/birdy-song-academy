
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import Header from '@/components/layout/Header';
import { Input } from '@/components/ui/input';
import { birds } from '@/data/birds';
import BirdCard from '@/components/library/BirdCard';
import { Search } from 'lucide-react';

const LibraryPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredBirds = searchTerm.trim() === "" 
    ? birds 
    : birds.filter(bird => 
        bird.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bird.scientificName.toLowerCase().includes(searchTerm.toLowerCase())
      );
  
  return (
    <Layout>
      <Header 
        title="BirdyDex" 
        subtitle="Explorez la bibliothèque d'oiseaux"
      />
      
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="search"
          placeholder="Rechercher un oiseau..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="space-y-4 pb-4">
        {filteredBirds.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Aucun oiseau ne correspond à votre recherche</p>
          </div>
        ) : (
          filteredBirds.map((bird) => (
            <BirdCard key={bird.id} bird={bird} />
          ))
        )}
      </div>
    </Layout>
  );
};

export default LibraryPage;
