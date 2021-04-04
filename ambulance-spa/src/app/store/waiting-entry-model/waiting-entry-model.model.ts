export interface WaitingEntryModel {
  id: string;
  name: string;
  patientId: string;
  since: Date;
  estimated: Date;
  estimatedDurationMinutes: number;
  condition: {
    value: string,
    code: string,
    typicalDurationMinutes: number,
    reference: string
  };
}
