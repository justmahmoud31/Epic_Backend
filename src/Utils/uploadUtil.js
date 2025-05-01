import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define required upload folders
const uploadFolders = [
  path.join(__dirname, '../uploads'),
  path.join(__dirname, '../uploads/products'),
  path.join(__dirname, '../uploads/categories'),
];

export const initUploadDirs = () => {
  uploadFolders.forEach((folderPath) => {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
      console.log(`✅ Created folder: ${folderPath}`);
    }
  });
};
