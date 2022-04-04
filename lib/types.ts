import { MutableRef } from 'preact/hooks';
import { MutableRefObject } from 'react';

export enum Form {
  Initial,
  Loading,
  Success,
  Error
}

export type FormState = {
  state: Form;
  message?: string;
};

export type Views = {
  total: number;
};

export type Song = {
  songUrl: string;
  artist: string;
  title: string;
};

export type NowPlayingSong = {
  album: string;
  albumImageUrl: string;
  artist: string;
  isPlaying: boolean;
  songUrl: string;
  title: string;
};

export type GitHub = {
  stars: number;
};

export type FunFact = {
  fact: string;
}

export type Subscribers = {
  count: number;
};