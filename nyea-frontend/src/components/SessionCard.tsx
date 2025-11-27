import React from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Calendar, ShoppingCart, X, Users, GraduationCap } from "lucide-react";

type ProgramType = "essentials" | "mastery" | "standard" | "intensive";

export interface BaseSession {
  id: string;
  unique_identifier?: string;
  session_title?: string;
  program_type?: ProgramType;
  location?: string;
  city?: string;
  country?: string;
  venue_name?: string;
  organization_logo?: string;
  location_highlights?: string[];
  date?: string;
  start_date?: string;
  end_date?: string;
  time?: string;
  timezone?: string;
  availableSpots: number;
  bookedSpots?: number;
  price?: number;
  formatted_price?: string;
  urgency_level?: "critical" | "high" | "normal";
  capacity_percentage?: number;
  special_notes?: string;
  metadata?: any;
}

interface SessionCardProps {
  session: BaseSession;
  onCardClick?: () => void;
  onAddToCart: () => void;
  onRemoveFromCart: () => void;
  isInCart: boolean;
  isBooking?: boolean;
  hideCartButton?: boolean;
  // Helpers for formatting and extra info
  getBadge?: (
    location_highlights?: string[]
  ) => { className: string; text: string } | null;
  getGradeInfo?: (
    location_highlights?: string[],
    metadata?: any
  ) => string | null;
  formatDate?: (date: string) => string;
  formatDateRange?: (start: string, end: string) => string;
  detailsHref?: string;
  renderPrice?: (session: BaseSession) => React.ReactNode;
}

