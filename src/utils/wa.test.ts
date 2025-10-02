import { describe, it, expect } from 'vitest'
import { buildWaUrl, normalizePhone, resolveDialCode, type CountryCodeEntry } from './wa'

const COUNTRIES: CountryCodeEntry[] = [
  { code: 'ID', name: 'Indonesia', dial_code: '+62' },
  { code: 'US', name: 'United States', dial_code: '+1' },
  { code: 'SG', name: 'Singapore', dial_code: '+65' },
]

describe('normalizePhone', () => {
  it('removes all non-digits', () => {
    expect(normalizePhone('+62 (812) 345-6789')).toBe('628123456789')
  })
  it('returns empty for empty input', () => {
    expect(normalizePhone('')).toBe('')
  })
})

describe('buildWaUrl', () => {
  it('builds base url without message', () => {
    expect(buildWaUrl('628123456789', undefined)).toBe('https://wa.me/628123456789')
  })
  it('encodes message when provided', () => {
    const url = buildWaUrl('628123456789', 'hello world!')
    expect(url).toBe('https://wa.me/628123456789?text=hello+world%21')
  })
})

describe('resolveDialCode', () => {
  it('matches by label', () => {
    expect(resolveDialCode('Indonesia (+62)', COUNTRIES, '+62')).toBe('+62')
  })
  it('matches by name', () => {
    expect(resolveDialCode('Singapore', COUNTRIES, '+62')).toBe('+65')
  })
  it('matches by code', () => {
    expect(resolveDialCode('us', COUNTRIES, '+62')).toBe('+1')
  })
  it('matches by dial code without plus', () => {
    expect(resolveDialCode('65', COUNTRIES, '+62')).toBe('+65')
  })
  it('accepts plain dial code format', () => {
    expect(resolveDialCode('+1', COUNTRIES, '+62')).toBe('+1')
  })
  it('falls back when unknown', () => {
    expect(resolveDialCode('unknownland', COUNTRIES, '+62')).toBe('+62')
  })
})
