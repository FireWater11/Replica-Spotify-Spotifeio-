import { ChangeDetectionStrategy, Component, inject, OnInit } from "@angular/core";
import { SpotifyService } from "../../services/spotify.service";

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  ngOnInit(): void {
    this.verificarCodigoUrlCallback();
  }

  anoAtual = new Date().getFullYear();
  serviceSpotify = inject(SpotifyService); // tem o metodo antigo, por constructor.

  async fazerLogin() {
    const url = await this.serviceSpotify.obterUrlLogin(); // para isso funcionar, precisa da funcao async
    
    window.location.href = url;
  }

  verificarCodigoUrlCallback() {
    const params = new URLSearchParams(window.location.search);
    const codigo = params.get("code");

    if (codigo) {
      const sucesso = this.serviceSpotify.definirAcessToken(codigo);
    }
  }
}


// metodo assincrono: nao aguarda retorno.