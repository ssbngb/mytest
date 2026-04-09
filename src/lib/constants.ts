export enum SceneLevel {
  Zero = 'level-zero',
  One = 'level-one',
  Fill = 'level-fill',
}

export enum AppRoute {
  Home = 'home',
  Blog = 'blog',
  About = 'about',
}

export enum UserStatus {
  Online = 'online',
  Away = 'away',
  Busy = 'busy',
  Offline = 'offline',
}

export const USER_STATUS_COLORS: Record<UserStatus, string> = {
  [UserStatus.Online]: '#7cff00',
  [UserStatus.Away]: '#f7cc1d',
  [UserStatus.Busy]: '#bd1d2c',
  [UserStatus.Offline]: '#7e7e7e',
};

export const USER_STATUS_LABELS: Record<UserStatus, string> = {
  [UserStatus.Online]: '在线',
  [UserStatus.Away]: '暂离',
  [UserStatus.Busy]: '忙碌',
  [UserStatus.Offline]: '离线',
};

export const SPRING_CONFIG = {
  menu: {
    type: 'spring' as const,
    stiffness: 300,
    damping: 20,
    mass: 0.8,
  },
  button: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 15,
  },
  page: {
    type: 'spring' as const,
    stiffness: 200,
    damping: 25,
    mass: 1,
  },
};
