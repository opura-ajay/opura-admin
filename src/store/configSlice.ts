import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { PageConfig, defaultConfig } from '@/config/admin-config';
import { apiFetch } from '@/lib/api';
import { transformConfigSchema } from '@/utils/transformConfigSchema';

interface ConfigState {
  config: PageConfig | null;
  formData: Record<string, any>;
  loading: boolean;
  error: string | null;
}

const initialState: ConfigState = {
  config: null,
  formData: {},
  loading: false,
  error: null,
};

// Async thunk to fetch config
export const fetchConfig = createAsyncThunk(
  'config/fetchConfig',
  async (merchantId: string = 'merchant_12345') => {
    const response = await apiFetch(`/api/bot-config/${merchantId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch config');
    }
    const data = await response.json();
    const transformed = transformConfigSchema(data.data);
    return transformed;
  }
);

// Async thunk to publish config
export const publishConfig = createAsyncThunk(
  'config/publishConfig',
  async ({ merchantId, changedData }: { merchantId: string; changedData: Record<string, any> }) => {
    const response = await apiFetch(`/api/bot-config/minimal/${merchantId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(changedData),
    });

    if (!response.ok) {
      throw new Error('Failed to publish configuration');
    }

    return await response.json();
  }
);

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<Record<string, any>>) => {
      state.formData = action.payload;
    },
    updateFormField: (state, action: PayloadAction<{ key: string; value: any }>) => {
      state.formData[action.payload.key] = action.payload.value;
    },
    resetFormData: (state) => {
      if (state.config) {
        const defaults: Record<string, any> = {};
        state.config.sections.forEach((section) => {
          section.fields.forEach((field) => {
            if (field.type === 'object' && field.fields) {
              defaults[field.key] = {};
              field.fields.forEach((sub) => {
                defaults[field.key][sub.key] = sub.current_value;
              });
            } else {
              defaults[field.key] = field.current_value;
            }
          });
        });
        state.formData = defaults;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch config
      .addCase(fetchConfig.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConfig.fulfilled, (state, action) => {
        state.loading = false;
        state.config = action.payload;
        
        // Initialize form data with current values
        const defaults: Record<string, any> = {};
        action.payload.sections.forEach((section: any) => {
          section.fields.forEach((field: any) => {
            if (field.type === 'object' && field.fields) {
              defaults[field.key] = {};
              field.fields.forEach((sub: any) => {
                defaults[field.key][sub.key] = sub.current_value;
              });
            } else {
              defaults[field.key] = field.current_value;
            }
          });
        });
        state.formData = defaults;
      })
      .addCase(fetchConfig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch config';
        state.config = defaultConfig;
      })
      // Publish config
      .addCase(publishConfig.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(publishConfig.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(publishConfig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to publish config';
      });
  },
});

export const { setFormData, updateFormField, resetFormData } = configSlice.actions;
export default configSlice.reducer;
