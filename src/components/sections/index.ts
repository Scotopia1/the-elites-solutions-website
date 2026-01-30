/**
 * Section Components - Barrel Export
 *
 * Production-quality reusable section components with:
 * - GSAP animations
 * - Responsive design
 * - Accessibility features
 * - Orbit Matter aesthetic
 */

export { HeroSection } from './HeroSection';
export type { HeroSectionProps } from './HeroSection';

export { StatsSection } from './StatsSection';
export { CTASection } from './CTASection';

export { TeamSection } from './TeamSection';
export type { TeamMember, TeamSectionProps } from './TeamSection';

export { RoutineSlider } from './RoutineSlider';
export type { Step, RoutineSliderProps } from './RoutineSlider';

export { IntroSection } from './IntroSection';
export type { IntroSectionProps } from './IntroSection';

// Export examples for development/testing
export {
  TeamSectionExample,
  TeamSectionManual,
  TeamSectionFast,
  TeamSectionCustom,
  TeamSectionSingle,
} from './TeamSection.example';
