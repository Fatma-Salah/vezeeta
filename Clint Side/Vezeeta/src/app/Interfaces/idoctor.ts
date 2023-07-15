import { IdoctorPhone } from './idoctor-phone';

export interface Idoctor {
  online_fees: number;
  email: string;
  password: string;
  image: string;
  gender: string;
  experience: number;
  birth_date: Date;
  verification: string;
  id_specialize: number;
  description: string;
  waiting_time: string;
  name: string;
  Doctors_Phones: IdoctorPhone[];
  code?:number;
}
