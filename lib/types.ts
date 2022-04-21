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
  stars: number;
};

export type FunFact = {
  fact: string;
}