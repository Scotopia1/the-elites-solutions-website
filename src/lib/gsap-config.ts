'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * Device Capabilities Interface
 * Provides comprehensive device detection for animation optimization
 */
export interface DeviceCapabilities {
  /** Viewport width < 768px */
  isMobile: boolean;
  /** Viewport width 768px - 1023px */
  isTablet: boolean;
  /** Viewport width >= 1024px */
  isDesktop: boolean;
  /** Touch device detection */
  isTouch: boolean;
  /** Low-end device detection (< 4 CPU cores or < 4GB RAM) */
  isLowEnd: boolean;
  /** WebGL support */
  hasWebGL: boolean;
  /** User prefers reduced motion */
  prefersReducedMotion: boolean;
  /** iOS device */
  isIOS: boolean;
  /** Safari browser */
  isSafari: boolean;
  /** Screen pixel ratio */
  devicePixelRatio: number;
}

/**
 * Animation Configuration Interface
 * Device-aware animation settings for optimal performance
 */
export interface AnimationConfig {
  /** Optimized particle count based on device capability */
  particleCount: number;
  /** Target FPS (30 for mobile, 60 for desktop) */
  targetFPS: number;
  /** Enable parallax effects */
  enableParallax: boolean;
  /** Enable 3D transforms */
  enable3DTransforms: boolean;
  /** Enable ScrollTrigger pinning */
  enablePinning: boolean;
  /** Enable hover effects */
  enableHoverEffects: boolean;
  /** Enable mouse tracking */
  enableMouseTracking: boolean;
  /** GSAP scrub smoothing value */
  scrubSmoothing: number;
  /** Stagger delay between animations */
  staggerDelay: number;
  /** Viewport width < 768px */
  isMobile: boolean;
}

// Cache device capabilities to avoid repeated detection
let cachedCapabilities: DeviceCapabilities | null = null;
let cachedConfig: AnimationConfig | null = null;

/**
 * Detect comprehensive device capabilities
 * Results are cached for performance
 *
 * @returns DeviceCapabilities object with all detection flags
 */
export function detectDeviceCapabilities(): DeviceCapabilities {
  // Return cached result if available
  if (cachedCapabilities) return cachedCapabilities;

  // SSR fallback
  if (typeof window === 'undefined') {
    return {
      isMobile: false,
      isTablet: false,
      isDesktop: true,
      isTouch: false,
      isLowEnd: false,
      hasWebGL: false,
      prefersReducedMotion: false,
      isIOS: false,
      isSafari: false,
      devicePixelRatio: 1,
    };
  }

  // Viewport detection
  const viewportWidth = window.innerWidth;
  const isMobile = viewportWidth < 768;
  const isTablet = viewportWidth >= 768 && viewportWidth < 1024;
  const isDesktop = viewportWidth >= 1024;

  // Touch detection
  const isTouch =
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    // @ts-ignore - Legacy IE detection
    navigator.msMaxTouchPoints > 0;

  // Low-end device detection
  let isLowEnd = false;
  try {
    // @ts-ignore - navigator.hardwareConcurrency is not in TS lib yet
    const cpuCores = navigator.hardwareConcurrency || 4;
    // @ts-ignore - performance.memory is Chrome-specific
    const memoryGB = (navigator as any).deviceMemory || 4;
    isLowEnd = cpuCores < 4 || memoryGB < 4;
  } catch (e) {
    // Fallback: Assume not low-end if detection fails
    isLowEnd = false;
  }

  // WebGL detection
  let hasWebGL = false;
  try {
    const canvas = document.createElement('canvas');
    hasWebGL =
      !!window.WebGLRenderingContext &&
      !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
  } catch (e) {
    hasWebGL = false;
  }

  // Reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // iOS detection
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  // Safari detection
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  // Device pixel ratio
  const devicePixelRatio = window.devicePixelRatio || 1;

  // Cache and return
  cachedCapabilities = {
    isMobile,
    isTablet,
    isDesktop,
    isTouch,
    isLowEnd,
    hasWebGL,
    prefersReducedMotion,
    isIOS,
    isSafari,
    devicePixelRatio,
  };

  return cachedCapabilities;
}

