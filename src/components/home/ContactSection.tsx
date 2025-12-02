"use client";
import "./ContactSection.css";
import { useEffect, useRef } from "react";
import Link from "next/link";

const ContactSection = () => {
  const screensaverRef = useRef(null);
  const animationIdRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const existingScreensavers = container.querySelectorAll(".screensaver");
    existingScreensavers.forEach((el) => {
      if (el && el.parentNode) {
        el.parentNode.removeChild(el);
      }
    });

    const config = {
      speed: 3,
      imageCount: 10,
      size: 300,
      changeDirectionDelay: 20,
      edgeOffset: -40,
    };

    let isDesktop = window.innerWidth >= 1000;
    let screensaverElement: HTMLDivElement | null = null;

    const preloadedImages: HTMLImageElement[] = [];
    const preloadImages = () => {
      return new Promise<void>((resolve) => {
        let loadedCount = 0;

        for (let i = 1; i <= config.imageCount; i++) {
          const img = new Image();
          img.onload = () => {
            loadedCount++;
            if (loadedCount === config.imageCount) {
              resolve();
            }
          };
          img.src = `/images/objects/obj-${i}.png`;
          preloadedImages.push(img);
        }
      });
    };

    const stopAnimation = () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
        animationIdRef.current = null;
      }

      if (screensaverElement && screensaverElement.parentNode) {
        screensaverElement.parentNode.removeChild(screensaverElement);
        screensaverElement = null;
      }

      if (screensaverRef.current && screensaverRef.current.parentNode) {
        screensaverRef.current.parentNode.removeChild(screensaverRef.current);
        screensaverRef.current = null;
      }

      const leftoverScreensavers =
        container?.querySelectorAll(".screensaver") || [];
      leftoverScreensavers.forEach((el) => {
        if (el && el.parentNode) {
          el.parentNode.removeChild(el);
        }
      });
    };

    const startAnimation = async () => {
      if (!isDesktop) return;

      stopAnimation();

      await preloadImages();

      stopAnimation();

      screensaverElement = document.createElement("div");
      screensaverElement.classList.add("screensaver");
      screensaverElement.setAttribute("data-timestamp", Date.now().toString());
      container.appendChild(screensaverElement);
      screensaverRef.current = screensaverElement;

      const containerRect = container.getBoundingClientRect();
      let posX = containerRect.width / 2 - config.size / 2;
      let posY = containerRect.height / 2 - config.size / 2;

      let velX = (Math.random() > 0.5 ? 1 : -1) * config.speed;
      let velY = (Math.random() > 0.5 ? 1 : -1) * config.speed;

      let currentImageIndex = 1;

      screensaverElement.style.width = `${config.size}px`;
      screensaverElement.style.height = `${config.size}px`;
      screensaverElement.style.backgroundImage = `url(/images/objects/obj-${currentImageIndex}.png)`;
      screensaverElement.style.left = `${posX}px`;
      screensaverElement.style.top = `${posY}px`;

      const changeImage = () => {
        currentImageIndex = (currentImageIndex % config.imageCount) + 1;
        if (screensaverElement) {
          screensaverElement.style.backgroundImage = `url(/images/objects/obj-${currentImageIndex}.png)`;
        }
      };

      let canChangeDirection = true;

      const animate = () => {
        if (
          !screensaverElement ||
          !screensaverElement.parentNode ||
          !isDesktop ||
          (container &&
            container.getElementsByClassName("screensaver").length > 1)
        ) {
          stopAnimation();
          return;
        }

        const containerRect = container.getBoundingClientRect();

        posX += velX;
        posY += velY;

        const leftEdge = config.edgeOffset;
        const rightEdge =
          containerRect.width - config.size + Math.abs(config.edgeOffset);
        const topEdge = config.edgeOffset;
        const bottomEdge =
          containerRect.height - config.size + Math.abs(config.edgeOffset);

        if (posX <= leftEdge || posX >= rightEdge) {
          if (canChangeDirection) {
            velX = -velX;
            changeImage();
            posX = posX <= leftEdge ? leftEdge : rightEdge;

            canChangeDirection = false;
            setTimeout(() => {
              canChangeDirection = true;
            }, config.changeDirectionDelay);
          }
        }

        if (posY <= topEdge || posY >= bottomEdge) {
          if (canChangeDirection) {
            velY = -velY;
            changeImage();
            posY = posY <= topEdge ? topEdge : bottomEdge;

            canChangeDirection = false;
            setTimeout(() => {
              canChangeDirection = true;
            }, config.changeDirectionDelay);
          }
        }

        screensaverElement.style.left = `${posX}px`;
        screensaverElement.style.top = `${posY}px`;

        animationIdRef.current = requestAnimationFrame(animate);
      };

      animationIdRef.current = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      const wasDesktop = isDesktop;
      isDesktop = window.innerWidth >= 1000;

      if (isDesktop && !wasDesktop) {
        startAnimation();
      } else if (!isDesktop && wasDesktop) {
        stopAnimation();
      }
    };

    window.addEventListener("resize", handleResize);

    if (isDesktop) {
      startAnimation();
    }

    return () => {
      stopAnimation();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="contact screensaver-container" ref={containerRef}>
      <div className="contact-copy">
        <div className="contact-col">
          <h2>Excellence in motion, results in focus</h2>
        </div>

        <div className="contact-col">
          <div className="contact-group">
            <p className="sm">Focus</p>
            <p>Digital Transformation</p>
            <p>Strategic Solutions</p>
            <p>Business Excellence</p>
          </div>

          <div className="contact-group">
            <p className="sm">Base</p>
            <p>Global Operations</p>
          </div>

          <div className="contact-mail">
            <Link href="/contact">
              contact@theelites.com
            </Link>
          </div>

          <div className="contact-group">
            <p className="sm">Credits</p>
            <p>Created by The Elites</p>
            <p>Edition 2025</p>
          </div>
        </div>
      </div>

      <div className="contact-footer">
        <div className="container">
          <p className="sm">Driven by Innovation</p>

          <div className="contact-socials">
            <Link
              className="sm"
              href="https://www.instagram.com/"
              target="_blank"
            >
              Instagram
            </Link>

            <Link
              className="sm"
              href="https://www.linkedin.com/"
              target="_blank"
            >
              LinkedIn
            </Link>

            <Link
              className="sm"
              href="https://twitter.com/"
              target="_blank"
            >
              Twitter
            </Link>
          </div>
          <p className="sm">&copy; The Elites</p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
