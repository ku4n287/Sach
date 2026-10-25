import test from 'node:test';
import assert from 'node:assert/strict';
import {
  canGoNext,
  canGoPrev,
  getNextPageIndex,
  getPrevPageIndex,
  clampPageIndex,
  searchBookModels,
  getUniqueChapters,
  validateBookModelItem,
} from './navigationRules.ts';
import { BookModelItem } from '../types.ts';

const mockItems: BookModelItem[] = [
  {
    id: '1',
    chapter: 'Chương I: Mô hình Giáo cụ',
    chapterNumber: 1,
    title: 'Mô hình Sa bàn Pháo binh 3D',
    modelType: 'Sa bàn điện tử',
    meaning: 'Nâng cao khả năng trực quan hóa thế trận pháo binh',
    application: 'Dùng trong diễn tập chỉ huy bắn mục tiêu khuất',
    videoUrl: 'https://test.com/v1.mp4',
    author: 'Thiếu tá Lê Thị Phương Thanh',
  },
  {
    id: '2',
    chapter: 'Chương II: Mô hình Khí tài',
    chapterNumber: 2,
    title: 'Mô hình Cắt bổ Pháo Lựu 152mm',
    modelType: 'Mô hình cơ khí',
    meaning: 'Giúp học viên hiểu sâu cấu tạo nòng pháo',
    application: 'Huấn luyện bảo quản vũ khí trang bị kỹ thuật',
    videoUrl: 'https://test.com/v2.mp4',
    author: 'Đại uý Nguyễn Hoàng An',
  },
];

test('canGoNext and canGoPrev work accurately', () => {
  assert.equal(canGoNext(0, 3), true);
  assert.equal(canGoNext(2, 3), false);
  assert.equal(canGoPrev(0), false);
  assert.equal(canGoPrev(1), true);
});

test('getNextPageIndex and getPrevPageIndex bounds checking', () => {
  assert.equal(getNextPageIndex(0, 3), 1);
  assert.equal(getNextPageIndex(2, 3), 2);
  assert.equal(getPrevPageIndex(2), 1);
  assert.equal(getPrevPageIndex(0), 0);
});

test('clampPageIndex bounds index safely', () => {
  assert.equal(clampPageIndex(-1, 5), 0);
  assert.equal(clampPageIndex(10, 5), 4);
  assert.equal(clampPageIndex(2, 5), 2);
  assert.equal(clampPageIndex(0, 0), 0);
});

test('searchBookModels filters by title, meaning, author or model type', () => {
  const result1 = searchBookModels(mockItems, 'Sa bàn');
  assert.equal(result1.length, 1);
  assert.equal(result1[0].id, '1');

  const result2 = searchBookModels(mockItems, 'Pháo Lựu');
  assert.equal(result2.length, 1);
  assert.equal(result2[0].id, '2');

  const resultAuthor = searchBookModels(mockItems, 'Phương Thanh');
  assert.equal(resultAuthor.length, 1);

  const resultEmpty = searchBookModels(mockItems, 'Tên lửa không có');
  assert.equal(resultEmpty.length, 0);

  const resultAll = searchBookModels(mockItems, '');
  assert.equal(resultAll.length, 2);
});

test('getUniqueChapters extracts distinct chapter list', () => {
  const chapters = getUniqueChapters(mockItems);
  assert.equal(chapters.length, 2);
  assert.ok(chapters.includes('Chương I: Mô hình Giáo cụ'));
});

test('validateBookModelItem detects missing required fields', () => {
  const validItem: Partial<BookModelItem> = {
    title: 'Mô hình sách',
    meaning: 'Ý nghĩa tốt',
    application: 'Vận dụng thực tế',
  };
  assert.equal(validateBookModelItem(validItem).valid, true);

  const invalidItem: Partial<BookModelItem> = {
    title: '',
    meaning: 'Ý nghĩa',
    application: '',
  };
  const validation = validateBookModelItem(invalidItem);
  assert.equal(validation.valid, false);
  assert.equal(validation.errors.length, 2);
});
