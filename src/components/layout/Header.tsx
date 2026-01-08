"use client";

import { useState } from "react";
import VanguardMenu from "./menu/VanguardMenu";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <VanguardMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
    </>
  );
}
