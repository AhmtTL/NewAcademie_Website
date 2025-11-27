import React, { useState, useEffect } from "react";
import {
  useParams,
  useSearchParams,
  Link,
  useNavigate,
} from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  CheckCircle,
  Star,
  Shield,
  Loader2,
  Search,
  ShoppingCart,
  X,
  GraduationCap,
} from "lucide-react";
import { motion } from "framer-motion";
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
import { getAudienceBadge } from "../utils/utils";

//TrainingCampSession interface (similar to WorkshopSession)
interface TrainingCampSession {
  id: string;
  unique_identifier: string;
  session_title: string;
  program_type: "intensive" | "standard";
  location: string;
  city: string;
  country: string;
  country_code: string;
  full_location: string;
  venue_name?: string;
  organization_logo?: string;
  venue_address?: string;
  location_highlights?: string[];
  date: string;
  start_date: string;
  end_date: string;
  formatted_date: string;
  time: string;
  timezone: string;
  availableSpots: number;
  bookedSpots: number;
  price: number;
  formatted_price: string;
  price_difference?: number;
  is_premium_pricing?: boolean;
  is_discounted_pricing?: boolean;
  is_featured?: boolean;
  is_almost_sold_out?: boolean;
  is_limited_availability?: boolean;
  urgency_level?: "critical" | "high" | "normal";
  capacity_percentage?: number;
  special_notes?: string;
  metadata?: any;
}

// Training camp program data
const premierTrainingCamp = {
  id: 998,
  title: "Future CEO Training Camp",
  description:
    "An intensive leadership and entrepreneurship training program designed to develop the next generation of business leaders",
  price: 799, // Registration fee
  duration: "5 Day Intensive",
  category: "Leadership Training",
  image: "/images/future-ceo.jpeg",
  features: [
    "Harvard Business School Curriculum",
    "Professional Certificate",
    "Leadership Development",
    "Entrepreneurship Training",
    "Business Case Studies",
    "Networking Opportunities",
  ],
};

// Simple hash function to obscure numeric IDs
const hashId = (id: number): string => {
  const encoded = btoa(`t${id}`);
  return encoded.replace(/[^a-zA-Z0-9]/g, "");
};

// Create session identifier using hashed ID
const createSessionIdentifier = (session: any): string => {
  return hashId(session.id);
};

