import { ISearch } from './../Interfaces/i-search';
const SearchReselt: ISearch = { City: 0, Gender: "", Fese: 0, Name: '', Reigon: 0, Specialization: 0 }

export class SearchTemp {
    public static GetSearch() {
        return SearchReselt;
    }
    public static setSmallSearch(value: ISearch) {
        SearchReselt.City = value.City;
        SearchReselt.Reigon = value.Reigon;
        SearchReselt.Name = value.Name;

    }
    public static setFullSearch(value: ISearch) {
        this.setSmallSearch(value);

        SearchReselt.Gender = value.Gender;
        SearchReselt.Fese = value.Fese;
        SearchReselt.Specialization = value.Specialization;

    }
    public static setDefault(value: ISearch) {

        SearchReselt.City = 0
        SearchReselt.Reigon = 0;
        SearchReselt.Name = '';

        SearchReselt.Gender = "";
        SearchReselt.Fese = 0;
        SearchReselt.Specialization = 0;

    }
    public static getDefault() {
        return { City: 0, Gender: "", Fese: 0, Name: '', Reigon: 0, Specialization: 0 };

    }
}