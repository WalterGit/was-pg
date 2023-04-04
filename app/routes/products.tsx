import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface Product {
  produto: {
    id: number;
    codigo: string;
    descricao: string;
    preco: string;
    situacao: string;
  };
}


export async function loader() {
  let allProducts: Product[] = [];

  for (let page = 1; page <= 1; page++) {
    // exemplo para 10 paginas
    const response = await fetch(
      `https://bling.com.br/Api/v2/produtos/page=${page}/json/?apikey=330e0a0dc13c12418d4bc754c0735480fbc82d8399b5a234d99229dbe6b4e212b6e04a56`
    );
    const data = await response.json();
    const products = data.retorno.produtos;
    allProducts = [...allProducts, ...products];

    // Salva os produtos no banco de dados usando o Prisma
    await prisma.product.createMany({
    
        //  where: { id: { equals: {products}.products.map((product:Product) => product.produto.id) } },
        //  create: { id: { equals: {products}.products.map((product:Product) => (
        //     product.produto.id,
        //     product.produto.codigo,
        //     product.produto.descricao,
        //     product.produto.preco,
        //     product.produto.situacao,
        //     )) } },





      data: {products}.products.map((product:Product) => ({
        id: product.produto.id,
        codigo: product.produto.codigo,
        descricao: product.produto.descricao,
        preco: product.produto.preco,
        situacao: product.produto.situacao,
        })),
    });
  }

  return json(allProducts);
}

// export default function () {
//   const products = useLoaderData<Product[]>();
//   console.log({products}.products);

//   return ( 
//     <div>
//       {{products}.products.map((product) => (
//         <div>
//           <h1>{product.produto.id}</h1>
//           <p>{product.produto.descricao}</p>
//         </div>
//       ))}
//     </div>
//   );
// }
