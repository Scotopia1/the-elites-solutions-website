"use client";
import { useRouter } from "next/navigation";
import { IoMdArrowForward } from "react-icons/io";

import "./BtnLink.css";

const BtnLink = ({ label, route, dark = false }: { label: string; route: string; dark?: boolean }) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.push(route);
  };

  return (
    <a
      className={`sm caps mono ${dark ? "link-dark" : "link-light"}`}
      href={route}
      onClick={handleClick}
    >
      <div
        className={`anime-link ${
          dark ? "anime-link-dark" : "anime-link-light"
        }`}
      >
        <div className="anime-link-label">
          <p className="sm caps mono">
            <span>{label}</span>
          </p>
        </div>
        <div className="anime-link-icon">
          <IoMdArrowForward color={dark ? "#fff" : "#000"} />
        </div>
      </div>
    </a>
  );
};

export default BtnLink;
