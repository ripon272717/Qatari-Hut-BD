import React, { useState } from 'react'; // ১. এখানে useState ইমপোর্ট করতে হবে
import imageToBase64 from '../helpers/imageTobase64';

const ProfileEdit = () => {
    // ২. স্টেট অবশ্যই কম্পোনেন্টের ভেতরে থাকতে হবে
    const [userData, setUserData] = useState({
        profilePic: ""
    });

    const handleUploadPhoto = async(e) => {
        const file = e.target.files[0];
        if(!file) return;

        const imagePic = await imageToBase64(file);
        
        setUserData((prev) => ({
            ...prev,
            profilePic: imagePic
        }));
    };

    return (
        <div className='p-4'>
            {/* তোর বাকি JSX কোড এখানে */}
            <div className='relative group w-20 h-20 mx-auto'>
                <div className='w-20 h-20 rounded-full overflow-hidden border bg-slate-100'>
                    {
                        userData.profilePic ? (
                            <img 
                                src={userData.profilePic} 
                                className='w-full h-full object-cover' 
                                alt="profile" 
                            />
                        ) : (
                            <div className='flex items-center justify-center h-full text-xs text-slate-400'>
                                No Image
                            </div>
                        )
                    }
                </div>
                
                <label htmlFor="profile-upload" className='cursor-pointer'>
                    <div className='absolute bottom-0 bg-opacity-70 bg-slate-200 w-full text-center text-[10px] py-1'>
                        Upload
                    </div>
                    <input 
                        id="profile-upload"
                        type="file" 
                        accept="image/*" 
                        capture="user" 
                        className='hidden' 
                        onChange={handleUploadPhoto} 
                    />
                </label>
            </div>
        </div>
    );
};

export default ProfileEdit;