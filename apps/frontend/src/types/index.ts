
import { UseFormRegister, FieldError } from "react-hook-form"

export type SignupFormData = {
  username: string,
  email: string;
  password: string;
};

export type LoginFormData = {
  email: string;
  password: string;
};
export type FolderFormData = {
  name: string
}
export type LoginFieldProps = {
  type: string;
  placeholder: string;
  name: LoginValidFieldNames;
  register: UseFormRegister<LoginFormData>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
};
export type FolderFieldProps = {
  type: string;
  placeholder: string;
  name: FolderValidFieldNames;
  register: UseFormRegister<FolderFormData>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
};
export type SignupFieldProps = {
  type: string;
  placeholder: string;
  name: SignupValidFieldNames;
  register: UseFormRegister<SignupFormData>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
};

export type SignupValidFieldNames =
  | "username"
  | "email"
  | "password";

export type LoginValidFieldNames =
  | "email"
  | "password";

export type FolderValidFieldNames =
  | "name";


export type Folder = {
  id: string,
  userId: string,
  zap: Zap,
  name: string
}

export type Action = {
  id: string,
  zapId: string,
  actionId: string,
  sortingOrder: number,
  type:AvailableAction,
  actionEvent:ActionEvent
}

export type Trigger = {
  id: string,
  zapId: string,
  triggerId: string,
  type: AvailableTrigger,
  triggerEvent:TriggerEvent
}
export interface Zap {
  id: string,
  folderId: string,
  folder:{
    userId:number
    zapId:string
  }
  actions?: Action[],
  trigger?: Trigger,
  status:string,
  createdAt:string,
  updatedAt:string
}

export type AvailableTrigger = {
  id: string,
  name: string,
  image: string,
  triggerEvents:TriggerEvent[]
}

export type AvailableAction = {
  id: string,
  name: string
  image: string,
  actionEvents:ActionEvent[]
}

export type TriggerEvent = {
  id:string,
  name:string,
  availableTriggerId:string,
  avalilableTrigger:AvailableTrigger,
  trigger :Trigger[]
}

export type ActionEvent = {
  id:string,
  name:string,
  availableActionId:string,
  availableActions:AvailableAction,
  actionEvent:Action[]
}

export type SelectedTrigger = {
  availableTriggerId:string
  triggerMetaData:any,
  name:string,
  image:string,
  triggerEvents:TriggerEvent[]
}

export type SelectedAction = {
  availableActionId:string,
  actionMetaData:any,
  sortingOrder:number
  name:string,
  image:string,
  actionEvents:ActionEvent[]
}