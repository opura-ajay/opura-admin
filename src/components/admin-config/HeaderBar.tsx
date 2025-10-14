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
    <div className="border-b border-border bg-card/80 px-4 py-2 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between">
        <div>
          <h1 className="flex items-center text-2xl font-bold text-card-foreground">
            <Bot className="mr-3 h-8 w-8 text-blue-600 dark:text-blue-500" />
            Opura Bot Admin Console
          </h1>
          <p className="mt-1 text-muted-foreground">
            Configure chatbot design, tone, and AI behaviour.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onSave}
            className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            <Save className="mr-2 h-4 w-4" />
            Save
          </button>
          <button
            onClick={onRollback}
            className="inline-flex items-center rounded-lg bg-muted px-4 py-2 text-foreground transition-colors hover:opacity-90"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Rollback Config
          </button>
          <button
            onClick={onPublish}
            className="inline-flex items-center rounded-lg bg-emerald-600 px-4 py-2 text-white transition-colors hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600"
          >
            <Upload className="mr-2 h-4 w-4" />
            Publish
          </button>
        </div>
      </div>
    </div>
  );
}