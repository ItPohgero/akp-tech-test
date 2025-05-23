import { nanoid } from 'nanoid';
const slugify = (text: string) => {
    const slug = text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
    return `${slug}-${nanoid()}`;
}
export default slugify;