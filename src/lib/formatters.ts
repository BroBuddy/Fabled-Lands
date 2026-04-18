export function tagToPath(tag?: string): string {
    if (!tag) return '/'

    const lower = tag.toLowerCase()
    if (lower.startsWith('e')) return `/event/${lower}`
    if (lower.startsWith('r')) return `/rule/${lower}`
    return `/`
}

export function getLinkClass(tag?: string): string {
    const base = 'flex flex-row'

    if (tag?.toLowerCase().startsWith('e')) {
        return `${base} text-gold`
    }

    return base
}
