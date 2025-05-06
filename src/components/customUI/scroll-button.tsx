'use client';

import { Button } from "@/components/ui/button";

interface ScrollButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "secondary" | "outline";
  size?: "default" | "sm" | "lg";
  targetId: string;  // 添加 targetId 属性
}

export function ScrollButton({ 
  children, 
  className,
  variant = "default",
  size = "default",
  targetId
}: ScrollButtonProps) {
  const handleScroll = () => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleScroll}
    >
      {children}
    </Button>
  );
}