import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getProjectDetails } from '@/core/content/project-details';
import { projects } from '@/core/content/projects';
import { ProjectDetails } from '@/core/modules/ProjectDetails';

interface ProjectPageProps {
  readonly params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  const details = getProjectDetails(slug);

  if (!project || !details) notFound();

  const title = `${project.name} — Bartosz Kozikowski`;

  return {
    title: { absolute: title },
    description: details.overview,
    openGraph: { title, description: details.overview, type: 'website' },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const index = projects.findIndex((project) => project.slug === slug);
  const project = projects[index];
  const details = getProjectDetails(slug);

  if (!project || !details) notFound();

  return <ProjectDetails project={project} details={details} nextProject={projects[(index + 1) % projects.length]} />;
}
