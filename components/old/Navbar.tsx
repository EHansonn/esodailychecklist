import { useEffect } from "react";
import Link from "next/link";
import { NextPageContext } from "next/types";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { signIn, signOut, useSession } from "next-auth/react";
import { getServerSession } from "next-auth/next";
//import { useSession } from 'next-auth/react';
const Navbar = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  return (
    <div className="top-0 w-full left-0 bg-inherit flex justify-start bg-slate-900 p-4 text-white border-b-5 border-l-0 border-t-0  border-r-0 border-solid border-white">
      <Link
        className="text-white mr-10 no-underline transition duration-300 hover:scale-125 "
        href="/"
      >
        Home
      </Link>
      <Link
        className="text-white mr-10 no-underline transition duration-300 hover:scale-125 "
        href="/test"
      >
        Test
      </Link>
      {!session && (
        <Link
          className="text-white mr-10 no-underline transition duration-300 hover:scale-125 absolute  right-0 w-16"
          href="/api/auth/signin"
        >
          Login
        </Link>
      )}

      {session?.user && (
        <>
          <Link
            className="text-white mr-10 no-underline transition duration-300 hover:scale-125"
            href="/dailies"
          >
            Dailies
          </Link>{" "}
          <Link
            className="text-white mr-10 no-underline transition duration-300 hover:scale-125 absolute  right-0 w-16"
            href="/api/auth/signout "
          >
            Signout
          </Link>
        </>
      )}
    </div>
  );
};

export default Navbar;
