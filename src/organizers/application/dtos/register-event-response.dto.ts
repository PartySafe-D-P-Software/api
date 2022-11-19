export class RegisterMyEventResponse {
  constructor(
    public id: number,
    public readonly myEventName: string,
    public readonly description: string,
  ) {}
}
