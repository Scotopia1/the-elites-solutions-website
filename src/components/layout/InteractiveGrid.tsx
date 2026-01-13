/**
 * InteractiveGrid Component
 *
 * Mouse-reactive background grid that highlights blocks on hover.
 * Creates a subtle, premium micro-interaction effect.
 *
 * Features:
 * - 60px grid blocks covering viewport
 * - Mouse proximity detection (120px radius)
 * - 300ms fade-out animation
 * - Disabled on mobile (< 768px) for performance
 * - Uses requestAnimationFrame for smooth updates
 *
 * Source: CGMWTNOV2025 (Orbit Matter) project
 * Adapted to React + TypeScript
 */

"use client";

import { useEffect, useRef } from "react";
import styles from "./InteractiveGrid.module.css";

const GRID_BLOCK_SIZE = 60;
const GRID_HIGHLIGHT_DURATION = 300;

interface GridBlock {
  element: HTMLDivElement;
  x: number;
  y: number;
  gridX: number;
  gridY: number;
  highlightEndTime: number;
}

export function InteractiveGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const blocksRef = useRef<GridBlock[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, radius: GRID_BLOCK_SIZE * 2 });
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      console.warn('[InteractiveGrid] Container not found');
      return;
    }

    // Disable on mobile for performance
    if (window.innerWidth < 768) {
      console.log('[InteractiveGrid] Disabled on mobile');
      return;
    }

    const resetGrid = () => {
      // Properly remove all child elements instead of using innerHTML
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      blocksRef.current = [];

      const gridWidth = window.innerWidth;
      const gridHeight = window.innerHeight;
      const gridCols = Math.ceil(gridWidth / GRID_BLOCK_SIZE);
      const gridRows = Math.ceil(gridHeight / GRID_BLOCK_SIZE);
      const offsetX = (gridWidth - gridCols * GRID_BLOCK_SIZE) / 2;
      const offsetY = (gridHeight - gridRows * GRID_BLOCK_SIZE) / 2;

      for (let row = 0; row < gridRows; row++) {
        for (let col = 0; col < gridCols; col++) {
          const blockPosX = col * GRID_BLOCK_SIZE + offsetX;
          const blockPosY = row * GRID_BLOCK_SIZE + offsetY;
          createGridBlock(container, blockPosX, blockPosY, col, row);
        }
      }

      console.log(`[InteractiveGrid] Created ${blocksRef.current.length} blocks (${gridCols}x${gridRows})`);
    };

    const createGridBlock = (
      container: HTMLDivElement,
      posX: number,
      posY: number,
      gridX: number,
      gridY: number
    ) => {
      const block = document.createElement("div");
      block.classList.add(styles.block);
      block.style.width = `${GRID_BLOCK_SIZE}px`;
      block.style.height = `${GRID_BLOCK_SIZE}px`;
      block.style.left = `${posX}px`;
      block.style.top = `${posY}px`;
      container.appendChild(block);

      blocksRef.current.push({
        element: block,
        x: posX + GRID_BLOCK_SIZE / 2,
        y: posY + GRID_BLOCK_SIZE / 2,
        gridX,
        gridY,
        highlightEndTime: 0,
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      addHighlights();
    };

    const handleMouseOut = () => {
      mouseRef.current.x = 0;
      mouseRef.current.y = 0;
    };

    const addHighlights = () => {
      const { x, y, radius } = mouseRef.current;
      if (!x || !y) return;

      let closest: GridBlock | null = null;
      let closestDist = Infinity;

      for (const block of blocksRef.current) {
        const dx = x - block.x;
        const dy = y - block.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < closestDist) {
          closestDist = dist;
          closest = block;
        }
      }

      if (!closest || closestDist > radius) return;

      const currentTime = Date.now();
      closest.element.classList.add(styles.highlight);
      closest.highlightEndTime = currentTime + GRID_HIGHLIGHT_DURATION;

      // Optionally highlight adjacent neighbors (cluster effect)
      const gridClusterSize = Math.floor(Math.random() * 1) + 1;
      let currentBlock = closest;
      const highlightedBlocks = [closest];

      for (let i = 0; i < gridClusterSize; i++) {
        const neighbors = blocksRef.current.filter((neighbor) => {
          if (highlightedBlocks.includes(neighbor)) return false;

          const dx = Math.abs(neighbor.gridX - currentBlock.gridX);
          const dy = Math.abs(neighbor.gridY - currentBlock.gridY);

          return dx <= 1 && dy <= 1;
        });

        if (neighbors.length === 0) break;

        const randomNeighbor =
          neighbors[Math.floor(Math.random() * neighbors.length)];

        randomNeighbor.element.classList.add(styles.highlight);
        randomNeighbor.highlightEndTime =
          currentTime + GRID_HIGHLIGHT_DURATION + i * 10;

        highlightedBlocks.push(randomNeighbor);
        currentBlock = randomNeighbor;
      }
    };

    const updateHighlights = () => {
      const currentTime = Date.now();

      blocksRef.current.forEach((block) => {
        if (block.highlightEndTime > 0 && currentTime > block.highlightEndTime) {
          block.element.classList.remove(styles.highlight);
          block.highlightEndTime = 0;
        }
      });

      animationFrameRef.current = requestAnimationFrame(updateHighlights);
    };

    // Initialize grid
    resetGrid();
    window.addEventListener("resize", resetGrid);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseOut);
    animationFrameRef.current = requestAnimationFrame(updateHighlights);

    // Cleanup
    return () => {
      window.removeEventListener("resize", resetGrid);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseOut);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return <div ref={containerRef} className={styles.grid} aria-hidden="true" />;
}
