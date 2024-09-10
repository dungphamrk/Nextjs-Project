import { FC, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import { PostCommentCard } from '@/app/interfaces/types';

interface Props {
    id?:string;
  comment: PostCommentCard;
  onCommentLike: (commentId: number) => void;
}

const CommentCard: FC<Props> = ({ comment, onCommentLike }) => {
  const [isCommentLiked, setIsCommentLiked] = useState<boolean>(false);
  const router = useRouter();

  const goToUserProfile = (userName: string) => {
    // Redirect to user's profile page
    router.push(`/profile/${userName}`);
  };

  const triggerCommentLike = () => {
    setIsCommentLiked(prev => !prev);
    onCommentLike(comment.id);
  };

  return (
    <div className="flex space-x-3 justify-between pt-3 sm:pt-0">
      <div className="flex space-x-3 p-3">
        <img
          src={comment.profilePictureUrl}
          alt={`${comment.userName}'s profile`}
          className="w-8 h-8 rounded-full"
        />
        <div className="flex flex-col">
          <div className="flex gap-3">
            <p
              onClick={() => goToUserProfile(comment.userName)}
              className="text-ellipsis overflow-hidden font-sans text-sm text-white cursor-pointer"
            >
              <span className="font-sans text-sm font-bold text-white">
                {comment.userName}
              </span>
             
            </p>
            <p> {comment.content}</p>
          </div>
          <div className="group pt-3 flex list-disc space-x-4 font-sans text-xs font-semibold text-gray-500 flex-wrap">
            <li className="list-none cursor-pointer">{comment.createdAt}</li>
            <li className="list-none cursor-pointer text-gray-400">Reply</li>
            <li className="list-none cursor-pointer invisible group-hover:visible">
              <FontAwesomeIcon icon={faEllipsisV} />
            </li>
          </div>
        </div>
      </div>
      <div
        className="text-gray-400 text-xs sm:text-xs cursor-pointer"
        onClick={triggerCommentLike}
      >
      </div>
    </div>
  );
};

export default CommentCard;
