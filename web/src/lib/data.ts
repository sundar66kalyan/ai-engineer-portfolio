import fs from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "portfolio-data");

function readJSON(fileName: string) {
  const filePath = path.join(DATA_PATH, fileName);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing data file: ${filePath}`);
  }

  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

export function getProfile() {
  return readJSON("profile.json");
}

export function getSkills() {
  return readJSON("skills.json");
}

export function getProjects() {
  return readJSON("projects.json");
}
