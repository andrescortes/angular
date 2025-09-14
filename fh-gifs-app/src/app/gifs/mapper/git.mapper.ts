import { IGif, IGiphyItem } from '../interfaces';

export class GifMap {
  static toDto(giphyItem: IGiphyItem): IGif {
    return {
      id: giphyItem.id,
      title: giphyItem.title,
      url: giphyItem.images.original.url,
    };
  }

  static toDtos(giphyItems: IGiphyItem[]): IGif[] {
    return giphyItems.map(this.toDto);
  }
}
