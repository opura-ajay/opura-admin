'use client';

import React from 'react';
import { ConfigField } from '@/config/admin-config';
import VoicePicker from './VoicePicker';

export function FormField({
  field,
  value,
  onChange,
  formData,
}: {
  field: ConfigField;
  value: any;
  onChange: (key: string, newValue: any) => void;
  formData: any;
}) {
  if (field.visibleIf) {
    const shouldShow = Object.entries(field.visibleIf ?? {}).every(
      ([key, expectedValue]) => formData[key] === expectedValue
    );
    if (!shouldShow) return null;
  }

  switch (field.type) {
    case 'text': {
      const maxLength = field.maxLength ?? 100;
      const currentValue = value ?? field.current_value ?? '';
      return (
        <div className="space-y-1">
          <input
            type="text"
            value={currentValue}
            maxLength={maxLength}
            onChange={(e) => onChange(field.key, e.target.value)}
            placeholder={field.label}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground shadow-sm focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/30"
          />
        </div>
      );
    }
    case 'textarea': {
      const maxLength = field.maxLength ?? 3000;
      const currentValue = value ?? field.current_value ?? '';
      return (
        <div className="space-y-1">
          <textarea
            value={currentValue}
            maxLength={maxLength}
            onChange={(e) => onChange(field.key, e.target.value)}
            rows={3}
            placeholder={field.label}
            className="w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground shadow-sm focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/30"
          />
        </div>
      );
    }
    case 'dropdown':
      return (
        <select
          value={value ?? field.current_value ?? ''}
          onChange={(e) => onChange(field.key, e.target.value)}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/30"
        >
          {field.options?.map((option) => (
            <option key={option} value={option}>
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </option>
          ))}
        </select>
      );
    case 'color':
      return (
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={value ?? field.current_value ?? '#0EA5E9'}
            onChange={(e) => onChange(field.key, e.target.value)}
            className="h-8 w-12 cursor-pointer rounded border border-input bg-background"
          />
          <input
            type="text"
            value={value ?? field.current_value ?? '#0EA5E9'}
            onChange={(e) => onChange(field.key, e.target.value)}
            placeholder="#0EA5E9"
            className="flex-1 rounded-md border border-input bg-background px-3 py-2 font-mono text-sm text-foreground shadow-sm focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/30"
          />
        </div>
      );
    case 'toggle': {
      const on = value ?? field.current_value;
      return (
        <button
          type="button"
          onClick={() => onChange(field.key, !on)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-ring/40 ${on ? 'bg-primary' : 'bg-muted'
            }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform ${on ? 'translate-x-6' : 'translate-x-1'
              }`}
          />
        </button>
      );
    }
    case 'number':
      return (
        <input
          type="number"
          value={value ?? field.current_value ?? 0}
          onChange={(e) => onChange(field.key, parseInt(e.target.value) || 0)}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/30"
        />
      );
    case 'slider':
      return (
        <div className="space-y-2">
          <input
            type="range"
            min={field.min ?? 0}
            max={field.max ?? 100}
            step={field.step ?? 1}
            value={value ?? field.current_value ?? 0}
            onChange={(e) => onChange(field.key, parseFloat(e.target.value))}
            className="slider h-2 w-full cursor-pointer appearance-none rounded-lg bg-muted"
          />
          <div className="text-center text-sm text-muted-foreground">
            {value ?? field.current_value ?? 0}
          </div>
        </div>
      );
    case 'object':
      return (
        <div className="space-y-4 rounded-lg bg-muted/50 p-4">
          {field.fields?.map((subField) => (
            <div key={subField.key}>
              <label className="mb-1 block text-sm font-medium text-foreground">
                {subField.label}
              </label>
              <FormField
                field={subField}
                value={value?.[subField.key]}
                onChange={(subKey, subValue) =>
                  onChange(field.key, { ...(value || {}), [subKey]: subValue })
                }
                formData={value || {}}
              />
            </div>
          ))}
        </div>
      );
    case 'list':
      { console.log('Rendering text field', field, value); }
      return (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 rounded-lg bg-muted/50 p-4">
            {(value || field.current_value || []).map((item: string, index: number) => (
              <div
                key={index}
                className="flex items-center gap-2 rounded-md bg-background px-3 py-1 text-sm"
              >
                <span>{item}</span>
                <button
                  type="button"
                  onClick={() => {
                    const newList = [...(value || field.current_value || [])];
                    newList.splice(index, 1);
                    onChange(field.key, newList);
                  }}
                  className="text-red-500 hover:text-red-600"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add new item..."
              className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground shadow-sm focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/30"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                  const newList = [...(value || field.current_value || [])];
                  newList.push(e.currentTarget.value.trim());
                  onChange(field.key, newList);
                  e.currentTarget.value = '';
                }
              }}
            />
            <button
              type="button"
              onClick={(e) => {
                const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                if (input && input.value.trim()) {
                  const newList = [...(value || field.current_value || [])];
                  newList.push(input.value.trim());
                  onChange(field.key, newList);
                  input.value = '';
                }
              }}
              className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90"
            >
              Add
            </button>
          </div>
        </div>
      );
    // case 'voice_preview':
    //   const voiceOptions = [
    //     { id: 'alloy', name: 'Alloy', description: 'Versatile, balanced voice' },
    //     { id: 'echo', name: 'Echo', description: 'Warm, natural voice' },
    //     { id: 'fable', name: 'Fable', description: 'Expressive, dynamic voice' },
    //     { id: 'onyx', name: 'Onyx', description: 'Deep, authoritative voice' },
    //     { id: 'nova', name: 'Nova', description: 'Energetic, bright voice' },
    //     { id: 'shimmer', name: 'Shimmer', description: 'Clear, professional voice' }
    //   ];
    //   const selectedVoice = voiceOptions.find(v => v.id === (value ?? field.current_value)) || voiceOptions[0];

    //   return (
    //     <div className="space-y-4">
    //       <select
    //         value={value ?? field.current_value}
    //         onChange={(e) => onChange(field.key, e.target.value)}
    //         className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/30"
    //       >
    //         {voiceOptions.map((voice) => (
    //           <option key={voice.id} value={voice.id}>
    //             {voice.name} - {voice.description}
    //           </option>
    //         ))}
    //       </select>
    //       <div className="flex items-center gap-4 rounded-lg bg-muted/50 p-4">
    //         <div className="flex-1">
    //           <p className="text-sm font-medium">{selectedVoice.name}</p>
    //           <p className="text-xs text-muted-foreground">{selectedVoice.description}</p>
    //         </div>
    //         <button
    //           type="button"
    //           onClick={() => {
    //             // Here you would typically call your OpenAI TTS API
    //             // For now, we'll just use the browser's speech synthesis as a placeholder
    //             const utterance = new SpeechSynthesisUtterance("This is a preview of the selected voice.");
    //             window.speechSynthesis.speak(utterance);
    //           }}
    //           className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90 flex items-center gap-2"
    //         >
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             width="16"
    //             height="16"
    //             viewBox="0 0 24 24"
    //             fill="none"
    //             stroke="currentColor"
    //             strokeWidth="2"
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //           >
    //             <path d="M11 5L6 9H2v6h4l5 4V5z" />
    //             <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    //             <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    //           </svg>
    //           Preview Voice
    //         </button>
    //       </div>
    //       <div className="text-xs text-muted-foreground">
    //         Note: For optimal voice quality, these samples use OpenAI&apos;s Text-to-Speech API.
    //       </div>
    //     </div>
    //   );
    case 'voice_preview': {
      return (
        <div className="space-y-2">
          <VoicePicker field={{key:field.key, current_value:field.current_value}} value={value ?? field.current_value} onChange={onChange} />
        </div>
      );
    }
    case 'image': {
      // Simple image upload field
      const currentValue = value ?? field.current_value ?? '';
      return (
        <div className="space-y-2">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = (ev) => {
                  onChange(field.key, ev.target?.result);
                };
                reader.readAsDataURL(file);
              }
            }}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/30"
          />
          {currentValue && (
            <img src={currentValue} alt="Bot Icon Preview" className="mt-2 h-12 w-12 rounded-full object-cover border" />
          )}
        </div>
      );
    }
    default:
      return null;
  }
}