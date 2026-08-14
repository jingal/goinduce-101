import { toPng } from 'html-to-image';

export async function exportCardAsImage(elementId: string, filename: string = 'gomin-juice-card.png'): Promise<boolean> {
  const node = document.getElementById(elementId);
  if (!node) return false;

  try {
    const dataUrl = await toPng(node, {
      quality: 0.95,
      pixelRatio: 2, // retina sharp
      backgroundColor: '#FFF0F5',
      style: {
        borderRadius: '24px',
      },
    });

    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    link.click();
    return true;
  } catch (error) {
    console.error('Failed to export card as image:', error);
    return false;
  }
}
