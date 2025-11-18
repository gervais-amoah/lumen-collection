import React from "react";

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  disabled = false,
  speed = 5,
  className = "",
}) => {
  return (
    <span
      className={`bg-clip-text text-transparent inline-block ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(110deg, #b5b5b5 45%, #fff 55%, #b5b5b5 65%)",
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        animation: disabled
          ? "none"
          : `shineAnimation ${speed}s linear infinite`,
      }}
    >
      <style>{`
        @keyframes shineAnimation {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
      {text}
    </span>
  );
};

export default ShinyText;
