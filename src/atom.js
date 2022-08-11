import { atom } from 'recoil';

export const repoState = atom({
  key: 'repo',
  default: [],
});

export const urlState = atom({
  key: 'url',
  default: [],
});

export const ItemState = atom({
  key: 'items',
  default: [],
});