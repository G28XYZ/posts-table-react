import { IFetchPostData } from "./types";

/*
 * сортировка массива по строке
 * @param array (Object(array)) сортируемый массив
 * @param str (string) строка как ключ у объектов массива
 * @param sortOrdering (boolean) значение упорядочивания (true или false) (по убыванию или по возрастанию, соответственно)
 * @return array (Object(array)) преобразованный массив
 */
export const sortingByString = (array: IFetchPostData[], str: string, sortOrdering: boolean) => {
  const key = str as keyof IFetchPostData;
  return array.sort((a, b) => {
    if (sortOrdering === true) {
      if (a[key] < b[key]) {
        return 1;
      } else if (a[key] > b[key]) {
        return -1;
      }
    } else if (sortOrdering === false) {
      if (a[key] < b[key]) {
        return -1;
      } else if (a[key] > b[key]) {
        return 1;
      }
    }
    return 0;
  });
};
