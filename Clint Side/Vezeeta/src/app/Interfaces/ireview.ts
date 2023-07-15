export interface IReview {
    Dr_id:number|null,
    patient_id:number|null,
    value:string|null,
    comment?:string|null,
    updated_at?:Date|null
}
