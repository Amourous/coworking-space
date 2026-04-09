import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import AIChatWidget from '../ai/AIChatWidget';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex flex-col relative w-full overflow-x-hidden">
         <Outlet />
      </main>
      <Footer />
      <AIChatWidget />
    </div>
  );
}
