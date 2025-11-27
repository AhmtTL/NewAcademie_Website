import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/button';

const workshopContent: Record<string, { title: string; sections: string[] }> = {
  'strategic-leadership': {
    title: 'Strategic Leadership & Decision-Making',
    sections: [
      'Scenario planning and uncertainty mapping',
      'Decision frameworks: OODA, RAPID, and weighted criteria',
      'Leading through ambiguity and change',
      'Stakeholder alignment and communication',
      'Action planning and execution discipline',
    ],
  },
  'ai-communication': {
    title: 'AI-Powered Communication & Innovation',
    sections: [
      'AI fundamentals for communication and creativity',
      'Prompt engineering and structured ideation',
      'Data-informed storytelling and persuasion',
      'Ethics, bias, and responsible AI use',
      'Innovation sprints and rapid prototyping',
    ],
  },
  entrepreneurship: {
    title: 'Entrepreneurship & Startup Strategy',
    sections: [
      'Customer discovery and problem validation',
      'Business model design and unit economics',
      'MVP scoping and experimentation',
      'Go-to-market planning and traction metrics',
      'Pitch practice and feedback cycles',
    ],
  },
};

const ExecutiveCertificatesWorkshop: React.FC = () => {
  const { workshop } = useParams<{ workshop: string }>();
  const data = workshop ? workshopContent[workshop] : undefined;

  if (!data) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-semibold mb-4">Workshop not found</div>
          <Button asChild>
            <Link to="/elite-workshops">Back to Executive Series</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <Button variant="outline" asChild className="mb-6 border-white text-white hover:bg-white hover:text-blue-700">
            <Link to="/elite-workshops">
              <ArrowLeft className="h-4 w-4 mr-2" /> Elite Workshop Series
            </Link>
          </Button>
          <h1 className="text-3xl md:text-5xl font-black">{data.title}</h1>
          {/* <p className="text-gray-200 mt-4 max-w-3xl">Contact us to tailor this workshop for your audience. Delivery available globally with CPDUK-accredited outcomes.</p> */}
          <p className="text-gray-200 mt-4 max-w-3xl">Contact us to tailor this workshop for your audience. Delivery available globally with professional certification.</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">What you will learn</h2>
          <div className="space-y-3">
            {data.sections.map((s, i) => (
              <div key={i} className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                <span className="text-gray-800">{s}</span>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
              <Link to="/contact">Book a discovery call</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExecutiveCertificatesWorkshop;

