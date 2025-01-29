import type { SearchResult, UserInfoResponse } from "../types";
export const BASE_URL = "https://s.2bcnm.top";
export const header = {
  accept: "application/json, text/plain, */*",
  "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,en-GB;q=0.6",
  "cache-control": "no-cache",
  "content-type": "application/json;charset=UTF-8",
  Referer: "https://oshwhub.com/search",
};

export const getUserInfo = async (uuid: string): Promise<UserInfoResponse> => {
  const response = await fetch(`${BASE_URL}/api/users/${uuid}/info`, {
    headers: header,
    method: "GET",
  });

  const data = (await response.json()) as UserInfoResponse;

  if (!data.success || data.code !== 0) {
    throw new Error("获取用户详细信息失败");
  }

  return data;
};

export const searchUsers = async (
  keywords: string,
  pageSize: number
): Promise<SearchResult> => {
  if (keywords.length < 2 || keywords.length > 128) {
    throw new Error("关键词长度应在 2-128 之间");
  }

  const response = await fetch(`${BASE_URL}/api/search/data`, {
    headers: header,
    body: JSON.stringify({
      type: "user",
      keywords,
      category: "all",
      sort: "",
      page: 1,
      pageSize: Number(pageSize),
    }),
    method: "POST",
  });

  const data = (await response.json()) as SearchResult;

  if (!data.success || data.code !== 0) {
    throw new Error("搜索失败");
  }

  return data;
};
