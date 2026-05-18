import { Gif } from '../interfaces/gif.interface';
import { GiphyItem } from '../interfaces/giphy-data.interface';

export class GifMapper {
    static mapGiphyItemToGif(item: GiphyItem): Gif {
        return {
            id: item.id,
            title: item.title,
            url: item.images.fixed_width.webp,
        }
    }

    static mapGiphyItemsToGifArray(items: GiphyItem[]): Gif[] {
        return items.map(this.mapGiphyItemToGif);
    }
}