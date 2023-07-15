export interface IDoctorTemp {
    id: number,
    // area: string,
    name: string,
    address: any,
    fese: any,
    clinic: any,
    reigon: number,
    cite: number,
    special: any,
    waittime: any
}


let list_OF_Doctors: any;
let holder: IDoctorTemp[] = [];
export class Doctors_List_Genrate {
    public static GetList(List: any) {

        for (let index = 0; index < List.length; index++) {
            // const element = array[index];
            // console.log(List[index])
            for (let j = 0; j < List[index]["clinic_Doctors"].length; j++) {

                let temp: IDoctorTemp = {
                    id: List[index]["id"],
                    name: List[index]["name"],
                    clinic: List[index]["clinic_Doctors"][j]["clinic"],
                    address: List[index]["clinic_Doctors"][j]["clinic"]["address"],
                    fese: List[index]["clinic_Doctors"][j]["fees"],
                    // reigon: 0,
                    cite: List[index]["clinic_Doctors"][j]["clinic"]["address"]["clinic_id"]
                    , reigon: List[index]["clinic_Doctors"][j]["clinic"]["address"]["city"]["region_id"],
                    special: List[index]["id_specialize"]
                    , waittime: List[index]["waiting_time"]

                }

                if (!holder.some(a => (a.id == temp.id && a.address["id"] == temp.address["id"])))
                    holder.push(temp)


            }
        }
        return holder;
    }
    public static GetListbyReigonAndCity(List: any, reigo: any, city: any) {

        List = this.GetList(List);

        if (reigo != 0 && city != 0) {
            List.filter((a: any) => (a.reigon == reigo && a.city == city))
        } else if (reigo == 0) {
            List.filter((a: any) => (a.city == city))

        } else {
            List.filter((a: any) => (a.reigon == reigo))

        }
        return List;
    }
}