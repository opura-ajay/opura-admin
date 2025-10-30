'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

type VoiceOption = {
  id: string;
  name: string;
  gender?: 'Male' | 'Female';
  description: string;
};

const voiceOptions: VoiceOption[] = [
  { id: 'alloy', name: 'Alloy', gender: 'Male', description: 'Versatile, balanced voice' },
  { id: 'echo', name: 'Echo', gender: 'Male', description: 'Warm, natural voice' },
  { id: 'fable', name: 'Fable', gender: 'Male', description: 'Expressive, dynamic voice' },
  { id: 'onyx', name: 'Onyx', gender: 'Male', description: 'Deep, authoritative voice' },
  { id: 'nova', name: 'Nova', gender: 'Female', description: 'Energetic, bright voice' },
  { id: 'shimmer', name: 'Shimmer', gender: 'Female', description: 'Clear, professional voice' },
];

export default function VoicePicker({
  field,
  value,
  onChange,
}: {
  field: { key: string; current_value?: string | any};
  value?: string;
  onChange: (key: string, v: string) => void;
}) {
  const selectedId = value ?? field.current_value ?? voiceOptions[0].id;
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const selectedVoice = useMemo(
    () => voiceOptions.find((v) => v.id === selectedId) ?? voiceOptions[0],
    [selectedId],
  );

  useEffect(() => {
    return () => {
      // cleanup audio when unmounting
      if (audioRef.current) {
        audioRef.current.pause();
        URL.revokeObjectURL(audioRef.current.src);
        audioRef.current = null;
      }
    };
  }, []);

  const playPreview = async (voiceId: string) => {
    try {
      // stop current audio if playing
      if (audioRef.current) {
        audioRef.current.pause();
        URL.revokeObjectURL(audioRef.current.src);
        audioRef.current = null;
      }

      setLoadingId(voiceId);

      // Example: call your Next.js API route to fetch TTS securely
      // Create /api/tts?voice=<voiceId>&text=...
      // The API route should call OpenAI and return audio/mpeg
      const text = 'This is a preview of the selected voice.';
      const res = await fetch(
        `/api/tts?voice=${encodeURIComponent(voiceId)}&text=${encodeURIComponent(
          text,
        )}`,
      );

      if (!res.ok) {
        throw new Error(`TTS failed: ${res.status}`);
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audioRef.current = audio;
      await audio.play();
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-3">
      {/* <div className="flex items-center gap-2">
        <label className="text-sm font-medium">Voice</label>
        <span className="text-destructive">*</span>
        <span className="text-xs text-muted-foreground">Choose a voice and preview</span>
      </div> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
        {voiceOptions.map((v) => {
          const active = selectedId === v.id;
          return (
            <label
              key={v.id}
              className={[
                'group relative flex items-center justify-between rounded-xl border bg-card p-4 shadow-sm transition',
                active
                  ? 'border-primary ring-2 ring-primary/30 bg-primary/5'
                  : 'border-border hover:border-primary/40 hover:bg-accent/40',
              ].join(' ')}
            >
              {/* Left: radio + name */}
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className={[
                    'inline-flex h-5 w-5 items-center justify-center rounded-full border transition',
                    active ? 'border-primary' : 'border-muted-foreground/30',
                  ].join(' ')}
                >
                  <span
                    className={[
                      'h-2.5 w-2.5 rounded-full transition',
                      active ? 'bg-primary' : 'bg-transparent',
                    ].join(' ')}
                  />
                </span>

                <div className="min-w-0">
                  <div
                    className={[
                      'flex items-center gap-2 text-sm font-medium truncate',
                      active ? 'text-foreground' : 'text-foreground',
                    ].join(' ')}
                  >
                    {v.name}
                    {v.gender && (
                      <span className="text-xs text-muted-foreground">{v.gender}</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {v.description}
                  </p>
                </div>
              </div>

              {/* Right: play button */}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  playPreview(v.id);
                }}
                className={[
                  'flex h-9 w-9 items-center justify-center rounded-full border transition',
                  active
                    ? 'border-primary text-primary hover:bg-primary hover:text-primary-foreground'
                    : 'border-input text-primary hover:bg-primary hover:text-primary-foreground',
                ].join(' ')}
                aria-label={`Preview ${v.name}`}
              >
                {loadingId === v.id ? (
                  <svg
                    className="h-4 w-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M11 5L6 9H2v6h4l5 4V5z" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                  </svg>
                )}
              </button>

              {/* Hidden native radio for a11y */}
              <input
                type="radio"
                name="voice"
                value={v.id}
                checked={active}
                onChange={() => onChange(field.key, v.id)}
                className="sr-only"
              />
            </label>
          );
        })}
      </div>

      {/* <p className="text-xs text-muted-foreground">
        Note: Previews are generated via OpenAI Text-to-Speech for the best quality.
      </p> */}
    </div>
  );
}