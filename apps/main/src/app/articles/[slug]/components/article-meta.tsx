import { DateDisplay } from './date-display';
import DatePopover, { type DatePopoverItem } from './date-popover';

type ArticleMetaProps = {
  frontmatter: {
    videoId?: string;
    updatedAt?: string;
    publishedAt?: string;
    authors: string[];
    videoPublishedAt?: string;
    createdAt: string;
  };
};

const ArticleMeta = ({ frontmatter }: ArticleMetaProps) => {
  const updatedItems: DatePopoverItem[] = [];

  if (frontmatter.updatedAt) {
    updatedItems.push({
      label: 'Updated on: ',
      value: <DateDisplay format="datetime" date={frontmatter.updatedAt} />,
    });
  }

  updatedItems.push({
    label: 'Writing started on: ',
    value: <DateDisplay format="datetime" date={frontmatter.createdAt} fallback="N/A" />,
  });

  return (
    <header className="border-primary dark:border-accent mb-8 border-b pb-4">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between md:gap-4">
        <DatePopover
          triggerChildren={
            <>
              Published on <DateDisplay format="date" date={frontmatter.publishedAt} fallback="DRAFT" />
            </>
          }
          items={[
            {
              label: 'Published on: ',
              value: <DateDisplay format="datetime" date={frontmatter.publishedAt} fallback="DRAFT" />,
            },
            {
              label: 'Video published on: ',
              value: <DateDisplay format="datetime" date={frontmatter.videoPublishedAt} fallback="N/A" />,
            },
          ]}
        />

        <span className="text-muted-foreground font-mono text-xs uppercase tracking-widest">
          Written by {frontmatter.authors.join(', ')}
        </span>

        <DatePopover
          triggerChildren={
            frontmatter.updatedAt ? (
              <span>
                Updated on <DateDisplay format="date" date={frontmatter.updatedAt} />
              </span>
            ) : (
              <span>
                Writing started on <DateDisplay format="date" date={frontmatter.createdAt} />
              </span>
            )
          }
          items={updatedItems}
        />
      </div>
    </header>
  );
};

export default ArticleMeta;

