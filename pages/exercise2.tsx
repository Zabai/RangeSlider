import useSWRImmutable from "swr/immutable";
import { getFixedRangeApi } from "../api/rangesApi";
import { Layout } from "../components/Layout/Layout";
import { GET_FIXED_RANGES_ENDPOINT } from "../constants/endpoints";

export async function getStaticProps() {
  return {
    props: {
      fallback: { [GET_FIXED_RANGES_ENDPOINT]: await getFixedRangeApi() },
    },
  };
}

export default function Exercise2() {
  const { data } = useSWRImmutable(GET_FIXED_RANGES_ENDPOINT, getFixedRangeApi);

  return (
    <Layout title="Range Slider - EX2">
      <h1>Exercise 2</h1>
      <p>{JSON.stringify(data)}</p>
    </Layout>
  );
}
