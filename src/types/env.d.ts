/// <reference types="react-scripts" />

// Environment variables type definitions
declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly PUBLIC_URL: string;
    readonly REACT_APP_TMDB_API_KEY: string;
    readonly REACT_APP_TMDB_BASE_URL: string;
    readonly REACT_APP_YOUTUBE_API_KEY?: string;
    readonly REACT_APP_VERSION?: string;
    readonly REACT_APP_BUILD_DATE?: string;
    readonly REACT_APP_ENVIRONMENT?: string;
    readonly REACT_APP_SENTRY_DSN?: string;
    readonly REACT_APP_ANALYTICS_ID?: string;
  }
}

// Extend the global Window interface
declare global {
  interface Window {
    // YouTube API
    onYouTubeIframeAPIReady?: () => void;
    YT?: typeof YT;
    
    // Analytics
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
    
    // Development tools
    __REACT_DEVTOOLS_GLOBAL_HOOK__?: any;
    __REDUX_DEVTOOLS_EXTENSION__?: any;
    
    // Performance monitoring
    webkitRequestAnimationFrame?: (callback: FrameRequestCallback) => number;
    mozRequestAnimationFrame?: (callback: FrameRequestCallback) => number;
    msRequestAnimationFrame?: (callback: FrameRequestCallback) => number;
    
    // Netflix-specific globals (if any)
    Netflix?: {
      version: string;
      buildDate: string;
      environment: string;
    };
  }
}

export {};