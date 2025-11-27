import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Download } from 'lucide-react';

const FAQ: React.FC = () => {
  const [openQuestion, setOpenQuestion] = useState<number>(0); // First question open by default

  const faqData = [
    {
      question: "What NASA Training Program?",
      answer: "NASA training program is unique limited stem field related workshop runs by NASA itself."
    },
    {
      question: "Am I going to receive a certificate at the end of the program?",
      answer: "Am I going to receive a certificate at the end of the program?"
    },
    {
      question: "How long is the program?",
      answer: "How long is the program?"
    },
    {
      question: "Who can attend the program?",
      answer: "Who can attend the program?"
    },
    {
      question: "Who can attend the program?",
      answer: "Who can attend the program?"
    }
  ];

  const toggleQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? -1 : index);
  };

  return (
    <div className="py-16 md:py-20 lg:py-24 bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#01003A] mb-6 leading-tight">
            Frequently Asked Question
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Explore quick answers about our programs, benefits, pricing, and activities - everything<br />
            you need to start your cosmic journey with confidence.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="bg-[#FFFFFF] rounded-2xl overflow-hidden shadow-sm">
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`border-b border-[#0000001A] ${index === faqData.length - 1 ? 'border-b-0' : ''} ${openQuestion === index ? 'bg-[#00000005]' : ''}`}
            >
              {/* Question */}
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full px-6 md:px-8 py-6 md:py-8 text-left flex items-center justify-between hover:bg-[#00000005] transition-colors duration-200"
              >
                <h3 className="text-lg md:text-xl font-medium text-[#111111] pr-4">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0 w-8 h-8 border border-[#0000001A] rounded-full flex items-center justify-center">
                  {openQuestion === index ? (
                    <Minus className="h-4 w-4 text-[#000000]" />
                  ) : (
                    <Plus className="h-4 w-4 text-[#000000]" />
                  )}
                </div>
              </button>

              {/* Answer */}
              <AnimatePresence>
                {openQuestion === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 md:px-8 pb-6 md:pb-8">
                      <p className="text-[#000000B2] leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Download Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button 
            onClick={() => {
              // Create a temporary link to download brochure
              const link = document.createElement('a');
              link.href = '/documents/nasa-program-brochure.pdf'; // You can add the actual PDF to public/documents/
              link.download = 'nasa-program-brochure.pdf';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            className="inline-flex items-center px-8 py-4 border-2 border-[#000000] text-[#000000] font-bold text-sm md:text-base rounded-xl hover:bg-[#000000] hover:text-white transition-all duration-300"
          >
            <Download className="mr-3 h-5 w-5" />
            DOWNLOAD OUR PROGRAM BROCHURE
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;