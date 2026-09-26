import { describe, expect, it } from 'vitest';
import { lalloBoundary, lalloBoundaryBounds } from './lalloBoundary';

describe('Lal-lo boundary GeoJSON', () => {
  it('contains the Lal-lo feature from OSSPhilippines geoph', () => {
    expect(lalloBoundary.type).toBe('FeatureCollection');
    expect(lalloBoundary.features).toHaveLength(1);

    const feature = lalloBoundary.features[0];
    expect(feature?.type).toBe('Feature');
    expect(feature?.geometry.type).toBe('MultiPolygon');
    expect(feature?.properties.city_name).toBe('Lal-Lo');
    expect(feature?.properties.province_name).toBe('Cagayan');
    expect(feature?.properties.locale).toBe(
      'ph.cagayan-valley-region-ii.cagayan.lal-lo.any'
    );
  });

  it('keeps a closed ring and the expected Lal-lo bounds', () => {
    const ring = lalloBoundary.features[0]?.geometry.coordinates[0]?.[0];
    expect(ring).toBeDefined();
    expect(ring?.[0]).toEqual(ring?.[ring.length - 1]);

    const [[south, west], [north, east]] = lalloBoundaryBounds as [
      [number, number],
      [number, number],
    ];
    expect(west).toBeCloseTo(121.545853, 6);
    expect(south).toBeCloseTo(18.103121, 6);
    expect(east).toBeCloseTo(122.263321, 6);
    expect(north).toBeCloseTo(18.244869, 6);
  });
});
