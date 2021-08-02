/*
 * @Author: HanRui(JoyNop)
 * @Date: 2021-07-09 10:09:16
 * @LastEditors: HanRui(JoyNop)
 * @LastEditTime: 2021-08-02 11:18:48
 * @Description: file content
 * @FilePath: /blast-1/src/store/types.ts
 */
import { IUserState } from '@/store/modules/user/state'
import { IDesignState } from './modules/design/state'

export interface IStore {
  user: IUserState
  design: IDesignState
}
