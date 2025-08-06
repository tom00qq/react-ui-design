import "./badge.css";

export interface BadgeProps {
  children: React.ReactNode;
  size?: "xs" | "sm" | "md" | "lg";
  colorPalette?: "gray" | "red" | "green";
}

const Badge = ({
  children = "badge",
  size = "xs",
  colorPalette = "gray",
}: BadgeProps) => {
  return (
    <div
      className={`stoybook-badge stoybook-badge--${size} stoybook-badge--${colorPalette}`}
    >
      {children}
    </div>
  );
};

export default Badge;
