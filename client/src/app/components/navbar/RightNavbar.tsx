'use client';

import Image from 'next/image';

const RightNavbar: React.FC = () => {
  const goToUserProfile = (userName: string) => {
    // Navigation logic for going to user profile (replace with actual logic)
    console.log(`Go to ${userName}'s profile`);
  };

  return (
    
    <div className="flex flex-col space-y-4 flex-nowrap top-0 max-w-sm pr-10">
      {/* A: Current User Data */}
      <div 
        className="rounded-lg flex items-center space-x-2 cursor-pointer"
        onClick={() => goToUserProfile('john_doe')}
      >
        <div className="flex-inital">
          <img
            src="https://tiki.vn/blog/wp-content/uploads/2023/01/oLkoHpw9cqRtLPTbg67bgtUvUdV1BnXRnAqqBZOVkEtPgf-_Ct3ADFJYXIjfDd0fTyECLEsWq5yZ2CCOEGxIsuHSmNNNUZQcnQT5-Ld6yoK19Q_Sphb0MmX64ga-O_TIPjItNkTL5ns4zqP1Z0OBzsIoeYKtcewnrjnVsw8vfG8uYwwCDkXaoozCrmH1kA.jpg" // Sử dụng hình ảnh tĩnh
            alt="john_doe's profile picture"
            width={44}
            height={44}
            className="w-11 h-11 rounded-full"
          />
        </div>

        <div className="flex-inital">
          <span className="font-sans text-sm font-semibold text-white">
            john_doe
          </span>
        </div>

        <div className="flex-inital grow grid">
          <span className="font-sans text-xs text-sky-500 justify-self-end">
            Switch
          </span>
        </div>
      </div>

      {/* B.1 */}
      <div className="rounded-lg flex items-center space-x-2">
        <div className="flex-inital">
          <span className="font-sans text-sm font-semibold text-gray-400">
            Suggestions for you
          </span>
        </div>
        <div className="flex-inital grow grid">
          <span className="font-sans text-xs text-white justify-self-end">
            See All
          </span>
        </div>
      </div>

      {/* B.2: Suggested Users Data */}
      {[{
        userName: 'jane_doe',
        profilePictureUrl: 'https://tiki.vn/blog/wp-content/uploads/2023/01/oLkoHpw9cqRtLPTbg67bgtUvUdV1BnXRnAqqBZOVkEtPgf-_Ct3ADFJYXIjfDd0fTyECLEsWq5yZ2CCOEGxIsuHSmNNNUZQcnQT5-Ld6yoK19Q_Sphb0MmX64ga-O_TIPjItNkTL5ns4zqP1Z0OBzsIoeYKtcewnrjnVsw8vfG8uYwwCDkXaoozCrmH1kA.jpg',
        followedBy: 'mark_smith'
      }, {
        userName: 'alex_smith',
        profilePictureUrl: 'https://tiki.vn/blog/wp-content/uploads/2023/01/oLkoHpw9cqRtLPTbg67bgtUvUdV1BnXRnAqqBZOVkEtPgf-_Ct3ADFJYXIjfDd0fTyECLEsWq5yZ2CCOEGxIsuHSmNNNUZQcnQT5-Ld6yoK19Q_Sphb0MmX64ga-O_TIPjItNkTL5ns4zqP1Z0OBzsIoeYKtcewnrjnVsw8vfG8uYwwCDkXaoozCrmH1kA.jpg',
        followedBy: 'jane_doe'
      }].map((suggest, index) => (
        <div 
          key={index} 
          className="flex flex-col" 
          onClick={() => goToUserProfile(suggest.userName)}
        >
          {/* Suggested Card */}
          <div className="rounded-lg flex items-center space-x-2 w-80 h-12 cursor-pointer">
            <div className="flex-inital">
              <img
                src={suggest.profilePictureUrl}
                alt={`${suggest.userName}'s profile picture`}
                width={32}
                height={32}
                className="w-8 h-8 rounded-full"
              />
            </div>

            <div className="flex flex-inital flex-col">
              <span className="font-sans text-sm font-semibold text-white self-start">
                {suggest.userName}
              </span>
              <span className="font-sans text-xs font-semibold text-gray-400 self-start">
                Followed by {suggest.followedBy}
              </span>
            </div>

            <div className="flex-inital grow grid">
              <span className="font-sans text-xs text-sky-500 justify-self-end">
                Follow
              </span>
            </div>
          </div>
        </div>
      ))}

      {/* C */}
      <div className="flex list-disc space-x-4 font-sans text-xs font-semibold text-gray-500 self-start flex-wrap">
        <li className="list-none">About</li>
        <li>Help</li>
        <li>Press</li>
        <li>API</li>
        <li>Jobs</li>
        <li>Privacy</li>
        <li>Terms</li>
        <li>Locations</li>
        <li>Language</li>
      </div>

      {/* D */}
      <div className="flex font-sans text-xs font-semibold text-gray-500 self-start">
        <span>© 2023 PHOTOFLOW</span>
      </div>
    </div>
  );
};

export default RightNavbar;
