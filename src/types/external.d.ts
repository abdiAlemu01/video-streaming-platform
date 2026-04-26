// Type definitions for external libraries

// movie-trailer library
declare module 'movie-trailer' {
  interface TrailerOptions {
    id?: boolean;
    multi?: boolean;
    year?: number;
  }

  function movieTrailer(
    movie: string,
    options?: TrailerOptions
  ): Promise<string | string[] | null>;

  function movieTrailer(
    movie: string,
    callback: (error: Error | null, url: string | string[] | null) => void
  ): void;

  function movieTrailer(
    movie: string,
    options: TrailerOptions,
    callback: (error: Error | null, url: string | string[] | null) => void
  ): void;

  export = movieTrailer;
}

// react-youtube library extensions
declare module 'react-youtube' {
  export interface YouTubeProps {
    videoId?: string;
    id?: string;
    className?: string;
    containerClassName?: string;
    title?: string;
    loading?: 'lazy' | 'eager';
    opts?: {
      height?: string | number;
      width?: string | number;
      playerVars?: {
        autoplay?: 0 | 1;
        cc_load_policy?: 0 | 1;
        color?: 'red' | 'white';
        controls?: 0 | 1 | 2;
        disablekb?: 0 | 1;
        enablejsapi?: 0 | 1;
        end?: number;
        fs?: 0 | 1;
        hl?: string;
        iv_load_policy?: 1 | 3;
        list?: string;
        listType?: 'playlist' | 'search' | 'user_uploads';
        loop?: 0 | 1;
        modestbranding?: 0 | 1;
        mute?: 0 | 1;
        origin?: string;
        playlist?: string;
        playsinline?: 0 | 1;
        rel?: 0 | 1;
        showinfo?: 0 | 1;
        start?: number;
        widget_referrer?: string;
        [key: string]: unknown;
      };
    };
    onReady?: (event: { target: YT.Player }) => void;
    onPlay?: (event: { target: YT.Player; data: number }) => void;
    onPause?: (event: { target: YT.Player; data: number }) => void;
    onEnd?: (event: { target: YT.Player; data: number }) => void;
    onError?: (event: { target: YT.Player; data: number }) => void;
    onStateChange?: (event: { target: YT.Player; data: number }) => void;
    onPlaybackQualityChange?: (event: { target: YT.Player; data: string }) => void;
    onPlaybackRateChange?: (event: { target: YT.Player; data: number }) => void;
  }

  export default class YouTube extends React.Component<YouTubeProps> {}
}

// YouTube Player API types
declare namespace YT {
  interface Player {
    playVideo(): void;
    pauseVideo(): void;
    stopVideo(): void;
    seekTo(seconds: number, allowSeekAhead?: boolean): void;
    clearVideo(): void;
    nextVideo(): void;
    previousVideo(): void;
    playVideoAt(index: number): void;
    mute(): void;
    unMute(): void;
    isMuted(): boolean;
    setVolume(volume: number): void;
    getVolume(): number;
    setSize(width: number, height: number): object;
    getPlaybackRate(): number;
    setPlaybackRate(suggestedRate: number): void;
    getAvailablePlaybackRates(): number[];
    setLoop(loopPlaylists: boolean): void;
    setShuffle(shufflePlaylist: boolean): void;
    getVideoLoadedFraction(): number;
    getPlayerState(): PlayerState;
    getCurrentTime(): number;
    getDuration(): number;
    getVideoUrl(): string;
    getVideoEmbedCode(): string;
    getPlaylist(): string[];
    getPlaylistIndex(): number;
    addEventListener(event: string, listener: (event: CustomEvent) => void): void;
    removeEventListener(event: string, listener: (event: CustomEvent) => void): void;
    getIframe(): HTMLIFrameElement;
    destroy(): void;
  }

  enum PlayerState {
    UNSTARTED = -1,
    ENDED = 0,
    PLAYING = 1,
    PAUSED = 2,
    BUFFERING = 3,
    CUED = 5
  }
}

// Framer Motion extensions for better TypeScript support
declare module 'framer-motion' {
  export interface MotionProps {
    // Add any custom motion props that might be missing
    layoutId?: string;
    layout?: boolean | 'position' | 'size';
    layoutDependency?: any;
    layoutScroll?: boolean;
    onLayoutAnimationStart?: () => void;
    onLayoutAnimationComplete?: () => void;
  }
}

// React Intersection Observer extensions
declare module 'react-intersection-observer' {
  export interface IntersectionOptions extends IntersectionObserverInit {
    triggerOnce?: boolean;
    skip?: boolean;
    initialInView?: boolean;
    fallbackInView?: boolean;
    trackVisibility?: boolean;
    delay?: number;
  }

  export interface IntersectionObserverHookRefCallback {
    (node?: Element | null): void;
  }

  export interface IntersectionObserverHookResult {
    ref: IntersectionObserverHookRefCallback;
    inView: boolean;
    entry?: IntersectionObserverEntry;
  }

  export function useInView(
    options?: IntersectionOptions
  ): IntersectionObserverHookResult;

  export interface InViewHookResponse extends IntersectionObserverHookResult {}
}

// Global environment variables
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      REACT_APP_TMDB_API_KEY: string;
      REACT_APP_TMDB_BASE_URL: string;
      REACT_APP_YOUTUBE_API_KEY?: string;
      PUBLIC_URL: string;
    }
  }

  // Window object extensions
  interface Window {
    // YouTube API
    onYouTubeIframeAPIReady?: () => void;
    YT?: typeof YT;
    
    // Performance monitoring
    gtag?: (...args: any[]) => void;
    
    // Development tools
    __REACT_DEVTOOLS_GLOBAL_HOOK__?: any;
  }
}

// CSS Module declarations
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.sass' {
  const classes: { [key: string]: string };
  export default classes;
}

// Asset declarations
declare module '*.svg' {
  import * as React from 'react';
  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
}

declare module '*.ico' {
  const src: string;
  export default src;
}

declare module '*.bmp' {
  const src: string;
  export default src;
}

// JSON declarations
declare module '*.json' {
  const value: any;
  export default value;
}

export {};