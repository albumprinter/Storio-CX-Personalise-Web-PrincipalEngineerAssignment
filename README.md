# Storio - Personalise - Web - Principal Engineer Assignment

This repo contains an example project of a image manipulation web application. This project will be used to test your refactoring skills. However, the project is not well-structured, and the code is not very readable. Your task is to refactor the code to make it more readable and maintainable. Things to consider:

- Application architecture
- Code readability
- Testing

This application makes use of TypeScript, ReactJS, Redux and Redux Saga.

## Features

### Image Manipulation
- Upload and display images
- Rotate images
- Apply filters like sepia and black-and-white

### Undo/Redo Functionality
- Track editing history with Redux state
- Undo/Redo buttons in the UI
- Keyboard shortcuts:
  - Undo: Ctrl+Z (Windows/Linux) or Cmd+Z (Mac)
  - Redo: Ctrl+Shift+Z or Ctrl+Y (Windows/Linux) or Cmd+Shift+Z or Cmd+Y (Mac)
- History state is cleared when a new image is uploaded

## Running this project

### Prerequisites
- Node.js (v16 or higher)
- Yarn package manager

### Installation
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/Storio-CX-Personalise-Web-PrincipalEngineerAssignment.git
   cd Storio-CX-Personalise-Web-PrincipalEngineerAssignment
   ```

2. Install dependencies:
   ```
   cd photo-editor
   yarn install
   ```

### Development
To run the application in development mode:
```
yarn start
```
This will launch the application on [http://localhost:3000](http://localhost:3000) in your default browser.

### Testing
To run the test suite:
```
yarn test
```

### Production Build
To create a production build:
```
yarn build
```
The build artifacts will be stored in the `build/` directory.

## Architecture Overview

### Core Technologies
- **TypeScript** - Static type checking
- **React** - UI library
- **Redux** - State management
- **Redux-Saga** - Side effect management
- **Reselect** - Memoized selectors

### Project Structure
- `/src/components` - React components
- `/src/hooks` - Custom React hooks
- `/src/store` - Redux store configuration
  - `/store/photo` - Photo state management
  - `/store/history` - Undo/Redo functionality
- `/src/tests` - Test files

### State Management
The application uses Redux with a modular structure:
- Photo state handles the image and its properties (rotation, filters, etc.)
- History state tracks changes for undo/redo functionality

## Implementation Details

### Image Processing
The application uses the HTML Canvas API for image rendering and manipulation. Images are processed directly in the browser with various transformations applied:
- Rotation using canvas transformations
- Filters using canvas composition techniques
- Pan and zoom functionality

### History Management
The application implements a custom history tracking mechanism that:
- Captures state changes in the photo reducer
- Stores previous states for undo operations
- Stores reverted states for redo operations
- Provides a clean API for history navigation

### Local Storage Integration
The application persists the current photo state in the browser's local storage, allowing users to continue editing after page refresh.