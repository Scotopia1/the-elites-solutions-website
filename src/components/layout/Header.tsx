"use client";

import { useState } from "react";
import CleanMenu from "./menu/CleanMenu";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <CleanMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
    </>
  );
}
