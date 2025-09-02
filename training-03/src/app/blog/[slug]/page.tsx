type Props = { params: { slug: string } };

export default function Page({ params }: Props) {
  return <h1>記事: {params.slug}</h1>;
}