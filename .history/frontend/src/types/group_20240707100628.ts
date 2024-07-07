export interface IGroup {
  _id: string;
  groupname: string;
  password: string;
  profilPhoto: string;
  members: {
    pseudoUser: string;
    userId: string;
  }[];
}
