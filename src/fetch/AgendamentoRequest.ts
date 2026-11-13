import type { AgendamentosDTO } from "../dto/AgendamentoDTO";

// Classe responsável por fazer requisições à API - agendamento
class AgendamentoRequests {
    private serverURL: string;
    private endpointAgendamento: string;

    constructor() {
        this.serverURL = "http://localhost:3333";
        this.endpointAgendamento = "/api/agendamentos";
    }

    async obterListaDeAgendamentos(): Promise<AgendamentosDTO[] | undefined> {
        try {
            const token = localStorage.getItem("token");

            const respostaAPI = await fetch(`${this.serverURL}${this.endpointAgendamento}`, {
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": `${token}`
                }
            });

            if (respostaAPI.ok) {
                const listaDeAgendamentos: AgendamentosDTO[] = await respostaAPI.json();
                return listaDeAgendamentos;
            }

            throw new Error("Não foi possível listar os agendamentos.");
        } catch (error) {
            console.error(`Erro ao fazer a consulta de agendamentos. ${error}`);
            return;
        }
    }

    async obterAgendamentoPorId(id_agendamento: number): Promise<AgendamentosDTO | undefined> {
        try {
            const token = localStorage.getItem("token");
            const respostaAPI = await fetch(`${this.serverURL}${this.endpointAgendamento}/${id_agendamento}`, {
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": `${token}`
                }
            });

            if (respostaAPI.ok) {
                const agendamento: AgendamentosDTO = await respostaAPI.json();
                return agendamento;
            }

            throw new Error("Não foi possível buscar o agendamento.");
        } catch (error) {
            console.error(`Erro ao fazer a consulta de agendamento por ID. ${error}`);
            return;
        }
    }

    async enviarFormularioAgendamento(formAgendamento: AgendamentosDTO): Promise<boolean> {
        try {
            const token = localStorage.getItem("token");
            const respostaAPI = await fetch(`${this.serverURL}${this.endpointAgendamento}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": `${token}`
                },
                body: JSON.stringify(formAgendamento)
            });

            if (!respostaAPI.ok) {
                throw new Error(`Erro ${respostaAPI.status}: ${respostaAPI.statusText}`);
            }

            console.info(`${respostaAPI.status}: ${respostaAPI.statusText}`);
            return true;
        } catch (error) {
            console.error(`Erro ao fazer consulta à API. ${error}`);
            return false;
        }
    }
}

export default new AgendamentoRequests;