export class ResultImpl<T, E> {
  public value: T | E;
  private isOkFlag: boolean;

  constructor(
    valueOrError: { value: T; isOk: true } | { error: E; isOk: false }
  ) {
    if (valueOrError.isOk) {
      this.value = valueOrError.value;
      this.isOkFlag = true;
    } else {
      this.value = valueOrError.error;
      this.isOkFlag = false;
    }
  }

  map<R>(fn: (v: T, r: this) => R): Result<R, E> {
    if (this.isOk()) {
      return Result.ok(fn(this.value, this));
    } else return this as any as Result<never, E>;
  }

  isOk(): this is Result<T, never> {
    return this.isOkFlag;
  }

  isError(): this is Result<never, E> {
    return !this.isOkFlag;
  }
}

export interface ResultInterface<T, E> {
  value: T | E;

  isOk(): this is ResultLike<T, never>;
  isError(): this is ResultLike<never, E>;
}

export type ResultLike<T, E> =
  | ResultInterface<T, never>
  | ResultInterface<never, E>;

export type Result<T, E> = ResultImpl<T, never> | ResultImpl<never, E>;

export const Result = {
  toCurrentResult<T, E>(result: ResultLike<T, E>): Result<T, E> {
    if (result.isOk()) {
      return Result.ok(result.value);
    } else {
      return Result.err(result.value);
    }
  },

  ok<T>(value: T): Result<T, never> {
    return new ResultImpl<T, never>({ value, isOk: true });
  },

  err<E>(error: E): Result<never, E> {
    return new ResultImpl<never, E>({ error, isOk: false });
  },
};
