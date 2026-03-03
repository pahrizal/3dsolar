import type { Planet, Moon } from '../data/planets';

export type { Planet, Moon };
export type SelectedBody = {
  type: 'sun' | 'planet' | 'moon';
  name: string;
  data?: Planet | Moon | null;
};
