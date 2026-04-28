import { notFound } from "next/navigation";
import LoftDetailClient from "./LoftDetailClient";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

// Генерация SEO мета-данных
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const res = await fetch(
    `${STRAPI_URL}/api/lofts?filters[slug][$eq]=${slug}&populate=seo`,
  );
  const result = await res.json();
  const loft = result.data?.[0];

  if (!loft) return { title: "Пространство не найдено" };

  return {
    title: loft.seo?.metaTitle || loft.title,
    description: loft.seo?.metaDescription || loft.description,
    keywords: loft.seo?.keywords,
  };
}

export default async function LoftPage({ params }) {
  const { slug } = await params;

  // 1. Загружаем текущий лофт
  const res = await fetch(
    `${STRAPI_URL}/api/lofts?filters[slug][$eq]=${slug}&populate=*`,
  );
  const result = await res.json();
  const rawLoft = result.data?.[0];

  if (!rawLoft) return notFound();

  // 2. Загружаем другие лофты для слайдера
  const otherRes = await fetch(
    `${STRAPI_URL}/api/lofts?filters[slug][$ne]=${slug}&populate=*&pagination[limit]=6`,
  );
  const otherResult = await otherRes.json();

  // Форматируем основной лофт (убираем [0], так как это объекты)
  const loft = {
    ...rawLoft,
    image: rawLoft.image?.url ? `${STRAPI_URL}${rawLoft.image.url}` : "",
    video: rawLoft.video?.url ? `${STRAPI_URL}${rawLoft.video.url}` : "",
    features: rawLoft.features?.map((f) => f.item) || [],
  };

  // Форматируем другие лофты (здесь тоже убираем [0])
  const otherLofts = otherResult.data.map((item) => ({
    slug: item.slug,
    title: item.title,
    capacity: item.capacity,
    video: item.video?.url ? `${STRAPI_URL}${item.video.url}` : "",
  }));

  return <LoftDetailClient loft={loft} otherLofts={otherLofts} />;
}
