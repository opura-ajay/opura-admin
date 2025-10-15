'use client';

import { Bot, Save, RotateCcw, Upload } from 'lucide-react';

export function HeaderBar({
  onSave,
  onRollback,
  onPublish,
}: {
  onSave: () => void;
  onRollback: () => void;
  onPublish: () => void;
}) {
  return (
    <div className="sticky top-0 z-40 border-b border-border bg-card/80 px-3 py-2 shadow-sm backdrop-blur sm:px-4">
      <div className="mx-auto flex max-w-screen-2xl flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
        {/* Title + Subtitle */}
        <div className="w-full sm:w-auto">
          <h1 className="flex items-center text-lg font-bold text-card-foreground sm:text-2xl">
            <Bot className="mr-2 h-6 w-6 text-blue-600 dark:text-blue-500 sm:mr-3 sm:h-8 sm:w-8" />
            <span className="truncate">Opura Bot Admin Console</span>
          </h1>
          <p className="mt-0.5 line-clamp-2 text-sm text-muted-foreground sm:mt-1 sm:text-base">
            Configure chatbot design, tone, and AI behaviour.
          </p>
        </div>

        {/* Actions */}
        <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:justify-end">
          <button
            onClick={onSave}
            className="inline-flex items-center rounded-lg bg-blue-600 px-3 py-2 text-sm text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 sm:px-4 sm:text-base"
          >
            <Save className="mr-2 h-4 w-4" />
            <span className="hidden xs:inline">Save</span>
            <span className="xs:hidden">Save</span>
          </button>

          <button
            onClick={onRollback}
            className="inline-flex items-center rounded-lg bg-muted px-3 py-2 text-sm text-foreground transition-colors hover:opacity-90 sm:px-4 sm:text-base"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Rollback Config</span>
            <span className="sm:hidden">Rollback</span>
          </button>

          <button
            onClick={onPublish}
            className="inline-flex items-center rounded-lg bg-emerald-600 px-3 py-2 text-sm text-white transition-colors hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 sm:px-4 sm:text-base"
          >
            <Upload className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Publish</span>
            <span className="sm:hidden">Publish</span>
          </button>
        </div>
      </div>
    </div>
  );
}