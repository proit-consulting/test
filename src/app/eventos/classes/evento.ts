export class Evento {
	nomeevento:string;
	data:string;
	criadorId:string;
	palestrantes:any;
	participantes:any;
	eventoColor?:string;
	banner?:string;
	id?:string;
	temas:any;
	tipo?:string;
	estado?:string;
	local?:string;
	hora?:string;
	endereco?:string;/*,,telefone*/
	constructor(){}
}
export interface EventoI {
	nomeevento:string;
	data:string;
	criadorId:string;
	palestrantes:any;
	participantes:any;
	eventoColor?:string;
	banner?:string;
	id?:string;
	temas:any;
	tipo?:string;
	estado?:string;
	/*local,hora,endereco,telefone*/
	//constructor(){}
}