export interface IAddress {
    id?: number | null,
    city_id: number | null,
    clinic_id: number | null,
    floor_num: number | null,
    flat_num: number | null,
    square: string | null,
    street: string | null,
    building: string | null,
    notes?: string | null,
}
