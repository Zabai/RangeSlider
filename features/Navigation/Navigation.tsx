import Link from "next/link";

export function Navigation() {
  return (
    <nav aria-label="Main links">
      <ul>
        <li>
          <Link href="/exercise1" title="This link takes you to exercise 1">
            Exercise 1
          </Link>
        </li>
        <li>
          <Link href="/exercise2" title="This link takes you to exercise 2">
            Exercise 2
          </Link>
        </li>
      </ul>
    </nav>
  );
}
