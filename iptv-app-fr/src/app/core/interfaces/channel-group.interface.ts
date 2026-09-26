import { IChannel } from ".";

export interface IChannelGroup {
  name: string;
  channelsCount: number;
  channels: IChannel[];
}
