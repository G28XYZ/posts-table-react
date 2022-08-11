import { IFetchPostData } from "./types";

/*
 * сортировка массива по числу
 * @param array (Object(array)) сортируемый массив
 * @param id (string) айди как ключ у объектов массива
 * @param sortOrdering (boolean) значение упорядочивания (true или false) (по убыванию или по возрастанию, соответственно)
 * @return array (Object(array)) преобразованный массив
 */
export const sortingByIdNumber = (array: IFetchPostData[], id: string, sortOrdering: boolean) => {
  const key = id as keyof IFetchPostData;
  return array.sort((a, b) => {
    if (sortOrdering === true) {
      return (b[key] as number) - (a[key] as number);
    } else if (sortOrdering === false) {
      return (a[key] as number) - (b[key] as number);
    }
    return 0;
  });
};
