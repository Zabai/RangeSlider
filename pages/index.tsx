import Link from "next/link";
import { Layout } from "../components/Layout/Layout";

export default function Index() {
  return (
    <Layout title="Range Slider">
      <h1>Home page</h1>

      <ul>
        <li>
          <Link href="/exercise1">Exercise 1</Link>
        </li>
        <li>
          <Link href="/exercise2">Exercise 2</Link>
        </li>
      </ul>
    </Layout>
  );
}
