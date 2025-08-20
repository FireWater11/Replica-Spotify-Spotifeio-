import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { SpotifyService } from "../../services/spotify.service";

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

  anoAtual = new Date().getFullYear();
  serviceSpotify = inject(SpotifyService); // tem o metodo antigo, por constructor.

  async fazerLogin() {
    const url = await this.serviceSpotify.obterUrlLogin(); // para isso funcionar, precisa da funcao async
  }
}


// metodo assincrono: nao aguarda retorno.