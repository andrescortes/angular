export interface IGiphy {
  data: IGiphyItem[];
}

export interface IGiphyItem {
  id: string;
  title: string;
  images: IImage;
}

export interface IImage {
  original: {
    url: string;
  };
}
