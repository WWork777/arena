import { notFound } from "next/navigation";
import LoftDetailClient from "./LoftDetailClient";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export default async function LoftPage({ params }) {
  const { slug } = await params;

  // 1. Запрос к Strapi с отключением кэша
  const res = await fetch(
    `${STRAPI_URL}/api/lofts?filters[slug][$eq]=${slug}&populate=*`,
    { cache: "no-store" },
  );
  const result = await res.json();
  const rawLoft = result.data?.[0];

  if (!rawLoft) return notFound();

  // 2. Маппинг данных (строго по твоему JSON)
  const loft = {
    ...rawLoft,
    // Одиночные файлы
    image: rawLoft.image?.url ? `${STRAPI_URL}${rawLoft.image.url}` : "",
    video: rawLoft.video?.url ? `${STRAPI_URL}${rawLoft.video.url}` : "",
    // Массив компонентов
    features: rawLoft.features?.map((f) => f.item) || [],

    // Множественные медиа (Слайдеры)
    tariffs: Array.isArray(rawLoft.tariffs)
      ? rawLoft.tariffs.map((img) => ({
          id: img.id,
          url: `${STRAPI_URL}${img.url}`,
        }))
      : [],
    photos: Array.isArray(rawLoft.gallery_photos)
      ? rawLoft.gallery_photos.map((img) => ({
          id: img.id,
          url: `${STRAPI_URL}${img.url}`,
        }))
      : [],
    videos: Array.isArray(rawLoft.gallery_videos)
      ? rawLoft.gallery_videos.map((vid) => ({
          id: vid.id,
          url: `${STRAPI_URL}${vid.url}`,
        }))
      : [],
  };

  // 3. Запрос похожих лофтов
  const otherRes = await fetch(
    `${STRAPI_URL}/api/lofts?filters[slug][$ne]=${slug}&populate=image&pagination[limit]=6`,
    { cache: "no-store" },
  );
  const otherResult = await otherRes.json();
  const otherLofts =
    otherResult.data?.map((item) => ({
      slug: item.slug,
      title: item.title,
      capacity: item.capacity,
      image: item.image?.url ? `${STRAPI_URL}${item.image.url}` : "",
    })) || [];

  return <LoftDetailClient loft={loft} otherLofts={otherLofts} />;
}
