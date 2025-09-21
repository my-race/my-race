import PageHeader from '../common/PageHeader';

interface PageLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export default function PageLayout({
  title,
  subtitle,
  children,
}: PageLayoutProps) {
  return (
    <article className="flex flex-col h-full bg-white">
      <PageHeader title={title} subtitle={subtitle} />
      {children}
    </article>
  );
}
