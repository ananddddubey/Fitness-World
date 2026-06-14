import fs from 'fs';
import path from 'path';

export interface User {
  id: string;
  username: string;
  passwordHash: string;
  profile: any;
  completedSets: any;
  token?: string;
}

const DB_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'database.json');

// Ensure database file and directory exist
function initDb() {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify({ users: [] }, null, 2), 'utf-8');
  }
}

function loadDb(): { users: User[] } {
  initDb();
  try {
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading database file, returning empty state:", err);
    return { users: [] };
  }
}

function saveDb(data: { users: User[] }) {
  initDb();
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

export function getUserByUsername(username: string): User | undefined {
  const db = loadDb();
  return db.users.find(u => u.username.toLowerCase() === username.toLowerCase());
}

export function getUserById(id: string): User | undefined {
  const db = loadDb();
  return db.users.find(u => u.id === id);
}

export function getUserByToken(token: string): User | undefined {
  const db = loadDb();
  return db.users.find(u => u.token === token);
}

export function createUser(username: string, passwordHash: string): User {
  const db = loadDb();
  
  // Default values matching App.tsx initial states
  const initialProfile = {
    name: username,
    avatar: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=200&auto=format&fit=crop',
    fitnessGoal: 'Bodybuilder',
    level: 1,
    xp: 0,
    xpNext: 1000,
    workoutsCompleted: 0,
    streak: 0,
    joinDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  };

  const newUser: User = {
    id: '_' + Math.random().toString(36).substr(2, 9),
    username,
    passwordHash,
    profile: initialProfile,
    completedSets: {},
    token: ''
  };

  db.users.push(newUser);
  saveDb(db);
  return newUser;
}

export function updateUserToken(userId: string, token: string): void {
  const db = loadDb();
  const user = db.users.find(u => u.id === userId);
  if (user) {
    user.token = token;
    saveDb(db);
  }
}

export function saveUserData(userId: string, profile: any, completedSets: any): boolean {
  const db = loadDb();
  const user = db.users.find(u => u.id === userId);
  if (user) {
    user.profile = profile;
    user.completedSets = completedSets;
    saveDb(db);
    return true;
  }
  return false;
}
