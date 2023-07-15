export interface IAppoinment {
    id:number|null,
    Dr_id:number|null,
    appoint_id?:number|null,
    start_date?:Date|null,
    end_date?:Date|null,
    patients_per_day?:number|null,
    type?:boolean|null,
}
