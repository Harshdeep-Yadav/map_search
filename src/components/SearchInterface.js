import React, { useState } from 'react';
import { subjects, cities } from '../data/tutorsData';
import './SearchInterface.css';

const SearchInterface = ({ filters, onFilterChange, onLocationSelect, tutorCount }) => {
  const [searchLocation, setSearchLocation] = useState('');

  const handleSubjectChange = (e) => {
    onFilterChange({ subject: e.target.value });
  };

  const handleRateChange = (e) => {
    onFilterChange({ maxRate: parseInt(e.target.value) });
  };

  const handleAvailabilityChange = (e) => {
    onFilterChange({ availability: e.target.value });
  };

  const handleRatingChange = (e) => {
    onFilterChange({ minRating: parseFloat(e.target.value) });
  };

  const handleLocationSelect = (city) => {
    onLocationSelect(city);
    setSearchLocation(city.name);
  };

  const clearFilters = () => {
    onFilterChange({
      subject: '',
      maxRate: 2000,
      availability: '',
      minRating: 0
    });
    setSearchLocation('');
    onLocationSelect(null);
  };

  return (
    <div className="search-interface">
      <div className="search-header">
        <h2>Search & Filters</h2>
        <span className="tutor-count">{tutorCount} tutors found</span>
      </div>

      <div className="search-section">
        <label>Location</label>
        <div className="location-input">
          <input
            type="text"
            placeholder="Search by city..."
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
          />
          <div className="location-suggestions">
            {cities
              .filter(city => 
                city.name.toLowerCase().includes(searchLocation.toLowerCase())
              )
              .map(city => (
                <div
                  key={city.name}
                  className="location-suggestion"
                  onClick={() => handleLocationSelect(city)}
                >
                  {city.name}
                </div>
              ))
            }
          </div>
        </div>
      </div>

      <div className="search-section">
        <label>Subject</label>
        <select value={filters.subject} onChange={handleSubjectChange}>
          <option value="">All Subjects</option>
          {subjects.map(subject => (
            <option key={subject} value={subject}>{subject}</option>
          ))}
        </select>
      </div>

      <div className="search-section">
        <label>Max Rate: ${filters.maxRate}/hr</label>
        <input
          type="range"
          min="20"
          max="2000"
          value={filters.maxRate}
          onChange={handleRateChange}
          className="rate-slider"
        />
        <div className="rate-labels">
          <span>$20</span>
          <span>$2000</span>
        </div>
      </div>

      <div className="search-section">
        <label>Availability</label>
        <select value={filters.availability} onChange={handleAvailabilityChange}>
          <option value="">Any Time</option>
          <option value="Weekdays">Weekdays</option>
          <option value="Weekends">Weekends</option>
          <option value="Evenings">Evenings</option>
          <option value="Online">Online</option>
        </select>
      </div>

      <div className="search-section">
        <label>Minimum Rating</label>
        <select value={filters.minRating} onChange={handleRatingChange}>
          <option value={0}>Any Rating</option>
          <option value={4.0}>4.0+ Stars</option>
          <option value={4.5}>4.5+ Stars</option>
          <option value={4.8}>4.8+ Stars</option>
        </select>
      </div>

      <button className="clear-filters" onClick={clearFilters}>
        Clear All Filters
      </button>
    </div>
  );
};

export default SearchInterface; 