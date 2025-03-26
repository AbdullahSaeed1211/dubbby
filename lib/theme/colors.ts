/**
 * Theme colors used throughout the application
 */

export const accentColors = {
  // Solid blue accent for regular actions
  blue: {
    light: "#3b82f6", // blue-500
    dark: "#2563eb",  // blue-600
    hover: "#1d4ed8"  // blue-700
  },
  
  // Gradient for premium/upgrade actions
  gradient: {
    from: "from-blue-600", 
    to: "to-indigo-600",
    hoverFrom: "hover:from-blue-700", 
    hoverTo: "hover:to-indigo-700"
  }
};

export const buttonStyles = {
  // Regular accent button style
  accent: "bg-blue-600 hover:bg-blue-700 text-white",
  
  // Premium gradient button style (for upgrade plan, etc.)
  premium: "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md"
}; 