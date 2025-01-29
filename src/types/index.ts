export interface UserCount {
  components: number;
  watch_projects: number;
  modules: number;
  simulations: number;
  joined_projects: number;
  star_projects: number;
  followers: number;
  following: number;
  public_projects: number;
  archived_projects: number;
  invite: number;
  all_projects: number;
  created_projects: number;
}
export interface SearchUserInfo extends BaseUser {
  _score: number;
  team: boolean;
  count: UserCount;
  follower: BaseUser[];
}
export interface BaseUser {
  nickname: string;
  username: string;
  avatar: string;
  uuid: string;
}
export interface UserInfo {
  career: string;
  companycompany: string;
  companySize: string;
  country: string;
  education: string;
  school: string;
  site: string;
}

export interface SearchResult extends BaseResult {
  result: {
    lists: SearchUserInfo[];
    total: number;
    totalPage: number;
    page: number;
    pageSize: number;
  };
}

export interface UserInfoResponse extends BaseResult {
  result: {
    created_at: string;
    points: number;
    is_fp_office_account: boolean;
    follower: BaseUser[];
    following: BaseUser[];
    info: UserInfo;
    introduction: string;
  };
}

export interface BaseResult {
  success: boolean;
  code: number;
}
