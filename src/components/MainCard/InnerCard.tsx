import TopicTag from "@/components/TopicTag";
import { type StoryTopic, type StoryType } from "@prisma/client";

interface Props {
  tag: StoryTopic;
  title: string;
  subtitle: string;
  author: string;
  date: string;
  mediaType: StoryType;
}

export default function InnerCard({
  tag,
  title,
  subtitle,
  author,
  date,
  mediaType,
}: Props) {
  return (
    <div className="absolute bottom-[0%] lg:bottom-[27%] transition-all duration-300 z-20 flex w-full flex-col rounded bg-white lg:bg-transparent relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#196e8c] to-[#65a69e] transition-opacity duration-300 lg:opacity-100 opacity-0 lg:px-5 lg:pt-12 rounded"></div>
      <div className="flex flex-col rounded p-5 z-10">
        <div className="flex items-start justify-between">
          <TopicTag name={tag} />
          <p className="m-0 hidden p-0 text-xs text-sciquelMuted">
            {mediaType}
          </p>
        </div>
        <h2 className="my-2 text-left font-alegreyaSansSC text-3xl font-bold text-sciquelDarkText lg:text-white">
          {title}
        </h2>
        <h4 className="line-clamp-3 text-left text-xl text-sciquelDarkText lg:text-white transition-all duration-300">
          {subtitle}
        </h4>
      </div>
      <div className="mx-5 my-3 text-left lg:hidden transition-all duration-300">
        <p className="top-full font-sourceSerif4 text-xl font-[350] text-sciquelMuted">
          {author} | {date}
        </p>
      </div>
    </div>
  );
}