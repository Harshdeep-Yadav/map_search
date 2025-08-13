import React, { useState, useEffect } from 'react';
import './App.css';
import SearchInterface from './components/SearchInterface';
import TutorMap from './components/TutorMap';
import { tutorsData } from './data/tutorsData';

function App() {
  const [filteredTutors, setFilteredTutors] = useState(tutorsData);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [filters, setFilters] = useState({
    subject: '',
    maxRate: 2000,
    availability: '',
    minRating: 0
  });

  // Filter tutors based on current filters
  useEffect(() => {
    let filtered = tutorsData;

    // Filter by subject
    if (filters.subject) {
      filtered = filtered.filter(tutor => 
        tutor.subjects.includes(filters.subject)
      );
    }

    // Filter by max rate
    filtered = filtered.filter(tutor => tutor.rate <= filters.maxRate);

    // Filter by availability
    if (filters.availability) {
      filtered = filtered.filter(tutor => 
        tutor.availability.includes(filters.availability)
      );
    }

    // Filter by minimum rating
    filtered = filtered.filter(tutor => tutor.rating >= filters.minRating);

    setFilteredTutors(filtered);
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Find Your Perfect Tutor</h1>
        <p>Discover qualified tutors worldwide with our interactive map - From New York to Mumbai!</p>
      </header>
      
      <main className="App-main">
        <SearchInterface 
          filters={filters}
          onFilterChange={handleFilterChange}
          onLocationSelect={handleLocationSelect}
          tutorCount={filteredTutors.length}
        />
        
        <TutorMap 
          tutors={filteredTutors}
          selectedLocation={selectedLocation}
        />
      </main>
    </div>
  );
}

export default App; 