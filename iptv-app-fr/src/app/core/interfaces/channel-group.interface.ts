import { IChannel } from "./channel.interface";

export interface IChannelGroup {
  name: string;
  channelsCount: number;
  channels: IChannel[];
}
