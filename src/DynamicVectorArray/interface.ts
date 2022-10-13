export interface IDynamicVectorArrayObject<T> {
    length: number

    get(index: number): T
    remove(index: number): T
    add(item: T): void
}