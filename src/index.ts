
type BetoConfig = {
    rules: string[],
    types?: { [key: string]: RegExp[] },
}

type BetoRule = {
    [trigger: string]: RegExp[],
}

const defaultTypes: { [key: string]: RegExp[] } = {
    date: [
        // Numeric: DD-MM-YYYY or D-M-YYYY with -, /, or .
        /\b(0?[1-9]|[12]\d|3[01])[-\/\.](0?[1-9]|1[0-2])[-\/\.](\d{4})\b/,
        // Numeric: YYYY-MM-DD or YYYY/M/D (ISO format)
        /\b(\d{4})[-\/\.](0?[1-9]|1[0-2])[-\/\.](0?[1-9]|[12]\d|3[01])\b/,
        // Month name DD, YYYY (full month names, case insensitive)
        /\b(January|February|March|April|May|June|July|August|September|October|November|December) (\d{1,2})(st|nd|rd|th)?,? (\d{4})\b/i,
        // Month abbreviation DD, YYYY
        /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec) (\d{1,2})(st|nd|rd|th)?,? (\d{4})\b/i,
        // Relative dates (simple examples)
        /\btoday\b/i,
        /\btmrw\b/i,
        /\btmr\b/i,
        /\btomorrow\b/i,
        /\byesterday\b/i,
        // Day and month name (without year)
        /\b(0?[1-9]|[12]\d|3[01]) (January|February|March|April|May|June|July|August|September|October|November|December)\b/i

    ],
    time: [
        // 24-hour format HH:MM:SS or HH:MM
        /\b([01]?[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])\b/,
        /\b([01]?[0-9]|2[0-3]):([0-5][0-9])\b/,
        // 12-hour format with optional minutes and AM/PM (case insensitive)
        /\b(0?[1-9]|1[0-2])(:[0-5][0-9])?\s?(AM|PM|am|pm)\b/,
        // 12-hour format without colon and with AM/PM: e.g. 7am, 11pm
        /\b(0?[1-9]|1[0-2])\s?(AM|PM|am|pm)\b/,
        // Simple hours only 0-23
        /\b([01]?[0-9]|2[0-3])\b/,
    ],
}

export function initialize(config: BetoConfig) {
    const types = config.types ?? defaultTypes;
    const compiledRules: BetoRule = {};

    for (let index = 0; index < config.rules.length; index++) {
        const rule = config.rules[index];
        if (rule) {
            const parts = rule.split('->');
            if (parts.length < 2) {
                continue;
            }

            const trigger = parts[0]!.trim();
            let pattern = parts[1]!.trim();

            Object.entries(types).forEach(([key, regex]) => {
                const placeholder = `$${key}`;
                const totalRegex = new RegExp(regex.map(r => r.source).join('|'), 'i')
                pattern = pattern.replaceAll(placeholder, `(${totalRegex.source})`)
                pattern = pattern.replace(/\s+/g, '\\s+');
            })
            const regex = new RegExp(`\\b${pattern}\\b`, 'i');

            if (!compiledRules[trigger]) {
                compiledRules[trigger] = [];
            }
            compiledRules[trigger].push(regex);
        }
    }
    return { types, rules: compiledRules }
}

export function parse(input: string, config: BetoConfig) {
    console.log("[src/index.ts:50] input = ", input)
    const { rules } = initialize(config);

    const matches: { [trigger: string]: string[][] } = {};
    for (const trigger of Object.keys(rules)) {
        if (rules[trigger]) {
            for (const regex of rules[trigger]) {
                const match = input.match(regex);
                if (match) {
                    if (!matches[trigger]) matches[trigger] = [];
                    matches[trigger].push(match.slice(1).filter(m => m !== undefined));
                }
            }
        }
    }

    return matches;
}
