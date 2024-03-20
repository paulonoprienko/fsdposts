export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
  eol?: boolean;
};

export type Params = {
  limit: number;
  start?: number;
};
