import { atom } from "recoil";
import { Folder, SelectedAction, SelectedTrigger, Zap } from "@/types";


export const selectedFolderAtom = atom({
    key: 'selectedFolder', // unique ID (with respect to other atoms/selectors)
    default: {
      id:"",
      name:""
    }, // default value (aka initial value)

});

export const zapsAtom = atom<[] | Zap[]>({
  key:'zaps',
  default:[]
})


export const selectedTriggerAtom = atom<null | SelectedTrigger>({
  key:"triggerAtom",
  default:null
})

export const selectedActionsAtom = atom<[] | SelectedAction[]>({
  key:"actionAtom",
  default:[],
})

export const defaultFolderAtom = atom<null | Folder>({
  key:"default-folder-atom",
  default:null
})