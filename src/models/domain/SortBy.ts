export type SortBy = {
    field: SortByField;
    direction: SortByDirection;
}

export enum SortByField {
    Name = 'name',
    Price = 'price',
}


export enum SortByDirection {
    Ascending = 'ascending',
    Descending = 'descending',
}