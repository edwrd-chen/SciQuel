export default function Layout(props: {
  greeting: React.ReactNode;
  quiz_history: React.ReactNode;
  article_cards: React.ReactNode;
  quiz_summary: React.ReactNode;
  brained_article_carousel: React.ReactNode;
}) {
  return (
    <div className="relative flex grow flex-col pt-6 md:pl-56 ">
      {props.brained_article_carousel}
      {props.greeting}
      {/* {props.quiz_history} */}
      {props.article_cards}
    </div>
  );
}
