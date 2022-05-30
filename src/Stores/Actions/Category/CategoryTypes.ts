export const LOAD_CATEGORIES = 'LOAD_CATEGORIES';
export const LOAD_MORE_CATEGORIES = 'LOAD_MORE_CATEGORIES';

export type CategoryType = {
    content?: string;
    activated?: boolean;
    index?: number;
}

export type ThematicType = {
    id: string;
    name: string;
    activated?: boolean;
    categories: CategoryType[];
  };

  
interface LoadCategories {
    type: typeof LOAD_CATEGORIES;
    payload: ThematicType[];
  }

  export type CategoryDispatchTypes =
  | LoadCategories
