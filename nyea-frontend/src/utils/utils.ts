export const getAudienceBadge = (highlights: string[] | undefined) => {
  if (!highlights || highlights.length === 0) return null;

  const highlight = highlights[0].toLowerCase();

  if (highlight.includes('high school') || highlight.includes('student')) {
    return {
      text: 'High School',
      className: 'bg-blue-600 text-white border-blue-700',
      icon: '🎓'
    };
  } else if (highlight.includes('university') || highlight.includes('college')) {
    return {
      text: 'University',
      className: 'bg-purple-600 text-white border-purple-700',
      icon: '🏛️'
    };
  } else if (highlight.includes('executive') || highlight.includes('professional') || highlight.includes('corporate')) {
    return {
      text: 'Executive',
      className: 'bg-gray-700 text-white border-gray-800',
      icon: '💼'
    };
  }

  // Default for any other audience
  return {
    text: `${highlights[0]}`,
    className: 'bg-blue-600 text-white border-blue-700',
    icon: '🎓'
  };
}