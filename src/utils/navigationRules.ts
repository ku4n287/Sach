import { BookModelItem } from '../types.ts';

/**
 * Các hàm logic thuần túy điều hướng và tìm kiếm trang sách
 */

export function canGoNext(currentIndex: number, totalPages: number): boolean {
  return currentIndex < totalPages - 1;
}

export function canGoPrev(currentIndex: number): boolean {
  return currentIndex > 0;
}

export function getNextPageIndex(currentIndex: number, totalPages: number): number {
  if (currentIndex >= totalPages - 1) {
    return totalPages - 1;
  }
  return currentIndex + 1;
}

export function getPrevPageIndex(currentIndex: number): number {
  if (currentIndex <= 0) {
    return 0;
  }
  return currentIndex - 1;
}

export function clampPageIndex(targetIndex: number, totalPages: number): number {
  if (totalPages <= 0) return 0;
  if (targetIndex < 0) return 0;
  if (targetIndex >= totalPages) return totalPages - 1;
  return targetIndex;
}

export function searchBookModels(items: BookModelItem[], query: string): BookModelItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return items;

  return items.filter((item) => {
    return (
      item.title.toLowerCase().includes(q) ||
      item.chapter.toLowerCase().includes(q) ||
      item.meaning.toLowerCase().includes(q) ||
      item.application.toLowerCase().includes(q) ||
      item.modelType.toLowerCase().includes(q) ||
      item.author.toLowerCase().includes(q)
    );
  });
}

export function getUniqueChapters(items: BookModelItem[]): string[] {
  const set = new Set<string>();
  for (const item of items) {
    if (item.chapter) {
      set.add(item.chapter);
    }
  }
  return Array.from(set);
}

export function validateBookModelItem(item: Partial<BookModelItem>): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  if (!item.title || !item.title.trim()) {
    errors.push('Tiêu đề mô hình sách không được để trống');
  }
  if (!item.meaning || !item.meaning.trim()) {
    errors.push('Nội dung Ý nghĩa mô hình không được để trống');
  }
  if (!item.application || !item.application.trim()) {
    errors.push('Nội dung Vận dụng mô hình không được để trống');
  }
  return {
    valid: errors.length === 0,
    errors,
  };
}
