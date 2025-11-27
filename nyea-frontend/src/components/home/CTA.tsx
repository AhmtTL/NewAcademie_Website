import { motion } from "framer-motion"
import { Button } from "../ui/button"
import { Link } from "react-router-dom"

const CTA: React.FC = () => {
  return (
    <section className="py-12 md:py-20 lg:py-24 relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/images/graduation-cap.webp"
          alt="Elite university campus"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1f2444]/90 to-[#9f162e]/90 "></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-sm md:text-lg lg:text-xl mb-12 max-w-full md:max-w-3xl mx-auto leading-relaxed opacity-90">
            Join thousands of students who have transformed their futures with NY Empire Academy.
            Your extraordinary journey begins here.
          </p>
          <div className="max-w-full mx-auto flex gap-4 md:gap-6 justify-center">
            <Button size="sm" variant="primary" className="shadow-2xl">
              <Link to="/signup">
                Start Your Journey
              </Link>
            </Button>
            <Button size="sm" variant="secondary_brand" className="shadow-2xl">
              <Link to="/contact">
                Get In Touch
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CTA