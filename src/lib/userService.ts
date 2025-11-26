import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';
import { User } from 'firebase/auth';
import { UserProfile, Department } from '../types/user';

const USERS_COLLECTION = 'users';

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  try {
    const userRef = doc(db, USERS_COLLECTION, uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const data = userSnap.data();
      return {
        uid: data.uid,
        email: data.email,
        displayName: data.displayName,
        photoURL: data.photoURL,
        department: data.department,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      };
    }

    return null;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
}

export async function createUserProfile(user: User): Promise<UserProfile> {
  const userRef = doc(db, USERS_COLLECTION, user.uid);

  const profile: Omit<UserProfile, 'createdAt' | 'updatedAt'> & {
    createdAt: ReturnType<typeof serverTimestamp>;
    updatedAt: ReturnType<typeof serverTimestamp>;
  } = {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    department: null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  await setDoc(userRef, profile);

  return {
    ...profile,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export async function updateUserDepartment(
  uid: string,
  department: Department
): Promise<void> {
  const userRef = doc(db, USERS_COLLECTION, uid);

  await updateDoc(userRef, {
    department,
    updatedAt: serverTimestamp(),
  });
}

export async function getOrCreateUserProfile(user: User): Promise<UserProfile> {
  const existingProfile = await getUserProfile(user.uid);

  if (existingProfile) {
    return existingProfile;
  }

  return createUserProfile(user);
}

