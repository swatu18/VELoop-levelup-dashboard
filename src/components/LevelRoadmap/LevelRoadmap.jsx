import React, { useState, useRef, useEffect } from 'react';
import { 
  Award, Sparkles, ChevronLeft, ChevronRight, Check, Lock, 
  Shield, Zap, Gift, Compass, Trophy, Star, Eye 
} from 'lucide-react';
import { LEVEL_ROADMAP } from '../../data/levelData';
import { useDashboard } from '../../context/DashboardContext';
import { LevelBadge } from '../Badges/LevelBadge';
import { TIER_METADATA } from '../Badges/TierBadgeArt';
import styles from './LevelRoadmap.module.css';

export const LevelRoadmap = () => {
  const { user, currentXP, xpRemaining, progressPercentage } = useDashboard();
  const currentLvl = user?.currentLevel || 5;
  const [selectedLevel, setSelectedLevel] = useState(LEVEL_ROADMAP[currentLvl - 1] || LEVEL_ROADMAP[4]);
  const [inspectModalOpen, setInspectModalOpen] = useState(false);
  const scrollContainerRef = useRef(null);

  // Smooth scroll left/right
  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Center camera on the player's active level on load
  const scrollToCurrentLevel = () => {
    if (scrollContainerRef.current) {
      const activeCard = document.getElementById(`level-card-${currentLvl}`);
      if (activeCard) {
        const container = scrollContainerRef.current;
        const leftPos = activeCard.offsetLeft - (container.clientWidth / 2) + (activeCard.clientWidth / 2);
        container.scrollTo({ left: Math.max(0, leftPos), behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToCurrentLevel();
    }, 400);
    return () => clearTimeout(timer);
  }, [currentLvl]);

  const handleCardClick = (item) => {
    setSelectedLevel(item);
    setInspectModalOpen(true);
  };

  const selectedMeta = TIER_METADATA[selectedLevel?.level] || TIER_METADATA[5];

  return (
    <section className={styles.roadmapSection} id="roadmap-section">
      {/* ── Section Header with Navigation & Jump Controls ── */}
      <div className={styles.sectionHeader}>
        <div className={styles.titleGroup}>
          <div className={styles.headerIconWrap}>
            <Award size={22} className={styles.headerIcon} />
          </div>
          <div>
            <div className={styles.badgeTag}>PRESTIGE MILESTONES</div>
            <h2 className={styles.sectionTitle}>LEVEL PROGRESSION JOURNEY</h2>
            <p className={styles.helperText}>
              Ascend through 10 prestigious tiers • <strong>Level {currentLvl < 10 ? `0${currentLvl}` : currentLvl} Active</strong>
            </p>
          </div>
        </div>

        {/* Navigation Controls: Jump to Current Level + Left/Right Arrow Buttons */}
        <div className={styles.navControls}>
          <button 
            className={styles.jumpBtn}
            onClick={scrollToCurrentLevel}
            title="Center on current level"
          >
            <Compass size={14} className={styles.compassIcon} />
            <span>My Level (Lvl {currentLvl < 10 ? `0${currentLvl}` : currentLvl})</span>
          </button>

          <div className={styles.arrowGroup}>
            <button 
              className={styles.arrowBtn}
              onClick={() => scroll('left')}
              title="Scroll left"
              aria-label="Previous level cards"
            >
              <ChevronLeft size={18} />
            </button>
            <button 
              className={styles.arrowBtn}
              onClick={() => scroll('right')}
              title="Scroll right"
              aria-label="Next level cards"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Horizontal Scrolling Track ── */}
      <div className={styles.trackWrapper}>
        {/* Continuous Energy Line passing through all cards */}
        <div className={styles.connectingLine} />

        <div className={styles.scrollTrack} ref={scrollContainerRef}>
          {LEVEL_ROADMAP.slice(0, 10).map((item) => {
            const isCompleted = item.level < currentLvl;
            const isCurrent = item.level === currentLvl;
            const isNext = item.level === currentLvl + 1;
            const isLocked = item.level > currentLvl + 1;
            const meta = TIER_METADATA[item.level] || TIER_METADATA[5];

            return (
              <div
                key={item.level}
                id={`level-card-${item.level}`}
                className={[
                  styles.levelCard,
                  isCompleted ? styles.cardCompleted : '',
                  isCurrent ? styles.cardCurrent : '',
                  isNext ? styles.cardNext : '',
                  isLocked ? styles.cardLocked : '',
                ].join(' ')}
                onClick={() => handleCardClick(item)}
              >
                {/* Current Level Glowing Aura */}
                {isCurrent && <div className={styles.currentAuraGlow} />}

                {/* Card Header Status Pill */}
                <div className={styles.cardStatusRow}>
                  {isCompleted && (
                    <span className={styles.statusCompleted}>
                      <Check size={12} strokeWidth={3} />
                      <span>COMPLETED</span>
                    </span>
                  )}
                  {isCurrent && (
                    <span className={styles.statusCurrent}>
                      <Star size={12} className={styles.starPulse} />
                      <span>YOU ARE HERE</span>
                    </span>
                  )}
                  {isNext && (
                    <span className={styles.statusNext}>
                      <Zap size={12} />
                      <span>NEXT GOAL</span>
                    </span>
                  )}
                  {isLocked && (
                    <span className={styles.statusLocked}>
                      <Lock size={12} />
                      <span>LOCKED</span>
                    </span>
                  )}

                  <span className={styles.tierRarityText} style={{ color: meta.rarityColor || '#94A3B8' }}>
                    {meta.rarity || 'TIER'}
                  </span>
                </div>

                {/* Central 3D Metallic Badge Showcase */}
                <div className={styles.badgeContainer}>
                  <div className={styles.badgeSlot}>
                    <LevelBadge 
                      level={item.level} 
                      size="medium"
                      showStars={true} 
                      animated={isCurrent} 
                      withLaurel={isCurrent}
                    />
                  </div>
                </div>

                {/* Level Title & Theme Name */}
                <div className={styles.cardInfo}>
                  <span className={styles.levelNumberLabel}>
                    LEVEL {item.level < 10 ? `0${item.level}` : item.level}
                  </span>
                  <h3 className={styles.levelName}>{item.name}</h3>
                  <p className={styles.themeSubtitle}>{meta.themeName || meta.finish}</p>
                </div>

                {/* XP Requirement Bar */}
                <div className={styles.cardXpBox}>
                  <div className={styles.xpLabelRow}>
                    <span>XP Requirement</span>
                    <strong className={styles.xpValue}>
                      {isCompleted ? 'Unlocked' : `${item.maxXP.toLocaleString()} XP`}
                    </strong>
                  </div>
                  <div className={styles.miniProgressTrack}>
                    <div 
                      className={styles.miniProgressFill}
                      style={{
                        width: isCompleted ? '100%' : isCurrent ? `${progressPercentage}%` : '0%',
                        background: isCompleted ? '#10B981' : isCurrent ? 'linear-gradient(90deg, #F59E0B, #FEF08A)' : 'transparent'
                      }}
                    />
                  </div>
                </div>

                {/* Milestone Reward Pill */}
                <div className={styles.cardRewardRow}>
                  <div className={styles.rewardIconWrap}>
                    <Gift size={13} className={styles.giftIcon} />
                  </div>
                  <div className={styles.rewardTextWrap}>
                    <span className={styles.rewardSub}>Milestone Reward</span>
                    <strong className={styles.rewardTitle}>
                      {item.reward?.label || `${item.reward?.amount} ${item.reward?.type}`}
                    </strong>
                  </div>
                </div>

                {/* Bottom Card Footer Action */}
                <div className={styles.cardFooter}>
                  <span className={styles.inspectHint}>
                    <Eye size={12} />
                    <span>View Perks &amp; Lore</span>
                  </span>
                  <ChevronRight size={14} className={styles.footerChevron} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Inspection Detail Modal for Selected Level ── */}
      {inspectModalOpen && selectedLevel && (
        <div className={styles.modalOverlay} onClick={() => setInspectModalOpen(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button 
              className={styles.closeBtn}
              onClick={() => setInspectModalOpen(false)}
              aria-label="Close modal"
            >
              ✕
            </button>

            <div className={styles.modalBadgeCol}>
              <LevelBadge 
                level={selectedLevel.level} 
                size="large" 
                showStars={true} 
                withLaurel={true} 
                animated={true} 
              />
              <span className={styles.modalRarityBadge} style={{ backgroundColor: `${selectedMeta.rarityColor}25`, borderColor: selectedMeta.rarityColor, color: selectedMeta.rarityColor }}>
                {selectedMeta.rarity} PRESTIGE
              </span>
            </div>

            <div className={styles.modalDetailsCol}>
              <div className={styles.modalHeader}>
                <span className={styles.modalLevelTag}>
                  PRESTIGE LEVEL {selectedLevel.level < 10 ? `0${selectedLevel.level}` : selectedLevel.level}
                </span>
                <h3 className={styles.modalTitle}>{selectedLevel.name}</h3>
                <p className={styles.modalFinishText}>Forged in: {selectedMeta.finish}</p>
              </div>

              <p className={styles.modalDescription}>{selectedMeta.description}</p>

              {/* Reward Box */}
              <div className={styles.modalRewardCard}>
                <div className={styles.modalRewardLeft}>
                  <Gift size={20} className={styles.goldGiftIcon} />
                  <div>
                    <span className={styles.modalRewardLabel}>Unlock Reward</span>
                    <strong className={styles.modalRewardVal}>
                      {selectedLevel.reward?.label || `${selectedLevel.reward?.amount} ${selectedLevel.reward?.type}`}
                    </strong>
                  </div>
                </div>
                <div className={styles.modalXpRequirement}>
                  <span>Target XP</span>
                  <strong>{selectedLevel.maxXP.toLocaleString()} XP</strong>
                </div>
              </div>

              {/* Perks List */}
              <div className={styles.modalPerksSection}>
                <span className={styles.perksHeader}>UNLOCKED PRIVILEGES:</span>
                <ul className={styles.perksList}>
                  {selectedLevel.perks.map((perk, i) => (
                    <li key={i} className={styles.perkItem}>
                      <span className={styles.checkBullet}>✓</span>
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                className={styles.modalDoneBtn}
                onClick={() => setInspectModalOpen(false)}
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
export default LevelRoadmap;
