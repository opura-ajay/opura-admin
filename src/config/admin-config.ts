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
  | 'slider'
  | 'list'
  | 'voice_preview';
  options?: string[];
  default?: any;
  factory_value: string | number | boolean | Array<any>,
  current_value: string | number | boolean | Array<any>,
  access_role: 'merchant' | 'admin' | 'super_user' | 'system';
  guideline: string,
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
  description: string;
  fields: ConfigField[];
}

export interface PageConfig {
  _id: string;
  meta: {
    version: string;
    schema_owner: string;
    schema_created: string;
    description: string;
    audit: AuditSection;
  };
  sections: ConfigSection[];
}

export interface AuditSection {
  last_updated_at: string;
  last_updated_by: {
    user_id: string;
    full_name: string;
    email: string;
  };
  last_change_summary: string;
  change_count: number;
}

export const defaultConfig: PageConfig = {
  "_id": "merchant_12345",
  "meta": {
    "version": "10.1",
    "schema_owner": "Opura.ai",
    "schema_created": "2025-10-17T06:22:43.538Z",
    "description": "Full, production-initialization configuration schema optimized for dynamic UI rendering and MongoDB storage.",
    "audit": {
      "last_updated_at": "2025-10-17T06:22:43.538Z",
      "last_updated_by": {
        "user_id": "sys_init",
        "full_name": "System Initialization",
        "email": "system@opura.ai"
      },
      "last_change_summary": "Initialized schema with UI-friendly format.",
      "change_count": 1
    }
  },
  "sections": [
    {
      "id": "ui_branding",
      "label": "UI & Branding",
      "description": "Visual appearance, placement, and branding of the chat widget.",
      "visible": true,
      "fields": [
        {
          "key": "chatbot_name",
          "label": "Chatbot Name",
          "type": "text",
          "factory_value": "Opura Assistant",
          "current_value": "Opura Assistant",
          "access_role": "merchant",
          "guideline": "Shown to users in the header."
        },
        {
          "key": "theme",
          "label": "Theme",
          "type": "dropdown",
          "options": [
            "light",
            "dark",
            "system"
          ],
          "factory_value": "light",
          "current_value": "light",
          "access_role": "merchant",
          "guideline": "Light, dark, or system mode."
        },
        {
          "key": "primary_color",
          "label": "Primary Color",
          "type": "color",
          "factory_value": "#007BFF",
          "current_value": "#007BFF",
          "access_role": "merchant",
          "guideline": "Lorem ipsum"
        },
        {
          "key": "font_style",
          "label": "Font Style",
          "type": "dropdown",
          "options": [
            "Inter",
            "Roboto",
            "Poppins",
            "Montserrat"
          ],
          "factory_value": "Inter",
          "current_value": "Inter",
          "access_role": "merchant",
          "guideline": "Lorem ipsum"
        },
        {
          "key": "chat_position",
          "label": "Chat Position",
          "type": "dropdown",
          "options": [
            "bottom-right",
            "bottom-left"
          ],
          "factory_value": "bottom-right",
          "current_value": "bottom-right",
          "access_role": "merchant",
          "guideline": "Lorem ipsum"
        },
        {
          "key": "opening_style",
          "label": "Default Opening Style",
          "type": "dropdown",
          "options": [
            "bubble",
            "sidebar",
            "modal"
          ],
          "factory_value": "bubble",
          "current_value": "bubble",
          "access_role": "merchant",
          "guideline": "Lorem ipsum"
        },
        {
          "key": "footer_branding_text",
          "label": "Footer Branding Text",
          "type": "text",
          "factory_value": "Powered by Opura.ai",
          "current_value": "Powered by Opura.ai",
          "access_role": "super_user",
          "guideline": "Lorem ipsum"
        },
        {
          "key": "footer_branding_link",
          "label": "Footer Branding Link",
          "type": "text",
          "factory_value": "https://opura.ai",
          "current_value": "https://opura.ai",
          "access_role": "super_user",
          "guideline": "Lorem ipsum"
        }
      ]
    },
    {
      "id": "conversation_personality",
      "label": "Conversation & Personality",
      "description": "Greeting, fallback, and adaptive language behavior via a single system prompt.",
      "visible": true,
      "fields": [
        {
          "key": "system_prompt_template",
          "label": "System Prompt",
          "type": "textarea",
          "factory_value": "You are {{bot_name}}, a polite, concise assistant for {{brand_name}}. Be helpful, on-brand, and safety-compliant. Use the user's language automatically when Multilingual Mode is enabled.",
          "current_value": "You are {{bot_name}}, a polite, concise assistant for {{brand_name}}. Be helpful, on-brand, and safety-compliant. Use the user's language automatically when Multilingual Mode is enabled.",
          "access_role": "super_user",
          "guideline": "Lorem ipsum"
        },
        {
          "key": "welcome_message",
          "label": "Welcome Message",
          "type": "textarea",
          "factory_value": "Hi 👋, how can I help you today?",
          "current_value": "Hi 👋, how can I help you today?",
          "access_role": "merchant",
          "guideline": "Lorem ipsum"
        },
        {
          "key": "fallback_message",
          "label": "Fallback Message",
          "type": "textarea",
          "factory_value": "Sorry, I didn’t catch that. Would you like to see our latest products?",
          "current_value": "Sorry, I didn’t catch that. Would you like to see our latest products?",
          "access_role": "merchant",
          "guideline": "Lorem ipsum"
        },
        {
          "key": "multilingual_mode",
          "label": "Enable Adaptive Multilingual Mode",
          "type": "toggle",
          "factory_value": true,
          "current_value": true,
          "access_role": "super_user",
          "guideline": "Lorem ipsum"
        },
        {
          "key": "preferred_language",
          "label": "Default Reply Language",
          "type": "dropdown",
          "options": [
            "English",
            "Spanish",
            "French",
            "German",
            "Chinese",
            "Japanese",
            "Russian",
            "Portuguese",
            "Italian",
            "Dutch"
          ],
          "factory_value": "English",
          "current_value": "English",
          "access_role": "merchant",
          "guideline": "Lorem ipsum"
        },
        {
          "key": "enforce_language_setting",
          "label": "Force Follow Selected Language",
          "type": "toggle",
          "factory_value": true,
          "current_value": true,
          "access_role": "super_user",
          "guideline": "Lorem ipsum"
        }
      ]
    },
    {
      "id": "ai_settings",
      "label": "AI Settings",
      "description": "OpenAI model and generation parameters.",
      "visible": true,
      "fields": [
        {
          "key": "model",
          "label": "Model",
          "type": "dropdown",
          "options": [
            "gpt-4o",
            "gpt-4o-mini",
            "gpt-3.5-turbo"
          ],
          "factory_value": "gpt-4o-mini",
          "current_value": "gpt-4o-mini",
          "access_role": "super_user",
          "guideline": "Lorem ipsum"
        },
        {
          "key": "temperature",
          "label": "Temperature",
          "type": "slider",
          "factory_value": 0.7,
          "current_value": 0.7,
          "access_role": "super_user",
          "guideline": "Lorem ipsum"
        },
        {
          "key": "max_tokens",
          "label": "Max Tokens",
          "type": "number",
          "factory_value": 800,
          "current_value": 800,
          "access_role": "super_user",
          "guideline": "Lorem ipsum"
        },
        {
          "key": "top_p",
          "label": "Top P",
          "type": "slider",
          "factory_value": 1,
          "current_value": 1,
          "access_role": "super_user",
          "guideline": "Lorem ipsum"
        },
        {
          "key": "presence_penalty",
          "label": "Presence Penalty",
          "type": "slider",
          "factory_value": 0,
          "current_value": 0,
          "access_role": "super_user",
          "guideline": "Lorem ipsum"
        },
        {
          "key": "frequency_penalty",
          "label": "Frequency Penalty",
          "type": "slider",
          "factory_value": 0,
          "current_value": 0,
          "access_role": "super_user",
          "guideline": "Lorem ipsum"
        },
        {
          "key": "response_format",
          "label": "Response Format",
          "type": "dropdown",
          "options": [
            "text",
            "json_object"
          ],
          "factory_value": "text",
          "current_value": "text",
          "access_role": "super_user",
          "guideline": "Lorem ipsum"
        },
        {
          "key": "embedding_model",
          "label": "Embedding Model",
          "type": "dropdown",
          "options": [
            "text-embedding-3-small",
            "text-embedding-3-large"
          ],
          "factory_value": "text-embedding-3-small",
          "current_value": "text-embedding-3-small",
          "access_role": "super_user",
          "guideline": "Lorem ipsum"
        }
      ]
    },
    {
      "id": "knowledge_base",
      "label": "Knowledge Base",
      "description": "Provide your business and product information for AI grounding.",
      "visible": true,
      "fields": [
        {
          "key": "business_knowledge_base",
          "label": "Business Knowledge Summary",
          "type": "textarea",
          "factory_value": "",
          "current_value": "",
          "access_role": "merchant",
          "guideline": "Lorem ipsum"
        },
        {
          "key": "knowledge_last_indexed",
          "label": "Knowledge Last Processed",
          "type": "text",
          "factory_value": "",
          "current_value": "",
          "access_role": "super_user",
          "guideline": "Lorem ipsum"
        }
      ]
    },
    {
      "id": "voice_speech",
      "label": "Voice & Speech",
      "description": "Realtime voice configuration and OpenAI voice preview.",
      "visible": true,
      "fields": [
        {
          "key": "voice_enabled",
          "label": "Enable Voice Interaction",
          "type": "toggle",
          "factory_value": false,
          "current_value": false,
          "access_role": "merchant",
          "guideline": "Lorem ipsum"
        },
        {
          "key": "voice_rate",
          "label": "Speech Rate",
          "type": "slider",
          "factory_value": 1,
          "current_value": 1,
          "access_role": "merchant",
          "guideline": "Lorem ipsum"
        },
        {
          "key": "voice_pitch",
          "label": "Voice Pitch",
          "type": "slider",
          "factory_value": 0,
          "current_value": 0,
          "access_role": "merchant",
          "guideline": "Lorem ipsum"
        },
        {
          "key": "voice_preview",
          "label": "Select & Preview Voice",
          "type": "voice_preview",
          "factory_value": "alloy",
          "current_value": "alloy",
          "access_role": "merchant",
          "guideline": "Lorem ipsum"
        },
        {
          "key": "voice_model",
          "label": "Voice Model",
          "type": "dropdown",
          "options": [
            "gpt-4o-mini-tts",
            "gpt-4o-tts"
          ],
          "factory_value": "gpt-4o-mini-tts",
          "current_value": "gpt-4o-mini-tts",
          "access_role": "super_user",
          "guideline": "Lorem ipsum"
        },
        {
          "key": "stt_model",
          "label": "Speech-to-Text Model",
          "type": "dropdown",
          "options": [
            "openai-whisper-1"
          ],
          "factory_value": "openai-whisper-1",
          "current_value": "openai-whisper-1",
          "access_role": "super_user",
          "guideline": "Lorem ipsum"
        }
      ]
    },
    {
      "id": "guardrails",
      "label": "AI Safety & Guardrails",
      "description": "Safety filters, restricted topics, and polite fallback handling.",
      "visible": true,
      "fields": [
        {
          "key": "enable_guardrails",
          "label": "Enable Guardrails",
          "type": "toggle",
          "factory_value": true,
          "current_value": true,
          "access_role": "super_user",
          "guideline": "Lorem ipsum"
        },
        {
          "key": "restricted_keywords",
          "label": "Restricted Keywords / Topics",
          "type": "list",
          "factory_value": [
            "slang",
            "profanity",
            "adult",
            "explicit",
            "political",
            "religious",
            "hate",
            "violence",
            "drugs",
            "weapons",
            "self-harm"
          ],
          "current_value": [
            "slang",
            "profanity",
            "adult",
            "explicit",
            "political",
            "religious",
            "hate",
            "violence",
            "drugs",
            "weapons",
            "self-harm"
          ],
          "access_role": "super_user",
          "guideline": "Lorem ipsum"
        },
        {
          "key": "moderation_model",
          "label": "OpenAI Moderation Model",
          "type": "dropdown",
          "options": [
            "omni-moderation-latest",
            "text-moderation-stable",
            "none"
          ],
          "factory_value": "omni-moderation-latest",
          "current_value": "omni-moderation-latest",
          "access_role": "super_user",
          "guideline": "Lorem ipsum"
        },
        {
          "key": "fallback_policy",
          "label": "Fallback Policy Message",
          "type": "textarea",
          "factory_value": "I'm sorry, I can’t discuss that. Would you like to check our latest offers instead?",
          "current_value": "I'm sorry, I can’t discuss that. Would you like to check our latest offers instead?",
          "access_role": "super_user",
          "guideline": "Lorem ipsum"
        },
        {
          "key": "allow_slang",
          "label": "Allow Light Informal Tone",
          "type": "toggle",
          "factory_value": false,
          "current_value": false,
          "access_role": "super_user",
          "guideline": "Lorem ipsum"
        },
        {
          "key": "audit_flag_violations",
          "label": "Log Guardrail Violations",
          "type": "toggle",
          "factory_value": true,
          "current_value": true,
          "access_role": "super_user",
          "guideline": "Lorem ipsum"
        }
      ]
    },
    {
      "id": "meta_controls",
      "label": "Meta Controls",
      "description": "Publishing, version, and factory reset permissions.",
      "visible": true,
      "fields": [
        {
          "key": "config_version",
          "label": "Config Version",
          "type": "text",
          "factory_value": "1.0.0",
          "current_value": "1.0.0",
          "access_role": "super_user",
          "guideline": "Lorem ipsum"
        },
        {
          "key": "is_published",
          "label": "Published to Live",
          "type": "toggle",
          "factory_value": false,
          "current_value": false,
          "access_role": "super_user",
          "guideline": "Lorem ipsum"
        },
        {
          "key": "enable_factory_reset",
          "label": "Allow Factory Reset",
          "type": "toggle",
          "factory_value": true,
          "current_value": true,
          "access_role": "super_user",
          "guideline": "Lorem ipsum"
        },
        {
          "key": "last_modified_at",
          "label": "Last Modified At",
          "type": "text",
          "factory_value": "",
          "current_value": "",
          "access_role": "system",
          "guideline": "Lorem ipsum"
        },
        {
          "key": "last_modified_by",
          "label": "Last Modified By",
          "type": "text",
          "factory_value": "",
          "current_value": "",
          "access_role": "system",
          "guideline": "Lorem ipsum"
        }
      ]
    }
  ]
};