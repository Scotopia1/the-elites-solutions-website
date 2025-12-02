// Shared Bento Grid - Type Definitions

export interface GridPosition {
  colStart: number;
  colEnd: number;
  rowStart: number;
  rowEnd: number;
}

export interface ResponsiveGridPosition {
  mobile: GridPosition;
  tablet: GridPosition;
  desktop: GridPosition;
}

// Extended detail content for service modals
export interface ServiceDetailContent {
  overview: string;
  processSteps?: {
    step: string;
    title: string;
    description: string;
  }[];
  technologies?: string[];
  deliverables?: string[];
}

export interface BentoServiceData {
  id: string;
  phase: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  cta: {
    label: string;
    href: string;
  };
  accentColor: string;
  gridPosition: ResponsiveGridPosition;
  // Extended for services page modal
  detailContent?: ServiceDetailContent;
}

export type CardState = 'collapsed' | 'hovered' | 'expanded';
export type ExpansionMode = 'inline' | 'modal';
export type CTAMode = 'navigate' | 'modal';

export interface BentoGridState {
  expandedCardId: string | null;
  hoveredCardId: string | null;
  expansionMode: ExpansionMode;
  isAnimating: boolean;
  focusedCardIndex: number;
  // For full-screen detail modal on services page
  detailModalId: string | null;
}

export interface BentoGridActions {
  expandCard: (id: string | null) => void;
  setHoveredCard: (id: string | null) => void;
  setFocusedIndex: (index: number) => void;
  closeExpanded: () => void;
  // For full-screen detail modal
  openDetailModal: (id: string) => void;
  closeDetailModal: () => void;
}

export interface BentoGridContextType extends BentoGridState, BentoGridActions {
  cards: BentoServiceData[];
}

// Props for BentoCard component
export interface BentoCardProps {
  card: BentoServiceData;
  index: number;
  onLearnMore?: (cardId: string) => void;
  ctaMode?: CTAMode;
}

// Props for BentoGrid component
export interface BentoGridProps {
  onLearnMore?: (cardId: string) => void;
  ctaMode?: CTAMode;
}
