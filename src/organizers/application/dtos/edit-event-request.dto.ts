export class EditMyEventRequest {
  constructor(
    public readonly myEventName: string,
    public readonly description: string,
  ) {}
}
