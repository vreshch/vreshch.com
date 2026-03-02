import { describe, it, expect } from 'vitest';
import { cn } from './cn';

describe('cn', () => {
  it('returns empty string for no arguments', () => {
    expect(cn()).toBe('');
  });

  it('passes through a single class', () => {
    expect(cn('text-red-500')).toBe('text-red-500');
  });

  it('merges multiple classes', () => {
    expect(cn('px-4', 'py-2')).toBe('px-4 py-2');
  });

  it('handles conditional classes', () => {
    const isActive = true;
    const result = cn('base', isActive && 'active');
    expect(result).toBe('base active');
  });

  it('filters out falsy values', () => {
    expect(cn('base', false, null, undefined, 0, 'end')).toBe('base end');
  });

  it('resolves tailwind conflicts by keeping the last class', () => {
    expect(cn('px-4', 'px-8')).toBe('px-8');
  });

  it('resolves complex tailwind conflicts', () => {
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
  });

  it('handles array inputs', () => {
    expect(cn(['px-4', 'py-2'])).toBe('px-4 py-2');
  });

  it('handles object inputs', () => {
    expect(cn({ 'px-4': true, 'py-2': false, 'mt-4': true })).toBe('px-4 mt-4');
  });

  it('merges classes from mixed input types', () => {
    expect(cn('base', ['px-4'], { 'font-bold': true })).toBe('base px-4 font-bold');
  });
});
