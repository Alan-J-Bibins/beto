import { expect, describe, it, test } from 'vitest';
import { betoQuickParse } from './index.js';

describe('betoQuickParse', () => {
    test('parses "due on 10-09-2005" with due -> due on $date rule', () => {
        const result = betoQuickParse('due on 10-09-2005', {
            rules: ['due -> due on $date'],
        });
        console.log("result = ", result)

        expect(result).toHaveProperty('due');
        expect(result.due).toHaveLength(1);
        expect(result.due[0]).toContain('10-09-2005');
    });

    test('parses multiple rules for same trigger', () => {
        const result = betoQuickParse('due on 10-09-2005 and due 11-10-2006', {
            rules: ['due -> due $date', 'due -> due on $date', 'remind -> remind me on $date'],
        });
        console.log("result = ", result)
    });

    test('parses time formats', () => {
        const result = betoQuickParse('meeting at 2pm', {
            rules: ['meeting -> meeting at $time'],
        });

        expect(result).toHaveProperty('meeting');
        expect(result.meeting[0]).toContain('2pm');
    });

    test('parses relative dates like "today"', () => {
        const result = betoQuickParse('due today', {
            rules: ['due -> due $date'],
        });
        console.log("result = ", result)

        expect(result).toHaveProperty('due');
        expect(result.due[0]).toContain('today');
    });

    test('handles invalid rules gracefully', () => {
        const result = betoQuickParse('due 10-09-2005', {
            rules: ['invalid rule', 'due -> due $date'],
        });

        expect(result).toHaveProperty('due'); // Should still parse valid rules
    });

    test('returns empty object when no matches', () => {
        const result = betoQuickParse('hello world', {
            rules: ['due -> due $date'],
        });

        expect(result).toEqual({});
    });

    test('filters out undefined capture groups', () => {
        const result = betoQuickParse('due on 10-09-2005', {
            rules: ['due -> due on $date'],
        });

        expect(result.due[0]).not.toContain(undefined);
    });
});
