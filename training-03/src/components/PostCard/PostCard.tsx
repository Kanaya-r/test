import Styles from './PostCard.module.scss'

type Props = {
  date: string;
  title: string;
  tags: string[];
}

export function PostCard({ date, title, tags }: Props) {
  const postDate = new Date(date);
  const formatted = new Intl.DateTimeFormat("ja-JP", { dateStyle: "medium" }).format(postDate); // 2025年1月1日
  const isoString = postDate.toISOString().split('T')[0]; // 2025-01-01

  return (
    <article className={ Styles.postCard }>
      <img className={ Styles.thumb } src="/dummy_400x300.png" alt="" />
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
          <button>いいね</button>
          <a className={ Styles.readMore } href="#">
            <p>続きを読む</p>
          </a>
        </footer>
      </div>
    </article>
  )
}