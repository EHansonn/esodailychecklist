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

  if (isLoading)
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
  if (!data)
    return (
      <Layout>
        <p>No user data. Something went wrong...</p>
      </Layout>
    );

  return (
    <div>
      <YourDailiesChecklist
        user={data.user}
        lists={data.lists}
        quests={data.quests}
        refreshData={refreshData}
      ></YourDailiesChecklist>
    </div>
  );
}
