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

export type GitHub = {
  followers: number;
  stars: number;
};

export type FunFact = {
  fact: string;
};
export type PopularItem = {
  title: string;
  slug: string;
  summary: string;
  count: string;
  logo?: string;
  url?: string;
}