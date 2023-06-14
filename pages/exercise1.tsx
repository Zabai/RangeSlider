import useSWRImmutable from "swr/immutable";
import { getNormalRangeApi } from "../api/rangesApi";
import { Layout } from "../components/Layout/Layout";
import { GET_NORMAL_RANGES_ENDPOINT } from "../constants/endpoints";

export async function getStaticProps() {
  return {
    props: {
      fallback: { [GET_NORMAL_RANGES_ENDPOINT]: await getNormalRangeApi() },
    },
  };
}

export default function Exercise1() {
  const { data } = useSWRImmutable(
    GET_NORMAL_RANGES_ENDPOINT,
    getNormalRangeApi
  );

  return (
    <Layout title="Range Slider - EX1">
      <h1>Exercise 1</h1>
      <p>{JSON.stringify(data)}</p>
    </Layout>
  );
}
