"use client";
import "./IndexHero.css";
import { useState, useEffect } from "react";

import Copy from "./Copy";
import BtnLink from "./BtnLink";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CustomEase from "gsap/CustomEase";

gsap.registerPlugin(ScrollTrigger, CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

let isInitialLoad = true;

export default function IndexHero() {
  const [showPreloader, setShowPreloader] = useState(isInitialLoad);

  useEffect(() => {
    return () => {
      isInitialLoad = false;
    };
  }, []);

  useGSAP(() => {
    const heroLink = document.querySelector(".hero-link");
    const animationDelay = showPreloader ? 6.2 : 0.9;

    if (showPreloader) {
      const tl = gsap.timeline({
        delay: 0.3,
        defaults: {
          ease: "hop",
        },
      });

      const counts = document.querySelectorAll(".count");
      const progressBar = document.querySelector(".progress-bar");
      const preloaderOverlay = document.querySelector(".preloader-overlay");

      const progressTl = gsap.timeline({
        delay: 0.3,
      });

      counts.forEach((count, index) => {
        const digits = count.querySelectorAll(".digit h1");

        tl.to(
          digits,
          {
            y: "0%",
            duration: 1,
            stagger: 0.075,
          },
          index * 1
        );

        if (index < counts.length) {
          tl.to(
            digits,
            {
              y: "-120%",
              duration: 1,
              stagger: 0.075,
            },
            index * 1 + 1
          );
        }

        progressTl.to(
          progressBar,
          {
            scaleY: (index + 1) / counts.length,
            duration: 1,
            ease: "hop",
          },
          index * 1
        );
      });

      progressTl
        .set(progressBar, {
          transformOrigin: "top",
        })
        .to(progressBar, {
          scaleY: 0,
          duration: 0.75,
          ease: "hop",
        })
        .to(preloaderOverlay, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
          onComplete: () => {
            if (preloaderOverlay) {
              (preloaderOverlay as HTMLElement).style.display = "none";
            }
          },
        });
    }

    if (heroLink) {
      gsap.set(heroLink, { y: 30, opacity: 0 });

      gsap.to(heroLink, {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: animationDelay,
        ease: "power4.out",
      });
    }
  }, [showPreloader]);

  return (
    <>
      {showPreloader && (
        <div className="preloader-overlay">
          <div className="progress-bar"></div>
          <div className="counter">
            <div className="count">
              <div className="digit">
                <h1>0</h1>
              </div>
              <div className="digit">
                <h1>0</h1>
              </div>
            </div>
            <div className="count">
              <div className="digit">
                <h1>1</h1>
              </div>
              <div className="digit">
                <h1>5</h1>
              </div>
            </div>
            <div className="count">
              <div className="digit">
                <h1>4</h1>
              </div>
              <div className="digit">
                <h1>2</h1>
              </div>
            </div>
            <div className="count">
              <div className="digit">
                <h1>8</h1>
              </div>
              <div className="digit">
                <h1>7</h1>
              </div>
            </div>
            <div className="count">
              <div className="digit">
                <h1>1</h1>
              </div>
              <div className="digit">
                <h1>0</h1>
              </div>
            </div>
            <div className="count">
              <div className="digit">
                <h1>1</h1>
              </div>
              <div className="digit">
                <h1>0</h1>
              </div>
              <div className="digit">
                <h1>0</h1>
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="hero">
        <div className="hero-logo">
          <img src="/images/logos/logo_light.png" alt="The Elites Logo" />
        </div>

        <div className="hero-content">
          <div className="hero-header">
            <div className="hero-header-col-lg"></div>
            <div className="hero-header-col-sm">
              <Copy animateOnScroll={false} delay={showPreloader ? 6.2 : 0.9}>
                <h3 className="hero-tagline">
                  Where elite craftsmanship meets cutting-edge technology.
                  We transform your vision into digital excellence.
                </h3>
              </Copy>
            </div>
          </div>

          <div className="hero-footer">
            <div className="hero-footer-col-lg">
              <Copy animateOnScroll={false} delay={showPreloader ? 6.2 : 0.9}>
                <p className="sm caps mono">Solutions</p>
                <p className="sm caps mono">Tailored for Excellence</p>
              </Copy>
            </div>
            <div className="hero-footer-col-sm">
              <div className="hero-tags">
                <Copy animateOnScroll={false} delay={showPreloader ? 6.2 : 0.9}>
                  <p className="sm caps mono">Web Development</p>
                  <p className="sm caps mono">Mobile Applications</p>
                  <p className="sm caps mono">Process Automation</p>
                  <p className="sm caps mono">Custom Software</p>
                </Copy>
              </div>

              <div className="hero-link">
                <BtnLink route="/contact" label="Get Started" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
