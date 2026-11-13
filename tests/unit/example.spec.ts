import { describe, expect, test } from 'vitest';

import { formatJam, formatSuhu, formatTanggalSingkat } from '@/utils/format';

describe('format.ts', () => {
  test('memformat jam menjadi dua digit', () => {
    expect(formatJam('2026-10-31T04:00')).toBe('04:00');
  });

  test('memformat suhu dengan pembulatan', () => {
    expect(formatSuhu(28.4)).toBe('28°');
  });

  test('memformat tanggal singkat dalam bahasa Indonesia', () => {
    expect(formatTanggalSingkat('2026-10-31T14:00')).toContain('Okt');
  });
});
