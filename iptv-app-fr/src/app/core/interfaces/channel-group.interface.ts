import { IChannel } from "./Channel.interface";

export interface IChannelGroup {
  name: string;
  channelsCount: number;
  channels: IChannel[];
}
