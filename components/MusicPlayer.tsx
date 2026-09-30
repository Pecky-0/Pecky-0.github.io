"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { tracks } from "@/lib/music";

const TRACK_KEY = "bgm-track";
const VOLUME_KEY = "bgm-volume";
const DEFAULT_VOLUME = 0.5;

/** 导航栏背景音乐控制：按钮弹出面板（播放/暂停 + 选歌 + 音量 + 制作人署名）。选择与音量经 localStorage 记住。挂载前渲染占位避免水合不匹配。 */
export default function MusicPlayer() {
  const { t } = useLanguage();
  const audioRef = useRef<HTMLAudioElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(DEFAULT_VOLUME);

  useEffect(() => setMounted(true), []);

  // 挂载后恢复上次的选歌与音量
  useEffect(() => {
    if (!mounted) return;

    const audio = audioRef.current;
    if (!audio) return;

    const savedTrack = Number(localStorage.getItem(TRACK_KEY));
    if (Number.isInteger(savedTrack) && savedTrack >= 0 && savedTrack < tracks.length) {
      setTrackIndex(savedTrack);
    }

    const savedVolume = Number(localStorage.getItem(VOLUME_KEY));
    if (savedVolume > 0 && savedVolume <= 1) {
      setVolume(savedVolume);
      audio.volume = savedVolume;
    } else {
      audio.volume = DEFAULT_VOLUME;
    }

    return () => audio.pause();
  }, [mounted]);

  // 选歌或音量变化时持久化
  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem(TRACK_KEY, String(trackIndex));
  }, [mounted, trackIndex]);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem(VOLUME_KEY, String(volume));
  }, [mounted, volume]);

  // audio 元素挂载后或换歌时更新 src；正在播放则继续播新歌
  useEffect(() => {
    if (!mounted) return;

    const audio = audioRef.current;
    if (!audio) return;

    const wasPlaying = !audio.paused && !audio.ended;
    audio.src = encodeURI(tracks[trackIndex].src);
    audio.load();

    if (wasPlaying) {
      audio.play().catch(() => setPlaying(false));
    }
  }, [mounted, trackIndex]);

  // 点击面板外或按 Esc 关闭
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  const changeVolume = (value: number) => {
    setVolume(value);
    if (audioRef.current) audioRef.current.volume = value;
  };

  if (!mounted) {
    return <div className="size-8" aria-hidden />;
  }

  const track = tracks[trackIndex];

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t.music.toggleAria}
        aria-expanded={open}
        className="flex size-8 items-center justify-center rounded-md text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 w-64 rounded-lg border border-neutral-200 bg-white p-3 shadow-lg dark:border-neutral-800 dark:bg-neutral-950">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={togglePlay}
              aria-label={playing ? t.music.pauseAria : t.music.playAria}
              className="flex size-8 shrink-0 items-center justify-center rounded-md border border-neutral-200 text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
            >
              {playing ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M8 5.14v13.72c0 .8.87 1.3 1.56.88l11-6.86a1.04 1.04 0 0 0 0-1.76l-11-6.86A1.04 1.04 0 0 0 8 5.14z" />
                </svg>
              )}
            </button>
            <select
              aria-label={t.music.selectAria}
              value={trackIndex}
              onChange={(e) => setTrackIndex(Number(e.target.value))}
              className="h-8 min-w-0 flex-1 rounded-md border border-neutral-200 bg-transparent px-2 text-sm text-neutral-700 [color-scheme:light] focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300 dark:border-neutral-800 dark:text-neutral-300 dark:[color-scheme:dark] dark:focus-visible:ring-neutral-600"
            >
              {tracks.map((t2, i) => (
                <option key={t2.src} value={i}>
                  {t2.name}
                </option>
              ))}
            </select>
          </div>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={volume}
            onChange={(e) => changeVolume(Number(e.target.value))}
            aria-label={t.music.volumeAria}
            className="mt-3 w-full accent-neutral-600 dark:accent-neutral-300"
          />
          <p className="mt-2 text-xs text-neutral-400 dark:text-neutral-500">
            {t.music.credit.replace("{name}", track.producer)}
          </p>
        </div>
      )}
      <audio ref={audioRef} loop preload="none" hidden onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
    </div>
  );
}
