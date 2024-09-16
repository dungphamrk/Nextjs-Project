import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CommentChild, CommentParent, PostCard, User } from "@/app/interfaces/types";
import axios from "axios";
import { addPost } from "@/app/store/reducers/postsSlice";
import { v4 as uuidv4 } from "uuid";
import {
  addNewCommentParent,
  getCommentsParent,
  updateCommentsParent,
} from "@/app/services/commentsParent.service";
import {
  addNewCommentChild,
  getCommentsChild,
} from "@/app/services/commentsChild.service";
import { getAllPost, updatePost } from "@/app/store/reducers/postsSlice";
import { convertTime } from "@/app/interfaces/convertTime";
import { useRouter } from "next/navigation";
import MediaCarousel from "../MediaCarousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { getAllUser, UserState } from "@/app/store/reducers/userSlice";
interface Props {
  isToggled: boolean;
  activePost: PostCard;
  onClose: () => void;
}
export  const  CommentModal: React.FC<Props> =({
  isToggled,
  onClose,
  activePost,
}) => {
  const commentsChild = useSelector((state: any) => state.commentsChild);
  const commentsParent = useSelector((state: any) => state.commentsParent);
  const users = useSelector((state: { users: UserState }) => state.users.users);
  const dispatch = useDispatch();
 
  const [valueUserName, setValueUserName] = useState<string>("");
  const [user, setUser] = useState<any>({
    id: "",
    username: "",
    password: "",
    email: "",
    avatar: "",
    biography: "",
    gender: "",
    postsById: [],
    followersById: [],
    status: true,
    private: true,
  });
  const router = useRouter();
  const [visibleComments, setVisibleComment] = useState<any>({});
  const [idCommentViewMore, setIdCommentViewMore] = useState<string>("");
  const [valueComment, setValueComment] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
  useEffect(() => {
    const userId = localStorage.getItem("currentUserId");
    if (userId) {
      const findId = JSON.parse(userId);
      const findedUser = users.find((user:any) => user?.id == findId);
      setCurrentUser(findedUser);
    }
  }, [users]);  

  const [typeCommentPost, setTypeCommentPost] = useState<{
    type: string;
    id: string;
    userName: string;
  }>({ type: "", id: "", userName: "" });
  const [commentsParentUser, setCommentsParentUser] = useState<CommentParent[]>(
    []
  );
  useEffect(() => {
    // Tìm kiếm người dùng dựa trên post.idUser
    setUser(users.find((item) => activePost?.idUser === item.id));
    
  }, [activePost?.idUser, users]);
  console.log(commentsParent);
  
  //get CommentParent from API
  useEffect(() => {
    dispatch(getAllUser());
    dispatch(getCommentsParent());
  }, []);
  //get CommentChild from API
  useEffect(() => {
    dispatch(getCommentsChild());
  }, []);
  //get CommentParent of Post
  useEffect(() => {
    if (activePost) {
      const fetchCommentsParent = async () => {
        // Tìm các bình luận cha liên quan đến activePost từ Redux store
        let newCommentsParent: CommentParent[] = activePost.commentsById
          .map((btn) => commentsParent.find((item: CommentParent) => item.id === btn))
          .filter((comment) => comment !== undefined) as CommentParent[];
  
        // Cập nhật state cục bộ để render bình luận ngay
        setCommentsParentUser(newCommentsParent);
      };
  
      fetchCommentsParent();
    }
  }, [activePost, commentsParent]);  // Thêm activePost vào dependencies
  
  //get CommentsChild of Post
  const commentsChildUser = (comments: string[]) => {
    let newCommentsChild: CommentChild[] = commentsChild?.filter(
      (btn: CommentChild) => comments.includes(btn.id)
    );
    return newCommentsChild;
  };
  // get user of Post

  
  

  //follow User
  const followUser = () => {};
  //view more Comment
  const viewMoreComment = (idComment: string, lengthComments: number) => {
    setIdCommentViewMore(idComment);
    setVisibleComment((prev: any) => ({
      ...prev,
      [idComment]:
        prev[idComment] == lengthComments ? 0 : (prev[idComment] || 0) + 1,
    }));
  };
  // like or unlike Post

  //handleChange Comment
  const handleChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let value = e.target.value;
    if (value == "") {
      setTypeCommentPost({ type: "", id: "", userName: "" });
    }
    setValueComment(value);
  };
  // post Comment

  const postComment = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (typeCommentPost.type == "" && currentUser && activePost) {
      let newComment: CommentParent = {
        id: uuidv4(),
        idUser: currentUser?.id,
        avatarUser: currentUser?.avatar,
        userNameUser: currentUser?.userName,
        postId: activePost.id,
        detail: valueComment,
        date: new Date().getTime(),
        commentsById: [],
      };
  
      // Dispatch bình luận mới vào Redux
      await dispatch(addNewCommentParent(newComment));
  
      // Cập nhật state commentsParentUser để hiển thị bình luận mới ngay lập tức
      await setCommentsParentUser((prev) => [...prev, newComment]);
  
      // Cập nhật post với ID của bình luận mới
      let updatedPost: PostCard = {
        ...activePost,
        commentsById: [...activePost.commentsById, newComment.id],
      };
      dispatch(updatePost(updatedPost));
  
    } else if (typeCommentPost.type === "replyParent" && currentUser) {
      let newComment: CommentChild = {
        id: uuidv4(),
        idUser: currentUser?.id,
        avatarUser: currentUser?.avatar,
        userNameUser: currentUser?.userName,
        postId: activePost.id,
        idParent: typeCommentPost.id,
        userNameParent: typeCommentPost.userName,
        detail: valueComment,
        date: new Date().getTime(),
      };
      dispatch(addNewCommentChild(newComment));
  
      axios
        .get(`http://localhost:5000/commentsParent/${typeCommentPost.id}`)
        .then((response) => {
          let updateCommentParent: CommentParent = {
            ...response.data,
            commentsById: [...response.data.commentsById, newComment.id],
          };
          dispatch(updateCommentsParent(updateCommentParent));
          dispatch(getAllPost());
        })
        .catch((err) => console.log(err));
    }
    setValueComment("");
    setTypeCommentPost({ type: "", id: "", userName: "" });
  };
  
  //reply Comment
  const replyComment = (idComment: string, usernameParent: string) => {
    setTypeCommentPost({
      type: "replyParent",
      id: idComment,
      userName: usernameParent,
    });
    setValueComment(`@${usernameParent} `);
    setValueUserName(`@${usernameParent} `);
  };
  //open Modal Update Post

  //handle text in area
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Backspace" && valueComment === valueUserName) {
      // Xóa toàn bộ đoạn text khi nhấn Backspace
      setValueComment("");
      setTypeCommentPost({ type: "", id: "", userName: "" });
      event.preventDefault();
    }
  };
  if (!isToggled) {
    return null; // Modal will not render if isToggled is false
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
  <div className="modal-overlay fixed inset-0 bg-black opacity-50"  onClick={onClose}> 
        <div className="md:mr-12 flex items-center justify-between cursor-pointer">
          <span className="ml-auto p-11 inline-flex text-white">
            <FontAwesomeIcon icon={faX} />
          </span>
        </div>
      </div>
  <div className="modal text-white bg-black p-6 rounded-md relative z-10 max-w-7xl  w-full  flex">



    {/* Left Section: Slider Image/Video */}
    <div className="w-full h-full p-4 flex justify-center items-center">
      {activePost && activePost.carouselMedia && (
        <MediaCarousel mediaItems={activePost?.carouselMedia} />
      )}
    </div>

    {/* Right Section: Comments and Details */}
    <div className="flex flex-col gap-4 w-1/2 p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img
            className="w-[50px] h-[50px] rounded-full"
            src={user?.avatar}
            alt="User avatar"
          />
          <span
            onClick={() => router.push(`/user/${user.id}`)}
            className="ml-2 cursor-pointer"
          >
            {user?.username}
          </span>
        </div>
        <div className="flex items-center gap-2 cursor-pointer hover:text-gray-400">
          <div className="w-[3px] h-[3px] bg-gray-600 rounded-full"></div>
          <div className="w-[3px] h-[3px] bg-gray-600 rounded-full"></div>
          <div className="w-[3px] h-[3px] bg-gray-600 rounded-full"></div>
        </div>
      </div>

      <hr />

      {/* Comments Section */}
      <div className="all-comment flex flex-col gap-4 overflow-auto max-h-[400px]">
        {commentsParentUser.length === 0 && (
          <div className="text-orange-400 font-bold text-center text-opacity-90 italic">
            Chưa có bình luận nào cho bài viết này!
          </div>
        )}
        {commentsParentUser?.map((btn) => (
          <div key={btn.id} className="flex flex-col">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <img
                  className="w-[50px] h-[50px] rounded-full"
                  src={btn.avatarUser}
                  alt="Commenter avatar"
                />
                <div className="ml-2">
                  <p className="text-sm font-bold">
                    <span
                      onClick={() => router.push(`/user/${btn.idUser}`)}
                      className="cursor-pointer"
                    >
                      {btn.userNameUser}
                    </span>
                    <span className="ml-2 text-sm font-normal">
                      {btn.detail}
                    </span>
                  </p>
                  <div className="text-xs text-gray-500">
                    {convertTime((new Date().getTime() - btn.date) / 60000)}
                    
                  </div>
                  <div onClick={()=>replyComment(btn.id,btn.userNameUser)} className='hover:text-gray-800 cursor-pointer'>Trả lời</div>
                </div>
              </div>
              <i className="bx bx-heart cursor-pointer"></i>
            </div>

            {/* Child Comments */}
            {commentsChildUser(btn.commentsById).length > 0 && (
              <div className="flex flex-col gap-4 ml-10">
                <div className="flex flex-col">
                  {commentsChildUser(btn.commentsById)
                    .slice(0, visibleComments[btn.id])
                    .map((item) => (
                      <div
                        className="flex justify-between items-center"
                        key={item.id}
                      >
                        <div className="flex items-center">
                          <img
                            className="w-[40px] h-[40px] rounded-full"
                            src={item.avatarUser}
                            alt="Child commenter avatar"
                          />
                          <div className="ml-2">
                            <div className="text-sm">
                              <span
                                onClick={() => router.push(`/user/${item.idUser}`)}
                                className="cursor-pointer"
                              >
                                {item.userNameParent}
                              </span>
                              {item.detail}
                            </div>
                            <div className="text-xs text-gray-500">
                              {convertTime((new Date().getTime() - item.date) / 60000)}
                            </div>
                            <div onClick={()=>replyComment(btn.id,btn.userNameUser)} className='hover:text-gray-800 cursor-pointer'>Trả lời</div>
                          </div>
                        </div>
                        <i className="bx bx-heart cursor-pointer"></i>
                      </div>
                    ))}
                </div>

                <div
                  className="text-xs text-gray-500 cursor-pointer hover:text-gray-800"
                  onClick={() => viewMoreComment(btn.id, btn.commentsById.length)}
                >
                  {visibleComments[btn.id] !== btn.commentsById.length
                    ? `Xem thêm bình luận (${btn.commentsById.length - visibleComments[btn.id]})`
                    : 'Ẩn tất cả bình luận'}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <hr />

      {/* Comment Input */}
      <form className="flex items-center justify-between gap-2">
        <textarea
          onKeyDown={handleKeyDown}
          onChange={handleChangeComment}
          value={valueComment}
          className="resize-none text-sm placeholder:italic placeholder:text-slate-900 block w-full border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
          placeholder="Thêm bình luận"
        />
        <button
          onClick={postComment}
          className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600"
        >
          Đăng
        </button>
      </form>
    </div>
  </div>
</div>

  );
};
