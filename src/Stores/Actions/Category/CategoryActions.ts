import {
    CategoryType,
    LOAD_CATEGORIES,
    ThematicType,
  } from './CategoryTypes';
import API from '~Services/api';


  export const getCategoryById = (id: string) =>
  new Promise<ThematicType>((resolve, reject) => {
    {
      const url = `thematic?fields=["$all",{"categories":["$all",{"$filter":{"id": "${id}"}}]}]`;
      const headers: any = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
      API.get(url, {
        headers,
      })
        .then((response) => {
          if (response.data.code === 200) {
            if (response?.data?.results?.objects?.rows.length) {
              const thema: ThematicType = keysToCamel(
                response?.data?.results?.objects?.rows[0],
              );
              resolve(thema);
            } else {
              reject(`data not found`);
            }
          } else {
            reject(response.data?.message || '');
          }
        })
        .catch((err) => {
          reject(err?.message || '');
        });
    }
  });

  export const loadCategories =
  (
    categoriesIds: string[],
    page: number = 1,
    onDoneFunc: (
      isSuccess?: boolean,
      data?: CategoryType[],
    ) => void = () => {},
  ) =>
  async (dispatch: any, getState: any) => {
    try {
      const filterArr = [];
      for (const id of categoriesIds) {
        filterArr.push({category_id: id});
      }
      const filter = `{"$or":${JSON.stringify(filterArr)}}`;
      // {"$or": [{"category_id": "5be42180-7835-11ec-ae0a-e968fe3d74fd"}, {"category_id": "50b7b7e0-7835-11ec-ae0a-e968fe3d74fd"}]}
      // const filter = `{"category_id": "${categoriesId}"}`;
      const res = await loadCommunitiesList(
        filter,
        accessTokenConfig(getState),
        page,
      );
      if (res?.data?.code == 200) {
        const itemCategory: CategoryType[] = arrayKeysToCamel(
          res?.data?.results?.objects?.rows,
        );
        if (page === 1) {
          dispatch({
            type: LOAD_CATEGORIES,
            payload: itemCategory,
          });
        } else if (itemCategory.length > 0) {
          dispatch({
            type: LOAD_MORE_CATEGORIES,
            payload: itemCategory,
          });
        }
        onDoneFunc(true, itemCategory);
      } else {
        console.log('failed' + res?.data?.message);
        onDoneFunc(false, []);
      }
    } catch (error: any) {
      returnErrors(
        error?.response?.data,
        error?.response?.status,
        wasFailed(LOAD_CATEGORIES),
      );
      onDoneFunc(false, []);
    }
  };

  export const loadThematics =
  (
    onDoneFunc: (
      isSuccess?: boolean,
      result?: ThematicType[],
    ) => void = () => {},
  ) =>
  async (dispatch: any, getState: any) => {
    try {
      // Call API
      const res = await API.get(
        'thematic?fields=["$all", {"categories": ["$all"]}]&order=[["index","asc"]]',
        accessTokenConfig(getState),
      );

      if (res?.data?.code === 200) {
        const itemThematicsCategory: ThematicType[] = arrayKeysToCamel(
          res?.data?.results?.objects?.rows,
        ).map((e) => {
          e.categories = e.categories.sort((a, b) => a.index - b.index);
          return e;
        });

        const defaultGenres: ThematicType = {
          id: 'default',
          name: '즐겨찾기',
          activated: true,
          categories: [],
        };
        const data = [defaultGenres, ...itemThematicsCategory];

        dispatch({
          type: LOAD_CATEGORIES,
          payload: data,
        });
        onDoneFunc(true, data);
      } else {
        console.log(res?.data?.message);
        onDoneFunc(false);
      }
    } catch (error: any) {
      returnErrors(
        error?.response?.data,
        error?.response?.status,
        wasFailed(LOAD_CATEGORIES),
      );
      onDoneFunc(false);
    }
  };