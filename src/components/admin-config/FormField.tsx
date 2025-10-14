'use client';

import React from 'react';
import { ConfigField } from '@/config/opura-config';

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
    const shouldShow = Object.entries(field.visibleIf).every(
      ([key, expectedValue]) => formData[key] === expectedValue
    );
    if (!shouldShow) return null;
  }

  switch (field.type) {
    case 'text':
      return (
        <input
          type="text"
          value={value ?? field.default ?? ''}
          onChange={(e) => onChange(field.key, e.target.value)}
          placeholder={field.label}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground shadow-sm focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/30"
        />
      );
    case 'textarea':
      return (
        <textarea
          value={value ?? field.default ?? ''}
          onChange={(e) => onChange(field.key, e.target.value)}
          rows={3}
          placeholder={field.label}
          className="w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground shadow-sm focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/30"
        />
      );
    case 'dropdown':
      return (
        <select
          value={value ?? field.default ?? ''}
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
            value={value ?? field.default ?? '#0EA5E9'}
            onChange={(e) => onChange(field.key, e.target.value)}
            className="h-8 w-12 cursor-pointer rounded border border-input bg-background"
          />
          <input
            type="text"
            value={value ?? field.default ?? '#0EA5E9'}
            onChange={(e) => onChange(field.key, e.target.value)}
            placeholder="#0EA5E9"
            className="flex-1 rounded-md border border-input bg-background px-3 py-2 font-mono text-sm text-foreground shadow-sm focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/30"
          />
        </div>
      );
    case 'toggle': {
      const on = value ?? field.default;
      return (
        <button
          type="button"
          onClick={() => onChange(field.key, !on)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-ring/40 ${
            on ? 'bg-primary' : 'bg-muted'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform ${
              on ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      );
    }
    case 'number':
      return (
        <input
          type="number"
          value={value ?? field.default ?? 0}
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
            value={value ?? field.default ?? 0}
            onChange={(e) => onChange(field.key, parseFloat(e.target.value))}
            className="slider h-2 w-full cursor-pointer appearance-none rounded-lg bg-muted"
          />
          <div className="text-center text-sm text-muted-foreground">
            {value ?? field.default ?? 0}
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
    default:
      return null;
  }
}