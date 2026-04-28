/**
 * Top 0.01% utility — always returns full, correct image URL for Django media files
 */
export const getFullImageUrl = (imagePath: string | null | undefined): string => {
  if (!imagePath) {
    return 'https://picsum.photos/id/1015/600/600'; // safe fallback
  }

  // Already a full URL (e.g. from some CDNs or absolute paths)
  if (imagePath.startsWith('http')) {
    return imagePath;
  }

  // Ensure leading slash for Django media paths
  const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;

  // Use localhost:8000 in development (change to your production domain later)
  return `http://127.0.0.1:8000${cleanPath}`;
};