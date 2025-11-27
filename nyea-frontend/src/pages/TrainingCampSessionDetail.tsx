import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  CheckCircle,
  Shield,
  Star,
  Loader2,
  ShoppingCart,
  X,
  GraduationCap,
  Share2,
  Check,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { useCart } from "../context/CartContext";
import apiClient from "../services/api";
import type { TrainingCampSession } from "../types/cart";
import { getAudienceBadge } from "../utils/utils";

const premierTrainingCamp = {
  id: 998,
  title: "Future CEO Training Camp",
  description:
    "An intensive leadership and entrepreneurship training program designed to develop the next generation of business leaders",
  price: 799,
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

// Simple hash function to obscure numeric IDs (must match FutureCEOProgramBooking)
const hashId = (id: number): string => {
  const encoded = btoa(`t${id}`);
  return encoded.replace(/[^a-zA-Z0-9]/g, "");
};

// Decode hash back to ID
const decodeHash = (hash: string): number | null => {
  try {
    const decoded = atob(hash);
    if (decoded.startsWith("t")) {
      const id = parseInt(decoded.substring(1), 10);
      if (!isNaN(id)) {
        return id;
      }
    }
  } catch (e) {
    // Decoding failed
  }
  return null;
};

// Create session identifier using hashed ID
const createSessionIdentifier = (session: any): string => {
  return hashId(session.id);
};

const TrainingCampSessionDetail: React.FC = () => {
  const { trainingCamp, sessionId } = useParams<{
    trainingCamp: string;
    sessionId: string;
  }>();
  const navigate = useNavigate();
  const { addToCart, removeFromCart, items } = useCart();
  const [isBooking, setIsBooking] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [session, setSession] = useState<TrainingCampSession | null>(null);
  const [trainingCampProgram, setTrainingCampProgram] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [useInstallmentPayment, setUseInstallmentPayment] = useState(false);

  useEffect(() => {
    const loadSessionData = async () => {
      try {
        setLoading(true);
        setError(null);

        // First, decode the hash to get the actual session ID
        const decodedId = decodeHash(sessionId || "");
        const actualSessionId = decodedId || parseInt(sessionId || "0", 10);

        if (!actualSessionId || isNaN(actualSessionId)) {
          throw new Error("Invalid session identifier");
        }

        // Use the dedicated single session endpoint
        const response = await apiClient.getTrainingCampSession(
          actualSessionId
        );

        if (response.success && response.data) {
          const sessionData = response.data;

          // Calculate capacity percentage if not provided
          const totalSpots =
            (sessionData.booked_spots || 0) + sessionData.remaining_spots;
          const bookedSpots = sessionData.booked_spots || 0;
          const capacityPercentage =
            sessionData.capacity_percentage ||
            (totalSpots > 0 ? (bookedSpots / totalSpots) * 100 : 0);

          // Calculate urgency level if not provided
          let urgencyLevel = sessionData.urgency_level;
          if (!urgencyLevel) {
            const availableSpots = sessionData.remaining_spots;
            if (capacityPercentage >= 90 || availableSpots <= 5) {
              urgencyLevel = "critical";
            } else if (capacityPercentage >= 75 || availableSpots <= 15) {
              urgencyLevel = "high";
            } else {
              urgencyLevel = "normal";
            }
          }

          // Ensure metadata includes school_id and training_camp_session_id
          // These may come from the sessionData directly or from metadata
          // The single session endpoint might not include these, so we ensure they're present
          const metadata = {
            ...(sessionData.metadata || {}),
            // Include school_id if it exists in sessionData or metadata
            school_id: sessionData.school_id || sessionData.metadata?.school_id || null,
            // training_camp_session_id should always be the session id
            training_camp_session_id: sessionData.id || sessionData.metadata?.training_camp_session_id || null,
          };

          const transformedSession: TrainingCampSession = {
            id: sessionData.id.toString(),
            unique_identifier: createSessionIdentifier(sessionData),
            session_title: sessionData.session_title || sessionData.location,
            program_type: sessionData.program_type || "standard",
            location: sessionData.location,
            city: sessionData.city,
            country: sessionData.country,
            country_code: sessionData.country_code,
            full_location: sessionData.full_location,
            venue_name: sessionData.venue_name,
            organization_logo: sessionData.organization_logo,
            venue_address: sessionData.venue_address,
            location_highlights: sessionData.location_highlights || [],
            date: sessionData.date,
            start_date: sessionData.start_date,
            end_date: sessionData.end_date,
            formatted_date: sessionData.formatted_date,
            time: sessionData.time,
            timezone: sessionData.timezone,
            availableSpots: sessionData.remaining_spots,
            bookedSpots: bookedSpots,
            price: sessionData.effective_price,
            formatted_price: sessionData.formatted_effective_price,
            price_difference: sessionData.price_difference || 0,
            is_premium_pricing: sessionData.is_premium_pricing || false,
            is_discounted_pricing: sessionData.is_discounted_pricing || false,
            is_featured: sessionData.is_featured || false,
            is_almost_sold_out:
              sessionData.is_almost_sold_out || capacityPercentage >= 90,
            is_limited_availability:
              sessionData.is_limited_availability ||
              (capacityPercentage >= 75 && capacityPercentage < 90),
            urgency_level: urgencyLevel,
            capacity_percentage: capacityPercentage,
            special_notes: sessionData.special_notes,
            metadata: metadata,
            session_type: "training_camp",
          };

          setSession(transformedSession);

          // Get program data from the session response or use defaults
          const programData = sessionData.program || {};
          setTrainingCampProgram({
            id: programData.id || premierTrainingCamp.id,
            title: programData.title || premierTrainingCamp.title,
            description:
              programData.description || premierTrainingCamp.description,
            price: programData.price
              ? parseFloat(programData.price)
              : premierTrainingCamp.price,
            duration: premierTrainingCamp.duration,
            category: premierTrainingCamp.category,
            image: premierTrainingCamp.image,
            features: premierTrainingCamp.features,
          });
        } else {
          throw new Error("Session not found");
        }
      } catch (err) {
        console.error("Error loading session data:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load session data"
        );
      } finally {
        setLoading(false);
      }
    };

    if (sessionId) {
      loadSessionData();
    }
  }, [sessionId]);

  const calculateDepositPlan = (sessionData: TrainingCampSession | null, useInstallment: boolean = false) => {
    if (!sessionData) {
      return null;
    }

    const totalPrice =
      sessionData.price ??
      trainingCampProgram?.price ??
      premierTrainingCamp.price;

    if (!totalPrice || totalPrice < 9999 || !useInstallment) {
      return null;
    }

    const depositPercentage = 0.3;
    const depositAmount = Math.round(totalPrice * depositPercentage * 100) / 100;
    const balanceAmount = Math.max(
      Math.round((totalPrice - depositAmount) * 100) / 100,
      0
    );

    return {
      type: "future-ceo-deposit",
      depositAmount,
      balanceAmount,
      totalAmount: totalPrice,
      balanceDueDate: sessionData.start_date || sessionData.date || null,
      metadata: {
        deposit_percentage: depositPercentage,
      },
    };
  };

  const handleAddToCart = async () => {
    if (!trainingCampProgram || !session) return;

    setIsBooking(true);
    const paymentPlan = calculateDepositPlan(session, useInstallmentPayment);
    addToCart(
      trainingCampProgram,
      1,
      session as any,
      paymentPlan
        ? {
            paymentPlan,
          }
        : undefined
    ); // Type assertion for now

    setTimeout(() => {
      setIsBooking(false);
    }, 500);
  };

  const handleRemoveFromCart = async () => {
    if (!trainingCampProgram || !session) return;

    setIsBooking(true);
    removeFromCart(trainingCampProgram.id, session.id);

    setTimeout(() => {
      setIsBooking(false);
    }, 500);
  };

  const isSessionInCart = () => {
    return session
      ? items.some((item) => item.selectedSession?.id === session.id)
      : false;
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);

      // Reset copied state after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement("textarea");
      textArea.value = shareUrl;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (e) {
        console.error("Fallback copy failed:", e);
      }
      document.body.removeChild(textArea);
    }
  };

  const getGradeInfo = (locationHighlights?: string[], metadata?: any) => {
    const gradeHighlight = locationHighlights?.find((highlight) =>
      highlight.includes("Grade")
    );

    if (gradeHighlight) {
      return gradeHighlight;
    }

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

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);

  const depositPlan = calculateDepositPlan(session, useInstallmentPayment);
  const depositPercentageDisplay = depositPlan
    ? Math.round((depositPlan.metadata?.deposit_percentage ?? 0.3) * 100)
    : null;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex justify-center items-center">
            <div className="flex items-center space-x-4">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              <span className="text-lg text-gray-600">
                Loading session details...
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-red-800 mb-2">
                Error Loading Session
              </h3>
              <p className="text-red-600 mb-4">
                {error || "Session not found"}
              </p>
              <Button
                onClick={() =>
                  navigate(`/harvard-future-ceo-booking/${trainingCamp}`)
                }
                variant="outline"
                className="border-red-300 text-red-700 hover:bg-red-50"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Sessions
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1f2444] via-[#2d3d66] to-[#9f162e] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <Button
            variant="outline"
            asChild
            className="mb-4 sm:mb-6 border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900"
          >
            <Link to={`/harvard-future-ceo-booking/${trainingCamp}`}>
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to All Sessions
            </Link>
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center mb-3 sm:mb-4 flex-wrap gap-2">
              <Star className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
              <span className="text-yellow-400 font-semibold text-sm sm:text-base">
                Premier Training Camp Session
              </span>
              {getGradeInfo(session.location_highlights, session.metadata) && (
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-semibold">
                  {getGradeInfo(session.location_highlights, session.metadata)}
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 leading-tight">
              {session.session_title || session.location}
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-200 max-w-3xl leading-relaxed">
              {trainingCampProgram?.description ||
                premierTrainingCamp.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 sm:py-12 lg:py-16 pb-32 sm:pb-36 lg:pb-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Session Details - Main Column */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card
                  className={`border-2 relative overflow-hidden ${
                    session.program_type === "intensive"
                      ? "border-amber-200 bg-gradient-to-br from-amber-50/50 to-orange-50/50"
                      : "border-gray-200"
                  }`}
                >
                  <CardContent className="p-4 sm:p-6 lg:p-8 relative">
                    {/* Organization Logo Stamp - Top Right */}
                    {session.organization_logo && (
                      <div className="absolute top-[10%] md:top-[50%] md:translate-y-[-50%] right-4 z-10">
                        <div className="relative">
                          {/* Main stamp container with embossed effect */}
                          <div className="bg-white rounded-full p-2 sm:p-2.5 lg:p-3 shadow-xl border-2 border-gray-200 ring-2 sm:ring-3 lg:ring-4 ring-white ring-opacity-80">
                            <img
                              src={session.organization_logo}
                              alt={`${session.location} logo`}
                              className="h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20 object-contain rounded-full"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display =
                                  "none";
                              }}
                            />
                          </div>
                          {/* Embossed border effects */}
                          <div className="absolute inset-0 rounded-full border-2 border-blue-300 opacity-20"></div>
                          <div className="absolute inset-0.5 sm:inset-1 rounded-full border border-blue-100 opacity-40"></div>
                          {/* Official seal glow */}
                          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-50 to-transparent opacity-30"></div>
                        </div>
                      </div>
                    )}

                    {/* Title + Badges + Price - Matching listing layout */}
                    <div className="mb-8">
                      <div className="flex items-start justify-between gap-4 mb-6">
                        <div className="flex-1 min-w-0">
                          {/* Session Title */}
                          <div className="flex items-center flex-wrap gap-3 mb-4">
                            <h2 className="font-bold text-gray-900 text-2xl sm:text-3xl lg:text-4xl leading-tight">
                              {session.session_title || session.location}
                            </h2>
                          </div>

                          {/* Badges Row - Matching listing layout */}
                          {session.location_highlights && (
                            <div className="flex items-center flex-wrap gap-2">
                              {/* Audience Type Badge - Primary Identity */}
                              {getAudienceBadge(
                                session.location_highlights
                              ) && (
                                <div
                                  className={`text-sm px-3 py-1.5 rounded-full font-bold whitespace-nowrap shadow-md ${
                                    getAudienceBadge(
                                      session.location_highlights
                                    )!.className
                                  }`}
                                >
                                  {
                                    getAudienceBadge(
                                      session.location_highlights
                                    )!.text
                                  }
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Price - Top Right - Matching listing layout */}
                        <div className="text-right">
                          {depositPlan ? (
                            <div className="space-y-1">
                              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600">
                                Pay {formatCurrency(depositPlan.depositAmount)} today
                              </div>
                              <div className="text-sm text-gray-500">
                                Balance {formatCurrency(depositPlan.balanceAmount)} due later
                              </div>
                              <div className="text-xs text-gray-400">
                                Total programme fee {formatCurrency(depositPlan.totalAmount)}
                              </div>
                            </div>
                          ) : (
                            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600">
                              {session.formatted_price ||
                                `$${session.price?.toLocaleString()}`}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Special Notes */}
                    {session.special_notes && (
                      <div className="mb-8 p-4 sm:p-6 bg-amber-50 rounded-xl border border-amber-200">
                        <h3 className="text-lg sm:text-xl font-bold text-amber-900 mb-3 flex items-center">
                          <Shield className="h-5 w-5 mr-2 text-amber-600" />
                          Important Information
                        </h3>
                        <p className="text-sm sm:text-base text-amber-800 leading-relaxed">
                          {session.special_notes}
                        </p>
                      </div>
                    )}

                    {/* Payment Option Selection */}
                    {((session?.price ?? trainingCampProgram?.price ?? premierTrainingCamp.price) >= 9999) && (
                      <div className="mb-8 p-4 sm:p-6 bg-green-50 rounded-xl border border-green-200">
                        <h3 className="text-lg sm:text-xl font-bold text-green-900 mb-3 flex items-center">
                          <Shield className="h-5 w-5 mr-2 text-green-600" />
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
                              className="mr-3 h-4 w-4 text-green-600"
                            />
                            <div>
                              <span className="font-medium text-green-900">
                                Pay in Full
                              </span>
                              <p className="text-sm text-green-700">
                                Complete payment now - {session?.formatted_price || formatCurrency(session?.price ?? trainingCampProgram?.price ?? premierTrainingCamp.price)}
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
                              className="mr-3 h-4 w-4 text-green-600"
                            />
                            <div>
                              <span className="font-medium text-green-900">
                                30% Deposit + Balance Later
                              </span>
                              <p className="text-sm text-green-700">
                                Pay {formatCurrency(Math.round((session?.price ?? trainingCampProgram?.price ?? premierTrainingCamp.price) * 0.3 * 100) / 100)} today, 
                                balance due before program starts
                              </p>
                            </div>
                          </label>
                        </div>
                      </div>
                    )}

                    {depositPlan && (
                      <div className="mb-8 p-4 sm:p-6 bg-blue-50 rounded-xl border border-blue-200">
                        <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-3 flex items-center">
                          <GraduationCap className="h-5 w-5 mr-2 text-blue-700" />
                          Future CEO Programme with Harvard University Professors
                        </h3>
                        <div className="space-y-2 text-sm sm:text-base text-blue-900 leading-relaxed">
                          <p>
                            Secure your place today with a {(depositPercentageDisplay ?? 30)}% deposit.
                          </p>
                          <ul className="list-disc list-inside space-y-1 text-blue-800">
                            <li>
                              Deposit due at registration:{" "}
                              <span className="font-semibold">
                                {formatCurrency(depositPlan.depositAmount)}
                              </span>
                            </li>
                            <li>
                              Remaining balance:{" "}
                              <span className="font-semibold">
                                {formatCurrency(depositPlan.balanceAmount)}
                              </span>{" "}
                              payable before programme commencement.
                            </li>
                            <li>
                              Total programme fee:{" "}
                              <span className="font-semibold">
                                {formatCurrency(depositPlan.totalAmount)}
                              </span>
                            </li>
                          </ul>
                          <p className="text-xs sm:text-sm text-blue-700">
                            We’ll follow up with a secure invoice and reminders for the remaining balance.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Key Details - Matching listing layout exactly */}
                    <div className="space-y-5 mb-8">
                      {/* Location Block */}
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-blue-600 flex-shrink-0" />
                        <div className="flex-1">
                          {(session.venue_name || session.location) && (
                            <div className="font-semibold text-gray-700 text-base">
                              {session.venue_name || session.location}
                            </div>
                          )}
                          {(session.city || session.country) && (
                            <div className="text-sm text-gray-500 font-light mt-0.5">
                              {session.city}, {session.country}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Date & Time Block */}
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-blue-600 flex-shrink-0" />
                        <div className="flex-1">
                          <div className="font-semibold text-gray-700 text-base">
                            {session.start_date && session.end_date
                              ? `${formatDateRange(
                                  session.start_date,
                                  session.end_date
                                )} · ${session.time}`
                              : `${formatDate(session.date)} · ${session.time}`}
                          </div>
                          {session.timezone && (
                            <div className="text-sm text-gray-400 font-light mt-0.5">
                              {session.timezone}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Grade Information Block */}
                      {getGradeInfo(
                        session.location_highlights,
                        session.metadata
                      ) && (
                        <div className="flex items-center gap-3">
                          <GraduationCap className="h-5 w-5 text-blue-600 flex-shrink-0" />
                          <div className="flex-1">
                            <div className="font-semibold text-gray-700 text-base">
                              {getGradeInfo(
                                session.location_highlights,
                                session.metadata
                              )}
                            </div>
                            <div className="text-sm text-gray-500 font-light mt-0.5">
                              Academic Level
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Availability Block - Matching listing layout exactly */}
                      <div className="flex items-start gap-3">
                        <Users className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <div
                              className={`font-bold text-lg ${
                                session.urgency_level === "critical"
                                  ? "text-red-600"
                                  : session.urgency_level === "high"
                                  ? "text-orange-600"
                                  : "text-green-600"
                              }`}
                            >
                              {session.availableSpots} spots available
                            </div>

                            {/* First Come First Serve Badge - Matching listing condition */}
                            {session.availableSpots <= 15 &&
                              !session.is_almost_sold_out &&
                              !session.is_limited_availability && (
                                <div className="inline-flex items-center px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full border border-yellow-200">
                                  📍 FCFS
                                </div>
                              )}
                          </div>

                          {/* Capacity Progress Bar - Matching listing width and height */}
                          <div className="w-full lg:w-3/4 xl:w-4/5 bg-gray-200 rounded-full h-2.5 mb-1">
                            <div
                              className={`h-2.5 rounded-full transition-all duration-500 ${
                                session.urgency_level === "critical"
                                  ? "bg-red-500"
                                  : session.urgency_level === "high"
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                              }`}
                              style={{
                                width: `${
                                  session.capacity_percentage ||
                                  ((session.bookedSpots || 0) /
                                    ((session.bookedSpots || 0) +
                                      session.availableSpots)) *
                                    100
                                }%`,
                              }}
                            ></div>
                          </div>

                          <div className="text-xs text-gray-400 font-light">
                            {session.bookedSpots || 0}/
                            {(session.bookedSpots || 0) +
                              session.availableSpots}{" "}
                            enrolled
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Scarcity Indicators - Matching listing layout exactly */}
                    {((session.availableSpots > 0 &&
                      session.is_almost_sold_out) ||
                      session.is_limited_availability) && (
                      <div className="pt-2 mb-6">
                        {session.is_almost_sold_out && (
                          <div className="inline-flex items-center px-4 py-2 bg-red-100 text-red-800 text-sm font-bold rounded-lg border border-red-200 animate-pulse">
                            🔥{" "}
                            <span className="font-extrabold">
                              ALMOST SOLD OUT
                            </span>{" "}
                            - Only{" "}
                            <span className="font-extrabold">
                              {session.availableSpots}
                            </span>{" "}
                            left!
                          </div>
                        )}
                        {!session.is_almost_sold_out &&
                          session.is_limited_availability && (
                            <div className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-800 text-sm font-bold rounded-lg border border-orange-200">
                              ⚡{" "}
                              <span className="font-extrabold">
                                LIMITED AVAILABILITY
                              </span>{" "}
                              :{" "}
                              <span className="font-extrabold">
                                {session.availableSpots}
                              </span>{" "}
                              spots left
                            </div>
                          )}
                      </div>
                    )}

                    {/* Content ends here - buttons moved outside */}
                  </CardContent>

                  {/* Sold Out Overlay - On Top */}
                  {session.availableSpots <= 0 && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
                      <img
                        src="/images/sold-out.jpeg"
                        alt="Sold Out"
                        className="w-full h-full object-cover opacity-85"
                      />
                    </div>
                  )}
                </Card>
              </motion.div>
            </div>

            {/* Sidebar - Workshop Info */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:sticky lg:top-6"
              >
                <Card className="shadow-lg border-0 bg-white">
                  <CardContent className="p-4 sm:p-6 space-y-6">
                    {/* Training Camp Image */}
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
                      />
                      <h3 className="font-bold text-gray-900 mb-2 text-base sm:text-lg">
                        {trainingCampProgram?.title ||
                          premierTrainingCamp.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 mb-4">
                        {trainingCampProgram?.description ||
                          premierTrainingCamp.description}
                      </p>
                    </div>

                    {/* Features */}
                    <div className="border-t pt-6 space-y-3">
                      <h4 className="font-semibold text-gray-900 text-sm sm:text-base mb-3">
                        What's Included
                      </h4>
                      {(
                        trainingCampProgram?.features ||
                        premierTrainingCamp.features
                      ).map((feature: string, index: number) => (
                        <div
                          key={index}
                          className="flex items-start text-xs sm:text-sm text-gray-700"
                        >
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Trust Indicators */}
                    <div className="border-t pt-6 space-y-3">
                      <div className="flex items-center text-xs sm:text-sm text-gray-600">
                        <Shield className="h-4 w-4 mr-2 text-green-600" />
                        Professional Certificate
                      </div>
                      <div className="flex items-center text-xs sm:text-sm text-gray-600">
                        <Star className="h-4 w-4 mr-2 text-yellow-500" />
                        Harvard Business School Curriculum
                      </div>
                      <div className="flex items-center text-xs sm:text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 mr-2 text-blue-600" />
                        Certificate Included
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Add to Cart and Share Buttons - Fixed to Viewport Bottom */}
      {session.availableSpots > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-50 px-4 sm:px-6 lg:px-8 pt-4 pb-4 sm:pt-5 sm:pb-5">
          <div className="max-w-7xl mx-auto">
            <div className="lg:max-w-5xl lg:mx-auto bg-white border border-gray-200 shadow-xl rounded-xl p-3 sm:p-4 lg:p-5">
              <div className="flex flex-col sm:flex-row gap-3">
              {/* Add to Cart Button */}
              <Button
                onClick={
                  isSessionInCart()
                    ? handleRemoveFromCart
                    : handleAddToCart
                }
                disabled={isBooking}
                size="lg"
                className={`flex-1 bg-gradient-to-r from-[#1f2444] to-[#9f162e] hover:from-[#9f162e] hover:to-[#1f2444] text-white font-bold py-4 text-base sm:text-lg shadow-lg transition-all duration-200 disabled:opacity-50`}
              >
                {isBooking ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    {isSessionInCart()
                      ? "Removing..."
                      : "Adding..."}
                  </>
                ) : isSessionInCart() ? (
                  <>
                    <X className="h-5 w-5 mr-2" />
                    Remove from Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    <span className="">
                      {useInstallmentPayment ? "Reserve with Deposit" : "Add to Cart"}
                    </span>
                  </>
                )}
              </Button>

                {/* Share Button */}
                <Button
                  onClick={handleShare}
                  variant="outline"
                  size="lg"
                  className={`sm:w-auto px-6 py-4 font-bold transition-all duration-200 ${
                    copied
                      ? "bg-green-50 border-green-500 text-green-700 hover:bg-green-100"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="h-5 w-5 mr-2" />
                      <span className="hidden sm:inline">
                        Link Copied!
                      </span>
                      <span className="sm:hidden">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="h-5 w-5 mr-2" />
                      <span className="hidden sm:inline">
                        Share Session
                      </span>
                      <span className="sm:hidden">Share</span>
                    </>
                  )}
                </Button>
              </div>

              {items.length > 0 && (
                <Link to="/cart" className="block mt-3">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full"
                  >
                    Proceed to payment
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainingCampSessionDetail;
