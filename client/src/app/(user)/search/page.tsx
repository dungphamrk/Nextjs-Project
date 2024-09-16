"use client";
import { useEffect, useState } from 'react';
import SearchCard from '@/app/components/Cards/SearchCard'; // Giữ nguyên SearchCard
import { useDispatch, useSelector } from 'react-redux';
import { getAllUser, UserState } from '@/app/store/reducers/userSlice';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '@/app/components/LoadingSnipper';

const page = () => {
  const [searchTerm, setSearchTerm] = useState<string>(''); // Từ khóa tìm kiếm
  const [results, setResults] = useState<any[]>([]); // Kết quả tìm kiếm
  const [isLoading, setIsLoading] = useState<boolean>(false); // Trạng thái loading

  // Lấy danh sách người dùng từ Redux store
  const users = useSelector((state: { users: UserState }) => state.users.users);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(getAllUser()); // Lấy tất cả người dùng khi trang được load
  }, [dispatch]);

  // Hàm xử lý khi người dùng nhập từ khóa tìm kiếm
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    setSearchTerm(keyword);

    if (keyword.trim() === '') {
      setResults([]); // Xóa kết quả tìm kiếm khi ô tìm kiếm trống
      setIsLoading(false); // Tắt trạng thái loading
      return;
    }

    setIsLoading(true); // Bắt đầu tải

    // Tìm kiếm theo username hoặc bio
    const filteredResults = users.filter((user) =>
      user.userName.toLowerCase().includes(keyword.toLowerCase()) ||
      user.bio?.toLowerCase().includes(keyword.toLowerCase())
    );

    setTimeout(() => {
      setResults(filteredResults);
      setIsLoading(false); // Kết thúc tải
    }, 1000); // Giả lập thời gian tải 1 giây
  };

  return (
    <div className="basis-full">
      <div className="bg-black scrollbar scrollbar-thumb-gray-900 md:p-0 w-full max-w-4xl mx-auto h-screen">
        <div className="flex flex-col sm:border-r-2 border-gray-900 rounded-xl flex-nowrap sm:space-y-4 sm:pt-2 md:pt-5 justify-self-end h-full md:ml-5 lg:ml-0">
          <div className="text-xl sm:text-2xl text-white font-semibold hidden sm:block">Search</div>

          {/* Ô tìm kiếm */}
          <div className="relative flex items-center p-1">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="mt-1 block w-full rounded-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm py-1.5 px-3 focus:outline-none focus:ring-0 transition ease-out duration-300 disabled:text-gray-500 disabled:bg-gray-100 disabled:cursor-not-allowed rounded-lg bg-[#262626] border-1 focus:bg-black border border-slate-800 text-white text-sm max-h-12 py-3 w-full"
            />
            {/* Icon xóa */}
            {searchTerm && (
              <i
                className="absolute right-4 fa-solid fa-xmark text-white hover:cursor-pointer"
                onClick={() => setSearchTerm('')}
              ></i>
            )}
          </div>

          {/* Loading spinner */}
          {isLoading && (
            <div className="flex justify-center items-center mt-4">
              <LoadingSpinner isLoading={true} />
            </div>
          )}

          {/* Danh sách kết quả tìm kiếm */}
          <div className="mt-4 space-y-4">
            {!isLoading && results.length > 0 ? (
              results.map((user, index) => (
                <SearchCard key={index} searchResult={user} />
              ))
            ) : (
              !isLoading && <p className="text-gray-500 self-center">No users found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
