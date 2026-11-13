
import type { ClienteDTO } from "../dto/ClienteDTO";

class ClienteRequests {
    private serverURL;
    private endpointCliente;

    constructor() {
        this.serverURL = `http://localhost:3333`;
        this.endpointCliente = `/api/clientes`;
    }

    async obterListaDeClientes() {
        try {
            const token = localStorage.getItem('token');
            const respostaAPI = await fetch(`${this.serverURL}${this.endpointCliente}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                }
            });

            if (respostaAPI.ok) {
                return await respostaAPI.json();
            } else {
                throw new Error("Não foi possível listar os clientes.");
            }
        } catch (error) {
            console.error(`Erro ao fazer a consulta de clientes. ${error}`);
            return;
        }
    }

    async obterClientePorId(id_cliente: number): Promise<ClienteDTO | undefined> {
        try {
            const token = localStorage.getItem('token');
            const respostaAPI = await fetch(`${this.serverURL}${this.endpointCliente}/${id_cliente}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                }
            });

            if (respostaAPI.ok) {
                return await respostaAPI.json() as ClienteDTO;
            } else {
                throw new Error("Não foi possível buscar o cliente.");
            }
        } catch (error) {
            console.error(`Erro ao fazer a consulta de cliente por ID. ${error}`);
            return;
        }
    }

    async criar(formCliente: ClienteDTO): Promise<boolean> { 
        try {
            const token = localStorage.getItem('token');
            const respostaAPI = await fetch(`${this.serverURL}${this.endpointCliente}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                },
                body: JSON.stringify(formCliente)
            });

            if (!respostaAPI.ok) throw new Error(`Erro ${respostaAPI.status}: ${respostaAPI.statusText}`);

            console.info(`${respostaAPI.status}: ${respostaAPI.statusText}`);
            return true;
        } catch (error) {
            console.error(`Erro ao fazer consulta à API. ${error}`);
            return false;
        }
    }
}

export default new ClienteRequests(); 