import React from 'react';
import futureCEOConfigs from '../data/futureCEOConfigs';
import Hero from '../components/futureceo/Hero';
import Introduction from '../components/futureceo/Introduction';
import ProgramHighlights from '../components/futureceo/ProgramHighlights';
import Instructors from '../components/futureceo/Instructors';
import WhyJoin from '../components/futureceo/WhyJoin';
import TrainingBenefits from '../components/futureceo/TrainingBenefits';
import Itinerary from '../components/futureceo/Itinerary';
import CTA from '../components/futureceo/CTA';

interface FutureCEOProgramProps {
  university?: string;
}

const FutureCEOProgram: React.FC<FutureCEOProgramProps> = ({ university = 'harvard' }) => {
  const config = futureCEOConfigs[university];

  if (!config) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Program Not Found</h1>
          <p className="text-gray-600 mb-6">The program you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <Hero config={config} />

      {/* Introduction Section - What is the program */}
      <Introduction config={config} />

      {/* Program Highlights Section */}
      <ProgramHighlights config={config} />

      {/* Instructors Section - Nick and team */}
      <Instructors config={config} />

      {/* Why Join Section - Reasons to participate */}
      <WhyJoin config={config} />

      {/* Training Benefits Section */}
      <TrainingBenefits config={config} />

      {/* Itinerary Section */}
      <Itinerary config={config} />

      {/* Final CTA Section */}
      <CTA config={config} />
    </div>
  );
};

export default FutureCEOProgram;