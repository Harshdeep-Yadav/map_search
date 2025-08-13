# Tutor Map Search Platform

An interactive web application that helps students find tutors in their area using Google Maps integration. Built with React and featuring a modern, responsive design.

## Features

- **Interactive Map View**: Google Maps integration showing tutor locations
- **Advanced Search & Filters**: Filter by subject, rate, availability, and rating
- **Location-Based Search**: Search for tutors in specific cities
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Filtering**: Map updates instantly as you adjust search criteria
- **Tutor Profiles**: Detailed information with photos, ratings, and contact options

## Screenshots

The application features:
- A beautiful gradient header with search interface
- Interactive Google Maps with custom tutor markers
- Filterable sidebar for refining search results
- Responsive info windows for tutor details

## Tech Stack

- **Frontend**: React 18
- **Maps**: Google Maps JavaScript API
- **Styling**: Custom CSS with modern design principles
- **HTTP Client**: Axios (as per user preference)
- **Build Tool**: Create React App

## Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- Google Maps API key

## Getting Started

### 1. Clone the Repository
```bash
git clone <repository-url>
cd tutor-map-search
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Get Google Maps API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Maps JavaScript API
4. Create credentials (API Key)
5. Copy your API key

### 4. Configure API Key
Open `src/components/TutorMap.js` and replace:
```javascript
apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
```
with your actual API key.

### 5. Start the Development Server
```bash
npm start
```

The application will open at `http://localhost:3000`

## Project Structure

```
src/
├── components/
│   ├── SearchInterface.js    # Search and filter controls
│   ├── SearchInterface.css   # Search interface styling
│   ├── TutorMap.js          # Google Maps integration
│   └── TutorMap.css         # Map component styling
├── data/
│   └── tutorsData.js        # Mock tutor data
├── App.js                   # Main application component
├── App.css                  # Main application styling
├── index.js                 # Application entry point
└── index.css                # Global styles
```

## Customization

### Adding More Tutors
Edit `src/data/tutorsData.js` to add more tutor profiles with:
- Name, subjects, rate, experience
- Location coordinates (lat/lng)
- Availability, ratings, and bio

### Modifying Filters
Update the filter logic in `src/App.js` to add new filtering options.

### Styling Changes
Modify the CSS files to match your brand colors and design preferences.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (irreversible)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For support or questions, please open an issue in the repository. "# map_search" 
"# map_search" 
"# map_search" 
