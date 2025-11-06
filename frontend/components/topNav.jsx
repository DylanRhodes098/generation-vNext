import React from "react";
import { Flex, Input } from 'antd';
import "../styles/TopNav.css";
import { AntDesignOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Divider, Tooltip } from 'antd';

export default function TopNav () {

    return (
        <>
        <div className="topNavWrapper p-4 m-4 flex flex-row justify-around">
          
            <a className="" href="/"><img src="/public/webspacelogo.jpeg" height="60px" width="60px"/></a>
            
            <Flex className="searchBar" vertical gap={12}>
    <Input.Search placeholder="Filled" variant="outlined" />
  </Flex>

  <Avatar.Group>
      <Tooltip title="Ant User" placement="top" href="/userProfile" >
      <a className="" href="/userProfile"><Avatar icon={<UserOutlined />} /></a>
      </Tooltip>
    </Avatar.Group>
           
        </div>
        </>
    )

}