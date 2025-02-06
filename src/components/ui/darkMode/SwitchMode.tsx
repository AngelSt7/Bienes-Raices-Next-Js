"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Switch } from "@heroui/react";
import { MoonIcon, SunIcon } from "./IconsSwitch";

const Switcher: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsSelected(theme === "light");
  }, [theme]);

  const handleSwitch = (newState: boolean) => {
    setIsSelected(newState);
    setTheme(newState ? "light" : "dark");
  };


  if (!mounted) return null;

  return (
    <>
      <Switch
        isSelected={isSelected}
        onValueChange={handleSwitch}
        color="success"
        size="lg"
        startContent={<SunIcon />}
        endContent={<MoonIcon />}
      >
      </Switch>
    </>
  );
};

export default Switcher;
