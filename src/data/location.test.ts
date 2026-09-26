import { describe, expect, it } from 'vitest';
import { buildGoogleMapsSearchUrl } from './location';

describe('Google Maps location links', () => {
  it('encodes the configured coordinates in a Google Maps search URL', () => {
    expect(
      buildGoogleMapsSearchUrl({ latitude: 18.20015, longitude: 121.66282 })
    ).toBe(
      'https://www.google.com/maps/search/?api=1&query=18.20015%2C121.66282'
    );
  });

  it('does not produce a destination link without coordinates', () => {
    expect(buildGoogleMapsSearchUrl(null)).toBeNull();
  });
});
