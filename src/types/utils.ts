// Utility types for React and TypeScript

import React, { ComponentType, ReactElement, ReactNode } from 'react';

// Common React component patterns
export type FC<P = {}> = ComponentType<P>;

export type FCWithChildren<P = {}> = FC<P & { children?: ReactNode }>;

export type PropsWithChildren<P = {}> = P & { children?: ReactNode };

export type ElementProps<T extends keyof React.JSX.IntrinsicElements> = React.JSX.IntrinsicElements[T];

export type ComponentProps<T extends ComponentType<any>> = T extends ComponentType<infer P> ? P : never;

// Event handler types
export type EventHandler<T = Element, E = Event> = (event: E & { currentTarget: T }) => void;

export type ChangeEventHandler<T = Element> = EventHandler<T, React.ChangeEvent<T>>;

export type ClickEventHandler<T = Element> = EventHandler<T, React.MouseEvent<T>>;

export type KeyboardEventHandler<T = Element> = EventHandler<T, React.KeyboardEvent<T>>;

export type FormEventHandler<T = Element> = EventHandler<T, React.FormEvent<T>>;

// Ref types
export type RefCallback<T> = (instance: T | null) => void;

export type RefObject<T> = { current: T | null };

export type Ref<T> = RefCallback<T> | RefObject<T> | null;

// State management types
export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export type StateReducer<S, A> = (prevState: S, action: A) => S;

export type ReducerAction<T = any> = {
  type: string;
  payload?: T;
};

// Async operation types
export type AsyncState<T, E = Error> = {
  data: T | null;
  loading: boolean;
  error: E | null;
};

export type AsyncOperation<T, E = Error> = {
  execute: (...args: any[]) => Promise<T>;
  state: AsyncState<T, E>;
  reset: () => void;
};

// API response wrapper types
export type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
};

export type PaginatedResponse<T> = {
  items: T[];
  page: number;
  totalPages: number;
  totalItems: number;
  hasNext: boolean;
  hasPrevious: boolean;
};

// Form handling types
export type FormField<T = string> = {
  value: T;
  error?: string;
  touched: boolean;
  dirty: boolean;
};

export type FormState<T extends Record<string, any>> = {
  [K in keyof T]: FormField<T[K]>;
};

export type FormErrors<T extends Record<string, any>> = {
  [K in keyof T]?: string;
};

export type ValidationRule<T> = (value: T) => string | undefined;

export type ValidationRules<T extends Record<string, any>> = {
  [K in keyof T]?: ValidationRule<T[K]>[];
};

// Theme and styling types
export type ThemeMode = 'light' | 'dark';

export type Breakpoint = 'mobile' | 'tablet' | 'desktop' | 'wide';

export type ResponsiveValue<T> = T | Partial<Record<Breakpoint, T>>;

export type CSSValue = string | number;

export type SpacingValue = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';

// Animation and transition types
export type AnimationDirection = 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';

export type AnimationFillMode = 'none' | 'forwards' | 'backwards' | 'both';

export type AnimationPlayState = 'running' | 'paused';

export type TransitionProperty = 'all' | 'opacity' | 'transform' | 'color' | 'background-color' | string;

export type EasingFunction = 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear' | string;

// Content and media types
export type ImageFormat = 'jpg' | 'jpeg' | 'png' | 'webp' | 'gif' | 'svg';

export type VideoFormat = 'mp4' | 'webm' | 'ogg';

export type MediaSize = 'small' | 'medium' | 'large' | 'original';

export type ContentType = 'movie' | 'tv' | 'person' | 'collection';

export type SortOrder = 'asc' | 'desc';

export type SortBy = 'popularity' | 'release_date' | 'vote_average' | 'title' | 'name';

// Utility type helpers
export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type Maybe<T> = T | null | undefined;

export type NonNullable<T> = T extends null | undefined ? never : T;

export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

export type PickByType<T, U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K];
};

export type OmitByType<T, U> = {
  [K in keyof T as T[K] extends U ? never : K]: T[K];
};

export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

export type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];

export type ValueOf<T> = T[keyof T];

export type KeysOfType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

// Function utility types
export type AsyncFunction<T extends any[] = any[], R = any> = (...args: T) => Promise<R>;

export type SyncFunction<T extends any[] = any[], R = any> = (...args: T) => R;

export type AnyFunction = (...args: any[]) => any;

export type NoArgsFunction<R = void> = () => R;

export type SingleArgFunction<T, R = void> = (arg: T) => R;

export type Predicate<T> = (value: T) => boolean;

export type Comparator<T> = (a: T, b: T) => number;

export type Mapper<T, U> = (value: T, index?: number, array?: T[]) => U;

export type ArrayReducer<T, U> = (accumulator: U, currentValue: T, index?: number, array?: T[]) => U;

// Error handling types
export type ErrorBoundaryState = {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
};

export type ErrorHandler = (error: Error, errorInfo?: React.ErrorInfo) => void;

export type AsyncErrorHandler<T = any> = (error: Error, context?: T) => void | Promise<void>;

// Performance and optimization types
export type MemoizedComponent<P> = React.MemoExoticComponent<React.ComponentType<P>>;

export type LazyComponent<P> = React.LazyExoticComponent<React.ComponentType<P>>;

export type SuspenseProps = {
  fallback: ReactElement | null;
  children: ReactNode;
};

// Testing utility types
export type MockFunction<T extends AnyFunction = AnyFunction> = jest.MockedFunction<T>;

export type MockedObject<T> = {
  [K in keyof T]: T[K] extends AnyFunction ? MockFunction<T[K]> : T[K];
};

export type TestProps<T = {}> = T & {
  'data-testid'?: string;
};

// Configuration types
export type EnvironmentConfig = {
  apiUrl: string;
  apiKey: string;
  enableAnalytics: boolean;
  enableErrorReporting: boolean;
  logLevel: 'debug' | 'info' | 'warn' | 'error';
};

export type FeatureFlags = {
  [key: string]: boolean;
};

export type AppConfig = {
  environment: EnvironmentConfig;
  features: FeatureFlags;
  theme: {
    mode: ThemeMode;
    primaryColor: string;
    secondaryColor: string;
  };
};

// Re-export types from other modules
export * from './index';
export * from './styled';
export * from './external';