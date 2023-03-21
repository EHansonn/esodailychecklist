import List, { ListProps } from "../components/list/List";
import { useSession } from "next-auth/react";
import { Button, Spin } from "antd";
import Layout from "../components/layout";
import { signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import YourDailiesHeader from "../components/DailyChecklist/YourDailiesHeader";
import YourDailiesChecklist, {
  Props,
} from "../components/DailyChecklist/dailieschecklist";
import { LoadingOutlined } from "@ant-design/icons";
import useSWR, { mutate } from "swr";

export const refreshData = () => {
  //Triggers swr to refetch data
  mutate("api/user");
}

export default function Dailies() {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const { data: session, status } = useSession();

  const fetcher = async () => {
    const response = await fetch("/api/user");

    if (!response.ok) {
      const error = new Error("An error occurred while fetching the data.");
      throw error;
    }

    const data = await response.json();
    return data.data;
  };
  const { data, error } = useSWR("api/user", fetcher, {
    refreshInterval: 10000,
  });


  if (!session) {
    return (
      <>
        <YourDailiesHeader></YourDailiesHeader>
        {status === "loading" && (
          <Layout>
            <YourDailiesHeader></YourDailiesHeader>
            <div className="content-center text-center">
              <div className="text-offwhite-50 w-screen text-center pb-5 pt-5">
                Loading user...
              </div>
              <Spin
                className="content-center text-center  pt-2 flex flex-row justify-center space-x-4"
                indicator={antIcon}
              />
            </div>
          </Layout>
        )}
        {status === "unauthenticated" && (
          <Layout>
            <div className="content-center text-center">
              <div className="text-offwhite-50 w-screen text-center pb-5 pt-5">
                Please sign in to view your daily checklist
              </div>
              <Button
                type="primary"
                onClick={(e) => {
                  signIn();
                }}
              >
                Sign In
              </Button>
            </div>
          </Layout>
        )}
      </>
    );
  }

  if (error)
    return (
      <Layout>
        <div className="content-center text-center ">
          <div className="text-offwhite-50 w-screen text-center  pt-5">
            An error occured
          </div>
          <div className="text-offwhite-50 w-screen text-center pb-5 ">
            Please sign in to view your daily checklist
          </div>
          <Button
            type="primary"
            onClick={(e) => {
              signIn();
            }}
          >
            Sign In
          </Button>
        </div>
      </Layout>
    );

  if (!data)
    return (
      <Layout>
        <YourDailiesHeader></YourDailiesHeader>
        <div className="content-center text-center">
          <div className="text-offwhite-50 w-screen text-center pb-5 pt-5">
            Loading Checklist...
          </div>
          <Spin
            className="content-center text-center  pt-2 flex flex-row justify-center space-x-4"
            indicator={antIcon}
          />
        </div>
      </Layout>
    );

  return (
    <div>
      <YourDailiesChecklist
        user={data.user}
        lists={data.lists}
        quests={data.quests}
      ></YourDailiesChecklist>
    </div>
  );
}
