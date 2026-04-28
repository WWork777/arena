import { notFound } from "next/navigation";
import QuestDetailClient from "./questsDetailClient";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const res = await fetch(
    `${STRAPI_URL}/api/quests?filters[slug][$eq]=${slug}&populate=seo`,
  );
  const result = await res.json();
  const quest = result.data?.[0];

  if (!quest) return { title: "Квест не найден" };

  return {
    title: quest.seo?.metaTitle || quest.title,
    description: quest.seo?.metaDescription || quest.desc,
  };
}

export default async function QuestPage({ params }) {
  const { slug } = await params;

  // Текущий квест
  const res = await fetch(
    `${STRAPI_URL}/api/quests?filters[slug][$eq]=${slug}&populate=*`,
  );
  const result = await res.json();
  const rawQuest = result.data?.[0];

  if (!rawQuest) return notFound();

  // Другие квесты для блока "Смотрите также"
  const otherRes = await fetch(
    `${STRAPI_URL}/api/quests?filters[slug][$ne]=${slug}&populate=*&pagination[limit]=4`,
  );
  const otherResult = await otherRes.json();

  const quest = {
    ...rawQuest,
    thumbnail: rawQuest.thumbnail?.url
      ? `${STRAPI_URL}${rawQuest.thumbnail.url}`
      : "",
    video: rawQuest.video?.url ? `${STRAPI_URL}${rawQuest.video.url}` : "",
    features: rawQuest.features?.map((f) => f.item) || [],
    photos:
      rawQuest.gallery_photos?.map((img) => ({
        id: img.id,
        url: `${STRAPI_URL}${img.url}`,
      })) || [],
    videos:
      rawQuest.gallery_videos?.map((vid) => ({
        id: vid.id,
        url: `${STRAPI_URL}${vid.url}`,
      })) || [],
  };

  const otherQuests = otherResult.data.map((item) => ({
    slug: item.slug,
    title: item.title,
    age: item.age,
    video: item.video?.url ? `${STRAPI_URL}${item.video.url}` : "",
  }));

  return <QuestDetailClient quest={quest} otherQuests={otherQuests} />;
}
