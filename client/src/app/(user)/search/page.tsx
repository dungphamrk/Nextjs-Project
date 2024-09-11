"use client";
import { useEffect, useState } from 'react';
import SearchCard from '@/app/components/Cards/SearchCard'; // Import component SearchCard
import { useDispatch, useSelector } from 'react-redux';
import { getAllUser, UserState } from '@/app/store/reducers/userSlice';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '@/app/components/LoadingSnipper';

const page = () => {
  const [searchTerm, setSearchTerm] = useState<string>(''); // Từ khóa tìm kiếm
  const [results, setResults] = useState<any[]>([]); // Kết quả tìm kiếm (thêm kiểu any[])
  const [isLoading, setIsLoading] = useState<boolean>(false); // Trạng thái loading
  
  // Lấy danh sách người dùng từ Redux store
  const users = useSelector((state: { users: UserState }) => state.users.users);
  const dispatch = useDispatch();
  const router = useRouter();
    useEffect(()=>{
        dispatch(getAllUser());
    },[])
  // Hàm xử lý khi người dùng nhập từ khóa tìm kiếm
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    setSearchTerm(keyword);
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
    <div className="p-4">
      {/* Ô tìm kiếm */}
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
      />

      {/* Loading spinner */}
      {isLoading && (
        <div className="flex justify-center items-center mt-4">
          <LoadingSpinner isLoading={true}/>
        </div>
      )}

      {/* Danh sách kết quả tìm kiếm */}
      <div className="mt-4">
        {!isLoading && results.length > 0 ? (
          results.map((user, index) => (
            <SearchCard key={index} searchResult={user} />
          ))
        ) : (
          !isLoading && <p className="text-gray-500">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default page;
