import { describe, expect, test } from "vitest";
import { Result, ResultInterface } from "../src";

test("Result.ok", () => {
  const result = Result.ok(1234);
  expect(result.value).eq(1234);
  expect(result.isOk()).eq(true);
  expect(result.isError()).eq(false);
});

test("Result.err", () => {
  const result = Result.err("abcd");
  expect(result.value).eq("abcd");
  expect(result.isOk()).eq(false);
  expect(result.isError()).eq(true);
});

test("Result.ok | Result.err", () => {
  {
    const result: Result<number, string> = Result.ok(1234);
    expect(result.value).eq(1234);
    expect(result.isOk()).eq(true);
    expect(result.isError()).eq(false);
  }
  {
    const result: Result<number, string> = Result.err("abcd");
    expect(result.value).eq("abcd");
    expect(result.isOk()).eq(false);
    expect(result.isError()).eq(true);
  }
});

test("Result.toCurrentResult", () => {
  const oldResult: ResultInterface<number, never> = {
    value: 1234,
    isOk() {
      return true;
    },
    isError() {
      return false;
    },
  };
  const result = Result.toCurrentResult(oldResult);
  expect(result.value).eq(1234);
  expect(result.isOk()).eq(true);
  expect(result.isError()).eq(false);
});

async function fetchUser(): Result<any, number> {
  const response = fetch( ... );
  if (!response.ok) return Result.err(response.status);
  return Result.ok(response.json());
}

const result = await fetchUser()

if (result.isError()){
  console.error(
      "Failed to fetch user."
    + `Status code: ${result.value}`
  );
  process.exit(1);
}

console.log(`hello, ${result.value.name}!`)