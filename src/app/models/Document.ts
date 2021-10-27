export interface Document {
  title: string;
  publicationDate: string;
  contentType?: string;
  authors?: Array<any>;
  subject?: string;
  publisher?: string;
  abstract?: string;
  doi?: string;
  openaccess: boolean;
}
