export type Book ={
    id: string;
    volumeInfo: {
      title: string;
      authors: string[];
      publisher: string;
      publishDate: string;
      description: string;
      averageRating: number;
      ratingsCount: number;
      imageLinks: {
        thumbnail: string;
        smallThumbnail: string;
      };
    };
}
