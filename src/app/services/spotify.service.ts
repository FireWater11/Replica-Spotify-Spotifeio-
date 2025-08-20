import { Injectable } from "@angular/core";
import { SpotifyConfiguration } from "../../enviroment/enviroment";

@Injectable({
    providedIn: 'root'//como ela vai ser provido ao nosso componente
})

export class SpotifyService {

    // promessa de retornar uma string (url) nao é garantido retorno .
    async obterUrlLogin(): Promise<string> {
        // pega da pasta enviroment a lista spotifyConfiguration o valor authEndpoint
        const authPoint = `${SpotifyConfiguration.authEndpoint}?`;
    }

    constructor() {

    }
}