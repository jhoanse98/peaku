export interface Energy {
    line: string
    date: string
    comercial: string
    industrial: string
    residential: string
    [key: string]: string
}

export interface LineData {
    color: string;
    values: Array<{date: Date, value: number}>;
}