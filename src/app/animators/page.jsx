import AnimatorDetailClient from "./AnimatorDetailClient";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export async function generateMetadata() {
  const res = await fetch(`${STRAPI_URL}/api/animator-pages?populate=seo`);
  const { data } = await res.json();

  return {
    title: data?.seo?.metaTitle || "Аниматоры в Томске",
    description: data?.seo?.metaDescription,
  };
}

export default async function AnimatorsPage() {
  // 1. Загружаем контент страницы аниматоров
  const resPage = await fetch(`${STRAPI_URL}/api/animator-pages?populate=*`, {
    cache: "no-store",
  });
  const pageResult = await resPage.json();

  // КРИТИЧЕСКОЕ ИЗМЕНЕНИЕ: Берем первый элемент массива [0]
  const pageData = pageResult.data?.[0];

  // 2. Загружаем лофты для нижнего слайдера
  const resLofts = await fetch(`${STRAPI_URL}/api/lofts?populate=image`, {
    cache: "no-store",
  });
  const loftsResult = await resLofts.json();

  // Если данных нет, не рендерим ничего
  if (!pageData) {
    console.error("Данные AnimatorPage не найдены в Strapi");
    return null;
  }

  // Форматируем данные страницы
  const animatorInfo = {
    // Теперь pageData — это объект, и эти поля будут работать:
    title: pageData.title || "Аниматоры",
    description: pageData.description || "",
    mainPhoto: pageData.main_photo?.url
      ? `${STRAPI_URL}${pageData.main_photo.url}`
      : "",
    videos:
      pageData.video_gallery?.map((v) => ({
        id: v.id,
        url: `${STRAPI_URL}${v.url}`,
      })) || [],
    photos:
      pageData.photo_gallery?.map((p) => ({
        id: p.id,
        url: `${STRAPI_URL}${p.url}`,
      })) || [],
  };

  // Форматируем лофты (здесь всё было верно)
  const lofts =
    loftsResult.data?.map((item) => ({
      id: item.slug,
      title: item.title,
      addr: item.equipment,
      img: item.image?.url ? `${STRAPI_URL}${item.image.url}` : "",
    })) || [];

  return <AnimatorDetailClient data={animatorInfo} lofts={lofts} />;
}
