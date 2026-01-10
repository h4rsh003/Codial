
export const Logo = ({ className = "w-8 h-8" }: { className?: string }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect 
        x="2" 
        y="2" 
        width="20" 
        height="20" 
        rx="6" 
        className="fill-foreground transition-colors" 
      />
  
      <path 
        d="M10 8H8C6.89543 8 6 8.89543 6 10V14C6 15.1046 6.89543 16 8 16H10" 
        className="stroke-background transition-colors"
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      
      <path 
        d="M13 8H15C16.6569 8 18 9.34315 18 11V13C18 14.6569 16.6569 16 15 16H13V8Z" 
        className="stroke-background transition-colors"
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};