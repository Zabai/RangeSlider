import Link from "next/link";

export default function Index() {
  return (
    <>
      <h1>Home page</h1>

      <ul>
        <li>
          <Link href="/exercise1">Exercise 1</Link>
        </li>
        <li>
          <Link href="/exercise2">Exercise 2</Link>
        </li>
      </ul>
    </>
  );
}
