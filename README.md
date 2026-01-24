# Our_Space

Our_Space is a full-stack web application designed to help couples track, share, and celebrate their journey together. It features analytics, mood tracking, love notes, a memory box, and more, all in a modern, user-friendly interface.

## Features

- **Authentication**: Secure login and registration for couples
- **Analytics**: Track relationship, alcohol, and cigarette analytics
- **Mood Tracking**: Log and visualize moods over time
- **Love Notes**: Send and receive love notes
- **Memory Box**: Store and revisit shared memories
- **Bucket List**: Create and manage shared goals
- **Healing Zone**: Tools and resources for relationship growth
- **Timeline**: Visualize your journey together
- **Responsive UI**: Modern design with Tailwind CSS and Vite

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express, MongoDB
- **State Management**: React Context API
- **API Communication**: Axios

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- MongoDB (local or cloud)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/our_space.git
   cd Ourspace
   ```

2. **Install dependencies:**
   - For the client:
     ```bash
     cd client
     npm install
     ```
   - For the server:
     ```bash
     cd ../server
     npm install
     ```

3. **Set up environment variables:**
   - Create a `.env` file in the `server` directory with your MongoDB URI and any other secrets.

4. **Run the application:**
   - Start the backend:
     ```bash
     npm start
     ```
   - Start the frontend (in a new terminal):
     ```bash
     cd ../client
     npm run dev
     ```

5. **Open in browser:**
   - Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal)

## Project Structure

```
Ourspace/
  client/      # Frontend React app
  server/      # Backend Node.js/Express API
```

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE)
