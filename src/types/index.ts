// TMDB API Response Types

export interface TMDBMovie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  backdrop_path: string | null;
  poster_path: string | null;
  vote_average: number;
  vote_count: number;
  release_date: string;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  popularity: number;
  video: boolean;
}

export interface TMDBTVShow {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  backdrop_path: string | null;
  poster_path: string | null;
  vote_average: number;
  vote_count: number;
  first_air_date: string;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  popularity: number;
  origin_country: string[];
}

export interface TMDBGenre {
  id: number;
  name: string;
}

export interface TMDBMovieResponse {
  page: number;
  results: TMDBMovie[];
  total_pages: number;
  total_results: number;
}

export interface TMDBTVResponse {
  page: number;
  results: TMDBTVShow[];
  total_pages: number;
  total_results: number;
}

export interface TMDBGenreResponse {
  genres: TMDBGenre[];
}

export interface TMDBVideo {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string;
}

export interface TMDBVideoResponse {
  id: number;
  results: TMDBVideo[];
}

export interface TMDBCastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface TMDBCrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

export interface TMDBCreditsResponse {
  id: number;
  cast: TMDBCastMember[];
  crew: TMDBCrewMember[];
}

export interface TMDBMovieDetails extends TMDBMovie {
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string | null;
    backdrop_path: string | null;
  } | null;
  budget: number;
  genres: TMDBGenre[];
  homepage: string | null;
  imdb_id: string | null;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  revenue: number;
  runtime: number | null;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string | null;
}

export interface TMDBTVDetails extends TMDBTVShow {
  created_by: {
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path: string | null;
  }[];
  episode_run_time: number[];
  genres: TMDBGenre[];
  homepage: string;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: {
    air_date: string;
    episode_number: number;
    id: number;
    name: string;
    overview: string;
    production_code: string;
    season_number: number;
    still_path: string | null;
    vote_average: number;
    vote_count: number;
  } | null;
  networks: {
    id: number;
    name: string;
    logo_path: string | null;
    origin_country: string;
  }[];
  number_of_episodes: number;
  number_of_seasons: number;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  seasons: {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string | null;
    season_number: number;
  }[];
  status: string;
  tagline: string;
  type: string;
}

// Application-specific Types

export type ContentItem = TMDBMovie | TMDBTVShow;

export interface ContentRowConfig {
  id: string;
  title: string;
  fetchUrl: string;
  variant: 'billboard' | 'standard' | 'large';
  isPersonalized: boolean;
  sortOrder: number;
  cacheDuration: number;
}

export interface PersonalizedContentRow extends ContentRowConfig {
  content: ContentItem[];
  loadedAt: Date;
}

export interface UserProfile {
  id: string;
  name: string;
  avatarUrl: string;
  preferences: UserPreferences;
  watchlist: string[];
  viewingHistory: ViewingHistoryItem[];
  createdAt: Date;
  lastActive: Date;
}

export interface UserPreferences {
  preferredGenres: number[];
  maturityLevel: 'G' | 'PG' | 'PG-13' | 'R' | 'NC-17';
  language: string;
  autoplayPreviews: boolean;
  subtitlePreferences: SubtitleSettings;
}

export interface SubtitleSettings {
  enabled: boolean;
  language: string;
  fontSize: 'small' | 'medium' | 'large';
  backgroundColor: string;
  textColor: string;
}

export interface ViewingHistoryItem {
  contentId: string;
  contentType: 'movie' | 'tv';
  watchedAt: Date;
  progress: number; // 0-100 percentage
  completed: boolean;
}

export interface SearchFilters {
  genres: number[];
  releaseYear: {
    min: number;
    max: number;
  } | null;
  rating: {
    min: number;
    max: number;
  } | null;
  contentType: 'all' | 'movie' | 'tv';
  language: string | null;
  sortBy: 'popularity' | 'release_date' | 'vote_average' | 'title';
  sortOrder: 'asc' | 'desc';
}

export interface HoverPreview {
  isVisible: boolean;
  position: { x: number; y: number };
  content: ContentItem;
  additionalData: TMDBMovieDetails | TMDBTVDetails | null;
}

export interface ModalState {
  isOpen: boolean;
  content: ContentItem | null;
  details: TMDBMovieDetails | TMDBTVDetails | null;
  videos: TMDBVideo[];
  credits: TMDBCreditsResponse | null;
  similarContent: ContentItem[];
}

// Component Props Types

export interface HeaderProps {
  isScrolled: boolean;
  onSearch: (query: string) => void;
  user: UserProfile;
}

export interface CarouselProps {
  title: string;
  content: ContentItem[];
  variant: 'standard' | 'large' | 'billboard';
  onContentClick: (content: ContentItem) => void;
  onContentHover?: (content: ContentItem, position: { x: number; y: number }) => void;
}

export interface ContentCardProps {
  content: ContentItem;
  variant: 'small' | 'medium' | 'large';
  onHover?: (content: ContentItem, position: { x: number; y: number }) => void;
  onClick: (content: ContentItem) => void;
  isHovered: boolean;
}

export interface ModalPlayerProps {
  content: ContentItem;
  isOpen: boolean;
  onClose: () => void;
  onPlay: (content: ContentItem) => void;
}

export interface BannerProps {
  featuredContent: ContentItem | null;
  onPlay: (content: ContentItem) => void;
  onAddToList: (content: ContentItem) => void;
}

export interface SearchResultsProps {
  results: ContentItem[];
  isLoading: boolean;
  query: string;
  filters: SearchFilters;
  onFilterChange: (filters: SearchFilters) => void;
}

// API Service Types

export interface APIResponse<T> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}

export interface APIError {
  message: string;
  status: number;
  code?: string;
  details?: unknown;
}

export interface CacheEntry<T> {
  data: T;
  timestamp: Date;
  ttl: number; // Time to live in milliseconds
}

export interface RequestConfig {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  params?: Record<string, string | number>;
  headers?: Record<string, string>;
  timeout?: number;
  retries?: number;
}

// Utility Types

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type OptionalFields<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// Type Guards

export const isMovie = (content: ContentItem): content is TMDBMovie => {
  return 'title' in content && 'release_date' in content;
};

export const isTVShow = (content: ContentItem): content is TMDBTVShow => {
  return 'name' in content && 'first_air_date' in content;
};

export const isMovieDetails = (details: TMDBMovieDetails | TMDBTVDetails): details is TMDBMovieDetails => {
  return 'title' in details && 'runtime' in details;
};

export const isTVDetails = (details: TMDBMovieDetails | TMDBTVDetails): details is TMDBTVDetails => {
  return 'name' in details && 'number_of_seasons' in details;
};

// Constants

export const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';

export const IMAGE_SIZES = {
  backdrop: {
    small: 'w780',
    medium: 'w1280',
    large: 'original'
  },
  poster: {
    small: 'w342',
    medium: 'w500',
    large: 'w780'
  },
  profile: {
    small: 'w185',
    medium: 'w632',
    large: 'original'
  }
} as const;

export const CONTENT_CATEGORIES = {
  TRENDING: 'trending',
  POPULAR: 'popular',
  TOP_RATED: 'top_rated',
  NOW_PLAYING: 'now_playing',
  UPCOMING: 'upcoming',
  ON_THE_AIR: 'on_the_air',
  AIRING_TODAY: 'airing_today'
} as const;

export type ContentCategory = typeof CONTENT_CATEGORIES[keyof typeof CONTENT_CATEGORIES];