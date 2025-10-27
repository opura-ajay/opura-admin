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
<div className="sticky top-0 border-b border-border bg-card/80 px-3 py-2 shadow-sm backdrop-blur sm:px-4">
  <div className="mx-auto flex max-w-screen-2xl flex-col items-center gap-2 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
    {/* Title + Subtitle */}
    <div className="w-full sm:w-auto">
      <h1 className="flex items-center justify-center text-lg font-bold text-card-foreground sm:justify-start sm:text-xl">
        <Bot className="mr-2 h-6 w-6 text-blue-600 dark:text-blue-500 sm:mr-3 sm:h-8 sm:w-8" />
        <span className="truncate">Myra Bot Admin Console</span>
      </h1>
      <p className="mt-0.5 line-clamp-2 text-sm text-muted-foreground sm:mt-1 sm:text-sm">
        Configure chatbot design, tone, and AI behaviour.
      </p>
    </div>

    {/* Actions */}
    <div className="flex w-full flex-wrap items-center justify-center gap-2 sm:w-auto sm:justify-end">
      <button
        onClick={onSave}
        className="inline-flex items-center rounded-lg bg-blue-600 px-3 py-2 text-sm text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 sm:px-4"
      >
        <Save className="mr-2 h-4 w-4" />
        <span>Save</span>
      </button>

      <button
        onClick={onRollback}
        className="inline-flex items-center rounded-lg bg-muted px-3 py-2 text-sm text-foreground transition-colors hover:opacity-90 sm:px-4"
      >
        <RotateCcw className="mr-2 h-4 w-4" />
        <span className="sm:hidden">Rollback</span>
        <span className="hidden sm:inline">Rollback Config</span>
      </button>

      <button
        onClick={onPublish}
        className="inline-flex items-center rounded-lg bg-emerald-600 px-3 py-2 text-sm text-white transition-colors hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 sm:px-4"
      >
        <Upload className="mr-2 h-4 w-4" />
        <span>Publish</span>
      </button>
    </div>
  </div>
</div>
  );
}