export class MyEventRegistered {
  constructor(
    public readonly id: number,
    public readonly eventName: string,
    public readonly description: string,
    private readonly price: number,
    private readonly userId: number,
    private readonly address: string,
  ) {}
}
