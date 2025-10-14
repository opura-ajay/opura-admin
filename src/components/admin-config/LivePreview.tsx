'use client';

import { Eye, MessageCircle, Minus, Brain, Users, BarChart3 } from 'lucide-react';
import React from 'react';

export function LivePreview({ formData }: { formData: any }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
      <h3 className="mb-4 flex items-center text-lg font-semibold text-card-foreground">
        <Eye className="mr-2 h-5 w-5" />
        Live Preview
      </h3>

      <div className="space-y-4">
        {/* Chat widget mockup */}
        <div className="rounded-lg border-2 border-dashed border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-4 dark:from-blue-500/10 dark:to-indigo-500/10">
          <div className="mb-3 flex items-center space-x-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
              <MessageCircle className="h-4 w-4" />
            </div>
            <span className="font-medium text-foreground">
              {formData.botIdentity?.name || 'Opura Bot'}
            </span>
            <button className="ml-auto">
              <Minus className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>

          <div className="space-y-3">
            <div className="rounded-lg bg-background p-3 shadow-sm">
              <p className="text-sm text-foreground">
                {formData.greeting || 'Hi there! Welcome to our store 👋'}
              </p>
            </div>

            <div className="ml-8 rounded-lg bg-blue-600 p-3 text-white dark:bg-blue-500">
              <p className="text-sm">
                Good afternoon! How may I assist you?
                {formData.allowSlang && formData.slangLevel === 'casual' && ' 😎'}
              </p>
            </div>
          </div>
        </div>

        {/* Config preview */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Theme Color:</span>
            <div className="flex items-center gap-2">
              <div
                className="h-4 w-4 rounded border border-border"
                style={{ backgroundColor: formData.themeColor || '#0EA5E9' }}
              />
              <span className="font-mono text-foreground">
                {formData.themeColor || '#0EA5E9'}
              </span>
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Position:</span>
            <span className="font-medium capitalize text-foreground">
              {formData.position || 'bottom-right'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">AI Model:</span>
            <span className="font-medium text-foreground">
              {formData.model || 'gpt-4o-mini'}
            </span>
          </div>
          {formData.allowSlang && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Slang Level:</span>
              <span className="font-medium capitalize text-foreground">
                {formData.slangLevel || 'minimal'}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}