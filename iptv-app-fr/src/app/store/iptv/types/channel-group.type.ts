import { IChannel, IChannelGroup } from "../../../core/interfaces";

export type ChannelGroupType = {
  groups: IChannelGroup[];
  channels: IChannel[];
  selectedGroupName: string | null;
  selectedChannel: string | null;
  error: string | null;
  isLoading: boolean;
}
