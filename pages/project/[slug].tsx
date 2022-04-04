import { useMDXComponent } from 'next-contentlayer/hooks';
import components from 'components/MDXComponents';
import ProjectLayout from 'layouts/project';
import { allProjects } from 'contentlayer/generated';
import type { Project } from 'contentlayer/generated';

export default function Post({ post }: { post: Project }) {
  const Component = useMDXComponent(post.body.code);

  return (
    <ProjectLayout post={post}>
      <Component
        components={
          {
            ...components
          } as any
        }
      />
    </ProjectLayout>
  );
}

export async function getStaticPaths() {
  return {
    paths: allProjects.map((p) => ({ params: { slug: p.slug } })),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const post = allProjects.find((post) => post.slug === params.slug);

  return { props: { post } };
}
