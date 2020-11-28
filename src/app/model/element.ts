export class Element {
  id: number;
  type: ELEMENT_TYPE;
  name: string;
  children: Element[];
  parentId?: number;
}

export enum ELEMENT_TYPE {
  Root = 'root',
  File = 'file',
  Folder = 'folder'
}
