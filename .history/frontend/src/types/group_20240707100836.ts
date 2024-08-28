export interface IGroupComplete {
  _id: string;
  groupname: string;
  password: string;
  profilPhoto: string;
  members: {
    pseudoUser: string;
    userId: string;
  }[];
}
