import {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from "next";
//import Layout from "../../components/Layout";
import List, { ListProps } from "../../components/List";
import prisma from "../../lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const list = await prisma?.list.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      owner: {
        select: { name: true },
      },
    },
  });
  if (list) {
    return {
      props: list,
    };
  } else {
    const list = {} as ListProps;
    return {
      props: list,
    };
  }
};

const ListPage: NextPage<ListProps> = (props) => {
  let title = props.title;
  console.log(props);
  return (
    <>
      <div>id: {props.id}</div>
      <div>content: {props.content}</div>
      <div>owner: {props.owner?.name}</div>
    </>
  );
};

export default ListPage;