/**
 * Get device-optimized animation configuration
 * Results are cached for performance
 *
 * @returns AnimationConfig object with optimized settings
 *
 * @example
 * const config = getAnimationConfig();
 * const particleCount = config.particleCount; // 10, 20, or 80 based on device
 */
export function getAnimationConfig(): AnimationConfig {
  // Return cached result if available
  if (cachedConfig) return cachedConfig;

  const device = detectDeviceCapabilities();

  // Particle count optimization
  // Low-end: 10 particles (87.5% reduction)
  // Mobile: 20 particles (75% reduction)
  // Desktop: 80 particles (full)
  let particleCount = 80;
  if (device.isLowEnd) {
    particleCount = 10;
  } else if (device.isMobile) {
    particleCount = 20;
  }

  // FPS target
  // Mobile: 30fps (battery saving)
  // Desktop: 60fps (smooth)
  const targetFPS = device.isMobile || device.isLowEnd ? 30 : 60;

  // Feature toggles
  const enableParallax = !device.isMobile && !device.prefersReducedMotion;
  const enable3DTransforms = !device.isTouch && !device.prefersReducedMotion && device.hasWebGL;
  const enablePinning = !device.isMobile;
  const enableHoverEffects = !device.isTouch;
  const enableMouseTracking = !device.isTouch && !device.prefersReducedMotion;

  // GSAP tuning
  const scrubSmoothing = device.isMobile || device.isLowEnd ? 0.3 : 1;
  const staggerDelay = device.isLowEnd ? 0.05 : 0.12;

  // Cache and return
  cachedConfig = {
    particleCount,
    targetFPS,
    enableParallax,
    enable3DTransforms,
    enablePinning,
    enableHoverEffects,
    enableMouseTracking,
    scrubSmoothing,
    staggerDelay,
    isMobile: device.isMobile,
  };

  return cachedConfig;
}

/**
 * Check if animations should be completely disabled
 * Respects user's reduced motion preference
 *
 * @returns true if animations should be disabled
 *
 * @example
 * if (shouldDisableAnimation()) return null; // Don't render animated component
 */
export function shouldDisableAnimation(): boolean {
  return detectDeviceCapabilities().prefersReducedMotion;
}

/**
 * Invalidate device capability cache
 * Call this on window resize to recalculate capabilities
 */
export function invalidateDeviceCache(): void {
  cachedCapabilities = null;
  cachedConfig = null;
}

// Listen for resize events to invalidate cache
if (typeof window !== 'undefined') {
  let resizeTimeout: ReturnType<typeof setTimeout>;
  window.addEventListener('resize', () => {
    // Debounce resize events
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      invalidateDeviceCache();
    }, 250);
  });
}

/**
 * Initialize GSAP ScrollTrigger with iOS-optimized global config
 * Call this once in your root layout or main provider
 */
export function initializeGSAP() {
  ScrollTrigger.config({
    // Prevent ScrollTrigger from recalculating on iOS address bar show/hide
    ignoreMobileResize: true,

    // Sync interval for smooth Lenis integration (60fps)
    syncInterval: 17,

    // Auto-refresh on window resize (desktop)
    autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
  });

  // Sync ScrollTrigger with Lenis smooth scrolling
  if (typeof window !== 'undefined') {
    ScrollTrigger.defaults({
      scroller: window,
    });
  }
}

/**
 * Get device-specific scrub value for ScrollTrigger
 * Use this in individual ScrollTrigger instances instead of hardcoding scrub: 1
 */
export function getScrollTriggerScrub(defaultScrub: number | boolean = 1): number | boolean {
  if (typeof window === 'undefined') return defaultScrub;

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  // iOS/Safari: Reduce scrub for lighter resistance
  if (isIOS || isSafari) {
    return typeof defaultScrub === 'number' ? Math.max(0.3, defaultScrub * 0.5) : 0.5;
  }

  return defaultScrub;
}