export const SessionCard: React.FC<SessionCardProps> = ({
  session,
  onCardClick,
  onAddToCart,
  onRemoveFromCart,
  isInCart,
  isBooking,
  hideCartButton = false,
  getBadge,
  getGradeInfo,
  formatDate,
  formatDateRange,
  detailsHref,
  renderPrice,
}) => {
  const audienceBadge = getBadge ? getBadge(session.location_highlights) : null;
  const gradeBadge = getGradeInfo ? getGradeInfo(session.location_highlights) : null;

  // Clean time string by removing anything in parentheses like "(2 days)"
  const cleanTimeString = (timeString: string) => {
    return timeString.replace(/\s*\([^)]*\)/g, "").trim();
  };

  return (
    <Card
      className={`transition-all duration-300 hover:shadow-xl border border-[#EDEDED] hover:border-[#D9D9D9] relative overflow-hidden rounded-xl ${
        session.availableSpots <= 0 ? "cursor-not-allowed" : "cursor-pointer"
      }`}
      onClick={() => {
        if (session.availableSpots > 0 && onCardClick) onCardClick();
      }}
    >
      <CardContent className="p-0 relative overflow-hidden w-full">
        {/* Diagonal Ribbon Badge - Top Left - Only for Mastery */}
        {session.program_type === "mastery" && (
          <div className="absolute -left-10 top-6 z-10">
            <div
              className="transform -rotate-45 origin-center px-10 py-2 text-xs font-bold text-white shadow-lg flex items-center justify-center gap-x-1.5"
              style={{
                width: "150px",
                background:
                  "linear-gradient(153.26deg, #F0E59D 1.74%, #FF6A00 68.14%)",
              }}
            />
          </div>
        )}

        {/* Main Card Layout */}
        <div className="p-4 sm:p-6 pt-12 sm:pt-6 w-full">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 w-full">
            {/* Left: Organization Logo */}
            <div className="flex-shrink-0 flex justify-center lg:justify-start">
              <img
                src={session.organization_logo || "/images/no-image.svg"}
                alt={`${session.location} logo`}
                className="w-28 h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/images/no-image.svg";
                }}
              />
            </div>

            {/* Center: Content Area */}
            <div className="flex-1 min-w-0 space-y-4 w-full">
              {/* Session Title, Location and Price */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col items-start gap-y-0 flex-1">
                  <h3 className="font-bold text-[#111827] text-sm lg:text-base">
                    {session.session_title || session.location || ""}
                  </h3>
                  <span className="text-xs text-[#6B7280]">
                    {session.city && session.country
                      ? `${session.city}, ${session.country}`
                      : session.city || session.country}
                  </span>
                </div>

                {/* Price - Desktop Only */}
                <div className="hidden lg:block flex-shrink-0">
                  <div className="text-right">
                    {renderPrice ? (
                      renderPrice(session)
                    ) : (
                      <div className="text-base lg:text-xl font-bold text-[#0B3162]">
                        {session.formatted_price ||
                          (session.price !== undefined
                            ? `$${session.price.toLocaleString()}`
                            : "")}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Badges Row */}
              <div className="flex items-center flex-wrap gap-2 w-full">
                {session.program_type === "essentials" && (
                  <div className="bg-[#E7FFF1] border-[0.5px] border-[#246C44] text-[#246C44] text-xs font-medium px-2 py-1 rounded-[4px] flex items-center gap-x-2">
                    <img
                      src="/images/essential.svg"
                      alt="Info"
                      className="h-3 w-3"
                    />
                    Essential
                  </div>
                )}

                {session.program_type === "mastery" && (
                  <div className="bg-[#FFFBEB] border-[0.5px] border-[#D97706] text-[#D97706] text-xs font-medium px-2 py-1 rounded-[4px] flex items-center gap-x-2">
                    <img
                      src="/images/mastery.svg"
                      alt="Info"
                      className="h-3 w-3"
                    />
                    Mastery
                  </div>
                )}

                <div className=" hidden bg-[#FDF2F8] border-[0.5px] border-[#DB2777] text-[#DB2777] text-xs font-medium px-2 py-1 rounded-[4px]  items-center gap-x-2">
                  <img src="/images/girls.svg" alt="Info" className="h-3 w-3" />
                  Girls
                </div>

                <div className="hidden bg-[#EBF2FF] border-[0.5px] border-[#2563EB] text-[#2563EB] text-xs font-medium px-2 py-1 rounded-[4px] items-center gap-x-2">
                  <img src="/images/boys.svg" alt="Info" className="h-3 w-3" />
                  Boys
                </div>

                {gradeBadge && (
                <div className="bg-[#EBF2FF] border-[0.5px] border-[#2563EB] text-[#2563EB] text-xs font-medium px-2 py-1 rounded-[4px] flex items-center gap-x-2">
                  <GraduationCap className="h-4 w-4" />
                    {gradeBadge}
                  </div>
                )}
              </div>

              {/* Session Details with Icons */}
              <div className="md:space-x-4 space-x-2 flex items-center w-full">
                {audienceBadge && (
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-[#6B7280] flex-shrink-0" />
                    <span className="text-[10px] md:text-sm text-[#6B7280]">
                      {" "}
                      {audienceBadge?.text}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-x-1">
                  <Calendar className="h-4 w-4 text-[#6B7280] flex-shrink-0" />
                  <span className="text-[10px] md:text-sm text-[#6B7280]">
                    {session.start_date && session.end_date && formatDateRange
                      ? `${formatDateRange(
                          session.start_date,
                          session.end_date
                        )}`
                      : session.date && formatDate
                      ? `${formatDate(session.date)}`
                      : ""}
                    {session.time && ` · ${cleanTimeString(session.time)}`}
                  </span>
                </div>
              </div>

              {/* Enrollment Progress Bar and Button */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-y-4 md:gap-x-10 w-full">
                <div className="flex-1 min-w-0">
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        session.urgency_level === "critical"
                          ? "bg-red-500"
                          : session.urgency_level === "high"
                          ? "bg-yellow-500"
                          : "bg-[#16A34A]"
                      }`}
                      style={{
                        width: `${
                          session.capacity_percentage !== undefined
                            ? Math.min(session.capacity_percentage, 100)
                            : ((session.bookedSpots || 0) /
                                ((session.bookedSpots || 0) +
                                  (session.availableSpots || 0))) *
                              100
                        }%`,
                      }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between w-full">
                    <span
                      className={`text-xs font-medium ${
                        session.urgency_level === "critical"
                          ? "text-red-600"
                          : session.urgency_level === "high"
                          ? "text-orange-600"
                          : "text-[#16A34A]"
                      }`}
                    >
                      {session.availableSpots} spots available
                    </span>
                    <div className="text-xs text-[#868687] font-light">
                      {session.bookedSpots || 0}/
                      {(session.bookedSpots || 0) +
                        (session.availableSpots || 0)}{" "}
                      enrolled
                    </div>
                  </div>
                </div>

                {/* Add/Remove */}
                {!hideCartButton && session.availableSpots > 0 && (
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isInCart) {
                        onRemoveFromCart();
                      } else {
                        onAddToCart();
                      }
                    }}
                    disabled={!!isBooking || session.availableSpots <= 0}
                    className="w-full sm:w-auto flex-shrink-0 bg-[#0B3162] hover:bg-[#082649] text-white rounded-[6px] font-medium h-10 px-6 text-sm shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                  >
                    {isBooking ? (
                      <>
                        <Users className="h-4 w-4 mr-2" />
                        Processing...
                      </>
                    ) : isInCart ? (
                      <>
                        <X className="h-4 w-4 mr-2" />
                        Remove from Cart
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </>
                    )}
                  </Button>
                )}
              </div>

              {/* Price - Mobile Only (at bottom) */}
              <div className="lg:hidden pt-4 border-t border-gray-100">
                <div className="text-center">
                  {renderPrice ? (
                    renderPrice(session)
                  ) : (
                    <div className="text-base font-bold text-[#0B3162]">
                      {session.formatted_price ||
                        (session.price !== undefined
                          ? `$${session.price.toLocaleString()}`
                          : "")}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SessionCard;
