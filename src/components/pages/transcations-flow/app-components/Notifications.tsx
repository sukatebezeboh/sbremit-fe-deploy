import { Avatar, Button, Divider, Empty, List, Modal, Space } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { convertDateAndTimeString } from "../app-pages/app-transactions/TransactionHelper";
import {
  getFirstLetter,
  replaceUnderScore,
  generateAlphabetColor,
} from "../utils/reuseableUtils";
import {
  fetchUserNotifications,
  updateUserNotifReadStatus,
} from "redux/actions/actions";

interface NotificationsProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

interface NotificationData {
  key: string;
  id: string;
  type: string;
  status: string;
  message: string;
  dateCreated: string;
}

export const filterNotifications = (notifications: any) => {
  const filteredNotif: NotificationData[] = [];
  notifications?.forEach((noti: any, index: number) => {
    const data: NotificationData = {
      key: noti?.dateCreated + index,
      id: noti?.id,
      type: noti?.type,
      status: noti?.status,
      message: noti?.meta?.message,
      dateCreated: noti?.dateCreated,
    };
    filteredNotif.push(data);
  });
  return filteredNotif;
};

export default function Notifications({ open, setOpen }: NotificationsProps) {
  const notifications = useSelector((state: any) => state.notifications);

  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <Modal
      title={`Notifications (${notifications?.length})`}
      open={open}
      onCancel={handleCancel}
      footer={[
        <Button
          type="primary"
          onClick={() =>
            updateUserNotifReadStatus("*", () => fetchUserNotifications(200))
          }
        >
          Mark all as read
        </Button>,
      ]}
      width={700}
    >
      <Divider style={{ marginTop: "12px" }} />
      <ListContainer>
        <List
          dataSource={notifications}
          itemLayout="vertical"
          renderItem={(item: any, index) => (
            <List.Item
              key={"notifications" + index}
              actions={[
                <span>{convertDateAndTimeString(item.dateCreated)}</span>,
                item.status === "READ" ? (
                  <> </>
                ) : (
                  <Button
                    size="small"
                    onClick={() =>
                      updateUserNotifReadStatus(item.id, () =>
                        fetchUserNotifications(10)
                      )
                    }
                  >
                    Mark as read
                  </Button>
                ),
              ]}
            >
              <List.Item.Meta />
              <Space size={10} align="start">
                <Avatar
                  size={40}
                  style={{
                    background: generateAlphabetColor(
                      getFirstLetter(item.type) ?? ""
                    ),
                  }}
                >
                  {getFirstLetter(item.type)}
                </Avatar>
                <Space direction="vertical" size={0}>
                  <NotifiType>{replaceUnderScore(item.type)}</NotifiType>
                  <span>{item.message}</span>
                </Space>
              </Space>
            </List.Item>
          )}
        />
      </ListContainer>
      <Divider style={{ marginTop: "12px" }} />
    </Modal>
  );
}

const ListContainer = styled.div`
  width: 100%;
  //margin: 24px 0px;
  height: 65vh;
  overflow: auto;
`;

const NotifiType = styled.p`
  margin: 4px 0;
  font-weight: 600;
  text-transform: capitalize;
`;
