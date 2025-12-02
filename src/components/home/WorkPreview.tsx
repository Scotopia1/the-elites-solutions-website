"use client";
import "./WorkPreview.css";
import { useEffect, useRef } from "react";
import Link from "next/link";

import AnimatedH1 from "@/components/animations/AnimatedH1";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const workList = [
  {
    id: 1,
    title: "Digital Transformation",
    category: "Enterprise Solutions",
    image: "/images/projects/work-1.jpg",
  },
  {
    id: 2,
    title: "Brand Revolution",
    category: "Marketing Strategy",
    image: "/images/projects/work-2.jpg",
  },
  {
    id: 3,
    title: "Cloud Infrastructure",
    category: "Technology",
    image: "/images/projects/work-3.jpg",
  },
  {
    id: 4,
    title: "Mobile Innovation",
    category: "App Development",
    image: "/images/projects/work-4.jpg",
  },
  {
    id: 5,
    title: "AI Integration",
    category: "Machine Learning",
    image: "/images/projects/work-5.jpg",
  },
];

const WorkPreview = () => {
  const workItems = Array.isArray(workList) ? workList : [];
  const stickyWorkHeaderRef = useRef(null);
  const homeWorkRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    const workHeaderSection = stickyWorkHeaderRef.current;
    const homeWorkSection = homeWorkRef.current;

    let workHeaderPinTrigger;
    if (workHeaderSection && homeWorkSection) {
      workHeaderPinTrigger = ScrollTrigger.create({
        trigger: workHeaderSection,
        start: "top top",
        endTrigger: homeWorkSection,
        end: "bottom bottom",
        pin: true,
        pinSpacing: false,
      });
    }

    return () => {
      if (workHeaderPinTrigger) {
        workHeaderPinTrigger.kill();
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <section ref={stickyWorkHeaderRef} className="sticky-work-header">
        <AnimatedH1 animateOnScroll={true}>Palmer selects</AnimatedH1>
      </section>

      <section ref={homeWorkRef} className="home-work">
        <div className="home-work-list">
          {workItems.map((work, index) => (
            <Link
              href="/work"
              key={work.id}
              className="home-work-item"
            >
              <p className="primary sm">{`${String(index + 1).padStart(
                2,
                "0"
              )} - ${String(workItems.length).padStart(2, "0")}`}</p>
              <h3>{work.title}</h3>
              <div className="work-item-img">
                <img src={work.image} alt={work.title} />
              </div>
              <h4>{work.category}</h4>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};

export default WorkPreview;
