export class EditMyEventRequest {
  constructor(
    public readonly myEventName: string,
    public readonly description: string,
    public readonly price: number,
    public readonly userId: number,
    public readonly address: string,
  ) {}
}
