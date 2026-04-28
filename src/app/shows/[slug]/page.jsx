import { notFound } from "next/navigation";
import ShowDetailClient from "./showDetailClient";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const res = await fetch(
    `${STRAPI_URL}/api/shows?filters[slug][$eq]=${slug}&populate=seo`,
  );
  const result = await res.json();
  const show = result.data?.[0];

  if (!show) return { title: "Программа не найдена" };

  return {
    title: show.seo?.metaTitle || show.title,
    description: show.seo?.metaDescription || show.desc,
  };
}

export default async function ShowPage({ params }) {
  const { slug } = await params;

  // Загружаем данные шоу и все связанные медиа
  const res = await fetch(
    `${STRAPI_URL}/api/shows?filters[slug][$eq]=${slug}&populate=*`,
  );
  const result = await res.json();
  const rawShow = result.data?.[0];

  if (!rawShow) return notFound();

  // Загружаем другие шоу для слайдера
  const otherRes = await fetch(
    `${STRAPI_URL}/api/shows?filters[slug][$ne]=${slug}&populate=thumbnail&pagination[limit]=8`,
  );
  const otherResult = await otherRes.json();

  const show = {
    ...rawShow,
    thumbnail: rawShow.thumbnail?.url
      ? `${STRAPI_URL}${rawShow.thumbnail.url}`
      : "",
    video: rawShow.video?.url ? `${STRAPI_URL}${rawShow.video.url}` : "",
    features: rawShow.features?.map((f) => f.item) || [],
    // Обработка галерей (массивы в Strapi 5)
    photos:
      rawShow.gallery_photos?.map((img) => ({
        id: img.id,
        url: `${STRAPI_URL}${img.url}`,
      })) || [],
    videos:
      rawShow.gallery_videos?.map((vid) => ({
        id: vid.id,
        url: `${STRAPI_URL}${vid.url}`,
      })) || [],
  };

  return <ShowDetailClient show={show} allShows={otherResult.data} />;
}
