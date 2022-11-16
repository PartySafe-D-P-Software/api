export class RegisterOrganizerResponse {
  constructor(
    public id: number,
    public readonly localName: string,
    public readonly phone: string,
  ) {}
}
