# Port Map App

This project is a web application built using React and Typescript that allows users to explore various ports around the world. It utilizes Google Maps API to display the ports on a map and provides information about each port when clicked.

## Installation

1. Clone the repository: `git clone <repository_url>`
2. Navigate to the project directory: `cd port-map-app`
3. Install dependencies: `npm install`

## Set Up 

1. Open a new terminal window and navigate to the project directory:`cd port-map-app`

2. Start the development environment:`npm run dev`
**Note:** Please wait for 5 minutes if any error is shown as it will automatically start its setup in some time.

3. Open your web browser and navigate to `http://localhost:3000`.

- Explore the ports on the map or use the port list for navigation.
- Click on a port marker or list item to view detailed information about the port.
- Toggle the menu to hide or show the port list.

## Features

- **Map View**: Displays ports on a Google Map and zooms/highlight if clicked on marker.
- **Port List**: Provides a list of ports for easy navigation and zooms/highlight if clicked on port list.
- **Port Information**: Clicking on a port marker or list item displays detailed information about the port, including its name, location, anchorage depth, and entrance restrictions.
- **Menu Toggle**: Allows users to toggle the visibility of the port list.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **TypeScript**: Superset of JavaScript that adds static type-checking capabilities.
- **Google Maps API**: Integration for displaying maps and markers.
- **Axios**: Promise-based HTTP client for making requests.
- **Express**: Web application framework for building APIs.
- **CORS**: Middleware for enabling Cross-Origin Resource Sharing.
- **CSS**: Styling the application components.

## Project Structure

- **src/**
  - **App.tsx**: Main component for rendering the application.
  - **PortList.tsx**: Component for rendering the list of ports.
  - **Map.tsx**: Component for rendering the Google Map and markers.
  - **server.mjs**: Express server for proxying requests to fetch port data.
  - **App.css**: Stylesheet for the application.

## Additional Notes

- Adjust Google Maps API key and any other configurations as needed.
