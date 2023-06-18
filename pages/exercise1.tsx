import useSWRImmutable from "swr/immutable";
import { getNormalRangeApi } from "../api/rangesApi";
import { Layout } from "../components/Layout/Layout";
import { GET_NORMAL_RANGES_ENDPOINT } from "../constants/endpoints";
import { RangeSlider } from "../components/RangeSlider/RangeSlider";

export async function getStaticProps() {
  return {
    props: {
      fallback: { [GET_NORMAL_RANGES_ENDPOINT]: await getNormalRangeApi() },
    },
  };
}

export default function Exercise1() {
  const { data, isLoading } = useSWRImmutable(
    GET_NORMAL_RANGES_ENDPOINT,
    getNormalRangeApi
  );

  if (isLoading || !data) return;

  return (
    <Layout title="Range Slider - EX1">
      <h1>Exercise 1</h1>
      <RangeSlider currency="€" maxValue={data.max} minValue={data.min} />
      <p>API result: {JSON.stringify(data)}</p>
    </Layout>
  );
}
