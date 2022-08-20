import { InjectionKey, Ref } from "vue";
import { ErrorEventItemType } from "./types";

export const ErrorEventItemTypeKey: InjectionKey<Ref<ErrorEventItemType>> =
  Symbol("ErrorEventItem");
