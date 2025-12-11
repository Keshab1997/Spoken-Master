export interface AuthUser {
  id: string;
  username: string;
  name: string;
}

const AUTH_KEY = "speakmaster_auth";
const PROGRESS_KEY = "speakmaster_progress";

export function getStoredUser(): AuthUser | null {
  const stored = localStorage.getItem(AUTH_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  }
  return null;
}

export function loginUser(username: string, password: string, name?: string): AuthUser {
  const user: AuthUser = {
    id: Date.now().toString(),
    username,
    name: name || username,
  };
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  return user;
}

export function signupUser(username: string, password: string, name: string): AuthUser {
  const user: AuthUser = {
    id: Date.now().toString(),
    username,
    name,
  };
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  return user;
}

export function logoutUser(): void {
  localStorage.removeItem(AUTH_KEY);
}

export interface Progress {
  weekId: string;
  topicsCompleted: string[];
  practicesCompleted: string[];
  grammarCompleted: string[];
  quizzesCompleted: string[];
}

export function getProgress(): Progress[] {
  const stored = localStorage.getItem(PROGRESS_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }
  return [];
}

export function saveProgress(weekId: string, type: 'topic' | 'practice' | 'grammar' | 'quiz', itemId: string): void {
  const progress = getProgress();
  let weekProgress = progress.find(p => p.weekId === weekId);
  
  if (!weekProgress) {
    weekProgress = {
      weekId,
      topicsCompleted: [],
      practicesCompleted: [],
      grammarCompleted: [],
      quizzesCompleted: [],
    };
    progress.push(weekProgress);
  }
  
  const key = type === 'topic' ? 'topicsCompleted' :
              type === 'practice' ? 'practicesCompleted' :
              type === 'grammar' ? 'grammarCompleted' : 'quizzesCompleted';
  
  if (!weekProgress[key].includes(itemId)) {
    weekProgress[key].push(itemId);
  }
  
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

export function getWeekProgress(weekId: string): Progress | null {
  const progress = getProgress();
  return progress.find(p => p.weekId === weekId) || null;
}
