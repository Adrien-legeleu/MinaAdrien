export interface IGroupComplete {
  _id: string;
  groupName: string;
  groupCode: string;
  urlProfil: string;
  members: {
    userId: string;
  }[];
}
