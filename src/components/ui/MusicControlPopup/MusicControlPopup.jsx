/* FILE: MusicControlPopup.jsx
   DATE: 05-Mar-26
   ============================================================================
   MUSIC CONTROL POPUP COMPONENT
   Surge-on Up — surgeonup.com

   Location: src/components/ui/MusicControlPopup/MusicControlPopup.jsx

   PURPOSE:
   Modal overlay for controlling the music player.
   Shown when the user clicks the music note icon in the Header.
   Only renders if music is enabled (user opted in on welcome popup).

   FEATURES:
   - Track name display with pulsing music note
   - Volume slider (0–100%)
   - Previous / Play-Pause / Next controls
   - Close button
   ============================================================================ */

import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap'; // Bootstrap Modal and Button components
import { useMusic } from '@/context/MusicContext'; // Music state and controls from context
import styles from './MusicControlPopup.module.css'; // CSS module — scoped styles

export default function MusicControlPopup({ show, onHide }) {
  // show: boolean — controls modal visibility (passed from Header state)
  // onHide: function — callback to close modal (sets showMusicControl to false in Header)

  // ========== MUSIC CONTEXT ==========
  const {
    isPlaying,
    currentTrack, // { id, name, url } — currently playing track
    volume,
    togglePlayPause,
    playNextTrack,
    playPreviousTrack,
    handleVolumeChange, // (newVolume: number) => void
    musicEnabled
  } = useMusic();

  // ========== GUARD: ONLY RENDER IF MUSIC IS ENABLED ==========
  if (!musicEnabled) return null; // Do not render if user has not opted in to music

  // ========== RENDER ==========
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered // Vertically and horizontally centred in viewport
      className={styles.musicModal}
      size="sm" // Small modal — compact player UI
    >

      {/* ========== MODAL HEADER ========== */}
      <Modal.Header closeButton className={styles.modalHeader}>
        {/* closeButton adds the × button — triggers onHide */}
        <Modal.Title className={styles.modalTitle}>Music Player</Modal.Title>
      </Modal.Header>

      {/* ========== MODAL BODY ========== */}
      <Modal.Body className={styles.modalBody}>

        {/* TRACK INFO — name and pulsing music note */}
        <div className={styles.trackInfo}>
          <div className={styles.trackIcon}>🎵</div> {/* Animates with CSS pulse keyframe */}
          <div className={styles.trackName}>{currentTrack.name}</div> {/* e.g. "Erik Satie Gymnopedie No1" */}
        </div>

        {/* VOLUME CONTROL — range slider 0–1, displayed as 0–100% */}
        <div className={styles.volumeControl}>
          <span className={styles.volumeIcon}>🔊</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01" // Fine granularity — 100 steps between 0 and 1
            value={volume}
            onChange={(e) => handleVolumeChange(parseFloat(e.target.value))} // Pass numeric value to context
            className={styles.volumeSlider}
          />
          <span className={styles.volumeValue}>{Math.round(volume * 100)}%</span> {/* Convert 0–1 to readable percentage */}
        </div>

        {/* PLAYBACK CONTROLS — Previous | Play/Pause | Next */}
        <div className={styles.controls}>

          <Button
            variant="outline-primary"
            className={styles.controlBtn}
            onClick={playPreviousTrack} // Jumps to a random different track (not truly "previous")
          >
            ⏮️
          </Button>

          <Button
            variant="primary"
            className={styles.playBtn}
            onClick={togglePlayPause} // Toggles play/pause state in context and audio element
          >
            {isPlaying ? '⏸️' : '▶️'} {/* Dynamic icon based on current play state */}
          </Button>

          <Button
            variant="outline-primary"
            className={styles.controlBtn}
            onClick={playNextTrack} // Advances to a random different track
          >
            ⏭️
          </Button>

        </div>

        {/* CLOSE BUTTON */}
        <div className={styles.closeButtonContainer}>
          <Button
            variant="outline-danger"
            className={styles.closeBtn}
            onClick={onHide} // Calls the onHide callback from Header to hide modal
          >
            ✕ Close
          </Button>
        </div>

      </Modal.Body>
    </Modal>
  );
}
