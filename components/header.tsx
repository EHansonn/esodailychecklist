import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { useRouter } from "next/router";
import { Spin } from "antd";
import { LoadingOutlined, QuestionCircleOutlined, UserOutlined } from "@ant-design/icons";
export default function Header() {
	const { data: session, status } = useSession();
	const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
	const router = useRouter();
	const navigation = [
		{
			name: "Profile",
			href: "/profile",
			current: router.pathname == "/profile" ? true : false,
		},
		{ name: "Home", href: "/", current: router.pathname == "/" ? true : false },
		{
			name: "Daily Checklist",
			href: "/yourdailies",
			current: router.pathname == "/yourdailies" ? true : false,
		},
	];

	function classNames(...classes: any[]) {
		return classes.filter(Boolean).join(" ");
	}
	return (
		<Disclosure
			as="nav"
			className="bg-neargrey-50 border-b-2 border-r-0  border-t-0 border-l-0 border-solid  -top-0 fixed w-screen  z-50    "
		>
			{({ open }) => (
				<>
					<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ">
						<div className="relative flex h-16 items-center justify-between">
							<div className="absolute inset-y-0 left-0 flex items-center sm:hidden pl-2">
								{/* Mobile menu button*/}
								<Disclosure.Button className="inline-flex items-center justify-center bg-neargrey-50 text-offwhite-50  border-2 border-offwhite-50 rounded-xl hover:bg-gray-700 p-2 focus:bg-gray-700">
									<span className="sr-only">Open main menu</span>
									{open ? (
										<XMarkIcon className="block h-6 w-6" aria-hidden="true" />
									) : (
										<Bars3Icon className="block h-6 w-6" aria-hidden="true" />
									)}
								</Disclosure.Button>
							</div>
							<div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between">
								<div className="flex">
									<div className="flex flex-shrink-0 items-center">
										<Link href="/">
											<img
												className="block h-8 w-auto lg:hidden"
												src="/logo.png"
												alt="ESO Daily Checklist"
											/>
										</Link>

										<Link href="/">
											<img
												className="hidden h-8 w-auto lg:block"
												src="/logo.png"
												alt="ESO Daily Checklist"
											/>
										</Link>
									</div>
									<div className="hidden sm:ml-6 sm:block">
										<div className="flex space-x-4">
											{navigation.slice(1).map((item) => (
												<Link
													key={item.name}
													href={item.href}
													className={classNames(
														item.current
															? "bg-offwhite-200 text-white"
															: "text-gray-300 hover:bg-gray-700 hover:text-white",
														"rounded-md px-3 py-2 text-md font-medium no-underline",
													)}
													aria-current={item.current ? "page" : undefined}
												>
													{item.name}
												</Link>
											))}
										</div>
									</div>
								</div>

								<div className="hidden sm:ml-6 sm:block">
									<div className="flex space-x-4">
										<Link
											key={navigation[0].name}
											href={navigation[0].href}
											className={classNames(
												navigation[0].current
													? "bg-offwhite-200 text-white"
													: "text-gray-300 hover:bg-gray-700 hover:text-white",
												"rounded-md px-3 py-2 text-md font-medium no-underline",
											)}
											aria-current={navigation[0].current ? "page" : undefined}
										>
											{navigation[0].name}
										</Link>
									</div>
								</div>
							</div>
							<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
								{/* Profile dropdown */}
								<Menu as="div" className="relative ml-3">
									<div>
										<Menu.Button className="flex rounded-full bg-neargrey-50 border-0 ">
											<span className="sr-only">Open user menu</span>
											{/* {status === "loading" && (
												<div className="inline-flex items-center justify-center rounded-md p-2">
													<Spin className="h-8 w-8 rounded-full" indicator={antIcon} />
												</div>
											)} */}
											{status === "authenticated" && (
												<div className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
													<img
														className="h-8 w-8 rounded-full border-2 border-solid  "
														src={`${session?.user.image}`}
														alt=""
														referrerPolicy="no-referrer"
													/>
												</div>
											)}
											{status !== "authenticated" && (
												<div className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white ">
													<UserOutlined
														className="	w-8 h-8 text-3xl border-2 border-solid rounded-full "
														aria-hidden="true"
													/>
												</div>
											)}
										</Menu.Button>
									</div>
									<Transition
										as={Fragment}
										enter="transition ease-out duration-100"
										enterFrom="transform opacity-0 scale-95"
										enterTo="transform opacity-100 scale-100"
										leave="transition ease-in duration-75"
										leaveFrom="transform opacity-100 scale-100"
										leaveTo="transform opacity-0 scale-95"
									>
										<Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
											{session?.user && (
												<Menu.Item>
													<Link
														style={{ textDecoration: "none" }}
														href="/profile"
														className="block px-4 py-2 truncate text-black hover:bg-gray-100"
													>
														{session.user.name}
													</Link>
												</Menu.Item>
											)}
											{session?.user && (
												<Menu.Item>
													<Link
														style={{ textDecoration: "none" }}
														href="/profile"
														className="block px-4 py-2 truncate text-black hover:bg-gray-100"
													>
														{session.user.email}
													</Link>
												</Menu.Item>
											)}
											<Menu.Item>
												{({ active }) => (
													<Link
														href={session?.user ? `/api/auth/signout` : `/api/auth/signin`}
														className={classNames(
															active ? "bg-gray-100" : "",
															"block px-4 py-2 text-sm text-black no-underline ",
														)}
														onClick={(e) => {
															if (session?.user) {
																e.preventDefault();
																signOut();
															} else {
																e.preventDefault();
																signIn();
															}
														}}
													>
														{session?.user ? "Sign Out" : "Sign In"}
													</Link>
												)}
											</Menu.Item>
										</Menu.Items>
									</Transition>
								</Menu>
							</div>
						</div>
					</div>

					<Disclosure.Panel className="sm:hidden ">
						<div className="space-y-1 px-2 pt-2  pb-3">
							{navigation.slice(1).map((item) => (
								<Link
									key={item.name}
									href={item.href}
									className={classNames(
										item.current
											? "bg-offwhite-200 text-white"
											: "text-gray-300 hover:bg-gray-700 hover:text-white",
										"block rounded-md px-3 py-2 text-base font-medium",
									)}
									aria-current={item.current ? "page" : undefined}
								>
									{item.name}
								</Link>
							))}
							{navigation.slice(0, 1).map((item) => (
								<Link
									key={item.name}
									href={item.href}
									className={classNames(
										item.current
											? "bg-offwhite-200 text-white"
											: "text-gray-300 hover:bg-gray-700 hover:text-white",
										"block rounded-md px-3 py-2 text-base font-medium",
									)}
									aria-current={item.current ? "page" : undefined}
								>
									{item.name}
								</Link>
							))}
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
}
