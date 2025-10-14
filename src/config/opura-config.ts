// config/opura-config.ts
export interface ConfigField {
  key: string;
  label: string;
  type:
    | 'text'
    | 'textarea'
    | 'dropdown'
    | 'color'
    | 'toggle'
    | 'number'
    | 'object'
    | 'slider';
  options?: string[];
  default?: any;
  min?: number;
  max?: number;
  step?: number;
  fields?: ConfigField[];
  visibleIf?: Record<string, any>;
}

export interface ConfigSection {
  id: string;
  label: string;
  visible: boolean;
  fields: ConfigField[];
}

export interface PageConfig {
  layoutVersion: string;
  page: {
    id: string;
    title: string;
    description: string;
    layoutStyle: string;
    theme: {
      primaryColor: string;
      surfaceColor: string;
      radius: number;
    };
    sections: ConfigSection[];
  };
}

// export const defaultConfig: PageConfig = {
//   layoutVersion: '2.2.0',
//   page: {
//     id: 'chatbot_config',
//     title: 'Chatbot Configuration',
//     description: 'Configure chatbot design, tone, and AI behavior.',
//     layoutStyle: 'accordion',
//     theme: {
//       primaryColor: '#0EA5E9',
//       surfaceColor: '#FFFFFF',
//       radius: 10,
//     },
//     sections: [
//       {
//         id: 'botSetup',
//         label: 'Bot Setup',
//         visible: true,
//         fields: [
//           {
//             key: 'tone',
//             label: 'Bot Tone',
//             type: 'dropdown',
//             options: ['friendly', 'formal', 'casual'],
//             default: 'friendly',
//           },
//           {
//             key: 'greeting',
//             label: 'Greeting Message',
//             type: 'text',
//             default: "Hi there! Welcome to our store 👋",
//           },
//           {
//             key: 'fallback',
//             label: 'Fallback Message',
//             type: 'textarea',
//             default: "Sorry, I didn't get that. Could you rephrase?",
//           },
//           {
//             key: 'botIdentity',
//             label: 'Bot Identity',
//             type: 'object',
//             fields: [
//               {
//                 key: 'name',
//                 type: 'text',
//                 label: 'Name',
//                 default: 'SalesBot',
//               },
//               {
//                 key: 'avatar',
//                 type: 'text',
//                 label: 'Avatar URL',
//                 default: 'https://cdn.opura.ai/default.png',
//               },
//             ],
//           },
//         ],
//       },
//       {
//         id: 'branding',
//         label: 'Branding',
//         visible: true,
//         fields: [
//           {
//             key: 'themeColor',
//             type: 'color',
//             label: 'Theme Color',
//             default: '#FF5733',
//           },
//           {
//             key: 'position',
//             type: 'dropdown',
//             label: 'Widget Position',
//             options: ['bottom-right', 'bottom-left', 'top-right', 'top-left'],
//             default: 'bottom-right',
//           },
//           {
//             key: 'brandFooter',
//             label: 'Brand Footer',
//             type: 'object',
//             fields: [
//               { key: 'enabled', type: 'toggle', label: 'Enabled', default: true },
//               {
//                 key: 'text',
//                 type: 'text',
//                 label: 'Footer Text',
//                 default: 'Powered by Opura.ai',
//               },
//             ],
//           },
//         ],
//       },
//       {
//         id: 'aiSettings',
//         label: 'AI Settings',
//         visible: true,
//         fields: [
//           {
//             key: 'model',
//             type: 'dropdown',
//             label: 'AI Model',
//             options: ['gpt-4o-mini', 'gpt-4-turbo'],
//             default: 'gpt-4o-mini',
//           },
//           {
//             key: 'temperature',
//             type: 'slider',
//             label: 'Response Creativity',
//             min: 0,
//             max: 1,
//             step: 0.1,
//             default: 0.7,
//           },
//           {
//             key: 'persona',
//             type: 'text',
//             label: 'Bot Persona',
//             default: 'friendly assistant',
//           },
//         ],
//       },
//       {
//         id: 'behavior',
//         label: 'Behavior',
//         visible: true,
//         fields: [
//           {
//             key: 'responseStyle',
//             type: 'dropdown',
//             label: 'Response Style',
//             options: ['short', 'detailed', 'humorous', 'formal'],
//             default: 'short',
//           },
//           {
//             key: 'maxResponseTokens',
//             type: 'number',
//             label: 'Max Tokens',
//             default: 150,
//           },
//           {
//             key: 'interruptible',
//             type: 'toggle',
//             label: 'Allow Interruption',
//             default: true,
//           },
//           { key: 'useMemory', type: 'toggle', label: 'Use Memory', default: true },
//           {
//             key: 'memoryWindow',
//             type: 'number',
//             label: 'Memory Window',
//             default: 10,
//             visibleIf: { useMemory: true },
//           },
//         ],
//       },
//       {
//         id: 'knowledge',
//         label: 'Knowledge Base',
//         visible: true,
//         fields: [
//           {
//             key: 'sourceType',
//             type: 'dropdown',
//             label: 'Source Type',
//             options: ['manual', 'api', 'url', 'productFeed'],
//             default: 'productFeed',
//           },
//           {
//             key: 'dataUrl',
//             type: 'text',
//             label: 'Data URL',
//             default: 'https://merchant.com/products.json',
//             visibleIf: { sourceType: 'productFeed' },
//           },
//           {
//             key: 'refreshInterval',
//             type: 'dropdown',
//             label: 'Refresh Frequency',
//             options: ['hourly', 'daily', 'weekly'],
//             default: 'daily',
//           },
//         ],
//       },
//       {
//         id: 'handoff',
//         label: 'Human Handoff',
//         visible: true,
//         fields: [
//           {
//             key: 'enableHandoff',
//             type: 'toggle',
//             label: 'Enable Handoff',
//             default: true,
//           },
//           {
//             key: 'handoffPlatform',
//             type: 'dropdown',
//             label: 'Platform',
//             options: ['Zendesk', 'HubSpot', 'Freshdesk'],
//             default: 'Zendesk',
//             visibleIf: { enableHandoff: true },
//           },
//           {
//             key: 'handoffWebhook',
//             type: 'text',
//             label: 'Webhook URL',
//             default: 'https://api.merchant.com/handoff',
//             visibleIf: { enableHandoff: true },
//           },
//         ],
//       },
//       {
//         id: 'guardrails',
//         label: 'AI Guardrails',
//         visible: true,
//         fields: [
//           {
//             key: 'blockSensitiveTopics',
//             type: 'toggle',
//             label: 'Block Sensitive Topics',
//             default: true,
//           },
//           {
//             key: 'blockedKeywords',
//             type: 'textarea',
//             label: 'Blocked Keywords',
//             default: 'politics, religion, violence',
//           },
//           { key: 'gdprCompliant', type: 'toggle', label: 'GDPR Compliant', default: true },
//         ],
//       },
//       {
//         id: 'analytics',
//         label: 'Analytics',
//         visible: true,
//         fields: [
//           {
//             key: 'enableAnalytics',
//             type: 'toggle',
//             label: 'Enable Analytics',
//             default: true,
//           },
//           {
//             key: 'analyticsProvider',
//             type: 'dropdown',
//             label: 'Analytics Provider',
//             options: ['GoogleAnalytics', 'Mixpanel', 'Amplitude'],
//             default: 'Mixpanel',
//           },
//           {
//             key: 'eventWebhook',
//             type: 'text',
//             label: 'Event Webhook URL',
//             default: 'https://merchant.com/bot-events',
//           },
//         ],
//       },
//     ],
//   },
// };

