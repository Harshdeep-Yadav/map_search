import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import './TutorMap.css';

/* global google */

const TutorMap = ({ tutors, selectedLocation }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [viewportTutors, setViewportTutors] = useState([]);
  const [mapBounds, setMapBounds] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize Google Maps
  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.REACT_APP_API_KEY, // Use environment variable for API key
        version: 'weekly',
        libraries: ['places']
      });

      try {
        window.google = await loader.load();
        
        const defaultCenter = { lat: 39.8283, lng: -98.5795 }; // Center of USA
        
        const mapInstance = new google.maps.Map(mapRef.current, {
          center: defaultCenter,
          zoom: 4,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ]
        });

        setMap(mapInstance);
        
        // Add viewport change listener with debouncing
        let boundsTimeout;
        mapInstance.addListener('bounds_changed', () => {
          clearTimeout(boundsTimeout);
          boundsTimeout = setTimeout(() => {
            const bounds = mapInstance.getBounds();
            if (bounds) {
              setMapBounds(bounds);
            }
          }, 300); // Debounce for 300ms
        });
        
      } catch (error) {
        console.error('Error loading Google Maps:', error);
      }
    };

    if (!map) {
      initMap();
    }
  }, [map]);

  // Update map when viewport tutors change
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!map || !window.google) return;

    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));

    // Create new markers for each tutor in viewport
    const newMarkers = viewportTutors.map(tutor => {
      const marker = new window.google.maps.Marker({
        position: tutor.location,
        map: map,
        title: tutor.name,
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="18" fill="#4A90E2" stroke="white" stroke-width="2"/>
              <text x="20" y="25" text-anchor="middle" fill="white" font-family="Arial" font-size="12" font-weight="bold">T</text>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(40, 40)
        }
      });

      // Add click listener to marker
      marker.addListener('click', () => {
        setSelectedTutor(tutor);
      });

      return marker;
    });

    setMarkers(newMarkers);
  }, [viewportTutors, map]);

  // Handle location selection
  useEffect(() => {
    if (!map || !selectedLocation) return;

    map.setCenter(selectedLocation);
    map.setZoom(10);
  }, [selectedLocation, map]);

  // Filter tutors based on current viewport
  useEffect(() => {
    if (!mapBounds || !tutors.length) return;

    setIsLoading(true);
    
    // Simulate loading delay for better UX
    const timer = setTimeout(() => {
      const bounds = mapBounds;
      const filtered = tutors.filter(tutor => {
        const lat = tutor.location.lat;
        const lng = tutor.location.lng;
        
        return bounds.contains({ lat, lng });
      });
      
      setViewportTutors(filtered);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [mapBounds, tutors]);

  // Initial load of tutors when map first loads
  useEffect(() => {
    if (!map || !tutors.length) return;
    
    // Set initial viewport to show all tutors
    const bounds = map.getBounds();
    if (bounds) {
      setMapBounds(bounds);
    } else {
      // If no bounds yet, show all tutors initially
      setViewportTutors(tutors);
    }
  }, [map, tutors]);

  const closeInfoWindow = () => {
    setSelectedTutor(null);
  };

  return (
    <div className="tutor-map-container">
      <div ref={mapRef} className="tutor-map" />
      
      {/* Viewport Info */}
      <div className="viewport-info">
        <div className="viewport-stats">
          <span className="tutor-count">{viewportTutors.length} tutors in this area</span>
          {isLoading && <span className="loading-indicator">Loading...</span>}
        </div>
        <div className="viewport-tip">
          💡 Scroll or zoom to discover more tutors in different areas
        </div>
      </div>
      
      {selectedTutor && (
        <div className="tutor-info-window">
          <div className="info-header">
            <img src={selectedTutor.image} alt={selectedTutor.name} className="tutor-avatar" />
            <div className="tutor-basic-info">
              <h3>{selectedTutor.name}</h3>
              <div className="tutor-rating">
                <span className="stars">{'★'.repeat(Math.floor(selectedTutor.rating))}</span>
                <span className="rating-number">{selectedTutor.rating}</span>
                <span className="reviews">({selectedTutor.reviews} reviews)</span>
              </div>
              <p className="tutor-subjects">{selectedTutor.subjects.join(', ')}</p>
            </div>
            <button className="close-btn" onClick={closeInfoWindow}>×</button>
          </div>
          
          <div className="info-body">
            <p className="tutor-bio">{selectedTutor.bio}</p>
            <div className="tutor-details">
              <div className="detail-item">
                <strong>Rate:</strong> ${selectedTutor.rate}/hr
              </div>
              <div className="detail-item">
                <strong>Experience:</strong> {selectedTutor.experience}
              </div>
              <div className="detail-item">
                <strong>Availability:</strong> {selectedTutor.availability.join(', ')}
              </div>
              <div className="detail-item">
                <strong>Location:</strong> {selectedTutor.address}
              </div>
            </div>
            <button className="contact-btn">Contact Tutor</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TutorMap; 