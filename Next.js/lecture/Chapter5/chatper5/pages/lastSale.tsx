import { useEffect, useState } from "react";
import useSWR from "swr";

function LastSalesPage(props) {
  const [sales, setSales] = useState(props.sales);

  const { data, error } = useSWR(
    "https://hisdf-3d150-default-rtdb.firebaseio.com/sales.json"
  );

  useEffect(() => {
    if (data) {
      const transformSales = [];
      for (const key in data) {
        transformSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }
      setSales(transformSales);
    }
  }, [data]);
  console.log(data);
  if (error) {
    return <p>Failed to load</p>;
  }
  if (!data && !sales) {
    return <p>Loading...</p>;
  }
  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const response = await fetch(
    "https://hisdf-3d150-default-rtdb.firebaseio.com/sales.json"
  );
  const data = await response.json();
  const transformSales = [];
  for (const key in data) {
    transformSales.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }
  return { props: { sales: transformSales } };
}

export default LastSalesPage;
