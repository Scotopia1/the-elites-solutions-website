// Bento Grid Services - Type Definitions

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
}

export type CardState = 'collapsed' | 'hovered' | 'expanded';
export type ExpansionMode = 'inline' | 'modal';

export interface BentoGridState {
  expandedCardId: string | null;
  hoveredCardId: string | null;
  expansionMode: ExpansionMode;
  isAnimating: boolean;
  focusedCardIndex: number;
}

export interface BentoGridActions {
  expandCard: (id: string | null) => void;
  setHoveredCard: (id: string | null) => void;
  setFocusedIndex: (index: number) => void;
  closeExpanded: () => void;
}

export interface BentoGridContextType extends BentoGridState, BentoGridActions {
  cards: BentoServiceData[];
}
