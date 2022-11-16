export class RegisterOrganizerRequest {
  constructor(
    public readonly localName: string,
    public readonly phone: string,
  ) {}
}
