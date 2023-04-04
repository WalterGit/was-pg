import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { PrismaClient } from "@prisma/client";
import { Product } from "./interfaces/Product";
import { env } from "process";

const prisma = new PrismaClient();

export async function loader() {
  let allProducts: Product[] = [];

  for (let page = 1; page <= 2; page++) {
    // exemplo para 10 paginas
    const response = await fetch(
      `https://bling.com.br/Api/v2/produtos/page=${page}/json/?apikey=${process.env.BLING_API_KEY}` 
    );
    const data = await response.json();
    const products = data.retorno.produtos;
    allProducts = [...allProducts, ...products];

    // Salva os produtos no banco de dados usando o Prisma
    const upsertProducts = products.map((product: Product) => ({
      where: { id: Number(product.produto.id) },
      create: {
        id: Number(product.produto.id),
        codigo: product.produto.codigo,
        descricao: product.produto.descricao,
        tipo: product.produto.tipo,
        situacao: product.produto.situacao,
        unidade: product.produto.unidade,
        preco: product.produto.preco,
        precoCusto: product.produto.precoCusto,
        descricaoCurta: product.produto.descricaoCurta,
        descricaoComplementar: product.produto.descricaoComplementar,
        dataInclusao: product.produto.dataInclusao,
        dataAlteracao: product.produto.dataAlteracao,
        imageThumbnail: product.produto.imageThumbnail,
        urlVideo: product.produto.urlVideo,
        nomeFornecedor: product.produto.nomeFornecedor,
        codigoFabricante: product.produto.codigoFabricante,
        marca: product.produto.marca,
        class_fiscal: product.produto.class_fiscal,
        cest: product.produto.cest,
        origem: product.produto.origem,
        idGrupoProduto: product.produto.idGrupoProduto,
        linkExterno: product.produto.linkExterno,
        observacoes: product.produto.observacoes,
        grupoProduto: product.produto.grupoProduto,
        garantia: product.produto.garantia,
        descricaoFornecedor: product.produto.descricaoFornecedor,
        idFabricante: product.produto.idFabricante,
        pesoLiq: product.produto.pesoLiq,
        pesoBruto: product.produto.pesoBruto,
        estoqueMinimo: product.produto.estoqueMinimo,
        estoqueMaximo: product.produto.estoqueMaximo,
        gtin: product.produto.gtin,
        gtinEmbalagem: product.produto.gtinEmbalagem,
        larguraProduto: product.produto.larguraProduto,
        alturaProduto: product.produto.alturaProduto,
        profundidadeProduto: product.produto.profundidadeProduto,
        unidadeMedida: product.produto.unidadeMedida,
        itensPorCaixa: String(product.produto.itensPorCaixa),
        volumes: String(product.produto.volumes),
        localizacao: product.produto.localizacao,
        crossdocking: product.produto.crossdocking,
        condicao: product.produto.condicao,
        freteGratis: product.produto.freteGratis,
        producao: product.produto.producao,
        dataValidade: product.produto.dataValidade,
        spedTipoItem: product.produto.spedTipoItem,
      },
      update: {
        codigo: product.produto.codigo,
        descricao: product.produto.descricao,
        tipo: product.produto.tipo,
        situacao: product.produto.situacao,
        unidade: product.produto.unidade,
        preco: product.produto.preco,
        precoCusto: product.produto.precoCusto,
        descricaoCurta: product.produto.descricaoCurta,
        descricaoComplementar: product.produto.descricaoComplementar,
        dataInclusao: product.produto.dataInclusao,
        dataAlteracao: product.produto.dataAlteracao,
        imageThumbnail: product.produto.imageThumbnail,
        urlVideo: product.produto.urlVideo,
        nomeFornecedor: product.produto.nomeFornecedor,
        codigoFabricante: product.produto.codigoFabricante,
        marca: product.produto.marca,
        class_fiscal: product.produto.class_fiscal,
        cest: product.produto.cest,
        origem: product.produto.origem,
        idGrupoProduto: product.produto.idGrupoProduto,
        linkExterno: product.produto.linkExterno,
        observacoes: product.produto.observacoes,
        grupoProduto: product.produto.grupoProduto,
        garantia: product.produto.garantia,
        descricaoFornecedor: product.produto.descricaoFornecedor,
        idFabricante: product.produto.idFabricante,
        pesoLiq: product.produto.pesoLiq,
        pesoBruto: product.produto.pesoBruto,
        estoqueMinimo: product.produto.estoqueMinimo,
        estoqueMaximo: product.produto.estoqueMaximo,
        gtin: product.produto.gtin,
        gtinEmbalagem: product.produto.gtinEmbalagem,
        larguraProduto: product.produto.larguraProduto,
        alturaProduto: product.produto.alturaProduto,
        profundidadeProduto: product.produto.profundidadeProduto,
        unidadeMedida: product.produto.unidadeMedida,
        itensPorCaixa: String(product.produto.itensPorCaixa),
        volumes: String(product.produto.volumes),
        localizacao: product.produto.localizacao,
        crossdocking: product.produto.crossdocking,
        condicao: product.produto.condicao,
        freteGratis: product.produto.freteGratis,
        producao: product.produto.producao,
        dataValidade: product.produto.dataValidade,
        spedTipoItem: product.produto.spedTipoItem,
      },
    }));
    await prisma.$transaction(
      upsertProducts.map((product) =>
        prisma.product.upsert({
          where: product.where,
          create: product.create,
          update: product.update,
        })
      )
    );
  }

  //   return json(allProducts);
  return null;
}
