import React, { useState, useEffect } from "react";
import {
  useParams,
  useNavigate,
  Link,
  useSearchParams,
} from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  // Calendar,
  // MapPin,
  // Users,
  CheckCircle,
  Star,
  Shield,
  Loader2,
  Search,
  ShoppingCart,
  // X,
  // GraduationCap,
} from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useCart } from "../context/CartContext";
import SessionCard, { BaseSession } from "../components/SessionCard";
import apiClient from "../services/api";
import type { WorkshopSession } from "../types/cart";
import { getAudienceBadge } from "../utils/utils";

// Workshop program data - based on the flyer
const premierWorkshop = {
  id: 999,
  title: "Leadership, Negotiation and Communication Skills Workshop",
  description:
    "An exclusive two-day intensive leadership experience led by Harvard University Instructor Nicholas Coburn-Palo",
  price: 499, // Registration fee from flyer
  duration: "2 Day Intensive",
  category: "Leadership Training",
  image: "/images/nicholas-coburn-palo.svg",
  features: [
    "Led by Harvard University Instructor",
    // 'CPDUK Accredited Certificate',
    "Professional Certificate",
    "Harvard-style Leadership Vocabulary",
    "Real-time Case Simulations",
    "Negotiation Skills Mastery",
    "Reference Letter Opportunity",
  ],
};

// Simple hash function to obscure numeric IDs
const hashId = (id: number): string => {
  const encoded = btoa(`s${id}`);
  return encoded.replace(/[^a-zA-Z0-9]/g, "");
};

// Create session identifier using hashed ID
const createSessionIdentifier = (session: any): string => {
  return hashId(session.id);
};

