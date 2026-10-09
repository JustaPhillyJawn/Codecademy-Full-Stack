import { Injectable, inject } from '@angular/core';
import { collection, deleteDoc, doc, getDocs, query, setDoc, where } from 'firebase/firestore';

import { firestore } from '../firebase';
import { ArmyList, ArmyUnit } from '../models/army-unit';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class ArmyListService {
  private readonly authService = inject(AuthService);
  private readonly listStorageKey = 'armybuilder-lists-v1';
  private readonly activeListKey = 'armybuilder-active-list-v1';
  private readonly listCollection = collection(firestore, 'armyLists');

  async loadUserListsFromFirestore(): Promise<ArmyList[]> {
    if (this.authService.getCurrentUserId() === 'anonymous') {
      return this.readLists();
    }

    const q = query(this.listCollection, where('userId', '==', this.authService.getCurrentUserId()));
    const snapshot = await getDocs(q);
    const remoteLists = snapshot.docs.map((document) => document.data() as ArmyList);

    if (remoteLists.length > 0) {
      this.storeLists(remoteLists);
      return remoteLists;
    }

    return this.readLists();
  }

  persistLists(lists: ArmyList[]): void {
    this.storeLists(lists);
    void this.persistListsToFirestore(lists);
  }

  loadLists(): ArmyList[] {
    return this.readLists();
  }

  getActiveList(): ArmyList {
    const lists = this.readLists();
    if (lists.length === 0) {
      return { id: '', name: 'No active list', units: [] };
    }

    const activeId = this.readActiveListId();
    const current = lists.find((list) => list.id === activeId) ?? lists[0];

    this.storeActiveListId(current.id);
    return current;
  }

  setActiveListId(listId: string): void {
    this.storeActiveListId(listId);
  }

  createList(name = 'Crusade List'): ArmyList {
    const lists = this.readLists();
    const nextName = this.getUniqueListName(name, lists);
    const newList: ArmyList = {
      id: this.createId(),
      name: nextName,
      units: []
    };

    lists.push(newList);
    this.persistLists(lists);
    this.storeActiveListId(newList.id);
    return newList;
  }

  renameList(listId: string, newName: string): void {
    const trimmed = newName.trim();
    if (!trimmed) {
      return;
    }

    const lists = this.readLists();
    const list = lists.find((entry) => entry.id === listId);
    if (!list) {
      return;
    }

    list.name = this.getUniqueListName(trimmed, lists.filter((entry) => entry.id !== listId));
    this.persistLists(lists);
  }

  addUnitToList(listId: string, unit: ArmyUnit): void {
    const lists = this.readLists();
    const list = lists.find((entry) => entry.id === listId);
    if (!list) {
      return;
    }

    list.units = [...list.units, unit];
    this.persistLists(lists);
  }

  removeUnitFromList(listId: string, index: number): void {
    const lists = this.readLists();
    const list = lists.find((entry) => entry.id === listId);
    if (!list || index < 0 || index >= list.units.length) {
      return;
    }

    list.units.splice(index, 1);
    this.persistLists(lists);
  }

  deleteList(listId: string): ArmyList[] {
    const lists = this.readLists().filter((list) => list.id !== listId);

    if (lists.length === 0) {
      this.storeLists([]);
      this.storeActiveListId('');
      void this.deleteFirestoreList(listId);
      return [];
    }

    const active = this.readActiveListId();
    if (!active || active === listId) {
      this.storeActiveListId(lists[0].id);
    }

    this.persistLists(lists);
    void this.deleteFirestoreList(listId);
    return lists;
  }

  private async deleteFirestoreList(listId: string): Promise<void> {
    try {
      await deleteDoc(doc(this.listCollection, listId));
    } catch {
    }
  }

  private async persistListsToFirestore(lists: ArmyList[]): Promise<void> {
    try {
      const userId = this.authService.getCurrentUserId();
      await Promise.all(
        lists.map((list) => setDoc(doc(this.listCollection, list.id), {
          ...list,
          userId
        }))
      );
    } catch {
    }
  }

  private readLists(): ArmyList[] {
    if (typeof localStorage === 'undefined') {
      return [];
    }

    const raw = localStorage.getItem(this.getStorageKey());
    if (!raw) {
      return [];
    }

    try {
      const parsed = JSON.parse(raw) as ArmyList[];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  private storeLists(lists: ArmyList[]): void {
    if (typeof localStorage === 'undefined') {
      return;
    }

    localStorage.setItem(this.getStorageKey(), JSON.stringify(lists));
  }

  private readActiveListId(): string {
    if (typeof localStorage === 'undefined') {
      return '';
    }

    return localStorage.getItem(`${this.activeListKey}-${this.authService.getCurrentUserId()}`) ?? '';
  }

  private storeActiveListId(listId: string): void {
    if (typeof localStorage === 'undefined') {
      return;
    }

    localStorage.setItem(`${this.activeListKey}-${this.authService.getCurrentUserId()}`, listId);
  }

  private getUniqueListName(name: string, lists: ArmyList[]): string {
    const trimmed = name.trim() || 'Crusade List';
    const matches = lists.filter((list) => list.name.toLowerCase() === trimmed.toLowerCase());

    if (matches.length === 0) {
      return trimmed;
    }

    let counter = 2;
    let candidate = `${trimmed} ${counter}`;
    while (lists.some((list) => list.name.toLowerCase() === candidate.toLowerCase())) {
      counter += 1;
      candidate = `${trimmed} ${counter}`;
    }

    return candidate;
  }

  private createId(): string {
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  private getStorageKey(): string {
    return `${this.listStorageKey}-${this.authService.getCurrentUserId()}`;
  }
}