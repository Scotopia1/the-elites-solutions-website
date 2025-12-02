"use client";
import React from "react";
import { motion } from "framer-motion";
import "./TechStack.css";

const techLogos = [
  { name: "React", icon: "react" },
  { name: "Node.js", icon: "node" },
  { name: "Python", icon: "python" },
  { name: "Amazon Web Services", icon: "aws" },
  { name: "Docker", icon: "docker" },
];

const SVGIcon = ({ icon, ...props }) => {
    switch (icon) {
      case "react":
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-11.5 -10.23174 23 20.46348" {...props}><circle cx="0" cy="0" r="2.05" fill="#61DAFB"></circle><g stroke="#61DAFB" strokeWidth="1" fill="none"><ellipse rx="11" ry="4.2"></ellipse><ellipse rx="11" ry="4.2" transform="rotate(60)"></ellipse><ellipse rx="11" ry="4.2" transform="rotate(120)"></ellipse></g></svg>
        );
      case "node":
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" {...props}><path fill="#8CC84B" d="M128 0L0 221.705h256zM128 27.359L23.063 210.705H128z"></path></svg>
        );
      case "python":
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}><g fill="#3776AB"><path d="M12 24a12 12 0 1 1 12-12 12 12 0 0 1-12 12zm0-22a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"></path><path d="M12 9a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h3v2H9v-2a3 3 0 0 1 3-3 3 3 0 0 1 0-6H9v2h3a3 3 0 0 0 0 6h-2a3 3 0 0 0-3 3v3h12v-2h-3v-2h3v-2a3 3 0 0 0-3-3 3 3 0 0 0-3-3z"></path></g></svg>
        );
      case "aws":
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}><path fill="#FF9900" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.21 15.29l-3.54-3.54 1.41-1.41 2.12 2.12 4.24-4.24 1.41 1.41-5.65 5.66z"></path></svg>
        );
      case "docker":
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}><path fill="#0db7ed" d="M23.62 9.38c-.2-1.32-.83-2.5-1.78-3.33-1.02-.9-2.2-1.4-3.55-1.4-1.32 0-2.5.47-3.48 1.2s-1.6 1.7-1.8 2.82c-.03.2-.05.4-.05.6v.05h-1.6V7.7c0-1.2-.47-2.28-1.28-3.1s-1.88-1.22-3.1-1.22-2.3.4-3.12 1.2S.4 6.5.4 7.7v7.5c0 1.2.4 2.28 1.2 3.08s1.88 1.22 3.12 1.22c1.2 0 2.28-.4 3.1-1.2s1.28-1.88 1.28-3.1v-1.6h1.6c.02.2.03.4.05.6.2 1.12.8 2.1 1.8 2.82s2.18 1.2 3.5 1.2 2.53-.5 3.55-1.4c.95-.82 1.58-2 1.78-3.3.15-.98 0-1.95-.4-2.82s-1.08-1.6-1.9-2.1zM8.15 15.2c0 .6-.2 1.1-.58 1.5-.38.4-.88.6-1.5.6s-1.12-.2-1.5-.6-.58-.9-.58-1.5V9.3c0-.6.2-1.1.58-1.5s.88-.6 1.5-.6 1.12.2 1.5.6.58.9.58 1.5v5.9zm11.3-.1c0 .6-.2 1.1-.58 1.5s-.88.6-1.5.6-1.12-.2-1.5-.6-.58-.9-.58-1.5V9.3c0-.6.2-1.1.58-1.5s.88-.6 1.5-.6 1.12.2 1.5.6.58.9.58 1.5v5.8z"></path></svg>
        );
      default:
        return null;
    }
  };
  

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 0.6,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
      duration: 0.5,
    },
  },
};

const TechStack = () => {
  return (
    <div className="tech-stack-section">
      <motion.div
        className="tech-stack-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={containerVariants}
      >
        {techLogos.map((tech) => (
          <motion.div key={tech.name} className="tech-item" variants={itemVariants}>
            <SVGIcon icon={tech.icon} className="tech-icon" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default TechStack;
