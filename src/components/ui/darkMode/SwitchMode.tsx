"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Switch } from "@heroui/react";
import { MoonIcon, SunIcon } from "./IconsSwitch";

const Switcher: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme, systemTheme } = useTheme();
  const [isSelected, setIsSelected] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    setIsSelected(resolvedTheme === "light");
    
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      setIsSelected(mediaQuery.matches ? false : true);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [resolvedTheme]);

  const handleSwitch = (newState: boolean) => {
    setIsSelected(newState);
    setTheme(newState ? "light" : "dark");
  };

  if (!mounted) return null;

  return (
    <Switch
      isSelected={isSelected}
      onValueChange={handleSwitch}
      color="success"
      size="sm"
      startContent={<SunIcon />}
      endContent={<MoonIcon />}
    />
  );
};

export default Switcher;
