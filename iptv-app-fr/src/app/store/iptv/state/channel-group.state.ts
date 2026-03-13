import { ChannelGroupType } from "../types/channel-group.type";

export const initialChannelGroupState: ChannelGroupType = {
  groups: [],
  channels: [],
  selectedGroupName: null,
  selectedChannel: null,
  error: null,
  isLoading: false
};
