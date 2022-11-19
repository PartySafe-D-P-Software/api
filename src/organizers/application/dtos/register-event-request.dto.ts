export class RegisterMyEventRequest {
  constructor(
    public readonly myEventName: string,
    public readonly description: string,
  ) {}
}
