import React from 'react';
import { Route } from 'react-router-dom';
import ProgramTemplate from '../components/ProgramTemplate';
import programConfigs from './programConfigs';

// Example component for each program
const AcademicConsulting = () => <ProgramTemplate {...programConfigs['academic-consulting']} />;
const CareerConsulting = () => <ProgramTemplate {...programConfigs['career-consulting']} />;
const Mentorship = () => <ProgramTemplate {...programConfigs['mentorship']} />;
const CambridgeTraining = () => <ProgramTemplate {...programConfigs['cambridge-training']} />;

// You would add these routes to your main App.tsx routing:
export const programRoutes = [
  <Route path="/programs/academic-consulting" element={<AcademicConsulting />} />,
  <Route path="/programs/career-consulting" element={<CareerConsulting />} />,
  <Route path="/programs/mentorship" element={<Mentorship />} />,
  <Route path="/programs/cambridge-training" element={<CambridgeTraining />} />,
  
  // Additional routes for remaining programs:
  // <Route path="/programs/summer-schools" element={<SummerSchools />} />,
  // <Route path="/programs/sat-act-camps" element={<SATACTCamps />} />,
  // <Route path="/programs/project-olympiads" element={<ProjectOlympiads />} />,
  // <Route path="/programs/experiential-learning" element={<ExperientialLearning />} />,
  // <Route path="/programs/model-un" element={<ModelUN />} />,
  // <Route path="/programs/pre-college" element={<PreCollege />} />,
];

// Usage in App.tsx:
// import { programRoutes } from './data/programRoutes';
// 
// function App() {
//   return (
//     <Routes>
//       {/* Your existing routes */}
//       {programRoutes}
//     </Routes>
//   );
// } 