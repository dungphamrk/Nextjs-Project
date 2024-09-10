import { useState } from 'react';
import dynamic from 'next/dynamic';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile } from '@fortawesome/free-solid-svg-icons';

// Import EmojiPicker bằng dynamic import để tắt SSR
const EmojiPicker = dynamic(() => import('emoji-picker-react'), { ssr: false });

interface EmojiProps {
    toggleDirection?: 'left' | 'right';
    onSelectEmoji: (emoji: string) => void;
}

const EmojiPickerModal: React.FC<EmojiProps> = ({ toggleDirection = 'right', onSelectEmoji }) => {
    const [isToggled, setIsToggled] = useState(false);

    const openEmojiPicker = () => {
        setIsToggled(!isToggled);
    };

    const handleEmojiClick = (_: any, emojiObject: any) => {
        onSelectEmoji(emojiObject.emoji);
    };

    const toggleDirectionClass = () => {
        return toggleDirection === 'left' ? 'left-0' : 'right-0';
    };

    return (
        <div className="relative">
            <div onClick={openEmojiPicker} className="cursor-pointer">
                <FontAwesomeIcon icon={faSmile} size="1x" />
            </div>
            {isToggled && (
                <div className={`absolute bottom-12 z-50 ${toggleDirectionClass()}`}>
                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                </div>
            )}
        </div>
    );
};

export default EmojiPickerModal;
