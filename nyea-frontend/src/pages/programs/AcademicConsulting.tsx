import React from 'react';
import ProgramTemplate from '../../components/ProgramTemplate';
import programConfigs from '../../data/programConfigs';

const AcademicConsulting: React.FC = () => {
  const config = programConfigs['academic-consulting'];
  
  return <ProgramTemplate {...config} />;
};

export default AcademicConsulting; 