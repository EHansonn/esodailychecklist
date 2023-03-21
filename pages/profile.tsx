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
import Head from "next/head";
import ProfileInfo from "../components/profile/ProfileInfo";
import useSWR, { mutate } from "swr";
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
  //refreshed using refresh function from yourdailies.
 

  if (!session) {
    return (
      <>
        <Head>
          <title>Please Sign In </title>
          <meta name="ESO Daily Checklist - ESO ToDO List" content="" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
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
              <div className="text-white w-screen text-center pb-5 pt-5">
                Please sign in to view your profile
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
            Please sign in to view your profile
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
        <div className="content-center text-center">
          <div className="text-offwhite-50 w-screen text-center pb-5 pt-5">
            Loading Profile...
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
      <ProfileInfo
        user={data.user}
        lists={data.lists}
        quests={data.quests}
      ></ProfileInfo>
    </div>
  );
}
