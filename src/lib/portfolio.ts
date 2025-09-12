import fs from "fs";
import path from "path";
import { Project } from "@/data/projects";

export async function getProjectImages(): Promise<Record<string, string[]>> {
  const imagesPath = path.join(process.cwd(), "public", "images");
  const projectImages: Record<string, string[]> = {};

  try {
    if (!fs.existsSync(imagesPath)) {
      return projectImages;
    }

    const folders = fs
      .readdirSync(imagesPath, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

    for (const folder of folders) {
      const folderPath = path.join(imagesPath, folder);
      const files = fs
        .readdirSync(folderPath)
        .filter((file) => /\.(jpg|jpeg|png|webp|svg)$/i.test(file))
        .map((file) => `/images/${folder}/${file}`);

      if (files.length > 0) {
        projectImages[folder] = files;
      }
    }
  } catch (error) {
    console.error("Error reading images folder:", error);
  }

  return projectImages;
}

export function slugifyProjectName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function generateProjectsFromImages(): Promise<
  Partial<Project>[]
> {
  const projectImages = await getProjectImages();
  const projects: Partial<Project>[] = [];

  Object.entries(projectImages).forEach(([folderName, images]) => {
    const project: Partial<Project> = {
      id: slugifyProjectName(folderName),
      title: folderName
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase()),
      images: images,
      category: "Development", // Default category
      status: "completed" as const,
    };
    projects.push(project);
  });

  return projects;
}
