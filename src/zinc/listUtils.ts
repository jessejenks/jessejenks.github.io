import { list } from "zinc";

export function listToArray<T>(l: list.List<T>): T[] {
    const items: T[] = [];
    while (!list.isEmpty(l)) {
        items.push(l.head);
        l = l.tail;
    }
    items.reverse();
    return items;
}
