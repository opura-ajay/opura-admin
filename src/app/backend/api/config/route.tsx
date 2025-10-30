import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  console.log("get api run");

  const defaultConfig = {
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
        "showInfoIcon": true,
        "infoText": "Visual appearance, placement, and branding of the chat widget.",
        "fields": [
          {
            "key": "chatbot_name",
            "label": "Chatbot Name",
            "type": "text",
            "maxLength": 100,
            "factory_value": "Opura Assistant",
            "current_value": "Opura Assistant",
            "access_role": "merchant",
            "guideline": "Shown to users in the header.",
            "mandatory": true,
            "showInfoIcon": true,
            "infoText": "This name appears in the chat header."
          },
          {
            "key": "bot_icon",
            "label": "Bot Icon",
            "type": "image",
            "factory_value": "",
            "current_value": "",
            "access_role": "merchant",
            "guideline": "Upload an image to use as the bot icon.",
            "mandatory": true,
            "showInfoIcon": true,
            "infoText": "Recommended: 64x64px PNG."
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
            "guideline": "Light, dark, or system mode.",
            "mandatory": false,
            "showInfoIcon": true,
            "infoText": "Choose the chat widget theme."
          },
          {
            "key": "primary_color",
            "label": "Primary Color",
            "type": "color",
            "factory_value": "#007BFF",
            "current_value": "#007BFF",
            "access_role": "merchant",
            "guideline": "Main color for chat UI.",
            "mandatory": true,
            "showInfoIcon": true,
            "infoText": "Hex color, e.g. #007BFF."
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
            "guideline": "Lorem ipsum",
            "mandatory": false,
            "showInfoIcon": true,
            "infoText": "Select the font for chat UI."
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
            "guideline": "Lorem ipsum",
            "mandatory": false,
            "showInfoIcon": true,
            "infoText": "Where the chat widget appears."
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
            "guideline": "Lorem ipsum",
            "mandatory": false,
            "showInfoIcon": true,
            "infoText": "How the chat opens by default."
          },
          {
            "key": "footer_branding_text",
            "label": "Footer Branding Text",
            "type": "text",
            "maxLength": 100,
            "factory_value": "Powered by Opura.ai",
            "current_value": "Powered by Opura.ai",
            "access_role": "super_user",
            "guideline": "Lorem ipsum",
            "mandatory": false,
            "showInfoIcon": true,
            "infoText": "Text shown in chat footer."
          },
          {
            "key": "footer_branding_link",
            "label": "Footer Branding Link",
            "type": "text",
            "maxLength": 100,
            "factory_value": "https://opura.ai",
            "current_value": "https://opura.ai",
            "access_role": "super_user",
            "guideline": "Lorem ipsum",
            "mandatory": false,
            "showInfoIcon": true,
            "infoText": "Link for chat footer branding."
          }
        ]
      },
      {
        "id": "conversation_personality",
        "label": "Conversation & Personality",
        "description": "Greeting, fallback, and adaptive language behavior via a single system prompt.",
        "visible": true,
        "showInfoIcon": true,
        "infoText": "Greeting, fallback, and adaptive language behavior via a single system prompt.",
        "fields": [
          {
            "key": "system_prompt_template",
            "label": "System Prompt",
            "type": "textarea",
            "maxLength": 3000,
            "factory_value": "You are {{bot_name}}, a polite, concise assistant for {{brand_name}}. Be helpful, on-brand, and safety-compliant. Use the user's language automatically when Multilingual Mode is enabled.",
            "current_value": "You are {{bot_name}}, a polite, concise assistant for {{brand_name}}. Be helpful, on-brand, and safety-compliant. Use the user's language automatically when Multilingual Mode is enabled.",
            "access_role": "super_user",
            "guideline": "Prompt for bot personality.",
            "mandatory": true,
            "showInfoIcon": true,
            "infoText": "Use variables like {{bot_name}} and {{brand_name}}."
          },
          {
            "key": "welcome_message",
            "label": "Welcome Message",
            "type": "textarea",
            "maxLength": 3000,
            "factory_value": "Hi 👋, how can I help you today?",
            "current_value": "Hi 👋, how can I help you today?",
            "access_role": "merchant",
            "guideline": "Initial greeting for users.",
            "mandatory": true,
            "showInfoIcon": true,
            "infoText": "Displayed when chat opens."
          },
          {
            "key": "fallback_message",
            "label": "Fallback Message",
            "type": "textarea",
            "maxLength": 3000,
            "factory_value": "Sorry, I didn’t catch that. Would you like to see our latest products?",
            "current_value": "Sorry, I didn’t catch that. Would you like to see our latest products?",
            "access_role": "merchant",
            "guideline": "Message shown when bot doesn't understand.",
            "mandatory": true,
            "showInfoIcon": true,
            "infoText": "Displayed on fallback."
          },
          {
            "key": "multilingual_mode",
            "label": "Enable Adaptive Multilingual Mode",
            "type": "toggle",
            "factory_value": true,
            "current_value": true,
            "access_role": "super_user",
            "guideline": "Lorem ipsum",
            "mandatory": false,
            "showInfoIcon": true,
            "infoText": "Lorem ipsum."
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
            "guideline": "Lorem ipsum",
            "mandatory": false,
            "showInfoIcon": true,
            "infoText": "Lorem ipsum."
          },
          {
            "key": "enforce_language_setting",
            "label": "Force Follow Selected Language",
            "type": "toggle",
            "factory_value": true,
            "current_value": true,
            "access_role": "super_user",
            "guideline": "Lorem ipsum",
            "mandatory": false,
            "showInfoIcon": true,
            "infoText": "Lorem ipsum."
          }
        ]
      },
      {
        "id": "ai_settings",
        "label": "AI Settings",
        "description": "OpenAI model and generation parameters.",
        "visible": true,
        "showInfoIcon": true,
        "infoText": "OpenAI model and generation parameters.",
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
            "guideline": "OpenAI model for chat.",
            "mandatory": true,
            "showInfoIcon": true,
            "infoText": "Choose the AI model."
          },
          {
            "key": "temperature",
            "label": "Temperature",
            "type": "slider",
            "factory_value": 0.7,
            "current_value": 0.7,
            "access_role": "super_user",
            "guideline": "Lorem ipsum",
            "mandatory": false,
            "showInfoIcon": true,
            "infoText": "Lorem ipsum."
          },
          {
            "key": "max_tokens",
            "label": "Max Tokens",
            "type": "number",
            "factory_value": 800,
            "current_value": 800,
            "access_role": "super_user",
            "guideline": "Maximum tokens per response.",
            "mandatory": true,
            "showInfoIcon": true,
            "infoText": "Limits response length."
          },
          {
            "key": "top_p",
            "label": "Top P",
            "type": "slider",
            "factory_value": 1,
            "current_value": 1,
            "access_role": "super_user",
            "guideline": "Lorem ipsum",
            "mandatory": false,
            "showInfoIcon": true,
            "infoText": "Lorem ipsum."
          },
          {
            "key": "presence_penalty",
            "label": "Presence Penalty",
            "type": "slider",
            "factory_value": 0,
            "current_value": 0,
            "access_role": "super_user",
            "guideline": "Lorem ipsum",
            "mandatory": false,
            "showInfoIcon": true,
            "infoText": "Lorem ipsum."
          },
          {
            "key": "frequency_penalty",
            "label": "Frequency Penalty",
            "type": "slider",
            "factory_value": 0,
            "current_value": 0,
            "access_role": "super_user",
            "guideline": "Lorem ipsum",
            "mandatory": false,
            "showInfoIcon": true,
            "infoText": "Lorem ipsum."
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
            "guideline": "Lorem ipsum",
            "mandatory": false,
            "showInfoIcon": true,
            "infoText": "Lorem ipsum."
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
            "guideline": "Lorem ipsum",
            "mandatory": false,
            "showInfoIcon": true,
            "infoText": "Lorem ipsum."
          }
        ]
      },
      {
        "id": "knowledge_base",
        "label": "Knowledge Base",
        "description": "Provide your business and product information for AI grounding.",
        "visible": true,
        "showInfoIcon": true,
        "infoText": "Provide your business and product information for AI grounding.",
        "fields": [
          {
            "key": "business_knowledge_base",
            "label": "Explain your Products/ Service/ Features/ Offer",
            "type": "textarea",
            "maxLength": 3000,
            "factory_value": "",
            "current_value": "",
            "access_role": "merchant",
            "guideline": "Lorem ipsum",
            "mandatory": false,
            "showInfoIcon": true,
            "infoText": "Lorem ipsum."
          },
          // {
          //   "key": "knowledge_last_indexed",
          //   "label": "Knowledge Last Processed",
          //   "type": "text",
          //     "maxLength": 100,
          //   "factory_value": "",
          //   "current_value": "",
          //   "access_role": "super_user",
          //   "guideline": "Lorem ipsum",
          //   "mandatory": false,
          //   "showInfoIcon": true,
          //   "infoText": "Lorem ipsum."
          // }
        ]
      },
      {
        "id": "voice_speech",
        "label": "Voice & Speech",
        "description": "Realtime voice configuration and OpenAI voice preview.",
        "visible": true,
        "showInfoIcon": true,
        "infoText": "Realtime voice configuration and OpenAI voice preview.",
        "fields": [
            {
            "key": "silence_detected",
            "label": "Silence Detected (in seconds)",
            "type": "number",
            "factory_value": 30,
            "current_value": 30,
            "access_role": "merchant",
            "guideline": "Maximum tokens per response.",
            "mandatory": true,
            "showInfoIcon": true,
            "infoText": "Limits response length."
          },
            {
            "key": "noice_sensitive",
            "label": "Noice Sensetive",
            "type": "dropdown",
            "options": [
              "Low",
              "medium",
              "High"
            ],
            "factory_value": "Low",
            "current_value": "Low",
            "access_role": "super_user",
            "guideline": "Lorem ipsum",
            "mandatory": false,
            "showInfoIcon": true,
            "infoText": "Lorem ipsum."
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
            "guideline": "Lorem ipsum",
            "mandatory": false,
            "showInfoIcon": true,
            "infoText": "Lorem ipsum."
          },
            {
            "key": "pause_duration",
            "label": "Pause Duration",
            "type": "dropdown",
            "options": [
              "Low (2 seconds)",
              "medium (4 seconds)",
              "High (8 seconds)"
            ],
            "factory_value": "medium (4 seconds)",
            "current_value": "medium (4 seconds)",
            "access_role": "super_user",
            "guideline": "Lorem ipsum",
            "mandatory": true,
            "showInfoIcon": true,
            "infoText": "Lorem ipsum."
          },
          {
            "key": "stop_speaks",
            "label": "Stop as user Speaks",
            "type": "toggle",
            "factory_value": false,
            "current_value": false,
            "access_role": "merchant",
            "guideline": "Lorem ipsum",
            "mandatory": false,
            "showInfoIcon": true,
            "infoText": "Lorem ipsum."
          },
          {
            "key": "voice_preview",
            "label": "Select & Preview Voice",
            "type": "voice_preview",
            "factory_value": "alloy",
            "current_value": "alloy",
            "access_role": "merchant",
            "guideline": "Lorem ipsum",
            "mandatory": true,
            "showInfoIcon": true,
            "infoText": "Lorem ipsum."
          },
          // {
          //   "key": "voice_enabled",
          //   "label": "Enable Voice Interaction",
          //   "type": "toggle",
          //   "factory_value": false,
          //   "current_value": false,
          //   "access_role": "merchant",
          //   "guideline": "Lorem ipsum",
          //   "mandatory": false,
          //   "showInfoIcon": true,
          //   "infoText": "Lorem ipsum."
          // },
          // {
          //   "key": "voice_rate",
          //   "label": "Speech Rate",
          //   "type": "slider",
          //   "factory_value": 1,
          //   "current_value": 1,
          //   "access_role": "merchant",
          //   "guideline": "Lorem ipsum",
          //   "mandatory": false,
          //   "showInfoIcon": true,
          //   "infoText": "Lorem ipsum."
          // },
          // {
          //   "key": "voice_pitch",
          //   "label": "Voice Pitch",
          //   "type": "slider",
          //   "factory_value": 0,
          //   "current_value": 0,
          //   "access_role": "merchant",
          //   "guideline": "Lorem ipsum",
          //   "mandatory": false,
          //   "showInfoIcon": true,
          //   "infoText": "Lorem ipsum."
          // },
          // {
          //   "key": "stt_model",
          //   "label": "Speech-to-Text Model",
          //   "type": "dropdown",
          //   "options": [
          //     "openai-whisper-1"
          //   ],
          //   "factory_value": "openai-whisper-1",
          //   "current_value": "openai-whisper-1",
          //   "access_role": "super_user",
          //   "guideline": "Lorem ipsum",
          //   "mandatory": false,
          //   "showInfoIcon": true,
          //   "infoText": "Lorem ipsum."
          // }
        ]
      },
      {
        "id": "guardrails",
        "label": "AI Safety & Guardrails",
        "description": "Safety filters, restricted topics, and polite fallback handling.",
        "visible": true,
        "showInfoIcon": true,
        "infoText": "Safety filters, restricted topics, and polite fallback handling.",
        "fields": [
          {
            "key": "enable_guardrails",
            "label": "Enable Guardrails",
            "type": "toggle",
            "factory_value": true,
            "current_value": true,
            "access_role": "super_user",
            "guideline": "Lorem ipsum",
            "mandatory": false,
            "showInfoIcon": true,
            "infoText": "Lorem ipsum."
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
            "guideline": "Lorem ipsum",
            "mandatory": false,
            "showInfoIcon": true,
            "infoText": "Lorem ipsum."
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
            "guideline": "Lorem ipsum",
            "mandatory": false,
            "showInfoIcon": true,
            "infoText": "Lorem ipsum."
          },
          {
            "key": "fallback_policy",
            "label": "Fallback Policy Message",
            "type": "textarea",
            "maxLength": 3000,
            "factory_value": "I'm sorry, I can’t discuss that. Would you like to check our latest offers instead?",
            "current_value": "I'm sorry, I can’t discuss that. Would you like to check our latest offers instead?",
            "access_role": "super_user",
            "guideline": "Lorem ipsum",
            "mandatory": false,
            "showInfoIcon": true,
            "infoText": "Lorem ipsum."
          },
          {
            "key": "allow_slang",
            "label": "Allow Light Informal Tone",
            "type": "toggle",
            "factory_value": false,
            "current_value": false,
            "access_role": "super_user",
            "guideline": "Lorem ipsum",
            "mandatory": false,
            "showInfoIcon": true,
            "infoText": "Lorem ipsum."
          },
          {
            "key": "audit_flag_violations",
            "label": "Log Guardrail Violations",
            "type": "toggle",
            "factory_value": true,
            "current_value": true,
            "access_role": "super_user",
            "guideline": "Lorem ipsum",
            "mandatory": false,
            "showInfoIcon": true,
            "infoText": "Lorem ipsum."
          }
        ]
      },
      {
        "id": "meta_controls",
        "label": "Meta Controls",
        "description": "Publishing, version, and factory reset permissions.",
        "visible": false,
        "showInfoIcon": true,
        "infoText": "Publishing, version, and factory reset permissions.",
        "fields": [
          {
            "key": "config_version",
            "label": "Config Version",
            "type": "text",
            "maxLength": 100,
            "factory_value": "1.0.0",
            "current_value": "1.0.0",
            "access_role": "super_user",
            "guideline": "Lorem ipsum",
            "mandatory": false,
            "showInfoIcon": true,
            "infoText": "Lorem ipsum."
          },
          {
            "key": "is_published",
            "label": "Published to Live",
            "type": "toggle",
            "factory_value": false,
            "current_value": false,
            "access_role": "super_user",
            "guideline": "Lorem ipsum",
            "mandatory": false,
            "showInfoIcon": true,
            "infoText": "Lorem ipsum."
          },
          {
            "key": "enable_factory_reset",
            "label": "Allow Factory Reset",
            "type": "toggle",
            "factory_value": true,
            "current_value": true,
            "access_role": "super_user",
            "guideline": "Lorem ipsum",
            "mandatory": false,
            "showInfoIcon": true,
            "infoText": "Lorem ipsum."
          },
          {
            "key": "last_modified_at",
            "label": "Last Modified At",
            "type": "text",
            "maxLength": 100,
            "factory_value": "",
            "current_value": "",
            "access_role": "system",
            "guideline": "Lorem ipsum",
            "mandatory": false,
            "showInfoIcon": true,
            "infoText": "Lorem ipsum."
          },
          {
            "key": "last_modified_by",
            "label": "Last Modified By",
            "type": "text",
            "maxLength": 100,
            "factory_value": "",
            "current_value": "",
            "access_role": "system",
            "guideline": "Lorem ipsum",
            "mandatory": false,
            "showInfoIcon": true,
            "infoText": "Lorem ipsum."
          }
        ]
      }
    ]
  }

  // return new Response('Hello Next JS... !');
  return NextResponse.json(defaultConfig, { status: 200 });
}

