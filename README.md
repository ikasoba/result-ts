<center>
result-ts provides a class that is useful when dealing with exceptions in TypeScript.
</center>

![npm](https://img.shields.io/npm/v/@ikasoba000/result-ts?style=flat-square)
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

# about
