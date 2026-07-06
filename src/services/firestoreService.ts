import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { db } from '../firebase/config';

export async function listCollection<T>(path: string): Promise<T[]> {
  const snapshot = await getDocs(query(collection(db, path), orderBy('updatedAt', 'desc')));
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as T);
}

export async function upsertDocument<T extends { id?: string }>(path: string, payload: T) {
  const data = { ...payload, updatedAt: new Date().toISOString() };
  if (payload.id) return setDoc(doc(db, path, payload.id), data, { merge: true });
  return addDoc(collection(db, path), data);
}

export async function removeDocument(path: string, id: string) {
  return deleteDoc(doc(db, path, id));
}

export async function updateStatus(path: string, id: string, status: string) {
  return updateDoc(doc(db, path, id), { status, updatedAt: new Date().toISOString() });
}

export async function findByField<T>(path: string, field: string, value: string): Promise<T[]> {
  const snapshot = await getDocs(query(collection(db, path), where(field, '==', value)));
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as T);
}
