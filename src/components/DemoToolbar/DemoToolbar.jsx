import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Sliders, 
  Sparkles, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  RotateCcw, 
  ChevronDown, 
  ChevronUp, 
  ChevronRight,
  ChevronLeft,
  X,
  Layers, 
  Gamepad2, 
  History, 
  Zap, 
  Award 
} from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import styles from './DemoToolbar.module.css';

export const DemoToolbar = () => {
  const { 
    demoState, 
    setDemoState, 
    activeScreen, 
    setActiveScreen, 
    triggerLevelUp, 
    resetDemo,
    user
  } = useDashboard();

  const [isExpanded, setIsExpanded] = useState(false);
  const [isDockedSide, setIsDockedSide] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [position, setPosition] = useState(null); // { x: number, y: number }
  const isDraggingRef = useRef(false);
  const dragStartOffsetRef = useRef({ x: 0, y: 0 });

  const navigate = useNavigate();
  const location = useLocation();
  const isLanding = !location.pathname.toLowerCase().includes('lvl-dashboard');

  const goToDashboardScreen = (screen) => {
    setActiveScreen(screen);
    setDemoState('normal');
    if (isLanding) {
      navigate('/Lvl-Dashboard');
    }
  };

  // Drag and drop handlers (Pointer Events: Works for both mouse and touch)
  const handlePointerDown = (e) => {
    if (e.target.closest('button') || e.target.closest('input')) return;
    isDraggingRef.current = true;
    const rect = e.currentTarget.getBoundingClientRect();
    dragStartOffsetRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const padding = 10;
    const newX = Math.max(padding, Math.min(window.innerWidth - 120, e.clientX - dragStartOffsetRef.current.x));
    const newY = Math.max(padding, Math.min(window.innerHeight - 60, e.clientY - dragStartOffsetRef.current.y));
    setPosition({ x: newX, y: newY });
  };

  const handlePointerUp = (e) => {
    isDraggingRef.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
  };

  // If dismissed completely, show a tiny floating restore pill
  if (isDismissed) {
    return (
      <button
        className={styles.restorePill}
        style={position ? { left: `${position.x}px`, top: `${position.y}px`, right: 'auto', bottom: 'auto' } : undefined}
        onClick={() => setIsDismissed(false)}
        title="Click to reopen Evaluator Bar"
      >
        <Sliders size={15} />
        <span>DEV</span>
      </button>
    );
  }

  // When docked to side, show a sleek miniature floating edge button (draggable)
  if (isDockedSide) {
    return (
      <div 
        className={styles.dockedSideTab}
        style={position ? { left: `${position.x}px`, top: `${position.y}px`, right: 'auto', bottom: 'auto' } : undefined}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onClick={() => setIsDockedSide(false)}
        title="Tap to Expand Evaluator Controls (Hold to drag anywhere)"
      >
        <Sliders size={14} className={styles.sliderIcon} />
        <span className={styles.dockedText}>DEV</span>
        <ChevronLeft size={14} />
      </div>
    );
  }

  return (
    <div 
      className={`${styles.toolbarWrapper} ${isExpanded ? styles.expanded : ''}`}
      style={position ? { left: `${position.x}px`, top: `${position.y}px`, right: 'auto', bottom: 'auto' } : undefined}
    >
      {/* Minimized Bar Header / Drag Handle */}
      <div 
        className={styles.toggleBar}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onClick={() => setIsExpanded(!isExpanded)}
        role="button"
        tabIndex={0}
        title="Click to expand/collapse • Hold and drag to move anywhere"
      >
        <div className={styles.toggleInfo}>
          <Sliders size={16} className={styles.sliderIcon} />
          <span className={styles.toggleTitle}>Evaluator Bar</span>
          <span className={styles.stateIndicator}>
            {demoState.toUpperCase()}
          </span>
        </div>

        <div className={styles.actionControlsRight}>
          <div className={styles.chevronWrap}>
            {isExpanded ? <ChevronDown size={15} /> : <ChevronUp size={15} />}
          </div>
          {/* Swipe / Tuck to side button */}
          <button 
            className={styles.dockBtn}
            onClick={(e) => { e.stopPropagation(); setIsDockedSide(true); }}
            title="Dock to side edge"
            aria-label="Dock to side"
          >
            <ChevronRight size={15} />
          </button>
          {/* Close / Dismiss button */}
          <button 
            className={styles.dockBtn}
            onClick={(e) => { e.stopPropagation(); setIsDismissed(true); }}
            title="Close Evaluator Bar"
            aria-label="Close"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Expanded Panel */}
      {isExpanded && (
        <div className={styles.panelContent}>
          {/* Row 1: Direct Screen Switchers */}
          <div className={styles.sectionBlock}>
            <span className={styles.blockLabel}>Navigate Screens:</span>
            <div className={styles.buttonRow}>
              <button 
                className={`${styles.navChip} ${isLanding ? styles.chipActive : ''}`}
                onClick={() => navigate('/')}
              >
                🏠 Landing
              </button>
              <button 
                className={`${styles.navChip} ${!isLanding && activeScreen === 'dashboard' ? styles.chipActive : ''}`}
                onClick={() => goToDashboardScreen('dashboard')}
              >
                📊 Dashboard
              </button>
              <button 
                className={`${styles.navChip} ${!isLanding && activeScreen === 'game' ? styles.chipActive : ''}`}
                onClick={() => goToDashboardScreen('game')}
              >
                🎮 Game
              </button>
              <button 
                className={`${styles.navChip} ${!isLanding && activeScreen === 'earn' ? styles.chipActive : ''}`}
                onClick={() => goToDashboardScreen('earn')}
              >
                💰 Earn More
              </button>
              <button 
                className={`${styles.navChip} ${!isLanding && activeScreen === 'activity' ? styles.chipActive : ''}`}
                onClick={() => goToDashboardScreen('activity')}
              >
                📜 Ledger
              </button>
            </div>
          </div>

          {/* Row 2: UX Demonstration States */}
          <div className={styles.sectionBlock}>
            <span className={styles.blockLabel}>Test UX States:</span>
            <div className={styles.buttonRow}>
              <button 
                className={`${styles.stateChip} ${demoState === 'normal' ? styles.chipActive : ''}`}
                onClick={() => setDemoState('normal')}
              >
                <CheckCircle size={13} />
                <span>Normal</span>
              </button>
              <button 
                className={`${styles.stateChip} ${demoState === 'loading' ? styles.chipActive : ''}`}
                onClick={() => setDemoState('loading')}
              >
                <Clock size={13} />
                <span>Skeleton</span>
              </button>
              <button 
                className={`${styles.stateChip} ${demoState === 'error' ? styles.chipActive : ''}`}
                onClick={() => setDemoState('error')}
              >
                <AlertTriangle size={13} />
                <span>Error</span>
              </button>
              <button 
                className={`${styles.stateChip} ${demoState === 'empty' ? styles.chipActive : ''}`}
                onClick={() => setDemoState('empty')}
              >
                <Layers size={13} />
                <span>Empty</span>
              </button>
            </div>
          </div>

          {/* Row 3: Action Triggers */}
          <div className={styles.sectionBlock}>
            <span className={styles.blockLabel}>Actions:</span>
            <div className={styles.buttonRow}>
              <button 
                className={styles.levelUpTriggerBtn}
                onClick={() => triggerLevelUp(6)}
              >
                <Sparkles size={14} />
                <span>Trigger Level Up!</span>
              </button>
              <button 
                className={styles.resetBtn}
                onClick={resetDemo}
              >
                <RotateCcw size={13} />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
