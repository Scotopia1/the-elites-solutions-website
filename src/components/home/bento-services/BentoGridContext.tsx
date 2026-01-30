'use client';

import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useMemo,
  useEffect,
  ReactNode,
} from 'react';
import {
  BentoGridContextType,
  BentoGridState,
  BentoServiceData,
  ExpansionMode,
} from './types';

const BentoGridContext = createContext<BentoGridContextType | null>(null);

// Initial state
const initialState: BentoGridState = {
  expandedCardId: null,
  hoveredCardId: null,
  expansionMode: 'inline',
  isAnimating: false,
  focusedCardIndex: 0,
};

// Reducer actions
type Action =
  | { type: 'EXPAND_CARD'; payload: string | null }
  | { type: 'SET_HOVERED'; payload: string | null }
  | { type: 'SET_EXPANSION_MODE'; payload: ExpansionMode }
  | { type: 'SET_ANIMATING'; payload: boolean }
  | { type: 'SET_FOCUSED_INDEX'; payload: number };

function reducer(state: BentoGridState, action: Action): BentoGridState {
  switch (action.type) {
    case 'EXPAND_CARD':
      return { ...state, expandedCardId: action.payload, isAnimating: true };
    case 'SET_HOVERED':
      return { ...state, hoveredCardId: action.payload };
    case 'SET_EXPANSION_MODE':
      return { ...state, expansionMode: action.payload };
    case 'SET_ANIMATING':
      return { ...state, isAnimating: action.payload };
    case 'SET_FOCUSED_INDEX':
      return { ...state, focusedCardIndex: action.payload };
    default:
      return state;
  }
}

interface BentoGridProviderProps {
  children: ReactNode;
  cards: BentoServiceData[];
}

export function BentoGridProvider({ children, cards }: BentoGridProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Detect expansion mode based on viewport (1024px breakpoint)
  useEffect(() => {
    const checkViewport = () => {
      const isMobile = window.innerWidth < 1024;
      dispatch({
        type: 'SET_EXPANSION_MODE',
        payload: isMobile ? 'modal' : 'inline',
      });
    };

    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  // Lock body scroll when modal is open on mobile
  useEffect(() => {
    if (state.expandedCardId && state.expansionMode === 'modal') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [state.expandedCardId, state.expansionMode]);

  // Actions
  const expandCard = useCallback((id: string | null) => {
    dispatch({ type: 'EXPAND_CARD', payload: id });
    // Reset animating state after transition completes
    setTimeout(() => dispatch({ type: 'SET_ANIMATING', payload: false }), 500);
  }, []);

  const setHoveredCard = useCallback((id: string | null) => {
    dispatch({ type: 'SET_HOVERED', payload: id });
  }, []);

  const setFocusedIndex = useCallback((index: number) => {
    dispatch({ type: 'SET_FOCUSED_INDEX', payload: index });
  }, []);

  const closeExpanded = useCallback(() => {
    dispatch({ type: 'EXPAND_CARD', payload: null });
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      cards,
      expandCard,
      setHoveredCard,
      setFocusedIndex,
      closeExpanded,
    }),
    [state, cards, expandCard, setHoveredCard, setFocusedIndex, closeExpanded]
  );

  return (
    <BentoGridContext.Provider value={value}>
      {children}
    </BentoGridContext.Provider>
  );
}

// Custom hook with null check
export function useBentoGrid() {
  const context = useContext(BentoGridContext);
  if (!context) {
    throw new Error('useBentoGrid must be used within BentoGridProvider');
  }
  return context;
}

export default BentoGridContext;
