export class MyEventRegistered {
  constructor(
    public readonly id: number,
    public readonly eventName: string,
    public readonly description: string,
  ) {}
}
