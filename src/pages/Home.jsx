import ContentCard from "../components/features/ContentCard";
import { useMedia } from "../components/hooks/useUser";

export default function Home() {
  const { medias, isLoading } = useMedia();

  console.log(medias);
  



  if (isLoading)
    return (
      <div className="w-full min-h-[70dvh] flex items-center justify-center">
        Fetching media...
      </div>
    );

  return (
    <div className="w-full space-y-10 mx-auto">
      {medias?.map((media) => (
        <ContentCard key={media.id} media={media} />
      ))}
    </div>
  );
}
