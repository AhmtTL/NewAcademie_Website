import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AnnouncementBar from './components/AnnouncementBar';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import ProgramDetail from './pages/ProgramDetail';
import TeacherDevelopment from './pages/TeacherDevelopment';
import NASAPrograms from './pages/NASAPrograms';
import Contact from './pages/Contact';
import Cart from './pages/dashboard/Cart';
import Success from './pages/dashboard/Success';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/dashboard/Dashboard';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import ErrorBoundary from './components/ui/ErrorBoundary';
import ScrollToTop from './components/ui/ScrollToTop';
import ProtectedRoute from './components/ui/ProtectedRoute';
// Import Program Templates
// import ProgramTemplate from './components/ProgramTemplate';
// import programConfigs from './data/programConfigs';
import ExecutiveCertificates from './pages/ExecutiveCertificates';
// import ExecutiveCertificatesWorkshop from './pages/ExecutiveCertificatesWorkshop';
import WorkshopDetail from './pages/WorkshopDetail';
import WorkshopBooking from './pages/WorkshopBooking';
import WorkshopSessionDetail from './pages/WorkshopSessionDetail';
import CambridgeExcellence from './pages/CambridgeExcellence';
import PremiumMentorship from './pages/programs/PremiumMentorship';
import AcademicExcellence from './pages/programs/AcademicExcellence';
import CareerDevelopment from './pages/programs/CareerDevelopment';
import FutureCEOProgram from './pages/FutureCEOProgram';
import Home2 from './pages/Home2';
import FutureCEOProgramBooking from './pages/FutureCEOProgramBooking';
import TrainingCampSessionDetail from './pages/TrainingCampSessionDetail';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <CartProvider>
          <Router>
            <ScrollToTop />
            <div className="min-h-screen bg-gray-50">
              <AnnouncementBar />
              <Header />
              <main>
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/home2" element={<Home2 />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/programs" element={<Programs />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/signup" element={<SignUp />} />
                  
                  {/* Program Template Routes - These must come before the generic route */}
                  <Route path="/programs/academic-consulting" element={<AcademicExcellence />} />
                  <Route path="/programs/career-consulting" element={<CareerDevelopment />} />
                  <Route path="/programs/mentorship" element={<PremiumMentorship />} />
                  {/* Cambridge Excellence Program */}
                  <Route path="/programs/cambridge-training" element={<CambridgeExcellence />} />
                  <Route path="/cambridge-excellence" element={<CambridgeExcellence />} />
                  
                  {/* Elite Workshop Series routes */}
                  <Route path="/elite-workshops" element={<ExecutiveCertificates />} />
                  <Route path="/elite-workshops/:workshop" element={<WorkshopDetail />} />
                  <Route path="/workshop-booking/:workshop" element={<WorkshopBooking />} />
                  <Route path="/workshop-booking/:workshop/session/:sessionId" element={<WorkshopSessionDetail />} />
                  
                  {/* Generic fallback for other programs - Must come AFTER specific routes */}
                  <Route path="/programs/:id" element={<ProgramDetail />} />
                  
                  {/* Existing specific program routes */}
                  <Route path="/teacher-development" element={<TeacherDevelopment />} />
                  <Route path="/nasa-programs" element={<NASAPrograms />} />
                  
                  {/* Future CEO Training Program */}
                  <Route path="/harvard-future-ceo" element={<FutureCEOProgram university="harvard" />} />
                  <Route path="/harvard-future-ceo-booking/:training-camp" element={<FutureCEOProgramBooking />} />
                  <Route path="/harvard-future-ceo-booking/:training-camp/session/:sessionId" element={<TrainingCampSessionDetail />} />

                  {/* Cart Routes */}
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/success" element={<Success />} />
                  
                  {/* Protected routes - require authentication */}
                  <Route 
                    path="/dashboard" 
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    } 
                  />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </CartProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App; 