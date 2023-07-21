import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import { SideNav } from "~/components/SideNav";
import "~/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
	Component,
	pageProps: { session, ...pageProps },
}) => {
	return (
		<SessionProvider session={session}>
			<Head>
				<title>t3-example</title>
				<meta name="description" content="t3-example" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="container mx-auto flex items-start sm:pr-4">
				<SideNav />
				<div className="min-h-screen flex-grow border-x">
					<Component {...pageProps} />
				</div>
			</div>
		</SessionProvider>
	);
};

export default api.withTRPC(MyApp);
