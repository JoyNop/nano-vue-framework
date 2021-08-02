/*
 * @Author: HanRui(JoyNop)
 * @Date: 2021-07-09 10:09:16
 * @LastEditors: HanRui(JoyNop)
 * @LastEditTime: 2021-07-14 14:50:43
 * @Description: file content
 * @FilePath: /vue3_antd/src/layout/header/components.ts
 */
import { Layout, Avatar, Menu, Dropdown, Breadcrumb, Tooltip } from 'ant-design-vue'

import {
  SettingOutlined,
  SearchOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  PoweroffOutlined
} from '@ant-design/icons-vue'

export default {
  [Layout.Header.name]: Layout.Header,
  [Avatar.name]: Avatar,
  [Menu.name]: Menu,
  [Tooltip.name]: Tooltip,
  [Menu.Divider.name]: Menu.Divider,
  SettingOutlined,
  Dropdown,
  SearchOutlined,
  [Breadcrumb.name]: Breadcrumb,
  [Breadcrumb.Item.name]: Breadcrumb.Item,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  PoweroffOutlined
}
