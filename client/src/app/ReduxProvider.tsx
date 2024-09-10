// components/ReduxProvider.tsx
'use client';  // Đánh dấu đây là Client Component

import { Provider } from 'react-redux';
import  store  from './store/store';
export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}