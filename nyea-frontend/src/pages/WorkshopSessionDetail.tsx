import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle,
  Shield,
  Star,
  Loader2,
  ShoppingCart,
  X,
  Share2,
  Check,
  CreditCard,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { useCart } from "../context/CartContext";
import apiClient from "../services/api";
import type { WorkshopSession } from "../types/cart";
import { getAudienceBadge } from "../utils/utils";
import { SessionCard } from "../components/SessionCard";

const premierWorkshop = {
  id: 999,
  title: "Leadership, Negotiation and Communication Skills Workshop",
  description:
    "An exclusive two-day intensive leadership experience led by Harvard University Instructor Nicholas Coburn-Palo",
  price: 499,
  duration: "2 Day Intensive",
  category: "Leadership Training",
  image: "/images/nicholas-coburn-palo.svg",
  features: [
    "Led by Harvard University Instructor",
    "Professional Certificate",
    "Harvard-style Leadership Vocabulary",
    "Real-time Case Simulations",
    "Negotiation Skills Mastery",
    "Reference Letter Opportunity",
  ],
};

// Simple hash function to obscure numeric IDs (must match WorkshopBooking)
const hashId = (id: number): string => {
  const encoded = btoa(`s${id}`);
  return encoded.replace(/[^a-zA-Z0-9]/g, "");
};

