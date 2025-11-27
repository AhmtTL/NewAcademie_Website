/**
 * Utility functions for handling file downloads
 */

/**
 * Downloads the program brochure PDF
 */
export const downloadProgramBrochure = (): void => {
  const link = document.createElement('a');
  link.href = '/documents/Program-details.pdf';
  link.download = 'NYEA-Program-Details.pdf';
  link.target = '_blank';
  
  // Append to body, click, and remove
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Opens the program brochure in a new tab
 */
export const viewProgramBrochure = (): void => {
  window.open('/documents/Program-details.pdf', '_blank');
};

/**
 * Generic file download function
 */
export const downloadFile = (url: string, filename: string): void => {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.target = '_blank';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
