import { type NextPage } from "next";
import { InfinityTweetList } from "~/components/InfinityTweetList";
import { NewTweetForm } from "~/components/NewTweetForm";
import { api } from "~/utils/api";

const Home: NextPage = () => {
	return (
		<>
			<div className="sticky top-0 z-10 border-b bg-white pt-2">
				<h1 className="mb-2 px-4 text-lg font-bold">Home</h1>
			</div>
			<NewTweetForm />
			<RecentTweets />
		</>
	);
};

function RecentTweets() {
	const tweets = api.tweet.infinityFeed.useInfiniteQuery(
		{},
		{ getNextPageParam: (lastPage) => lastPage.nextCursor },
	);

	return (
		<InfinityTweetList
			tweets={tweets.data?.pages.flatMap((page) => page.tweets)}
			isError={tweets.isError}
			isLoading={tweets.isLoading}
			hasMore={tweets.hasNextPage}
			fetchNewTweets={tweets.fetchNextPage}
		/>
	);
}

export default Home;
