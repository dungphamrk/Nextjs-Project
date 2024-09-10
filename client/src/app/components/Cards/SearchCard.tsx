import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

// Define the TypeScript interface for the props
interface SearchCardProps {
  searchResult: {
    userName: string;
    profilePictureUrl: string;
    bio?: string;
  };
}

const SearchCard: FC<SearchCardProps> = ({ searchResult }) => {
  const router = useRouter();

  const goToUserProfile = (userName: string) => {
    router.push(`/profile/${userName}?isSelf=0`);
  };

  return (
    <div
      onClick={() => goToUserProfile(searchResult.userName)}
      className="rounded-lg flex items-center space-x-2 w-full p-2 h-12 cursor-pointer"
    >
      <div className="flex-none">
        <Image
          src={searchResult.profilePictureUrl}
          alt={`${searchResult.userName}'s profile picture`}
          width={56} // Adjust for responsive images as needed
          height={56}
          className="rounded-full"
        />
      </div>

      <div className="flex flex-col">
        <span className="font-sans text-sm font-semibold text-white self-start">
          {searchResult.userName}
        </span>

        <div className="font-sans text-xs font-semibold text-gray-400 text-ellipsis overflow-hidden self-start">
          {searchResult.bio}
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
