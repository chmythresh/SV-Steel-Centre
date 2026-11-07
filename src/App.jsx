import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CRSheets from './pages/CRSheets';
import GISheets from './pages/GISheets';
import CalculatorPage from './pages/CalculatorPage';
import ProductDetails from './pages/ProductDetails';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';

// Hide Navbar/Footer on admin and login pages
const NO_NAV_ROUTES = ['/admin', '/login'];

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const location = useLocation();
  const showNav = !NO_NAV_ROUTES.some((r) => location.pathname.startsWith(r));

  return (
    <>
      <ScrollToTop />
      {showNav && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/cr-sheets" element={<CRSheets />} />
        <Route path="/products/zinc-gi-sheets" element={<GISheets />} />
        <Route path="/calculator" element={<CalculatorPage />} />
        <Route path="/products/details/:id" element={<ProductDetails />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {showNav && <Footer />}
    </>
  );
}
