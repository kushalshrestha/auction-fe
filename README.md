# Secure Online Auction System

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [Available Scripts](#available-scripts)

### Project Structure

* `src/`: This is where your React application code lives.
* `public/`: Static assets like HTML files and images go here.
* `dist/`: The production build output directory.

### Getting Started

Make sure you are using:

To get started with this project, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/kushalshrestha/auction-fe.git
   cd auction-fe
   ```
2. **Install Dependencies:**
    ```
    npm install
    ```
3. **Start Development Server:**
    ```
    npm run dev
    ```
    This will start a local development server, and you can access your app at:
    
    ➜  Local:  http://localhost:5173/
    ➜  Network: http://172.17.144.92:5173/

4. **Build for production**
    ```
    npm run build
    ```
    This will create a production-ready build of your app in the `dist` folder.

### Contributing
1. Fork the project.
2. Create your feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

### Available Scripts
In the project directory, you can run the following scripts:

`npm run dev`: Start the development server.
`npm run build`: Build the project for production.
`npm run lint`: Check your code for linting errors.
`npm run preview`: Serve the production build locally.
`npm run format`: Format your code using Prettier.