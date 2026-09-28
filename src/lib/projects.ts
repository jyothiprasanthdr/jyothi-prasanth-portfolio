import { getCollection } from 'astro:content';

// #region projects
export async function publicProjects() {
  const projects = await getCollection('projects');
  return projects.sort((a, b) => a.data.order - b.data.order);
}
// #endregion projects
