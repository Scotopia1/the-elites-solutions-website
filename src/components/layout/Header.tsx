"use client";

import { useState } from "react";
import FullscreenMenu from "./FullscreenMenu";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <FullscreenMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
    </>
  );
}
