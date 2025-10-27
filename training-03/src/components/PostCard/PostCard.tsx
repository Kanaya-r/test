import Link from "next/link";
import Image from "next/image";
import Styles from "./PostCard.module.scss";

type Props = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image?: string;
  likes: number;
  tags: string[];
};

export function PostCard({ slug, excerpt, title, date, tags, image, likes }: Props) {
  const postDate = new Date(date);
  const formatted = new Intl.DateTimeFormat("ja-JP", { dateStyle: "medium" }).format(postDate); // 2025年1月1日
  const isoString = postDate.toISOString().split('T')[0]; // 2025-01-01

  return (
    <article className={ Styles.postCard }>
      <Image
        className={Styles.thumb}
        src={ image ? image : "/next-training/dummy_400x300.png" }
        alt=""
        width={300}
        height={169}
      />
      <div className={ Styles.content }>
        <header>
          <ul className={ Styles.tags }>
            {tags.map(tag => (
              <li key={ tag }>{ tag }</li>
            ))}
          </ul>
          <time className={ Styles.date } dateTime={ isoString }>{ formatted }</time>
        </header>
        <p className={ Styles.title }>{ title }</p>
        <footer>
          <div>
            <button>いいね</button>
            <span>{ likes }</span>
          </div>
          <a className={ Styles.readMore } href="#">
            <p>続きを読む</p>
          </a>
        </footer>
      </div>
    </article>
  )
}