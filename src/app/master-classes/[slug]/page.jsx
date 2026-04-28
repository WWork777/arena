import { notFound } from "next/navigation";
import MasterDetailClient from "./masterDetailClient";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const res = await fetch(
    `${STRAPI_URL}/api/master-classes?filters[slug][$eq]=${slug}&populate=seo`,
  );
  const result = await res.json();
  const data = result.data?.[0];
  if (!data) return { title: "Мастер-класс не найден" };
  return {
    title: data.seo?.metaTitle || data.title,
    description: data.seo?.metaDescription,
  };
}

export default async function MasterPage({ params }) {
  const { slug } = await params;

  // 1. Получаем текущий мастер-класс
  const resMaster = await fetch(
    `${STRAPI_URL}/api/master-classes?filters[slug][$eq]=${slug}&populate=*`,
  );
  const resultMaster = await resMaster.json();
  const rawMaster = resultMaster.data?.[0];

  if (!rawMaster) return notFound();

  // 2. Получаем другие мастер-классы
  const resOthers = await fetch(
    `${STRAPI_URL}/api/master-classes?filters[slug][$ne]=${slug}&populate=thumbnail&pagination[limit]=6`,
  );
  const resultOthers = await resOthers.json();

  // 3. Получаем ВСЕ лофты из Strapi
  const resLofts = await fetch(`${STRAPI_URL}/api/lofts?populate=image`);
  const resultLofts = await resLofts.json();

  const master = {
    ...rawMaster,
    thumbnail: rawMaster.thumbnail?.url
      ? `${STRAPI_URL}${rawMaster.thumbnail.url}`
      : "",
    features: rawMaster.features?.map((f) => f.item) || [],
  };

  const otherMasters = resultOthers.data.map((item) => ({
    slug: item.slug,
    title: item.title,
    subtitle: item.subtitle,
    image: item.thumbnail?.url ? `${STRAPI_URL}${item.thumbnail.url}` : "",
  }));

  const lofts = resultLofts.data.map((item) => ({
    slug: item.slug,
    title: item.title,
    color: item.color,
    image: item.image?.url ? `${STRAPI_URL}${item.image.url}` : "",
  }));

  return (
    <MasterDetailClient
      master={master}
      otherMasters={otherMasters}
      lofts={lofts}
    />
  );
}
