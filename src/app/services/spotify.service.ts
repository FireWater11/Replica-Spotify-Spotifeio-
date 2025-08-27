import { Injectable } from '@angular/core';
import { SpotifyConfiguration } from '../../enviroment/enviroment';
import SpotifyWebApi from 'spotify-web-api-js';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  spotifyApi = new SpotifyWebApi();
  usuario: SpotifyApi.CurrentUsersProfileResponse | null = null;

  constructor() {}

  async obterUrlLogin(): Promise<string> {
    const codeVerifier = this.gerarCodigoVerificador(128);
    const codeChallenge = await this.gerarCodeChallenge(codeVerifier);

    const authEndpoint = `${SpotifyConfiguration.authEndpoint}?`;
    const clientId = `client_id=${SpotifyConfiguration.clientId}`;
    const responseType = `response_type=code`;
    const redirectUri = `redirect_uri=${encodeURIComponent(SpotifyConfiguration.redirectUrl)}`;
    const scopes = `scope=${SpotifyConfiguration.scopes.join('%20')}`;
    const codeChallengeMethod = `code_challenge_method=S256`;
    const codeChallengeParam = `code_challenge=${codeChallenge}&`;

    localStorage.setItem('spotify_code_verifier', codeVerifier);

    const url = `${authEndpoint}${clientId}&${responseType}&${redirectUri}&${scopes}&${codeChallengeMethod}&${codeChallengeParam}`;
    return url;
  }

  private gerarCodigoVerificador(length: number): string {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  private async gerarCodeChallenge(codeVerifier: string): Promise<string> {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);

    return btoa(String.fromCharCode(...new Uint8Array(digest)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  async definirAcessToken(code: string): Promise<boolean> {
    const codeVerifier = localStorage.getItem('spotify_code_verifier');
    const tokenEndpoint = SpotifyConfiguration.apiTokenEndpoint;

    if (!codeVerifier) {
      console.error('Code verifier não encontrado.');
      return false;
    }

    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', SpotifyConfiguration.redirectUrl);
    params.append('client_id', SpotifyConfiguration.clientId);
    params.append('code_verifier', codeVerifier);

    try {
      const response = await fetch(tokenEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString()
      });

      if (!response.ok) {
        console.error('Erro ao obter o token:', response.statusText);
        return false;
      }

      const dados = await response.json();
      const accessToken = dados.access_token;

      if (accessToken) {
        this.spotifyApi.setAccessToken(accessToken);
        localStorage.setItem('spotify_access_token', accessToken);
        this.usuario = await this.spotifyApi.getMe();
        console.log(this.usuario);
        return true;
      } else {
        console.error('Token de acesso nao encontrado na resposta.');
        return !!this.usuario // verifica se existe(return true) se nao, return false.
      }

    } catch (error) {
      console.error('Erro na requisicao do token:', error);
      return false;
    }
  }
}
