# NaveenBroTask_1_1

A modern React application built with TypeScript, Vite, and Tailwind CSS, featuring Supabase integration for authentication and data management.

## 🚀 Features

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Supabase** integration for backend services
- **React Router** for navigation
- **Lucide React** for icons
- Responsive design
- Modern component architecture

## 📦 Tech Stack

- React 18.3.1
- TypeScript 5.5.3
- Vite 5.4.2
- Tailwind CSS 3.4.1
- Supabase 2.57.4
- React Router DOM 7.9.3
- Lucide React 0.344.0

## 🛠️ Development

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/sailendrakondapalli/NaveenBroTask_1_1.git
cd NaveenBroTask_1_1
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Add your Supabase credentials to .env
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## 🚀 Deployment on Render

This project is configured for easy deployment on Render.com:

### Automatic Deployment

1. Fork this repository or push to your GitHub repository
2. Connect your GitHub account to Render
3. Create a new Static Site on Render
4. Connect your repository
5. Render will automatically detect the build settings from `render.yaml`

### Manual Configuration

If you prefer manual setup:

1. **Build Command**: `npm install && npm run build`
2. **Publish Directory**: `dist`
3. **Environment**: Static Site

### Environment Variables

Make sure to set up the following environment variables in Render:

- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous key

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── AdminDashboard.tsx
│   ├── AuthCallback.tsx
│   ├── CategoryPage.tsx
│   ├── ComponentsLibrary.tsx
│   ├── ContactForm.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── PricingSection.tsx
│   ├── Sidebar.tsx
│   └── YouTubeSection.tsx
├── hooks/              # Custom React hooks
│   └── useAuth.ts
├── lib/                # Utility libraries
│   └── supabase.ts
├── App.tsx             # Main App component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## 🗄️ Database

The project uses Supabase for backend services. Database migrations are located in:

```
supabase/migrations/
├── 20250927040830_red_lodge.sql
├── 20250928033114_autumn_waterfall.sql
└── 20251011082310_patient_field.sql
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🔗 Links

- **Live Demo**: [Deploy on Render](https://render.com)
- **Repository**: [GitHub](https://github.com/sailendrakondapalli/NaveenBroTask_1_1.git)

---

Built with ❤️ using React, TypeScript, and Vite