import { Injectable } from "@angular/core";
import { SpotifyConfiguration } from "../../enviroment/enviroment";

@Injectable({
    providedIn: 'root'//como ela vai ser provido ao nosso componente
})

export class SpotifyService {

    // promessa de retornar uma string (url) nao é garantido retorno .
    async obterUrlLogin(): Promise<string> {

        // pega da pasta enviroment a lista SpotifyConfiguration o valor authEndpoint

        const codigoAleatorio = this.gerarCodigoAleatorio();
        const authPoint = `${SpotifyConfiguration.authEndpoint}?`;
        const clientId = `client_id=${SpotifyConfiguration.clientId}&`;
        const urlRedirect = `redirect_url=${SpotifyConfiguration.redirectUrl}&`;
        const scopes = `scope=${SpotifyConfiguration.scopes.join('%20')}`;
        const codeChallengeMethod = 'code_challenge_method=S256';
        const codeChallengeParam = 'code_challenge' + codigoAleatorio + '&';
        const responseType = 'response_type=code';
        return `${authPoint}${clientId}${urlRedirect}${scopes}${codeChallengeMethod}${codeChallengeParam}${responseType}`;
    }


    async gerarCodigoAleatorio() {
        // const codigoVerificador = this.gerarCodigoVerificador(128);
        // const codChallenge = await this.gerarHash(codigoVerificador);

        // return codChallenge;
    }

    constructor() {

    }
}