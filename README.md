# Woyage AI Product Search

A modern product search and filtering application built with Next.js and TypeScript. Browse and filter products from multiple data sources with an intuitive interface.

## Features

- **Product Search**: Search products by title and description
- **Category Filtering**: Filter products by category
- **Price Range Filtering**: Filter products by price range
- **Rating Filtering**: Filter products by minimum rating
- **Multiple Data Sources**: Switch between DummyJSON and Fake Store API
- **Modern UI**: Clean and responsive design

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18.0 or higher)
- **npm** (version 9.0 or higher) - comes with Node.js

You can check your versions by running:

```bash
node --version
npm --version
```

## Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd Woyage_AI_Product_Search
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

   This will install all required packages including:

   - Next.js 15.0.3
   - React 18.3.1
   - TypeScript 5.9.3
   - And other dependencies

## Running Locally

### Development Mode

To start the development server:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

Open your browser and navigate to that URL. The page will automatically reload when you make changes to the code.

### Production Build

To create an optimized production build:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

The production server will also be available at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
Woyage_AI_Product_Search/
├── components/          # React components
│   ├── Filters.tsx      # Filter controls component
│   ├── ProductCard.tsx  # Individual product card component
│   ├── ProductGrid.tsx  # Product grid layout component
│   └── SearchBar.tsx    # Search input component
├── lib/                 # Utility functions
│   └── api.ts           # API functions for fetching products
├── pages/               # Next.js pages
│   ├── _app.tsx         # App wrapper component
│   └── index.tsx        # Main homepage
├── styles/              # Global styles
│   └── globals.css      # Global CSS styles
├── next.config.js       # Next.js configuration
├── package.json         # Project dependencies and scripts
└── tsconfig.json        # TypeScript configuration
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm start` - Start the production server
- `npm run lint` - Run linting (currently not configured)

## Data Sources

The application supports two data sources:

1. **DummyJSON** - Default data source with a wide variety of products
2. **Fake Store API** - Alternative data source with e-commerce products

You can switch between data sources using the dropdown in the application header.

## Troubleshooting

### Port Already in Use

If port 3000 is already in use, Next.js will automatically try the next available port (3001, 3002, etc.). You can also specify a custom port:

```bash
PORT=3001 npm run dev
```

### Installation Issues

If you encounter issues during installation:

1. Clear npm cache:

   ```bash
   npm cache clean --force
   ```

2. Delete `node_modules` and `package-lock.json`:

   ```bash
   rm -rf node_modules package-lock.json
   ```

3. Reinstall dependencies:
   ```bash
   npm install
   ```

### Build Errors

If you encounter TypeScript errors during build, ensure all dependencies are properly installed:

```bash
npm install
npm run build
```

## Technologies Used

- **Next.js 15** - React framework for production
- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **CSS** - Styling

## License

This project is private.
