import { atom } from 'recoil';

export const repoState = atom({
  key: 'repo',
  default: [],
});

export const urlState = atom({
  key: 'url',
  default: [],
});

export const itemState = atom({
  key: 'items',
  default: JSON.parse(localStorage.getItem('repos')) || [],
});

export const issueState = atom({
  key: 'issues',
  default: [],
});
