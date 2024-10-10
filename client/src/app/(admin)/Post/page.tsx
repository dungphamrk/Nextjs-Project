"use client"
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import {
  updatePost,
  deletePost,
  openModal,
  closeModal,
  fetchPaginatedPosts,
  PostState,
} from "@/app/store/reducers/postsSlice";
import {
  CaretDownOutlined,
  CaretUpOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Modal from "@/app/components/modal/Modal";
import { PostCard } from "@/app/interfaces/types";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import Swal from "sweetalert2";

const Page: React.FC = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state: { posts: PostState }) => state.posts.Posts);
  const totalPages = useSelector(
    (state: { posts: PostState }) => state.posts.totalPages
  );

  const [currentPostId, setCurrentPostId] = useState<string | null>(null);
  const [postForm, setPostForm] = useState<PostCard>({
    id: "",
    title: "",
    idUser: "",
    carouselMedia: [],
    createdAt: 0,
    likeCount: 0,
    status: false,
    commentsById: [],
  });
  const [sortField, setSortField] = useState<string>("id");
  const [sortDirection, setSortDirection] = useState<string>("asc");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const ITEMS_PER_PAGE = 7;

  useEffect(() => {
    dispatch(fetchPaginatedPosts({ page: currentPage, limit: ITEMS_PER_PAGE }));
  }, [dispatch, currentPage]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setPostForm({ ...postForm, [name]: value });
  };

  const handleSavePost = () => {
    if (currentPostId !== null) {
      dispatch(updatePost({ ...postForm, id: currentPostId }));
    }
    dispatch(closeModal());
    setPostForm({
      id: "",
      title: "",
      idUser: "",
      carouselMedia: [],
      createdAt: 0,
      likeCount: 0,
      status: false,
      commentsById: [],
    });
    setCurrentPostId(null);
  };

  const handleEditPost = (post: PostCard) => {
    setCurrentPostId(post.id);
    setPostForm(post);
    dispatch(openModal());
  };

  const handleDeletePost = (id: string) => {
    dispatch(deletePost(id));
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
    setPostForm({
      id: "",
      title: "",
      idUser: "",
      carouselMedia: [],
      createdAt: 0,
      likeCount: 0,
      status: false,
      commentsById: [],
    });
    setCurrentPostId(null);
  };

  const toggleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const toggleStatus = (id: string) => {
    let post = posts.find((item) => item.id === id);
    if (post?.status) {
      Swal.fire({
        title: "Cảnh báo?",
        text: "Bạn sẽ ẩn bài viết này!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((willDelete: any) => {
        if (willDelete.isConfirmed) {
          dispatch(updatePost({ ...post, status: !post?.status }));
        } else {
          Swal.fire("Tác vụ đã hủy");
        }
      });
    } else {
      Swal.fire({
        title: "Cảnh báo?",
        text: "Bạn sẽ mở khóa bài viết này!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((willDelete: any) => {
        if (willDelete.isConfirmed) {
          dispatch(updatePost({ ...post, status: !post?.status }));
        } else {
          Swal.fire("Tác vụ đã hủy");
        }
      });
    }
  };

  const sortedPosts = [...posts].sort((a: PostCard, b: PostCard) => {
    const fieldA = a[sortField as keyof PostCard];
    const fieldB = b[sortField as keyof PostCard];
    if (fieldA === undefined || fieldB === undefined) return 0;
    if (typeof fieldA === "string" && typeof fieldB === "string") {
      return sortDirection === "asc"
        ? fieldA.localeCompare(fieldB)
        : fieldB.localeCompare(fieldA);
    } else if (typeof fieldA === "number" && typeof fieldB === "number") {
      return sortDirection === "asc" ? fieldA - fieldB : fieldB - fieldA;
    }
    return 0;
  });

  const filteredPosts = sortedPosts.filter((post: PostCard) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const renderPaginationButtons = () => {
    const pageButtons = [];
    const delta = 2;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        pageButtons.push(
          <a
            key={i}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(i);
            }}
            className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
              currentPage === i
                ? "bg-indigo-600 text-white"
                : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            }`}
          >
            {i}
          </a>
        );
      } else if (
        i === currentPage - delta - 1 ||
        i === currentPage + delta + 1
      ) {
        pageButtons.push(
          <span
            key={i}
            className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300"
          >
            ...
          </span>
        );
      }
    }

    return pageButtons;
  };
  const modalOpen = useSelector(
    (state: { posts: PostState }) => state.posts.modalOpen
  );

  return (
    <div className="admin-post-list bg-gray-100 p-6">
      <div className="flex justify-between p-3 bg-slate-400">
        <h2 className="text-xl font-semibold mb-4">Danh sách bài viết</h2>
        <div className="w-3/5 flex justify-center">
          <label className="text-2xl p-3" htmlFor="search">
            <SearchOutlined />
          </label>
          <input
            type="text"
            name="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-2/3 h-12 border-black border-[1px] p-3"
            placeholder="Tìm kiếm"
          />
        </div>
      </div>
      {modalOpen && (
        <Modal>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Tiêu đề bài viết
            </label>
            <input
              type="text"
              name="title"
              value={postForm.title || ""}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              ID người dùng
            </label>
            <input
              type="text"
              name="idUser"
              value={postForm.idUser || ""}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            />
          </div>
       
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Trạng thái
            </label>
            <select
              name="status"
              value={postForm.status ? "Active" : "Inactive"}
              onChange={(e) =>
                setPostForm({
                  ...postForm,
                  status: e.target.value === "Active",
                })
              }
              className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <button
            type="button"
            onClick={handleSavePost}
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleCloseModal}
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 mt-4 bg-gray-600 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
          >
            Close
          </button>
        </Modal>
      )}
      <table className="min-w-full divide-y divide-gray-200 bg-white shadow-md mt-6">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th
              onClick={() => toggleSort("title")}
              className="cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Tiêu đề bài viết
              {sortField === "title" ? (
                sortDirection === "asc" ? (
                  <CaretUpOutlined />
                ) : (
                  <CaretDownOutlined />
                )
              ) : null}
            </th>
            <th
              onClick={() => toggleSort("idUser")}
              className="cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              ID Người dùng
              {sortField === "idUser" ? (
                sortDirection === "asc" ? (
                  <CaretUpOutlined />
                ) : (
                  <CaretDownOutlined />
                )
              ) : null}
            </th>
            <th
              onClick={() => toggleSort("createdAt")}
              className="cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Ngày tạo
              {sortField === "createdAt" ? (
                sortDirection === "asc" ? (
                  <CaretUpOutlined />
                ) : (
                  <CaretDownOutlined />
                )
              ) : null}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredPosts.map((post) => (
            <tr key={post.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {post.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {post.idUser}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(post.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
            
                <button
                  onClick={() => toggleStatus(post.id)}
                  className={`${
                    post.status
                      ? "inline-block px-3 py-2 bg-green-600 text-white rounded-lg"
                      : "inline-block px-3 py-2 bg-red-600 text-white rounded-lg"
                  }`}
                >
                  {post.status ? "Active" : "Inactive"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-center">
        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(currentPage - 1);
            }}
            className="relative inline-flex items-center px-2 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <span className="sr-only">Previous</span>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </a>
          {renderPaginationButtons()}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(currentPage + 1);
            }}
            className="relative inline-flex items-center px-2 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <span className="sr-only">Next</span>
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </a>
        </nav>
      </div>
    </div>
  );
};

export default Page;