const FutureCEOProgramBooking: React.FC = () => {
  const { trainingCamp } = useParams<{ trainingCamp: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { addToCart, removeFromCart, items } = useCart();
  const [isBooking, setIsBooking] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trainingCampSessions, setTrainingCampSessions] = useState<
    TrainingCampSession[]
  >([]);
  const [trainingCampProgram, setTrainingCampProgram] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [refCodeProcessed, setRefCodeProcessed] = useState(false);
  const [useInstallmentPayment, setUseInstallmentPayment] = useState(false);

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

  // Load training camp data from API
  useEffect(() => {
    const loadTrainingCampData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Map frontend training camp slugs to backend program slugs
        const slugMapping: { [key: string]: string } = {
          "future-ceo": "future-ceo",
          "future-ceo-intensive": "future-ceo",
          "ceo-training-camp": "future-ceo",
          "leadership-camp": "future-ceo",
          "harvard-ceo": "future-ceo",
        };

        const programSlug = trainingCamp
          ? slugMapping[trainingCamp] || "future-ceo"
          : "future-ceo";

        // Get schid from URL parameters if present
        const schid = searchParams.get("schid");

        const response = await apiClient.getTrainingCampSessions(
          programSlug,
          schid || undefined
        );

        if (response.success) {
          // Transform backend data to frontend format
          const transformedSessions: TrainingCampSession[] =
            response.data.sessions.map((session: any) => {
              // Ensure metadata includes school_id and training_camp_session_id
              const metadata = {
                ...(session.metadata || {}),
                // Include school_id if it exists in session or metadata
                school_id: session.school_id || session.metadata?.school_id || null,
                // training_camp_session_id should always be the session id
                training_camp_session_id: session.id || session.metadata?.training_camp_session_id || null,
              };

              return {
                id: session.id.toString(),
                unique_identifier: createSessionIdentifier(session),
                session_title: session.session_title || session.location,
                program_type: session.program_type || "standard",
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
                metadata: metadata,
                session_type: "training_camp",
              };
            });

          setTrainingCampSessions(transformedSessions);
          setTrainingCampProgram({
            id: response.data.program.id,
            title: response.data.program.title,
            description:
              response.data.program.description ||
              premierTrainingCamp.description,
            price: parseFloat(response.data.program.price),
            duration: premierTrainingCamp.duration,
            category: premierTrainingCamp.category,
            image: premierTrainingCamp.image,
            features: premierTrainingCamp.features,
          });
        } else {
          throw new Error("Failed to load training camp data");
        }
      } catch (err) {
        console.error("Error loading training camp data:", err);
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load training camp data"
        );
      } finally {
        setLoading(false);
      }
    };

    loadTrainingCampData();
  }, [trainingCamp, searchParams]);

  const calculateDepositPlan = (session: TrainingCampSession, useInstallment: boolean = false) => {
    const totalPrice = session.price ?? trainingCampProgram?.price ?? premierTrainingCamp.price;
    if (!totalPrice || totalPrice < 9999 || !useInstallment) {
      return null;
    }

    const depositPercentage = 0.3;
    const depositAmount = Math.round(totalPrice * depositPercentage * 100) / 100;
    const balanceAmount = Math.max(Math.round((totalPrice - depositAmount) * 100) / 100, 0);

    return {
      type: "future-ceo-deposit",
      depositAmount,
      balanceAmount,
      totalAmount: totalPrice,
      balanceDueDate: session.start_date || session.date || null,
      metadata: {
        deposit_percentage: depositPercentage,
      },
    };
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);

  const programPrice =
    trainingCampProgram?.price ?? premierTrainingCamp.price;
  const programDepositPlan =
    programPrice && programPrice >= 9999 && useInstallmentPayment
      ? (() => {
          const depositAmount = Math.round(programPrice * 0.3 * 100) / 100;
          const balanceAmount = Math.max(
            Math.round((programPrice - depositAmount) * 100) / 100,
            0
          );
          return {
            depositAmount,
            balanceAmount,
            totalAmount: programPrice,
          };
        })()
      : null;

  const handleAddToCart = async (session: TrainingCampSession) => {
    if (!trainingCampProgram) return;

    setIsBooking(true);

    const paymentPlan = calculateDepositPlan(session, useInstallmentPayment);

    // Add session to cart
    addToCart(
      trainingCampProgram,
      1,
      session,
      paymentPlan
        ? {
            paymentPlan,
          }
        : undefined
    );

    // Brief delay to show loading state
    setTimeout(() => {
      setIsBooking(false);
    }, 500);
  };

  const handleRemoveFromCart = async (session: TrainingCampSession) => {
    if (!trainingCampProgram) return;

    setIsBooking(true);

    // Remove session from cart
    removeFromCart(trainingCampProgram.id, session.id);

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const startFormatted = start.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    const endFormatted = end.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    return `${startFormatted} - ${endFormatted}`;
  };

  const styleGenderText = (text: string) => {
    const parts = text.split(/\b(girls?|boys?)\b/gi);

    return parts.map((part, index) => {
      const lowerPart = part.toLowerCase();
      if (lowerPart === "girl" || lowerPart === "girls") {
        return (
          <span key={index} className="text-pink-600 font-bold">
            {part}
          </span>
        );
      } else if (lowerPart === "boy" || lowerPart === "boys") {
        return (
          <span key={index} className="text-blue-600 font-bold">
            {part}
          </span>
        );
      }
      return part;
    });
  };

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
            <Link to="/harvard-future-ceo">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Program Details
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
                Premier Training Camp
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              {trainingCampProgram?.title || premierTrainingCamp.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-3xl leading-relaxed">
              {trainingCampProgram?.description ||
                premierTrainingCamp.description}
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
                  Loading training camp sessions...
                </span>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                <h3 className="text-lg font-semibold text-red-800 mb-2">
                  Error Loading Training Camp
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
                    Choose from our upcoming training camp sessions in premium
                    locations worldwide.
                  </p>

                  {/* Payment Option Selection */}
                  {((trainingCampProgram?.price ?? premierTrainingCamp.price) >= 9999) && (
                    <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Payment Options
                      </h3>
                      <div className="space-y-3">
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="radio"
                            name="paymentOption"
                            value="full"
                            checked={!useInstallmentPayment}
                            onChange={() => setUseInstallmentPayment(false)}
                            className="mr-3 h-4 w-4 text-blue-600"
                          />
                          <div>
                            <span className="font-medium text-gray-900">
                              Pay in Full
                            </span>
                            <p className="text-sm text-gray-600">
                              Complete payment now - {formatCurrency((trainingCampProgram?.price ?? premierTrainingCamp.price))}
                            </p>
                          </div>
                        </label>
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="radio"
                            name="paymentOption"
                            value="installment"
                            checked={useInstallmentPayment}
                            onChange={() => setUseInstallmentPayment(true)}
                            className="mr-3 h-4 w-4 text-blue-600"
                          />
                          <div>
                            <span className="font-medium text-gray-900">
                              30% Deposit + Balance Later
                            </span>
                            <p className="text-sm text-gray-600">
                              Pay {formatCurrency(Math.round((trainingCampProgram?.price ?? premierTrainingCamp.price) * 0.3 * 100) / 100)} today, 
                              balance due before program starts
                            </p>
                          </div>
                        </label>
                      </div>
                    </div>
                  )}

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

                  <div className="space-y-4">
                    {trainingCampSessions
                      .filter((session) => {
                        // Search filter only
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

                        return searchMatch;
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
                                `/harvard-future-ceo-booking/${trainingCamp}/session/${
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
                            formatDate={(d: string) => formatDate(d)}
                            formatDateRange={(s: string, e: string) => formatDateRange(s, e)}
                            renderPrice={(cardSession) => {
                              const depositPlan = calculateDepositPlan(session, useInstallmentPayment);

                              if (!depositPlan) {
                                return (
                                  <div className="text-base lg:text-xl font-bold text-[#0B3162]">
                                    {cardSession.formatted_price ||
                                      (cardSession.price !== undefined
                                        ? `$${cardSession.price.toLocaleString()}`
                                        : "")}
                                  </div>
                                );
                              }

                              return (
                                <div className="text-center lg:text-right">
                                  <div className="text-sm lg:text-lg font-bold text-[#0B3162]">
                                    Pay {formatCurrency(depositPlan.depositAmount)} today
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    Balance {formatCurrency(depositPlan.balanceAmount)} due later
                                  </div>
                                </div>
                              );
                            }}
                          />
                        </motion.div>
                      ))}
                  </div>
                </motion.div>
              </div>

              {/* Training Camp Info Sidebar */}
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
                          Training Camp Details
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
                      {/* Training Camp Details */}
                      <div>
                        <img
                          src={
                            trainingCampProgram?.image ||
                            premierTrainingCamp.image
                          }
                          alt={
                            trainingCampProgram?.title ||
                            premierTrainingCamp.title
                          }
                          className="w-full h-48 object-cover rounded-lg mb-4"
                          style={{ aspectRatio: "4/3" }}
                        />
                        <h3 className="font-bold text-gray-900 mb-2">
                          {trainingCampProgram?.title ||
                            premierTrainingCamp.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                          {trainingCampProgram?.description ||
                            premierTrainingCamp.description}
                        </p>

                        {/* Features */}
                        <div className="space-y-2">
                          {(
                            trainingCampProgram?.features ||
                            premierTrainingCamp.features
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

                      {programDepositPlan && (
                        <div className="border-t pt-6 space-y-2">
                          <h4 className="text-sm sm:text-base font-semibold text-gray-900 flex items-center gap-2">
                            <Shield className="h-4 w-4 text-blue-600" />
                            Payment Plan Overview
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-600">
                            Reserve your seat with a 30% deposit and settle the remaining balance before the programme begins.
                          </p>
                          <ul className="text-xs sm:text-sm text-gray-700 space-y-1">
                            <li>
                              Deposit due today:{" "}
                              <span className="font-semibold">
                                {formatCurrency(programDepositPlan.depositAmount)}
                              </span>
                            </li>
                            <li>
                              Balance payable later:{" "}
                              <span className="font-semibold">
                                {formatCurrency(programDepositPlan.balanceAmount)}
                              </span>
                            </li>
                            <li>
                              Total programme fee:{" "}
                              <span className="font-semibold">
                                {formatCurrency(programDepositPlan.totalAmount)}
                              </span>
                            </li>
                          </ul>
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
                          Harvard Business School Curriculum
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
    </div>
  );
};

export default FutureCEOProgramBooking;
