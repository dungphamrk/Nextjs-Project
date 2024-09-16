import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

// Define the TypeScript interface for the props
interface SearchCardProps {
  searchResult: {
    id:string;
    userName: string;
    avatar: string;
    bio?: string;
  };
}

const SearchCard: FC<SearchCardProps> = ({ searchResult }) => {
  console.log(searchResult);
  
  const router = useRouter();

  const goToUserProfile = (id: string) => {
    router.push(`/profile/${id}`);
  };

  return (
    <div
      onClick={() => goToUserProfile(searchResult.id)}
      className="rounded-lg flex items-center space-x-2 w-full p-2 h-12 cursor-pointer"
    >
      <div className="flex-none">
        <img
          src={searchResult.avatar}
          alt={`${searchResult.userName}'s profile picture`}
          width={35} // Adjust for responsive images as needed
          height={35}
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
