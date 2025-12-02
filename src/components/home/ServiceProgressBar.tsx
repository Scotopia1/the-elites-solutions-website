import { forwardRef } from "react";

interface ProgressBarProps {
  progressRef: React.RefObject<HTMLDivElement>;
}

const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ progressRef }, ref) => (
    <div className="progress-bar" ref={ref}>
      <div className="progress" ref={progressRef}></div>
    </div>
  )
);

ProgressBar.displayName = "ProgressBar";

export default ProgressBar;
