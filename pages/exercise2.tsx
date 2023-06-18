import useSWRImmutable from "swr/immutable";
import { getFixedRangeApi } from "../api/rangesApi";
import { Layout } from "../components/Layout/Layout";
import { GET_FIXED_RANGES_ENDPOINT } from "../constants/endpoints";
import { RangeSlider } from "../components/RangeSlider/RangeSlider";

export async function getStaticProps() {
  return {
    props: {
      fallback: { [GET_FIXED_RANGES_ENDPOINT]: await getFixedRangeApi() },
    },
  };
}

export default function Exercise2() {
  const { data, error, isLoading } = useSWRImmutable(
    GET_FIXED_RANGES_ENDPOINT,
    getFixedRangeApi
  );

  if (error) return <div>error</div>;
  if (isLoading || !data) return;

  return (
    <Layout title="Range Slider - EX2">
      <h1>Exercise 2</h1>
      <RangeSlider
        currency="€"
        fixedValues={data}
        maxValue={Math.max(...data)}
        minValue={Math.min(...data)}
      />
      <p>API result: {JSON.stringify(data)}</p>
    </Layout>
  );
}
