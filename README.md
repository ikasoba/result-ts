<p align="center">
result-ts provides a class that is useful when dealing with exceptions in TypeScript.
</p>

[![npm](https://img.shields.io/npm/v/@ikasoba000/result-ts?style=flat-square)](https://www.npmjs.com/package/@ikasoba000/parsing)
![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/ikasoba/result-ts/test.yaml?label=test&style=flat-square)

```ts
import { Result } from "@ikasoba000/result-ts";

async function fetchUser(): Promise<Result<User, number>> {
  const response = await fetch( ... );
  if (!response.ok) return Result.err(response.status);
  return Result.ok(await response.json());
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
```

# Result.ok&lt;T>(value: T): Result&lt;T, never>

Returns a `successful` Result.

# Result.err&lt;E>(value: E): Result&lt;never, E>

Returns a `Result` containing an exception.

# Result.toCurrentResult&lt;T, E>(result: ResultLike&lt;T, E>): Result&lt;T, E>

Generates a `Result` from a `ResultLike`.

This is useful when converting Results between different versions.

# Result#isOk(): boolean

Check to see if the Result was successful.

# Result#isError(): boolean

Check to see if the Result failed.
