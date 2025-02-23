import ContentCard from "../components/features/ContentCard";
import { useMedia } from "../components/hooks/useUser";

export default function Home() {
  const { medias, isLoading } = useMedia();

  if (isLoading) {
    return (
      <div className="w-full h-[60dvh] flex items-center justify-center">
        <img src="session_logo.svg" alt="" className="animate-pulse" />
      </div>
    );
  }

  return (
    <div className="w-full space-y-10 mx-auto">
      {medias
        ?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .map((media) => (
          <ContentCard key={media.id} media={media} />
        ))}
    </div>
  );
}
