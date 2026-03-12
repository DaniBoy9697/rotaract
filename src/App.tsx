import React, { useState } from 'react';
import { Toaster } from 'sonner';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Users, Award, Calendar, FileText, Shield, Mail, Home, Trophy } from 'lucide-react';
import { Button } from './components/ui/button';
import { Separator } from './components/ui/separator';

import Welcome from './components/Welcome';
import Clubs from './components/Clubs';
import Ranking from './components/Ranking';
import Awards from './components/Awards';
import WorldWeek from './components/WorldWeek';
import Posts from './components/Posts';
import Privacy from './components/Privacy';
import Contact from './components/Contact';
import Admin from './components/Admin';

const navigationItems = [
  { id: 'welcome', label: 'Bienvenida', icon: Home },
  { id: 'clubs', label: 'Directorio de Clubes', icon: Users },
  { id: 'ranking', label: 'Engrane Challenge', icon: Trophy },
  { id: 'awards', label: 'Premios y Galardones', icon: Award },
  { id: 'worldweek', label: 'Semana Mundial Rotaract', icon: Calendar },
  { id: 'posts', label: 'Últimos Posts', icon: FileText },
  { id: 'privacy', label: 'Aviso de Privacidad', icon: Shield },
  { id: 'contact', label: 'Contacto', icon: Mail },
];

function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const path = location.pathname.replace(/^\/+/, '') || 'welcome';
  const currentPage = path === '' ? 'welcome' : path;

  const setCurrentPage = (id: string) => {
    navigate(id === 'welcome' ? '/' : `/${id}`);
    setMobileMenuOpen(false);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
    case 'welcome':
      return <Welcome onNavigate={setCurrentPage} />;
    case 'clubs':
      return <Clubs />;
    case 'ranking':
      return <Ranking />;
    case 'awards':
      return <Awards />;
    case 'worldweek':
      return <WorldWeek />;
    case 'posts':
      return <Posts />;
    case 'privacy':
      return <Privacy />;
    case 'contact':
      return <Contact />;
    default:
      return <Welcome onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-4" style={{ borderColor: 'var(--rotaract-pink)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <img
              src="/img/rota-logo.png"
              alt="Rotaract Logo"
              className="h-10 w-auto px-2"
            />

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={currentPage === item.id ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setCurrentPage(item.id)}
                    className={`flex items-center space-x-2 ${currentPage === item.id
                      ? 'text-white hover:opacity-90'
                      : 'text-gray-700 hover:text-[#E91E63]'
                      }`}
                    style={currentPage === item.id ? { backgroundColor: 'var(--rotaract-pink)' } : {}}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden xl:inline">{item.label}</span>
                  </Button>
                );
              })}
            </nav>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={currentPage === item.id ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => {
                      setCurrentPage(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full justify-start ${currentPage === item.id
                      ? 'text-white'
                      : 'text-gray-700'
                      }`}
                    style={currentPage === item.id ? { backgroundColor: 'var(--rotaract-pink)' } : {}}
                  >
                    <Icon className="w-4 h-4 mr-3" />
                    {item.label}
                  </Button>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {renderCurrentPage()}
      </main>

      <Toaster position="bottom-right" richColors closeButton />

      {/* Footer */}
      <footer className="text-white mt-12" style={{ backgroundColor: 'var(--rotaract-pink-dark)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src="/img/rota-logo.png"
                  alt="Rotaract Logo"
                  className="h-8 w-auto brightness-0 invert"
                />
              </div>
              <p className="text-pink-100">
                Una organización internacional de jóvenes profesionales y universitarios
                comprometidos con el servicio comunitario y el desarrollo del liderazgo.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Enlaces Rápidos</h4>
              <ul className="space-y-2 text-pink-100">
                <li>
                  <button
                    onClick={() => setCurrentPage('clubs')}
                    className="hover:text-white transition-colors"
                  >
                    Directorio de Clubes
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setCurrentPage('ranking')}
                    className="hover:text-white transition-colors"
                  >
                    Ranking de Clubes
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setCurrentPage('awards')}
                    className="hover:text-white transition-colors"
                  >
                    Premios y Reconocimientos
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setCurrentPage('contact')}
                    className="hover:text-white transition-colors"
                  >
                    Contacto
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Información</h4>
              <ul className="space-y-2 text-pink-100">
                <li>Fundado en 1968</li>
                <li>Más de 250,000 Rotaractianos</li>
                <li>Presente en más de 180 países</li>
              </ul>
            </div>
          </div>
          <Separator className="my-6 bg-pink-800" />
          <div className="text-center text-pink-100">
            <p>&copy; 2025 Rotaract 4185. Hecho con el corazon por Dani N.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<AppLayout />} />
      </Routes>
      <Toaster position="bottom-right" richColors closeButton />
    </>
  );
}