export interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  groups: {
    groupId: string;
    groupCode: string;
    groupName: string;
    urlProfil: string;
  }[];
  profilPhoto: string;
}
