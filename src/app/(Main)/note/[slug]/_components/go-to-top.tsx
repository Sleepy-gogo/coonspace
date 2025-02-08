"use client";

import { ChevronUp } from 'lucide-react';
import { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";

function GoToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 150) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <Button className={`fixed bottom-2 right-2 size-12 px-2 z-10 transition-opacity ${isVisible ? "opacity-100" : "opacity-0"}`} onClick={scrollToTop} size="lg" variant="secondary">
      <ChevronUp />
    </Button>
  );
}

export default GoToTopButton;
