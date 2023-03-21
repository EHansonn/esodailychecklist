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

export default function Dailies() {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const [data, setData] = useState<Props>();
  const [isLoading, setLoading] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    setData(undefined);
    if (session) {
      setLoading(true);
      try {
        fetch("/api/user")
          .then((res) => res.json())
          .then((data) => {
            setData(data.props);
            setLoading(false);
          });
      } catch {
        setData(undefined);
        setLoading(false);
      }
    }
  }, [, session]);

  const refreshData = () => {
    if (session) {
      try {
        fetch("/api/user")
          .then((res) => res.json())
          .then((data) => {
            setData(data.props);
            setLoading(false);
          });
      } catch {
        setData(undefined);
      }
    }
  };

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

  if (isLoading)
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
  if (!data)
    return (
      <Layout>
        <p></p>
      </Layout>
    );

  return (
    <div>
      <ProfileInfo
        user={data.user}
        lists={data.lists}
        quests={data.quests}
        refreshData={refreshData}
      ></ProfileInfo>
    </div>
  );
}
