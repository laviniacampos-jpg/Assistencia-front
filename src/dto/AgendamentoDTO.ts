export interface AgendamentosDTO {
  idAgendamento?: number;
  idCliente: number;
  idEquipamento: number;
  dataHora: Date;
  status: string;
}