// Decode hash back to ID
const decodeHash = (hash: string): number | null => {
  try {
    const decoded = atob(hash);
    if (decoded.startsWith("s")) {
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

const WorkshopSessionDetail: React.FC = () => {
  const { workshop, sessionId } = useParams<{
    workshop: string;
    sessionId: string;
  }>();
  const navigate = useNavigate();
  const { addToCart, removeFromCart, items } = useCart();
  const [isBooking, setIsBooking] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [session, setSession] = useState<WorkshopSession | null>(null);
  const [workshopProgram, setWorkshopProgram] = useState<any>(null);
  const [copied, setCopied] = useState(false);

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
        const response = await apiClient.getWorkshopSession(actualSessionId);

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

          // Ensure metadata includes school_id and workshop_session_id
          // These may come from the sessionData directly or from metadata
          // The single session endpoint might not include these, so we ensure they're present
          const metadata = {
            ...(sessionData.metadata || {}),
            // Include school_id if it exists in sessionData or metadata
            school_id: sessionData.school_id || sessionData.metadata?.school_id || null,
            // workshop_session_id should always be the session id
            workshop_session_id: sessionData.id || sessionData.metadata?.workshop_session_id || null,
          };

          const transformedSession: WorkshopSession = {
            id: sessionData.id.toString(),
            unique_identifier: createSessionIdentifier(sessionData),
            session_title: sessionData.session_title || sessionData.location,
            program_type: sessionData.program_type || "essentials",
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
            session_type: "workshop",
          };

          setSession(transformedSession);

          // Get program data from the session response or use defaults
          const programData = sessionData.program || {};
          setWorkshopProgram({
            id: programData.id || premierWorkshop.id,
            title: programData.title || premierWorkshop.title,
            description: programData.description || premierWorkshop.description,
            price: programData.price
              ? parseFloat(programData.price)
              : premierWorkshop.price,
            duration: premierWorkshop.duration,
            category: premierWorkshop.category,
            image: premierWorkshop.image,
            features: premierWorkshop.features,
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

  const handleAddToCart = async () => {
    if (!workshopProgram || !session) return;

    setIsBooking(true);
    addToCart(workshopProgram, 1, session);

    setTimeout(() => {
      setIsBooking(false);
    }, 500);
  };

  const handleRemoveFromCart = async () => {
    if (!workshopProgram || !session) return;

    setIsBooking(true);
    removeFromCart(workshopProgram.id, session.id);

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

  const formatSingleDate = (dateString: string) => {
    const date = new Date(dateString);

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

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
                onClick={() => navigate(`/workshop-booking/${workshop}`)}
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
            <Link to={`/workshop-booking/${workshop}`}>
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
                Premier Workshop Session
              </span>
              {getAudienceBadge(session.location_highlights) && (
                <div
                  className={`text-xs sm:text-sm px-3 py-1.5 rounded-full font-bold whitespace-nowrap ${
                    getAudienceBadge(session.location_highlights)!.className
                  }`}
                >
                  {getAudienceBadge(session.location_highlights)!.text}
                </div>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 leading-tight">
              {session.session_title || session.location}
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-200 max-w-3xl leading-relaxed">
              {workshopProgram?.description || premierWorkshop.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 sm:py-12 lg:py-16 pb-32 lg:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Session Details - Main Column */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                {/* Session Card */}
                <SessionCard
                  session={session}
                  onAddToCart={handleAddToCart}
                  onRemoveFromCart={handleRemoveFromCart}
                  isInCart={isSessionInCart()}
                  isBooking={isBooking}
                  hideCartButton={true}
                  getBadge={(highlights?: string[]) =>
                    getAudienceBadge(highlights || [])
                  }
                  getGradeInfo={(highlights?: string[], metadata?: any) =>
                    getGradeInfo(highlights, metadata)
                  }
                  formatDate={(d: string) => formatSingleDate(d)}
                  formatDateRange={(s: string, e: string) =>
                    `${formatSingleDate(s)} - ${formatSingleDate(e)}`
                  }
                />

                {session.availableSpots > 0 && (
                  <div className="hidden lg:block">
                    <div className="bg-white border border-gray-200 shadow-xl rounded-xl p-3">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 flex gap-3">
                          {items.length > 0 && (
                            <Link to="/cart" className="block flex-1">
                              <Button
                                size="lg"
                                className="w-full bg-gradient-to-r from-[#1f2444] to-[#9f162e] hover:from-[#9f162e] hover:to-[#1f2444] text-white font-bold px-5 py-4 text-base shadow-lg transition-all duration-200 disabled:opacity-50 h-12"
                              >
                                <CreditCard className="h-5 w-5 mr-2" />
                                Proceed to payment
                              </Button>
                            </Link>
                          )}

                          <Button
                            onClick={
                              isSessionInCart() ? handleRemoveFromCart : handleAddToCart
                            }
                            disabled={isBooking}
                            size="lg"
                            className="flex-1 w-full bg-[#1F2444] hover:bg-[#1F2444]/90 text-white font-bold px-5 py-4 text-base shadow-lg transition-all duration-200 disabled:opacity-50 h-12"
                          >
                            {isBooking ? (
                              <>
                                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                                {isSessionInCart() ? "Removing..." : "Adding..."}
                              </>
                            ) : isSessionInCart() ? (
                              <>
                                <X className="h-5 w-5 mr-2" />
                                Remove from Cart
                              </>
                            ) : (
                              <>
                                <ShoppingCart className="h-5 w-5 mr-2" />
                                Add to Cart
                              </>
                            )}
                          </Button>
                        </div>

                        <Button
                          onClick={handleShare}
                          title="Share session"
                          variant="outline"
                          size="icon"
                          className={`h-12 w-12 transition-all duration-200 ${
                            copied
                              ? "bg-green-50 border-green-500 text-green-700 hover:bg-green-100"
                              : "border-gray-300 text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {copied ? (
                            <Check className="h-5 w-5" />
                          ) : (
                            <Share2 className="h-5 w-5" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                    {/* Special Notes */}
                    {session.special_notes && (
                  <Card className="border-2 border-amber-200">
                    <CardContent className="p-4 sm:p-6 bg-amber-50">
                        <h3 className="text-lg sm:text-xl font-bold text-amber-900 mb-3 flex items-center">
                          <Shield className="h-5 w-5 mr-2 text-amber-600" />
                          Important Information
                        </h3>
                      <p className="text-sm sm:text-base text-amber-800 leading-relaxed">
                        {session.special_notes}
                      </p>
                  </CardContent>
                  </Card>
                )}
              </motion.div>
            </div>

            {/* Sidebar - Workshop Info */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:sticky lg:top-6 space-y-6"
              >
                <Card className="shadow-lg border-0 bg-white">
                  <CardContent className="p-4 sm:p-6 space-y-6">
                    {/* Workshop Image */}
                    <div>
                      <img
                        src={workshopProgram?.image || premierWorkshop.image}
                        alt={workshopProgram?.title || premierWorkshop.title}
                        className="w-full h-32 object-cover rounded-lg mb-4"
                      />
                      <h3 className="font-bold text-gray-900 mb-2 text-base sm:text-lg">
                        {workshopProgram?.title || premierWorkshop.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 mb-4">
                        {workshopProgram?.description ||
                          premierWorkshop.description}
                      </p>
                    </div>

                    {/* Features */}
                    <div className="border-t pt-6 space-y-3">
                      <h4 className="font-semibold text-gray-900 text-sm sm:text-base mb-3">
                        What's Included
                      </h4>
                      {(
                        workshopProgram?.features || premierWorkshop.features
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
                        Harvard University Instructor
                      </div>
                      <div className="flex items-center text-xs sm:text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 mr-2 text-blue-600" />
                        Certificate Included
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons - Desktop Only */}
                {session.availableSpots > 0 && (
                  <Card className="hidden">
                    <CardContent className="p-4 space-y-3 w-full">
                      {items.length > 0 && (
                        <Link to="/cart" className="block">
                          <Button
                            size="lg"
                            className="w-full bg-gradient-to-r from-[#1f2444] to-[#9f162e] hover:from-[#9f162e] hover:to-[#1f2444] text-white font-bold py-4 text-base shadow-lg transition-all duration-200 disabled:opacity-50 h-12"
                          >
                            <CreditCard className="h-5 w-5 mr-2" />
                            Proceed to payment
                          </Button>
                        </Link>
                      )}

                      <Button
                        onClick={
                          isSessionInCart() ? handleRemoveFromCart : handleAddToCart
                        }
                        disabled={isBooking}
                        size="lg"
                        className="w-full bg-[#1F2444] hover:bg-[#1F2444]/90 text-white font-bold py-4 text-base shadow-lg transition-all duration-200 disabled:opacity-50"
                      >
                        {isBooking ? (
                          <>
                            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                            {isSessionInCart() ? "Removing..." : "Adding..."}
                          </>
                        ) : isSessionInCart() ? (
                          <>
                            <X className="h-5 w-5 mr-2" />
                            Remove from Cart
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="h-5 w-5 mr-2" />
                            Add to Cart
                          </>
                        )}
                      </Button>

                      <Button
                        onClick={handleShare}
                        variant="outline"
                        size="lg"
                        className={`w-full px-6 py-4 font-bold transition-all duration-200 h-12 ${
                          copied
                            ? "bg-green-50 border-green-500 text-green-700 hover:bg-green-100"
                            : "border-gray-300 text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {copied ? (
                          <>
                            <Check className="h-5 w-5 mr-2" />
                            Link Copied!
                          </>
                        ) : (
                          <>
                            <Share2 className="h-5 w-5 mr-2" />
                            Share Session
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Add to Cart and Share Buttons - Fixed to Viewport Bottom - Mobile Only */}
      {session.availableSpots > 0 && (
        <div className="lg:hidden fixed inset-x-0 bottom-0 z-50 px-4 sm:px-6 pt-4 pb-4 sm:pt-5 sm:pb-5">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white border border-gray-200 shadow-xl rounded-xl p-3 sm:p-4">
              {items.length > 0 && (
                <Link to="/cart" className="block mb-3">
                  <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-[#1f2444] to-[#9f162e] hover:from-[#9f162e] hover:to-[#1f2444] text-white font-bold py-4 text-base sm:text-lg shadow-lg transition-all duration-200 disabled:opacity-50 h-12"
                  >
                    <CreditCard className="h-5 w-5 mr-2" />
                    Proceed to payment
                  </Button>
                </Link>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
              {/* Add to Cart Button */}
              <Button
                  onClick={
                    isSessionInCart() ? handleRemoveFromCart : handleAddToCart
                  }
                disabled={isBooking}
                size="lg"
                  className="flex-1 bg-[#1F2444] hover:bg-[#1F2444]/90 text-white font-bold py-4 text-base sm:text-lg shadow-lg transition-all duration-200 disabled:opacity-50"
              >
                {isBooking ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      {isSessionInCart() ? "Removing..." : "Adding..."}
                  </>
                ) : isSessionInCart() ? (
                  <>
                    <X className="h-5 w-5 mr-2" />
                    Remove from Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5 mr-2" />
                      Add to Cart
                  </>
                )}
              </Button>

                {/* Share Button */}
                <Button
                  onClick={handleShare}
                  variant="outline"
                  size="lg"
                  className={`sm:w-auto px-6 py-4 font-bold transition-all duration-200 h-12 ${
                    copied
                      ? "bg-green-50 border-green-500 text-green-700 hover:bg-green-100"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                >
                  {copied ? (
                    <>
                      <Check className="h-5 w-5 mr-2" />
                      <span className="hidden sm:inline">Link Copied!</span>
                      <span className="sm:hidden">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="h-5 w-5 mr-2" />
                      <span className="hidden sm:inline">Share Session</span>
                      <span className="sm:hidden">Share</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkshopSessionDetail;
