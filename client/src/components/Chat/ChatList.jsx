import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Paper,
  Button,
  Drawer,
  Tooltip,
  Card,
  Typography,
  CardContent,
} from "@mui/material";
import ChatListItem from "./ChatListItem";
import { projectContext } from "../../providers/ProjectProvider";
import { messageContext } from "../../providers/MessageProvider";

const ChatList = () => {
  const { project } = useContext(projectContext);
  const { messages, fetchMessagesforProject } = useContext(messageContext);

  useEffect(() => {
    fetchMessagesforProject(project.id);
    // console.log("got them ", myProjects);
  }, [project]);
  // Object.keys(messages).length

  const messagesArr = messages.map((item) => {
    //need to put these in order by timestamp
    return (
      <ChatListItem
        key={item.message_id}
        msg={item.message}
        user_name={item.username}
        time={item.timestamp}
        avatar={item.avatar}
      />
    );
  });
  console.log("chatlist - messages", messages);
  console.log("chatlist-mesgArr", messagesArr);

  return (
    <>
      <Box sx={{ margin: 2.5, minheight: '70%', maxheight: '70%', minWidth: 300, maxWidth: 400, overflow: 'auto' }}>
        {/* <Paper
        sx={{ margin: 1 }}> */}
        <ul>{messagesArr}</ul>
        {/* </Paper> */}
      </Box>
    </>
  );
};
export default ChatList;
