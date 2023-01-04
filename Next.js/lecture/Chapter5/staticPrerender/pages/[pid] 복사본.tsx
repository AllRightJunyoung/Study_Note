import path from "path";
import fs from "fs/promises";
const ProductDetailPage = (props) => {
  const { loadedProduct } = props;

  if (!loadedProduct) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </>
  );
};
export default ProductDetailPage;

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  return data;
}

export const getStaticProps = async (context) => {
  const { params } = context;

  const productId = params.pid;

  const data = await getData();

  const product = data.products.find((product) => product.id === productId);

  return {
    props: {
      loadedProduct: product,
    },
  };
};
export const getStaticPaths = async () => {
  const data = await getData();

  const ids = data.products.map((product) => product.id);

  const pathsWithparams = ids.map((id) => ({ params: { pid: id } }));
  return {
    paths: pathsWithparams,
    fallback: true,
  };
};
