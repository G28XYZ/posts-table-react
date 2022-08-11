import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { filterPosts } from "../../utils/filterPosts";
import { sortingByIdNumber } from "../../utils/sortingByIdNumber";
import { sortingByString } from "../../utils/sortingByString";
import { IFetchPostData, ITableState, TCaseReducerTable } from "../../utils/types";

export const fetchPosts = createAsyncThunk("table/fetchPosts", async () => {
  const response = await api
    .getPosts()
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
      return null;
    });

  if (response) {
    return { success: true, data: response };
  } else {
    return { success: false, data: [] };
  }
});

export const setPageFromProtectedRoute: TCaseReducerTable = (state, action) => {
  state.page = action.payload.page;
  localStorage.setItem("tableState", JSON.stringify({ ...state, posts: [], filteredPosts: [] }));
};

export const setPage: TCaseReducerTable = (state, action) => {
  const page = action.payload.page;
  if (state.paginationCount >= page && page > 0) {
    state.page = action.payload.page;
  }
  localStorage.setItem("tableState", JSON.stringify({ ...state, posts: [], filteredPosts: [] }));
};

export const setRequest: TCaseReducerTable = (state, action) => {
  state.request = action.payload.request;
};

export const setFetchSuccess: TCaseReducerTable = (state, action) => {
  state.fetchSuccess = action.payload.success;
};

export const setSortParameter: TCaseReducerTable = (state, action) => {
  const parameter = action.payload.parameter;
  if (parameter === state.sortParameter) {
    state.sortOrdering = !state.sortOrdering;
  }
  state.sortParameter = action.payload.parameter;
  localStorage.setItem("tableState", JSON.stringify({ ...state, posts: [], filteredPosts: [] }));
};

export const setSearchText: TCaseReducerTable = (state, action) => {
  state.searchText = action.payload.searchText;
  state.filteredPosts = state.posts.filter((post: IFetchPostData) =>
    filterPosts(post, state.searchText)
  );
  state.paginationCount = Math.ceil(state.filteredPosts.length / state.maxCountOnPage);
  localStorage.setItem("tableState", JSON.stringify({ ...state, posts: [], filteredPosts: [] }));
};

export const changePostsOrdering = (state: ITableState) => {
  // ключ объекта поста
  const key = state.sortParameter as keyof IFetchPostData;
  // массив отфильтрованных по тексту постов
  const array = state.filteredPosts;
  // если массив не пуст и по первому индексу есть объект то выполнить сортировку с проверкой на условие
  if (array.length !== 0 && array[0]) {
    // если значение в объекте поста сортируемого параметра число - выполнить sortingByIdNumber
    if (typeof array[0][key] === "number") {
      state.filteredPosts = sortingByIdNumber(array, key, state.sortOrdering);
      // если значение в объекте поста сортируемого параметра строка - выполнить sortingByString
    } else if (typeof array[0][key] === "string") {
      state.filteredPosts = sortingByString(array, key, state.sortOrdering);
    }
  }
  // если длина массива не кратна максимальному количеству на странице или массив пуст
  // то добавить не достающие ячейки для отображения таблицы как по макету
  // например длина массива = 31 , максимальное кол-во постов на странице 10
  // таким образов остаток от деления 1, недостающих ячеек до заполнения страницы = 10 -1 = 9
  if (array.length % state.maxCountOnPage || array.length === 0) {
    state.filteredPosts = [
      ...array,
      ...Array(state.maxCountOnPage - (array.length % state.maxCountOnPage)),
    ];
  }
  localStorage.setItem("tableState", JSON.stringify({ ...state, posts: [], filteredPosts: [] }));
};
