export type Book ={
    id: string;
    volumeInfo: {
      title: string;
      authors: string[];
      publisher: string;
      publishedDate: string;
      description: string;
      previewLink:string;
      imageLinks: {
        thumbnail: string;
        smallThumbnail: string;
      };
    };
}

