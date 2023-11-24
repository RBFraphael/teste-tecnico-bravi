import { Injectable } from '@angular/core';
import { IParam } from '../interfaces/iparam';

@Injectable({
    providedIn: 'root'
})
export class ParamsService {

    constructor() { }

    states = (): IParam[] => {
        return [
            { label: "Acre", value: "AC" },
            { label: "Alagoas", value: "AL" },
            { label: "Amapá", value: "AP" },
            { label: "Amazonas", value: "AM" },
            { label: "Bahia", value: "BA" },
            { label: "Ceará", value: "CE" },
            { label: "Distrito Federal", value: "DF" },
            { label: "Espírito Santo", value: "ES" },
            { label: "Goiás", value: "GO" },
            { label: "Maranhão", value: "MA" },
            { label: "Mato Grosso", value: "MT" },
            { label: "Mato Grosso do Sul", value: "MS" },
            { label: "Minas Gerais", value: "MG" },
            { label: "Pará", value: "PA" },
            { label: "Paraíba", value: "PB" },
            { label: "Paraná", value: "PR" },
            { label: "Pernambuco", value: "PE" },
            { label: "Piauí", value: "PI" },
            { label: "Rio de Janeiro", value: "RJ" },
            { label: "Rio Grande do Norte", value: "RN" },
            { label: "Rio Grande do Sul", value: "RS" },
            { label: "Rondônia", value: "RO" },
            { label: "Roraima", value: "RR" },
            { label: "Santa Catarina", value: "SC" },
            { label: "São Paulo", value: "SP" },
            { label: "Sergipe", value: "SE" },
            { label: "Tocantins", value: "TO" },
        ];
    }

    contactTypes = (): IParam[] => {
        return [
            { label: "Telefone", value: "phone" },
            { label: "Celular", value: "cellphone" },
            { label: "FAX", value: "fax" },
            { label: "WhatsApp", value: "whatsapp" },
            { label: "E-mail", value: "email" },
        ];
    }

    personGenders = (): IParam[] => {
        return [
            { label: "Masculino", value: "male" },
            { label: "Feminino", value: "female" },
            { label: "Outro", value: "other" },
        ];
    }
}
