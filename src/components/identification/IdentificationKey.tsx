
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { birds } from '@/data/birds';
import BirdCard from '@/components/library/BirdCard';
import { Card, CardContent } from '@/components/ui/card';

const IdentificationKey = () => {
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [habitat, setHabitat] = useState("");
  const [filteredBirds, setFilteredBirds] = useState(birds);

  const colors = Array.from(
    new Set(birds.flatMap(bird => bird.characteristics.color))
  ).sort();

  const habitats = Array.from(
    new Set(birds.flatMap(bird => bird.habitat))
  ).sort();

  const handleSearch = () => {
    const results = birds.filter(bird => {
      const sizeMatch = size ? bird.characteristics.size === size : true;
      const colorMatch = color ? bird.characteristics.color.includes(color) : true;
      const habitatMatch = habitat ? bird.habitat.includes(habitat) : true;
      
      return sizeMatch && colorMatch && habitatMatch;
    });
    
    setFilteredBirds(results);
  };

  const handleReset = () => {
    setSize("");
    setColor("");
    setHabitat("");
    setFilteredBirds(birds);
  };

  return (
    <div className="w-full">
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="grid gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Taille</label>
              <Select value={size} onValueChange={setSize}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une taille" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Tailles</SelectLabel>
                    <SelectItem value="">Toutes les tailles</SelectItem>
                    <SelectItem value="tiny">Très petit</SelectItem>
                    <SelectItem value="small">Petit</SelectItem>
                    <SelectItem value="medium">Moyen</SelectItem>
                    <SelectItem value="large">Grand</SelectItem>
                    <SelectItem value="very large">Très grand</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Couleur principale</label>
              <Select value={color} onValueChange={setColor}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une couleur" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Couleurs</SelectLabel>
                    <SelectItem value="">Toutes les couleurs</SelectItem>
                    {colors.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Habitat</label>
              <Select value={habitat} onValueChange={setHabitat}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un habitat" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Habitats</SelectLabel>
                    <SelectItem value="">Tous les habitats</SelectItem>
                    {habitats.map((h) => (
                      <SelectItem key={h} value={h}>{h}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2 pt-2">
              <Button onClick={handleSearch} className="flex-1 bg-birdy-green hover:bg-birdy-green-dark">
                Rechercher
              </Button>
              <Button variant="outline" onClick={handleReset} className="flex-1">
                Réinitialiser
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {filteredBirds.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Aucun oiseau ne correspond à ces critères</p>
          </div>
        ) : (
          filteredBirds.map(bird => (
            <BirdCard key={bird.id} bird={bird} />
          ))
        )}
      </div>
    </div>
  );
};

export default IdentificationKey;