export const defaultConfig: PageConfig = {
  "layoutVersion": "2.2.0",
  "page": {
    "id": "chatbot_config",
    "title": "Chatbot Configuration",
    "description": "Configure chatbot design, tone, and AI behavior.",
    "layoutStyle": "standard",
    "theme": {
      "primaryColor": "#0EA5E9",
      "surfaceColor": "#FFFFFF",
      "radius": 10
    },
    "sections": [
      {
        "id": "botSetup",
        "label": "Bot Setup",
        "visible": true,
        "fields": [
          {
            "key": "tone",
            "label": "Bot Tone",
            "type": "dropdown",
            "options": ["friendly", "formal", "casual"],
            "default": "friendly"
          },
          {
            "key": "greeting",
            "label": "Greeting Message",
            "type": "text",
            "default": "Hi there! Welcome to our store 👋"
          },
          {
            "key": "fallback",
            "label": "Fallback Message",
            "type": "textarea",
            "default": "Sorry, I didn't get that. Could you rephrase?"
          },
          {
            "key": "botIdentity",
            "label": "Bot Identity",
            "type": "object",
            "fields": [
              { "key": "name", "type": "text", "label": "Name", "default": "SalesBot" },
              { "key": "avatar", "type": "text", "label": "Avatar URL", "default": "https://cdn.opura.ai/default.png" }
            ]
          }
        ]
      },
      {
        "id": "branding",
        "label": "Branding",
        "visible": true,
        "fields": [
          { "key": "themeColor", "type": "color", "label": "Theme Color", "default": "#FF5733" },
          {
            "key": "position",
            "type": "dropdown",
            "label": "Widget Position",
            "options": ["bottom-right", "bottom-left", "top-right", "top-left"],
            "default": "bottom-right"
          },
          {
            "key": "brandFooter",
            "label": "Brand Footer",
            "type": "object",
            "fields": [
              { "key": "enabled", "type": "toggle", "label": "Enabled", "default": true },
              { "key": "text", "type": "text", "label": "Footer Text", "default": "Powered by Opura.ai" }
            ]
          }
        ]
      },
      {
        "id": "aiSettings",
        "label": "AI Settings",
        "visible": true,
        "fields": [
          {
            "key": "model",
            "type": "dropdown",
            "label": "AI Model",
            "options": ["gpt-4o-mini", "gpt-4-turbo"],
            "default": "gpt-4o-mini"
          },
          {
            "key": "temperature",
            "type": "slider",
            "label": "Response Creativity",
            "min": 0,
            "max": 1,
            "step": 0.1,
            "default": 0.7
          },
          { "key": "persona", "type": "text", "label": "Bot Persona", "default": "friendly assistant" }
        ]
      },
      {
        "id": "behavior",
        "label": "Behavior",
        "visible": true,
        "fields": [
          {
            "key": "responseStyle",
            "type": "dropdown",
            "label": "Response Style",
            "options": ["short", "detailed", "humorous", "formal"],
            "default": "short"
          },
          { "key": "maxResponseTokens", "type": "number", "label": "Max Tokens", "default": 150 },
          { "key": "interruptible", "type": "toggle", "label": "Allow Interruption", "default": true },
          { "key": "useMemory", "type": "toggle", "label": "Use Memory", "default": true },
          {
            "key": "memoryWindow",
            "type": "number",
            "label": "Memory Window",
            "default": 10,
            "visibleIf": { "useMemory": true }
          }
        ]
      },
      {
        "id": "knowledge",
        "label": "Knowledge Base",
        "visible": true,
        "fields": [
          {
            "key": "sourceType",
            "type": "dropdown",
            "label": "Source Type",
            "options": ["manual", "api", "url", "productFeed"],
            "default": "productFeed"
          },
          {
            "key": "dataUrl",
            "type": "text",
            "label": "Data URL",
            "default": "https://merchant.com/products.json",
            "visibleIf": { "sourceType": "productFeed" }
          },
          {
            "key": "refreshInterval",
            "type": "dropdown",
            "label": "Refresh Frequency",
            "options": ["hourly", "daily", "weekly"],
            "default": "daily"
          }
        ]
      },
      {
        "id": "handoff",
        "label": "Human Handoff",
        "visible": true,
        "fields": [
          { "key": "enableHandoff", "type": "toggle", "label": "Enable Handoff", "default": true },
          {
            "key": "handoffPlatform",
            "type": "dropdown",
            "label": "Platform",
            "options": ["Zendesk", "HubSpot", "Freshdesk"],
            "default": "Zendesk",
            "visibleIf": { "enableHandoff": true }
          },
          {
            "key": "handoffWebhook",
            "type": "text",
            "label": "Webhook URL",
            "default": "https://api.merchant.com/handoff",
            "visibleIf": { "enableHandoff": true }
          }
        ]
      },
      {
        "id": "guardrails",
        "label": "AI Guardrails",
        "visible": true,
        "fields": [
          { "key": "blockSensitiveTopics", "type": "toggle", "label": "Block Sensitive Topics", "default": true },
          {
            "key": "blockedKeywords",
            "type": "textarea",
            "label": "Blocked Keywords",
            "default": "politics, religion, violence"
          },
          {
            "key": "allowSlang",
            "type": "toggle",
            "label": "Allow Slang",
            "default": false
          },
          {
            "key": "slangLevel",
            "type": "dropdown",
            "label": "Slang Level",
            "options": ["minimal", "moderate", "casual", "street"],
            "default": "minimal",
            "visibleIf": { "allowSlang": true }
          },
          {
            "key": "customSlangTerms",
            "type": "textarea",
            "label": "Custom Slang Terms",
            "default": "lit, fire, salty, bet, cap",
            "visibleIf": { "allowSlang": true }
          },
          { "key": "gdprCompliant", "type": "toggle", "label": "GDPR Compliant", "default": true }
        ]
      },
      {
        "id": "analytics",
        "label": "Analytics",
        "visible": true,
        "fields": [
          { "key": "enableAnalytics", "type": "toggle", "label": "Enable Analytics", "default": true },
          {
            "key": "analyticsProvider",
            "type": "dropdown",
            "label": "Analytics Provider",
            "options": ["GoogleAnalytics", "Mixpanel", "Amplitude"],
            "default": "Mixpanel"
          },
          {
            "key": "eventWebhook",
            "type": "text",
            "label": "Event Webhook URL",
            "default": "https://merchant.com/bot-events"
          }
        ]
      },
      {
        "id": "devOptions",
        "label": "Developer Options",
        "visible": true,
        "fields": [
          { "key": "sandboxMode", "type": "toggle", "label": "Sandbox Mode", "default": false },
          { "key": "apiAccess", "type": "toggle", "label": "Enable API Access", "default": false }
        ]
      }
    ]
  }
};