const WorkshopBooking: React.FC = () => {
  const { workshop } = useParams<{ workshop: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { addToCart, removeFromCart, items } = useCart();
  const [isBooking, setIsBooking] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [workshopSessions, setWorkshopSessions] = useState<WorkshopSession[]>(
    []
  );
  const [workshopProgram, setWorkshopProgram] = useState<any>(null);
  const [selectedProgramType, setSelectedProgramType] = useState<
    "mastery" | "essentials" | "all"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [refCodeProcessed, setRefCodeProcessed] = useState(false);

  // Handle ref code - separate effect that only runs once
  useEffect(() => {
    const handleRefCode = async () => {
      const refCode = searchParams.get("ref");
      if (refCode && !refCodeProcessed) {
        try {
          await apiClient.storeRefCode(refCode);
          console.log("Ref code stored successfully:", refCode);
          setRefCodeProcessed(true);
        } catch (refError) {
          console.error("Failed to store ref code:", refError);
          // Don't block the main workflow if ref code storage fails
        }
      }
    };

    handleRefCode();
  }, [searchParams, refCodeProcessed]);

  // Load workshop data from API
  useEffect(() => {
    const loadWorkshopData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Map frontend workshop slugs to backend program slugs
        const slugMapping: { [key: string]: string } = {
          "leadership-negotiation-communication":
            "harvard-negotiation-workshop",
          "premier-workshop": "harvard-negotiation-workshop",
          "negotiation-workshop": "harvard-negotiation-workshop",
          "harvard-negotiation": "harvard-negotiation-workshop",
          "leadership-workshop": "cambridge-leadership-workshop",
          "cambridge-leadership": "cambridge-leadership-workshop",
        };

        const programSlug = workshop
          ? slugMapping[workshop] || "premier-workshop"
          : "premier-workshop";

        // Get schid from URL parameters if present
        const schid = searchParams.get("schid");

        const response = await apiClient.getWorkshopSessions(
          programSlug,
          schid || undefined
        );

        if (response.success) {
          // Transform backend data to frontend format
          const transformedSessions: WorkshopSession[] =
            response.data.sessions.map((session: any) => ({
              id: session.id.toString(),
              unique_identifier: createSessionIdentifier(session),
              session_title: session.session_title || session.location,
              program_type: session.program_type || "essentials",
              location: session.location,
              city: session.city,
              country: session.country,
              country_code: session.country_code,
              full_location: session.full_location,
              venue_name: session.venue_name,
              organization_logo: session.organization_logo,
              venue_address: session.venue_address,
              location_highlights: session.location_highlights || [],
              date: session.date,
              start_date: session.start_date,
              end_date: session.end_date,
              formatted_date: session.formatted_date,
              time: session.time,
              timezone: session.timezone,
              availableSpots: session.remaining_spots,
              bookedSpots: session.booked_spots || 0,
              price: session.effective_price,
              formatted_price: session.formatted_effective_price,
              price_difference: session.price_difference || 0,
              is_premium_pricing: session.is_premium_pricing || false,
              is_discounted_pricing: session.is_discounted_pricing || false,
              is_featured: session.is_featured || false,
              is_almost_sold_out: session.is_almost_sold_out || false,
              is_limited_availability: session.is_limited_availability || false,
              urgency_level: session.urgency_level || "normal",
              capacity_percentage: session.capacity_percentage || 0,
              special_notes: session.special_notes,
              metadata: session.metadata,
              session_type: "workshop",
            }));

          setWorkshopSessions(transformedSessions);
          setWorkshopProgram({
            id: response.data.program.id,
            title: response.data.program.title,
            description:
              response.data.program.description || premierWorkshop.description,
            price: parseFloat(response.data.program.price),
            duration: premierWorkshop.duration,
            category: premierWorkshop.category,
            image: premierWorkshop.image,
            features: premierWorkshop.features,
          });
        } else {
          throw new Error("Failed to load workshop data");
        }
      } catch (err) {
        console.error("Error loading workshop data:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load workshop data"
        );
      } finally {
        setLoading(false);
      }
    };

    loadWorkshopData();
  }, [workshop, searchParams]);

  const handleAddToCart = async (session: WorkshopSession) => {
    if (!workshopProgram) return;

    setIsBooking(true);

    // Add session to cart
    addToCart(workshopProgram, 1, session);

    // Brief delay to show loading state
    setTimeout(() => {
      setIsBooking(false);
    }, 500);
  };

  const handleRemoveFromCart = async (session: WorkshopSession) => {
    if (!workshopProgram) return;

    setIsBooking(true);

    // Remove session from cart
    removeFromCart(workshopProgram.id, session.id);

    // Brief delay to show loading state
    setTimeout(() => {
      setIsBooking(false);
    }, 500);
  };

  const isSessionInCart = (sessionId: string) => {
    return items.some((item) => item.selectedSession?.id === sessionId);
  };

  // Function to extract and format grade information
  const getGradeInfo = (locationHighlights?: string[], metadata?: any) => {
    // First try to get grade from location_highlights
    const gradeHighlight = locationHighlights?.find((highlight) =>
      highlight.includes("Grade")
    );

    if (gradeHighlight) {
      return gradeHighlight;
    }

    // Then try to get from metadata.grade_levels
    if (metadata?.grade_levels && Array.isArray(metadata.grade_levels)) {
      const grades = metadata.grade_levels;
      if (grades.length === 1) {
        return `Grade ${grades[0]}`;
      } else if (grades.length > 1) {
        return `Grades ${grades.join(", ")}`;
      }
    }

    return null;
  };

  // const formatDate = (dateString: string) => {
  //   const date = new Date(dateString);
  //   return date.toLocaleDateString("en-US", {
  //     weekday: "long",
  //     year: "numeric",
  //     month: "long",
  //     day: "numeric",
  //   });
  // };

  // const formatDateRange = (startDate: string, endDate: string) => {
  //   const start = new Date(startDate);
  //   const end = new Date(endDate);

  //   const startFormatted = start.toLocaleDateString("en-US", {
  //     month: "short",
  //     day: "numeric",
  //   });

  //   const endFormatted = end.toLocaleDateString("en-US", {
  //     month: "short",
  //     day: "numeric",
  //     year: "numeric",
  //   });

  //   return `${startFormatted} - ${endFormatted}`;
  // };

  const formatSingleDate = (dateString: string) => {
    const date = new Date(dateString);

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // const cleanTimeString = (timeString: string) => {
  //   // Remove anything in parentheses like "(2 days)"
  //   return timeString.replace(/\s*\([^)]*\)/g, "").trim();
  // };

  // const styleGenderText = (text: string) => {
  //   const parts = text.split(/\b(girls?|boys?)\b/gi);

  //   return parts.map((part, index) => {
  //     const lowerPart = part.toLowerCase();
  //     if (lowerPart === "girl" || lowerPart === "girls") {
  //       return (
  //         <span key={index} className="text-pink-600 font-bold">
  //           {part}
  //         </span>
  //       );
  //     } else if (lowerPart === "boy" || lowerPart === "boys") {
  //       return (
  //         <span key={index} className="text-blue-600 font-bold">
  //           {part}
  //         </span>
  //       );
  //     }
  //     return part;
  //   });
  // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      {/* Header */}
      <section className=" relative overflow-hidden bg-gradient-to-br from-[#1f2444] via-[#2d3d66] to-[#9f162e] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <Button
            variant="outline"
            asChild
            className="mb-6 border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900"
          >
            <Link to={`/elite-workshops/${workshop}`}>
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Workshop Details
            </Link>
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center mb-4">
              <Star className="h-6 w-6 text-yellow-400 mr-2" />
              <span className="text-yellow-400 font-semibold">
                Premier Workshop
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              {workshopProgram?.title || premierWorkshop.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-3xl leading-relaxed">
              {workshopProgram?.description || premierWorkshop.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <div className="flex items-center space-x-4">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                <span className="text-lg text-gray-600">
                  Loading workshop sessions...
                </span>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                <h3 className="text-lg font-semibold text-red-800 mb-2">
                  Error Loading Workshop
                </h3>
                <p className="text-red-600 mb-4">{error}</p>
                <Button
                  onClick={() => window.location.reload()}
                  variant="outline"
                  className="border-red-300 text-red-700 hover:bg-red-50"
                >
                  Try Again
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Session Selection */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                    Select Your Session
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                    Choose from our upcoming workshop sessions in premium
                    locations worldwide.
                  </p>

                  {/* Search Bar */}
                  <div className="mb-6">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search by location, venue, or country..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      />
                    </div>
                  </div>

                  {/* Program Type Filter - Improved Mobile */}
                  <div className="mb-8">
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                      <button
                        onClick={() => setSelectedProgramType("all")}
                        className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-all text-sm sm:text-base ${
                          selectedProgramType === "all"
                            ? "bg-[#1f2444] text-white shadow-lg"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        All Sessions ({workshopSessions.length})
                      </button>
                      <button
                        onClick={() => setSelectedProgramType("essentials")}
                        className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-all flex items-center justify-center text-sm sm:text-base ${
                          selectedProgramType === "essentials"
                            ? "bg-blue-600 text-white shadow-lg"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        <span className="sm:hidden">
                          ⚡ Essentials (
                          {
                            workshopSessions.filter(
                              (s) => s.program_type === "essentials"
                            ).length
                          }
                          )
                        </span>
                        <span className="hidden sm:inline">
                          ⚡ Essentials (
                          {
                            workshopSessions.filter(
                              (s) => s.program_type === "essentials"
                            ).length
                          }
                          )
                        </span>
                      </button>
                      <button
                        onClick={() => setSelectedProgramType("mastery")}
                        className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-all flex items-center justify-center text-sm sm:text-base ${
                          selectedProgramType === "mastery"
                            ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        <span className="sm:hidden">
                          👑 Mastery (
                          {
                            workshopSessions.filter(
                              (s) => s.program_type === "mastery"
                            ).length
                          }
                          )
                        </span>
                        <span className="hidden sm:inline">
                          👑 Mastery (
                          {
                            workshopSessions.filter(
                              (s) => s.program_type === "mastery"
                            ).length
                          }
                          )
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {workshopSessions
                      .filter((session) => {
                        // Program type filter
                        const programTypeMatch =
                          selectedProgramType === "all" ||
                          session.program_type === selectedProgramType;

                        // Search filter
                        const searchMatch =
                          searchQuery === "" ||
                          session.location
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()) ||
                          session.venue_name
                            ?.toLowerCase()
                            .includes(searchQuery.toLowerCase()) ||
                          session.country
                            ?.toLowerCase()
                            .includes(searchQuery.toLowerCase()) ||
                          session.city
                            ?.toLowerCase()
                            .includes(searchQuery.toLowerCase());

                        return programTypeMatch && searchMatch;
                      })
                      .sort((a, b) => {
                        // Put "Al Faris International Schools" first
                        if (
                          a.location.includes(
                            "Al Faris International School"
                          ) &&
                          !b.location.includes("Al Faris International School")
                        )
                          return -1;
                        if (
                          !a.location.includes(
                            "Al Faris International School"
                          ) &&
                          b.location.includes("Al Faris International School")
                        )
                          return 1;
                        return 0;
                      })
                      .map((session, index) => (
                        <motion.div
                          key={session.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                          <SessionCard
                            session={session as unknown as BaseSession}
                            onCardClick={() => {
                              navigate(
                                `/workshop-booking/${workshop}/session/${
                                  session.unique_identifier || session.id
                                }`
                              );
                            }}
                            onAddToCart={() => handleAddToCart(session)}
                            onRemoveFromCart={() => handleRemoveFromCart(session)}
                            isInCart={isSessionInCart(session.id)}
                            isBooking={isBooking}
                            getBadge={(highlights?: string[]) =>
                              getAudienceBadge(highlights || [])}
                            getGradeInfo={(highlights?: string[], metadata?: any) =>
                              getGradeInfo(highlights, metadata)}
                            formatDate={(d: string) => formatSingleDate(d)}
                            formatDateRange={(s: string, e: string) => `${formatSingleDate(s)} - ${formatSingleDate(e)}`}
                          />
                        </motion.div>
                      ))}
                  </div>
                </motion.div>
              </div>

              {/* Workshop Info Sidebar */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="lg:sticky lg:top-6"
                >
                  <Card className="shadow-lg lg:shadow-xl border-0 bg-white">
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center justify-between text-lg">
                        <div className="flex items-center">
                          <Shield className="h-5 w-5 mr-2 text-blue-600" />
                          Workshop Details
                        </div>
                        {items.length > 0 && (
                          <Link
                            to="/cart"
                            className="bg-blue-100 text-blue-800 text-xs px-3 py-1.5 rounded-full font-semibold hover:bg-blue-200 transition-colors"
                          >
                            {items.length} in cart
                          </Link>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Workshop Details */}
                      <div>
                        <img
                          src={workshopProgram?.image || premierWorkshop.image}
                          alt={workshopProgram?.title || premierWorkshop.title}
                          className="w-full h-32 object-cover rounded-lg mb-4"
                          style={{ aspectRatio: "4/3" }}
                        />
                        <h3 className="font-bold text-gray-900 mb-2">
                          {workshopProgram?.title || premierWorkshop.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                          {workshopProgram?.description ||
                            premierWorkshop.description}
                        </p>

                        {/* Features */}
                        <div className="space-y-2">
                          {(
                            workshopProgram?.features ||
                            premierWorkshop.features
                          )
                            .slice(0, 4)
                            .map((feature: string, index: number) => (
                              <div
                                key={index}
                                className="flex items-center text-sm text-gray-700"
                              >
                                <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                                {feature}
                              </div>
                            ))}
                        </div>
                      </div>

                      {/* Cart CTA */}
                      {items.length > 0 && (
                        <div className="border-t pt-6">
                          <Link to="/cart">
                            <Button className="w-full bg-gradient-to-r from-[#1f2444] to-[#9f162e] hover:from-[#9f162e] hover:to-[#1f2444] text-white font-bold py-3 shadow-lg">
                              <ShoppingCart className="h-4 w-4 mr-2" />
                              View Cart ({items.length})
                            </Button>
                          </Link>
                        </div>
                      )}

                      {/* Trust Indicators */}
                      <div className="border-t pt-6 space-y-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <Shield className="h-4 w-4 mr-2 text-green-600" />
                          Professional Certificate
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Star className="h-4 w-4 mr-2 text-yellow-500" />
                          Harvard University Instructor
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 mr-2 text-blue-600" />
                          Certificate Included
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </section>
      {/* Program Types Explanation */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Information about the Program Format
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer two program formats to suit different learning
              preferences and schedules
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Essentials Program */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
            >
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white text-xs px-3 py-1 rounded-full font-bold">
                  ⚡ ESSENTIALS
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                2-Day Intensive Program
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Focused on core negotiation and leadership skills in an
                intensive format. Perfect for busy professionals.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />3 days
                  of intensive training
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  Core methodologies and techniques
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  Certificate of completion
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  Networking opportunities
                </li>
              </ul>
            </motion.div>

            {/* Mastery Program */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200 shadow-sm relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-400/10 to-orange-400/10 rounded-full -mr-10 -mt-10"></div>
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs px-3 py-1 rounded-full font-bold">
                  👑 MASTERY
                </div>
                <span className="ml-2 text-xs text-amber-700 font-semibold">
                  PREMIUM
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                7-Day Extended Experience
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Comprehensive program with personalized coaching, exclusive
                networking, and advanced methodologies.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  Up to 7 days of comprehensive training
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  Personal coaching sessions
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  Exclusive networking dinner with workshop lecturers
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  Reference letter opportunity
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  Premium access
                </li>
              </ul>
              {/* <div className="mt-4 text-xs text-amber-700 font-medium">
                * 150% higher investment for premium experience
              </div> */}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WorkshopBooking;
