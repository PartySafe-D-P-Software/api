export class RegisterMyEventRequest {
  constructor(
    public readonly myEventName: string,
    public readonly description: string,
    public readonly price: number,
    public readonly userId: number,
    public readonly address: string,
  ) {}
}
