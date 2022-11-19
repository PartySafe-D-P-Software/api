export class RegisterMyEventResponse {
  constructor(
    public id: number,
    public readonly myEventName: string,
    public readonly description: string,
    public readonly price: number,
    public readonly userId: number,
    public readonly adderss: string,
  ) {}
}
